using InvoiceEntities;
using InvoiceMaker.View;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InvoiceMaker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        // GET: api/<InvoiceController>
        [HttpGet]
        public IEnumerable<Invoice> Get()
        {
            return InvoiceView.GetInvoices();
        }

        //// GET api/<InvoiceController>/5
        //[HttpGet("{id}")]
        //public Invoice Get(string id)
        //{
        //    return InvoiceView.GetInvoice(id);
        //}
        
        [HttpGet("{id}")]
        public FileStreamResult Get(string id)
        {
            InvoiceView.CreateInvoice(InvoiceView.GetInvoice(id));
            string path = @"Invoice.pdf";
            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;
            return File(memory, "application/pdf", Path.GetFileName(path));
        }

        // POST api/<InvoiceController>
        [HttpPost]
        public FileStreamResult Post([FromBody] Invoice invoice)
        {
            InvoiceView.CreateInvoice(invoice);
            InvoiceView.SaveInvoice(invoice);
            string path = @"Invoice.pdf";
            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;
            return File(memory, "application/pdf", Path.GetFileName(path));
        }
    }
}
