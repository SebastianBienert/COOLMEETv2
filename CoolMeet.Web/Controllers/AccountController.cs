using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoolMeet.BL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoolMeet.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : Controller
    {

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("XD");
        }
    }
}