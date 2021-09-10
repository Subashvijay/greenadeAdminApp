using GreenadeAdminApi.Models;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GreenadeAdminApi.Services
{
    public interface IProductService
    {
        Task<ProductItem> GetProduct(string id);

        Task<IEnumerable<ProductItem>> GetProducts();

        Task<bool> AddProduct(ProductItem productItem);

        Task<bool> UpdateProduct(ProductItem productItem);

        Task<bool> DeleteProduct(string id);

    }
}