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
import theme from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocation } from "react-router-dom";

function Employees() {
  const { state } = useLocation();
  const [employeeFields, setEmployeeFields] = useState([{}]);

  const addEmployeeField = () => {
    setEmployeeFields([...employeeFields, {}]);
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
              />
              <div style={{ paddingTop: 16 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Invoice Date" />
                </LocalizationProvider>
              </div>
              <TextField
                placeholder="Employee Rate"
                label="Employee Rate"
                variant="outlined"
                fullWidth
                margin="normal"
                style={{ width: "25%" }}
              />
              <TextField
                placeholder="Employee Hours"
                label="Employee Hours"
                variant="outlined"
                fullWidth
                margin="normal"
                style={{ width: "25%" }}
              />
              {index === employeeFields.length - 1 && (
                <IconButton onClick={addEmployeeField}>
                  <AddCircleOutlineIcon />
                </IconButton>
              )}
            </div>
          ))}
        </CardContent>
        <hr />
        <CardContent>
          <Button variant="contained" color="primary">
            Create Invoice
          </Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default Employees;
