﻿using Newtonsoft.Json;

namespace InvoiceMaker.Model
{
    public class Invoice
    {
        [JsonProperty("invoiceNumber")]
        public string invoiceNumber { get; set; }
        [JsonProperty("invoiceDate")]
        public string invoiceDate { get; set; }
        [JsonProperty("customer")]
        public Customer customer { get; set; }
        [JsonProperty("company")]
        public Company company { get; set; }
        [JsonProperty("employees")]
        public Employee[] employees { get; set; }
    }
}
