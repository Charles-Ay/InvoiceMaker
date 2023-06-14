import { useState, useEffect } from "react";
import {
  AppBar,
  ThemeProvider,
  Toolbar,
  Typography,
  Card,
  CardContent,
  TextField,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import theme from "../theme";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link, useNavigate } from "react-router-dom";

var init = false;
function CreateInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState({});

  const [company, setCompany] = useState({});

  const [customer, setCustomer] = useState({});
  const [contact, setContact] = useState({});
  const [customers, setCustomers] = useState([]);
  const [names, setNames] = useState([]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);

  const navigate = useNavigate();

  const inputValidation = () => {
    let valid = true;
    let message = "";

    if (
      invoiceNumber === "" ||
      Number.isInteger(Number.parseInt(invoiceNumber)) === false
    ) {
      message = "Please enter a valid invoice number.";
      valid = false;
    } else if (invoiceDate.$y === "" || invoiceDate.$y === undefined) {
      message = "Please enter an invoice date.";
      valid = false;
    } else if (company.name === "" || company.name === undefined) {
      message = "Please enter a company name.";
      valid = false;
    } else if (company.address === "" || company.address === undefined) {
      message = "Please enter a company address.";
      valid = false;
    } else if (company.city === "" || company.city === undefined) {
      message = "Please enter a company city.";
      valid = false;
    } else if (company.province === "" || company.province === undefined) {
      message = "Please enter a company province.";
      valid = false;
    } else if (company.postalCode === "" || company.postalCode === undefined) {
      message = "Please enter a company postal code.";
      valid = false;
    } else if (customer.name === "" || customer.name === undefined) {
      message = "Please select a customer.";
      valid = false;
    }
    return { valid, message };
  };

  useEffect(() => {
    fetch("https://invoicemakerapi.azurewebsites.net/api/customer")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
      });
    if (update) {
      pushCustomer();
      setUpdate(false);
    }
  }, [update]);

  const GetNames = () => {
    var t = customers.map((customer) => {
      return customer.name;
    });
    setNames(t);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setCustomer({ ...customer, contact: contact, _id: "temp" });
    setUpdate(true);
    setOpen(false);
  };

  const handleErrorDialogClose = () => {
    setErrorDialog(false);
  };

  const pushCustomer = () => {
    fetch("https://invoicemakerapi.azurewebsites.net/api/Customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
  };

  const getCustomer = (_id) => {
    fetch("https://invoicemakerapi.azurewebsites.net/api/GetCustomer?id=" + _id)
      .then((res) => res.json())
      .then((data) => {
        if (data.name !== "Not Found") setCustomer(data);
        else alert("Customer not found.");
      });
  };

  if (customers.length > 0 && names.length === 0) GetNames();

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Create Invoice
          </Typography>
          <Link to="/" style={{ textDecoration: "none", paddingLeft: 10 }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "auto" }}
            >
              Home
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card sx={{ maxWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              Create Invoice
            </Typography>
            <TextField
              placeholder="Invoice Number"
              label="Invoice Number"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => {
                setInvoiceNumber(e.target.value);
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Invoice Date" onChange={setInvoiceDate} />
              </DemoContainer>
            </LocalizationProvider>
          </CardContent>
          <hr />
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              From
            </Typography>
            <TextField
              placeholder="Company Name"
              label="Company Name"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => {
                setCompany({ ...company, name: e.target.value });
              }}
            />
            <TextField
              placeholder="Address"
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => {
                setCompany({ ...company, address: e.target.value });
              }}
            />
            <TextField
              placeholder="Company City"
              label="Company City"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => {
                setCompany({ ...company, city: e.target.value });
              }}
            />
            <TextField
              placeholder="Company Province"
              label="Company Province"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => {
                setCompany({ ...company, province: e.target.value });
              }}
            />
            <TextField
              placeholder="Company Postal Code"
              label="Company Postal Code"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => {
                setCompany({ ...company, postalCode: e.target.value });
              }}
            />
            <Typography variant="h5" component="div" align="center">
              To
            </Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={names}
              renderInput={(params) => (
                <TextField {...params} label="Customer" />
              )}
              onChange={(event, newValue) => {
                setCustomer(
                  ...customers.filter((customer) => customer.name === newValue)
                );
              }}
            />
            <Button variant="outlined" onClick={handleClickOpen}>
              <Typography variant="h6" component="div" align="center">
                Add Customer
              </Typography>
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Customer</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please fill out the form below to add a new customer.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Company Name"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setCustomer({ ...customer, name: e.target.value });
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="address"
                  label="Address"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setCustomer({ ...customer, address: e.target.value });
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="city"
                  label="City"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setCustomer({ ...customer, city: e.target.value });
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="province"
                  label="Province"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setCustomer({ ...customer, province: e.target.value });
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="postalCode"
                  label="Postal Code"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setCustomer({ ...customer, postalCode: e.target.value });
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="contactName"
                  label="Contact Name"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setContact({ ...contact, name: e.target.value });
                  }}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="contactEmail"
                  label="Contact Email"
                  type="email"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setContact({ ...contact, email: e.target.value });
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </DialogActions>
            </Dialog>
          </CardContent>
          <Dialog
            open={errorDialog}
            onClose={handleClose}
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              var { valid, message } = inputValidation();
              if (valid) {
                navigate("/add-employees", {
                  state: {
                    invoiceNumber: invoiceNumber,
                    invoiceDate: JSON.stringify(invoiceDate),
                    customer: customer,
                    company: {
                      name: company.name,
                      address: company.address,
                      city: company.city,
                      province: company.province,
                      postalCode: company.postalCode,
                    },
                  },
                });
              } else {
                setErrorDialog(true);
              }
            }}
          >
            Next
          </Button>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default CreateInvoice;
