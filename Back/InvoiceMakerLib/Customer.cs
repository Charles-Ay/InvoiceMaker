using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceMakerLib
{
    public class Customer
    {
        public string? Name { get; }
        public string? Address { get;}
        public string? City { get;}
        public string? Province { get;}
        public string? PostalCode { get;}
        public string? ContactName { get; }
        public string? ContactEmail { get;}

        public Customer(string name, string address, string city, string province, string postalCode, string contactName, string contactEmail)
        {
            Name = name;
            Address = address;
            City = city;
            Province = province;
            PostalCode = postalCode;
            ContactName = contactName;
            ContactEmail = contactEmail;
        }
    }
}
