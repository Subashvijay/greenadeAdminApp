using GreenadeAdminApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GreenadeAdminApi.Repositories
{
    public interface IProductRepositories
    {
        Task<ProductItem> GetProduct(string id);

        Task<IEnumerable<ProductItem>> GetProducts();

        Task<bool> AddProduct(ProductItem productItem);

        Task<bool> UpdateProduct(ProductItem productItem);

        Task<bool> DeleteProduct(string id);
    }
}