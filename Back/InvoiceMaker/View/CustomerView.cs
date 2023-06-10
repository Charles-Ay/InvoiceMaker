using InvoiceMaker.Model;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace InvoiceMaker.View
{
    public static class CustomerView
    {
        public static List<Customer> GetCustomers()
        {
            var cu = Program.client.GetDatabase("InvoiceMaker").GetCollection<Customer>("Customers").Find(_ => true).ToList();
            return cu;
        }

        public static void AddCustomer(Customer customer)
        {
            customer._id = MongoDB.Bson.ObjectId.GenerateNewId().ToString();
            Program.client.GetDatabase("InvoiceMaker").GetCollection<Customer>("Customers").InsertOne(customer);
        }

        public static void DeleteCustomer(string id)
        {
            Program.client.GetDatabase("InvoiceMaker").GetCollection<Customer>("Customers").DeleteOne(c => c._id == id);
        }
    }
}
