using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace InvoiceMaker.Model
{
    public class Employee
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("rate")]
        public decimal Rate { get; set; }

        [JsonProperty("hours")]
        public decimal Hours { get; set; }

        [JsonProperty("date")]
        public string Date { get; set; }

    }
}
