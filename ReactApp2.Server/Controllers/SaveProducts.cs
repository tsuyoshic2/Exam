using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Data;
using ReactApp2.Server.Data.Models;

namespace ReactApp2.Server.Controllers
{
    [ApiController]
    [Route("api/SaveProducts")]
    public class SaveProducts : ControllerBase
    {
        [HttpPost(Name = "SaveCart")]
        public IActionResult Post(IEnumerable<ProductData> productDataList)
        {
            var serviceProvider = new ServiceCollection().AddDbContext<AppDbContext>(options =>
            options.UseSqlServer("Data Source=DESKTOP-7NHNKRK;Database=Examination;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False")
            ).BuildServiceProvider();
            if (productDataList == null || !productDataList.Any())
            {
                return BadRequest("Product data is null.");
            }
            using (var dbContext = serviceProvider.GetService<AppDbContext>())
            {
                foreach (var productData in productDataList)
                {
                    dbContext.ProductDatas.Add(productData);
                }
                dbContext.SaveChanges();
                return Ok("Product added successfully.");
            }
        }
    }
}
