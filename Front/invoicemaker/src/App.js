import './App.css';
import theme from './theme';
import {
  AppBar,
  ThemeProvider,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        <Toolbar style={{ textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
          <Typography variant="h6" color="inherit" >
            ValleySide Invoice System
          </Typography>
        </Toolbar>
      </AppBar>
      <Card style={{ marginTop: 100, alignContent: 'center', textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h5" color="inherit" style={{ marginBottom: 30, fontWeight: 'bold' }} >
            Welcome to ValleySide Invoice System
          </Typography>
          <Typography variant="body1" color="inherit" >
            This is a simple invoice system for ValleySide HealthCare Services.
          </Typography>
          <Typography variant="body1" color="inherit" >
            Create or view invoices by clicking the buttons below.
          </Typography>
          <Link to="/create-invoice" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" style={{ marginTop: 10 }}>
              Create Invoice
            </Button>
          </Link>
          <Link to="/view-invoices" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" style={{ marginTop: 10, marginLeft: 10 }}>
              View Invoices
            </Button>
          </Link>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default App;
