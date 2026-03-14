using System;
using System.Collections.Generic;
namespace PaymentsApi.Models
{
    public class Payment
    {
        public Guid Id { get; set; }
        public string? Reference { get; set; }
        public decimal Amount { get; set; }
        public string? Currency { get; set; }
        public Guid ClientRequestId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
