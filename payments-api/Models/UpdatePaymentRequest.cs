using System;

namespace PaymentsApi.Models
{
    public class UpdatePaymentRequest
    {
        public decimal Amount { get; set; }
        public string? Currency { get; set; }
    }
}
