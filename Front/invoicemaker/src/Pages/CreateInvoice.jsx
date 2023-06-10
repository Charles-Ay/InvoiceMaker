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
import { useNavigate } from "react-router-dom";

var init = false;
function CreateInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState({});

  const [customer, setCustomer] = useState({});
  const [contact, setContact] = useState({});
  const [customers, setCustomers] = useState([]);
  const [names, setNames] = useState([]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!init) {
      fetch("https://localhost:7171/api/Customer")
        .then((res) => res.json())
        .then((data) => {
          setCustomers(data);
        });
      init = true;
    }
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

  const pushCustomer = () => {
    fetch("https://localhost:7171/api/Customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
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
            />
            <TextField
              placeholder="Address"
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (invoiceNumber !== "" && invoiceDate !== {} && customer !== {})
                navigate("/add-employees", {
                  state: {
                    invoiceNumber: invoiceNumber,
                    invoiceDate: invoiceDate,
                    customer: customer,
                  },
                });
              else alert("Please fill out all fields.");
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
