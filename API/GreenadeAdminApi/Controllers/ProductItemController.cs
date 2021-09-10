using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GreenadeAdminApi.Models;
using GreenadeAdminApi.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GreenadeAdminApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductItemController : ControllerBase
    {
        private readonly IProductService ProductService;

        public ProductItemController(IProductService productService)
        {
            ProductService = productService;
        }

        // GET: api/<ProductItemController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductItem>>> Get()
        {
            var result = await ProductService.GetProducts();
            if (result == null)
            { 
              return NoContent();
            }
            return Ok(result);
            
        }

        // GET api/<ProductItemController>/5
        [HttpGet("{id}", Name = "GetBook")]
        public async Task<ActionResult<ProductItem>> Get(string id)
        {
            var result = await ProductService.GetProduct(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);

        }

        // POST api/<ProductItemController>
        [HttpPost]
        public async Task<ActionResult<bool>> Post([FromBody] ProductItem value)
        {
            return await ProductService.AddProduct(value);
        }

        // PUT api/<ProductItemController>/5
        [HttpPut]
        public async Task<ActionResult<bool>> Put([FromBody] ProductItem value)
        {
            return await ProductService.UpdateProduct(value);
        }

        // DELETE api/<ProductItemController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(string id)
        {
            return await ProductService.DeleteProduct(id);
        }
    }
}
