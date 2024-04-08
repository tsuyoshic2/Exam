using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactApp2.Server.Data.Models
{
    public class ProductData
    {
           
        public int Id { get; set; }

        [MaxLength(150)]
        public string? ProductName { get; set; }

        public float? UnitPrice { get; set; }
        = 0;

        public int Quantity { get; set; }
        = 0;

        public decimal? TotalAmount { get; set; }
        = 0;
        public int ProductId { get; set; }
    }
}
