import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  TextField,
  IconButton,
  Button,
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

function Employees() {
  const { state } = useLocation();
  const [employeeFields, setEmployeeFields] = useState([
    {
      name: "",
      rate: 0,
      hours: 0,
      date: "",
    },
  ]);

  const addEmployeeField = () => {
    setEmployeeFields([
      ...employeeFields,
      {
        name: "",
        rate: 0,
        hours: 0,
        date: "",
      },
    ]);
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

    fetch("https://localhost:7171/api/Invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: k,
    })
      .then((response) => response.blob())
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

        // After a delay, remove the link and revoke the object URL
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
      })
      .catch((e) => console.error(e));
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
                style={{ width: "25%" }}
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
              <TextField
                placeholder="Employee Rate"
                label="Employee Rate"
                variant="outlined"
                fullWidth
                margin="normal"
                style={{ width: "25%" }}
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
                style={{ width: "25%" }}
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
          <Button variant="contained" color="primary" onClick={createInvoice}>
            Create Invoice
          </Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default Employees;
