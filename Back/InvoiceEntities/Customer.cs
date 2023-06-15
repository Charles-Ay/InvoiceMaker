using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace InvoiceEntities
{
    public class Customer
    {
        [JsonProperty("_id")]
        [BsonId]
        public string _id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("province")]
        public string Province { get; set; }

        [JsonProperty("postalCode")]
        public string PostalCode { get; set; }

        [JsonProperty("contact")]
        public ContactPerson Contact { get; set; }

        public Customer(string id, string name, string address, string city, string province, string postalCode, ContactPerson contact)
        {
            _id = id;
            Name = name;
            Address = address;
            City = city;
            Province = province;
            PostalCode = postalCode;
            Contact = contact;
        }

        public Customer()
        {
            
        }
    }
}
