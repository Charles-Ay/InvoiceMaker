import { useState, useEffect } from "react";
import React from "react";
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
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import theme from "../theme";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";

function ViewInvoices() {
  const [invoicesData, setInvoicesData] = useState([]);
  const [init, setInit] = useState(true);

  useEffect(() => {
    fetchInvoices().then((data) => {
      const groupedData = groupByCustomer(data);
      setInvoicesData(groupedData);
      let x = 0;
    });
    setInit(false);
  }, []);

  const fetchInvoices = async () => {
    try {
      let res = await fetch(
        "https://invoicemakerapi.azurewebsites.net/api/invoice"
      );
      let invoices = await res.json();
      //let temp = JSON.stringify(invoices);
      return invoices;
    } catch (err) {
      console.log(err);
    }
  };

  function groupByCustomer(data) {
    return data.reduce((acc, curr) => {
      const foundCustomer = acc.find(
        (item) => item.customer === curr.customer.name
      );
      if (foundCustomer) {
        foundCustomer.invoices.push({
          invoiceDate: curr.invoiceDate,
          _id: curr._id,
          invoiceNumber: curr.invoiceNumber,
        });
      } else {
        acc.push({
          customer: curr.customer.name,
          invoices: [
            {
              invoiceDate: curr.invoiceDate,
              _id: curr._id,
              invoiceNumber: curr.invoiceNumber,
            },
          ],
        });
      }
      return acc;
    }, []);
  }

  const DownloadInvoice = (invoiceId) => {
    try {
      fetch(
        "https://invoicemakerapi.azurewebsites.net/api/invoice/" + invoiceId
      ).then((res) => {
        res.blob().then((blob) => {
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
        });
      });
      //let temp = JSON.stringify(invoices);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            View Invoice
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
        <Card sx={{}}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              style={{
                textAlign: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              Invoices
            </Typography>
            <Typography
              variant="body2"
              style={{
                textAlign: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              Select an invoice to view
            </Typography>
            <br />
            <List>
              {invoicesData.map(({ customer, invoices }) => (
                <React.Fragment key={customer}>
                  <Typography variant="h6">
                    <b>{customer}</b>
                  </Typography>
                  {invoices.map(({ invoiceDate, _id, invoiceNumber }) => (
                    <ListItem key={_id}>
                      <ListItemText
                        primary={
                          "Invoice ID: " +
                          _id +
                          "  :  Date: " +
                          invoiceDate +
                          "  :  Invoice Number: " +
                          invoiceNumber
                        }
                      />
                      <Typography style={{ paddingLeft: 25 }} />
                      <Button
                        variant="contained"
                        onClick={() => DownloadInvoice(_id)}
                      >
                        Download Invoice
                      </Button>
                    </ListItem>
                  ))}
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            {invoicesData.length === 0 || invoicesData === undefined
              ? () => {
                  <Typography variant="h6">Loading...</Typography>;
                }
              : {}}
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default ViewInvoices;
