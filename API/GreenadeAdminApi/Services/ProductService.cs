using GreenadeAdminApi.Models;
using GreenadeAdminApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreenadeAdminApi.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepositories ProductRepositories;
       
        public ProductService(IProductRepositories productRepositories)
        {
            ProductRepositories = productRepositories;
        }


        public async Task<bool> AddProduct(ProductItem productItem)
        {
          return  await ProductRepositories.AddProduct(productItem);
        }

        public async Task<bool> DeleteProduct(string id)
        {
            return await ProductRepositories.DeleteProduct(id);
        }

        public async Task<ProductItem> GetProduct(string id)
        {
            return await ProductRepositories.GetProduct(id);
        }

        public async Task<IEnumerable<ProductItem>> GetProducts()
        {
            return await ProductRepositories.GetProducts();
        }

        public async Task<bool> UpdateProduct(ProductItem productItem)
        {
            return await ProductRepositories.UpdateProduct(productItem);
        }
    }
}
