using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Data;
using ReactApp2.Server.Data.Models;

namespace ReactApp2.Server.Controllers
{
    [ApiController]
    [Route("api/getAllProducts")]
    public class ProductsController : ControllerBase
    {
        [HttpGet(Name = "GetAllTest")]
        public IEnumerable<GetAllTest> Get()
        {
            var serviceProvider = new ServiceCollection().AddDbContext<AppDbContext>(options =>
            options.UseSqlServer("Data Source=DESKTOP-7NHNKRK;Database=Examination;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False")
            ).BuildServiceProvider();
            using (var dbContext = serviceProvider.GetService<AppDbContext>())
            {
                var products = dbContext.ProductDatas.ToList();
                Console.WriteLine(products);
                return products.Select(x => new GetAllTest
                {
                    ProductName = x.ProductName ?? "",
                    UnitPrice = x.UnitPrice.HasValue ? (float)x.UnitPrice : 0f,
                    Quantity = x.Quantity,
                    TotalAmount = x.TotalAmount ?? 0m,
                    ProductId = x.ProductId
                }).ToArray();

            }
        }
    }
}
