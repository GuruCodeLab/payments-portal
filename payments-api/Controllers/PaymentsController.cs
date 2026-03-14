using System;
using Microsoft.AspNetCore.Mvc;
using PaymentsApi.Services;
using PaymentsApi.Models;

namespace PaymentsApi.Controllers
{   
    [ApiController]
    [Route("api/payments")]
    public class PaymentsController : ControllerBase
    {
        private readonly PaymentService _service;

        public PaymentsController(PaymentService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_service.GetAll());
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreatePaymentRequest req)
        {
            var result=_service.Create(req.Amount, req.Currency, req.ClientRequestId);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id,[FromBody] UpdatePaymentRequest req)
        {
            var result=_service.Update(id, req.Amount, req.Currency);
            if(result==null) return NotFound();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var result=_service.Delete(id);
            if(!result) return NotFound();

            return Ok();
        }
    }
}
