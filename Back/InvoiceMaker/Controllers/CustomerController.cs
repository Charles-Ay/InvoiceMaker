﻿using InvoiceEntities;
using InvoiceMaker.View;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InvoiceMaker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        // GET: api/<CustomerController>
        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            return CustomerView.GetCustomers();
        }

        [HttpGet]
        [Route("GetCustomer")]
        public Customer GetCustomer(string id)
        {
            var c = CustomerView.GetCustomers().Find(c => c._id == id);
            if(c!= null)
            {
                return c;
            }
            else
            {
                return new Customer() { Name = "Not Found" };
            }
        }

        // POST api/<CustomerController>
        [HttpPost]
        public void Post([FromBody] Customer value)
        {
            CustomerView.AddCustomer(value);
        }

        // DELETE api/<CustomerController>/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            CustomerView.DeleteCustomer(id);
        }
    }
}
