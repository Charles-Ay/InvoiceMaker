using MongoDB.Bson.Serialization.Attributes; 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace InvoiceEntities
{
    public class Invoice
    {
        [JsonProperty("_id")]
        [BsonId]
        public string _id { get; set; }
        [JsonProperty("invoiceNumber")]
        [BsonElement("invoiceNumber")]
        public string InvoiceNumber { get; set; }
        [JsonProperty("invoiceDate")]
        [BsonElement("invoiceDate")]
        public string InvoiceDate { get; set; }
        [BsonElement("customer")]
        [JsonProperty("customer")]
        public Customer Customer { get; set; }
        [BsonElement("company")]
        [JsonProperty("company")]
        public Company Company { get; set; }
        [BsonElement("employees")]
        [JsonProperty("employees")]
        public Employee[] Employees { get; set; }

        [JsonIgnore]
        public decimal SubTotal { get; private set; }
        [JsonIgnore]
        public decimal Total { get; private set; }
        [JsonIgnore]
        public decimal TaxAmount { get; private set; }

        [JsonIgnore]
        public const decimal GST_RATE = 13.0m;

        public Invoice(string id, List<Employee> employees, Customer customer, DateTime date, Company company, string invoiceNumber)
        {
            _id = id;
            Employees = employees.ToArray();
            Customer = customer;
            InvoiceDate = date.ToString("yyyy-MM-dd");
            Company = company;
            InvoiceNumber = invoiceNumber;
            CalculateMoney();
        }

        public void CalculateMoney()
        {
            decimal subTotal = 0;
            foreach (Employee employee in Employees)
            {
                subTotal += employee.Hours * employee.Rate;
            }
            SubTotal = subTotal;
            TaxAmount = SubTotal * GST_RATE / 100;
            Total = SubTotal + TaxAmount;
        }
    }
}
