using InvoiceEntities;
using InvoiceMakerLib;
using MongoDB.Driver;

namespace InvoiceMaker.View
{
    public class InvoiceView
    {
        public static void CreateInvoice(Invoice invoice)
        {
            int indexOfT = invoice.InvoiceDate.IndexOf("T");
            if (indexOfT >0)
            {
                invoice.InvoiceDate = invoice.InvoiceDate.Substring(0, indexOfT);
            }

            List<Employee> employees = new List<Employee>();
            foreach(var emp in invoice.Employees)
            {
                if (indexOfT > 0)
                    emp.Date = emp.Date.Substring(0, indexOfT);
                DateTime date = DateTime.Parse(emp.Date);
                employees.Add(new Employee(emp.Name, Employee.StringToPosition(emp.Role), date, emp.Rate, emp.Hours));
            }
            Company company = new (invoice.Company.Name, invoice.Company.Address, invoice.Company.City, invoice.Company.Province, invoice.Company.PostalCode);

            PDFMaker pdf = new();

            ContactPerson contact = new(invoice.Customer.Contact.Name, invoice.Customer.Contact.Email);
            Customer customer = new Customer("", invoice.Customer.Name, invoice.Customer.Address, invoice.Customer.City, invoice.Customer.Province, invoice.Customer.PostalCode,contact);
            pdf.CreatePdf(new Invoice("" ,employees, customer, DateTime.Now, company, invoice.InvoiceNumber));
        }

        public static void SaveInvoice(Invoice invoice)
        {
            invoice._id = invoice.Company.Name + "_" + MongoDB.Bson.ObjectId.GenerateNewId().ToString();
            Program.client.GetDatabase("InvoiceMaker").GetCollection<Invoice>("Invoices").InsertOne(invoice);
        }

        public static List<Invoice> GetInvoices()
        {
            return Program.client.GetDatabase("InvoiceMaker").GetCollection<Invoice>("Invoices").Find(_ => true).ToList();
        }

        public static Invoice GetInvoice(string id)
        {
            var collection = Program.client.GetDatabase("InvoiceMaker").GetCollection<Invoice>("Invoices");
            var filter = Builders<Invoice>.Filter.Eq("_id", id);
            return collection.Find(filter).FirstOrDefault();
        }
    }
}
