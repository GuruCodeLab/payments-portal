
using System;
using System.Collections.Generic;
using System.Linq;
using PaymentsApi.Data;
using PaymentsApi.Models;

namespace PaymentsApi.Services
{
    public class PaymentService
    {
        private readonly AppDbContext _context;

        public PaymentService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Payment> GetAll()
        {
            return _context.Payments.ToList();
        }

        public Payment Create(decimal amount,string currency,Guid clientRequestId)
        {
            var existing=_context.Payments.FirstOrDefault(x=>x.ClientRequestId==clientRequestId);
            if(existing!=null) return existing;

            var count=_context.Payments.Count()+1;
            var date=DateTime.UtcNow.ToString("yyyyMMdd");
            var reference=$"PAY-{date}-{count.ToString("D4")}";

            var payment=new Payment{
                Id=Guid.NewGuid(),
                Amount=amount,
                Currency=currency,
                ClientRequestId=clientRequestId,
                CreatedAt=DateTime.UtcNow,
                Reference=reference
            };

            _context.Payments.Add(payment);
            _context.SaveChanges();

            return payment;
        }

        public Payment? Update(Guid id,decimal amount,string currency)
        {
            var p=_context.Payments.FirstOrDefault(x=>x.Id==id);
            if(p==null) return null;

            p.Amount=amount;
            p.Currency=currency;

            _context.SaveChanges();
            return p;
        }

        public bool Delete(Guid id)
        {
            var p=_context.Payments.FirstOrDefault(x=>x.Id==id);
            if(p==null) return false;

            _context.Payments.Remove(p);
            _context.SaveChanges();
            return true;
        }
    }
}
