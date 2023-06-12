using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceMakerLib
{
    public class Company
    {
        public string? Name { get; }
        public string? Address { get; }
        public string? City { get; }
        public string? Province { get; }
        public string? PostalCode { get; }

        public Company(string name, string address, string city, string province, string postalCode)
        {
            Name = name;
            Address = address;
            City = city;
            Province = province;
            PostalCode = postalCode;
        }
    }
}
