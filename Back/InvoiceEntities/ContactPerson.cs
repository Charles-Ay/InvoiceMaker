using Newtonsoft.Json;

namespace InvoiceEntities
{
    public class ContactPerson
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        public ContactPerson(string name, string email)
        {
            Name = name;
            Email = email;
        }

        public ContactPerson()
        {
        }
    }
}
