import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";

// Import the components for the other pages here
import CreateInvoice from "./Pages/CreateInvoice";
import Employees from "./Pages/Employees";
import ViewInvoices from "./Pages/ViewInvoices";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/InvoiceMaker" element={<App />} />
        <Route path="/create-invoice" element={<CreateInvoice />} />
        <Route path="/add-employees" element={<Employees />} />
        <Route path="/view-invoices" element={<ViewInvoices />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
