using InvoiceMaker.Model;
using InvoiceMakerLib;

namespace InvoiceMaker.View
{
    public class InvoiceView
    {
        public static void CreateInvoice(Invoice invoice)
        {
            int indexOfT = invoice.invoiceDate.IndexOf("T");
            invoice.invoiceDate = invoice.invoiceDate.Substring(0, indexOfT);

            List<InvoiceMakerLib.Employee> employees = new List<InvoiceMakerLib.Employee>();
            foreach(var emp in invoice.employees)
            {
                emp.Date = emp.Date.Substring(0, indexOfT);
                DateTime date = DateTime.Parse(emp.Date);
                employees.Add(new InvoiceMakerLib.Employee(emp.Name, InvoiceMakerLib.Employee.StringToPosition(emp.Role), date, emp.Rate, emp.Hours));
            }
            InvoiceMakerLib.Company company = new InvoiceMakerLib.Company(invoice.company.Name, invoice.company.Address, invoice.company.City, invoice.company.Province, invoice.company.PostalCode);

            PDFMaker pdf = new();
            
            InvoiceMakerLib.Customer customer = new InvoiceMakerLib.Customer(invoice.customer.Name, invoice.customer.Address, invoice.customer.City, invoice.customer.Province, invoice.customer.PostalCode, invoice.customer.Contact.Name, invoice.customer.Contact.Email);
            pdf.CreatePdf(new InvoiceData(employees, customer, DateTime.Now, company, int.Parse(invoice.invoiceNumber)));

        }
    }
}
