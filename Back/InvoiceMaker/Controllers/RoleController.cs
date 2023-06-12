using Microsoft.AspNetCore.Mvc;
using ILib = InvoiceMakerLib;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InvoiceMaker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        // GET: api/<RoleController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            List<string> roles = new();
            foreach (ILib.Employee.Positions pos in Enum.GetValues(typeof(ILib.Employee.Positions)))
            {
                roles.Add(pos.ToString());  
            }

            return roles;
        }
    }
}
