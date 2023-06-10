using Newtonsoft.Json;

namespace InvoiceMaker.Model
{
    public class ContactPerson
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }
    }
}
