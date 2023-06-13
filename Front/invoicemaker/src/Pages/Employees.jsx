import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  TextField,
  IconButton,
  Button,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { json, useLocation } from "react-router-dom";
import { create } from "@mui/material/styles/createTransitions";
import { set } from "date-fns";

//https://localhost:7171/api/
//https://invoicemakerapi.azurewebsites.net/api/

function Employees() {
  const { state } = useLocation();
  const [errorDialog, setErrorDialog] = useState(false);
  const [roles, setRoles] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const [employeeFields, setEmployeeFields] = useState([
    {
      name: "",
      rate: "",
      hours: "",
      date: "",
      role: "",
    },
  ]);

  const addEmployeeField = () => {
    setEmployeeFields([
      ...employeeFields,
      {
        name: "",
        rate: "",
        hours: "",
        date: "",
        role: "",
      },
    ]);
  };

  const inputValidation = () => {
    let valid = true;
    let message = "";

    for (let i = 0; i < employeeFields.length; i++) {
      if (employeeFields[i].name === "") {
        valid = false;
        message = "Please enter a name for all employees";
      } else if (employeeFields[i].rate === "") {
        valid = false;
        message = "Please enter a rate for all employees";
      } else if (employeeFields[i].hours === "") {
        valid = false;
        message = "Please enter a hours for all employees";
      } else if (employeeFields[i].date === "") {
        valid = false;
        message = "Please enter a date for all employees";
      } else if (employeeFields[i].role === "") {
        valid = false;
        message = "Please enter a role for all employees";
      }

      if (!valid) {
        break;
      }
    }
    return { valid, message };
  };

  const removeEmployeeField = (index) => {
    const newFields = [...employeeFields];
    newFields.splice(index, 1);
    setEmployeeFields(newFields);
  };

  const handleFieldChange = (e, index, field) => {
    const newFields = [...employeeFields];
    newFields[index][field] = e.target.value;
    setEmployeeFields(newFields);
  };

  const createInvoice = () => {
    let validation = inputValidation();
    if (validation.valid) {
      setDisableBtn(true);
      let invoice = {
        invoiceNumber: state.invoiceNumber,
        invoiceDate: state.invoiceDate,
        customer: state.customer,
        company: state.company,
        employees: employeeFields,
      };

      var k = JSON.stringify(invoice);
      k = k.replaceAll('"\\', '"');
      k = k.replaceAll('\\"', '"');
      k = k.replaceAll('""', '"');
      fetch("https://invoicemakerapi.azurewebsites.net/api/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: k,
      })
        .then((response) => {
          if (response.ok) {
            return response.blob();
          } else {
            alert("Error creating invoice");
          }
        })
        .then((blob) => {
          // Create a new object URL for the blob
          const url = window.URL.createObjectURL(blob);

          // Create a link and programmatically click it to download the file
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "InvoicePDF";
          document.body.appendChild(a);
          a.click();
          setDisableBtn(false);

          // After a delay, remove the link and revoke the object URL
          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 100);
        })
        .catch((e) => console.error(e));
    } else {
      setErrorDialog(true);
    }
  };

  const fetchRoles = () => {
    fetch("https://invoicemakerapi.azurewebsites.net/api/Role")
      .then((response) => response.json())
      .then((json) => {
        setRoles(json);
      });
  };

  const handleErrorDialogClose = () => {
    setErrorDialog(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Create Invoice
          </Typography>
        </Toolbar>
      </AppBar>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Employees in invoice
          </Typography>
          <hr />
          <Dialog
            open={errorDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Input Validation Error"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {inputValidation().message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleErrorDialogClose}>OK</Button>
            </DialogActions>
          </Dialog>
          {employeeFields.map((field, index) => (
            <div
              key={index}
              className="row"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <TextField
                placeholder="Employee Name"
                label="Employee Name"
                variant="outlined"
                fullWidth
                margin="normal"
                style={{ width: "20%" }}
                value={field.name}
                onChange={(e) => {
                  handleFieldChange(e, index, "name");
                }}
              />
              <div style={{ paddingTop: 16 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Invoice Date"
                    onChange={(e) => {
                      let t = { target: { value: JSON.stringify(e) } };
                      handleFieldChange(t, index, "date");
                    }}
                  />
                </LocalizationProvider>
              </div>
              <Autocomplete
                style={{ marginTop: 16 }}
                disablePortal
                id="combo-box-demo"
                options={roles}
                sx={{ width: 250 }}
                renderInput={(params) => (
                  <TextField {...params} label="roles" />
                )}
                value={field.role}
                onChange={(e) => {
                  var t = { target: { value: e.target.textContent } };
                  handleFieldChange(t, index, "role");
                }}
              />
              <TextField
                placeholder="Employee Rate"
                label="Employee Rate"
                variant="outlined"
                fullWidth
                margin="normal"
                style={{ width: "14%" }}
                value={field.rate}
                onChange={(e) => {
                  handleFieldChange(e, index, "rate");
                }}
              />
              <TextField
                placeholder="Employee Hours"
                label="Employee Hours"
                variant="outlined"
                fullWidth
                margin="normal"
                style={{ width: "14%" }}
                value={field.hours}
                onChange={(e) => {
                  handleFieldChange(e, index, "hours");
                }}
              />
              {index === employeeFields.length - 1 && (
                <div>
                  <IconButton onClick={addEmployeeField}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                  {employeeFields.length > 1 && (
                    <IconButton onClick={() => removeEmployeeField(index)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  )}
                </div>
              )}
            </div>
          ))}
        </CardContent>
        <hr />
        <CardContent>
          {!disableBtn ? (
            <Button variant="contained" color="primary" onClick={createInvoice}>
              Create Invoice
            </Button>
          ) : (
            <Button
              disabled
              variant="contained"
              color="primary"
              onClick={createInvoice}
            >
              Create Invoice
            </Button>
          )}
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default Employees;
