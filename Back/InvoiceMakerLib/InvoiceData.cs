using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceMakerLib
{
    public class InvoiceData
    {
        public const decimal GST_RATE = 13.0m;
        public List<Employee> Employees;
        public Customer Customer { get; private set; }
        public DateTime Date { get; private set; }
        public int InvoiceNumber { get; private set; }
        public decimal SubTotal { get; private set; }
        public decimal Total { get; private set; }
        public decimal TaxAmount{ get; private set; }

        public InvoiceData(List<Employee> employees, Customer customer, DateTime date, int invoiceNumber)
        {
            Employees = employees;
            Customer = customer;
            Date = date;
            InvoiceNumber = invoiceNumber;
            CalculateMoney();
        }

        private void CalculateMoney()
        {
            decimal subTotal = 0;
            foreach (Employee employee in Employees)
            {
                subTotal += employee.HoursWorked * employee.HourlyRate;
            }
            SubTotal = subTotal;
            TaxAmount = SubTotal * GST_RATE / 100;
            Total = SubTotal + TaxAmount;
        }
    }
}
