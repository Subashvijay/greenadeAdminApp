using GreenadeAdminApi.Configurations;
using GreenadeAdminApi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreenadeAdminApi.Repositories
{
    public class MongoDbProductRepositories : IProductRepositories
    {
        private readonly IMongoCollection<ProductItem> ProductItemCollection;
        private readonly FilterDefinitionBuilder<ProductItem> filterBuilder = Builders<ProductItem>.Filter;
        public MongoDbProductRepositories(IMongoDbSettings mongoDbSettings)
        {
            var mongoClient = new MongoClient(mongoDbSettings.ConnectionString);
            IMongoDatabase database = mongoClient.GetDatabase(mongoDbSettings.DbName);
            ProductItemCollection = database.GetCollection<ProductItem>(mongoDbSettings.ProductCollectionName);
        }
        public async Task<bool> AddProduct(ProductItem productItem)
        {
           await ProductItemCollection.InsertOneAsync(productItem);
           return true;
        }

        public async Task<bool> DeleteProduct(string id)
        {
            await ProductItemCollection.DeleteOneAsync<ProductItem>(pro => pro.Id == id);
            return true;
        }

        public async Task<ProductItem> GetProduct(string id)
        {
          return await ProductItemCollection.Find<ProductItem>(product => product.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<ProductItem>> GetProducts()
        {
            return await ProductItemCollection.Find(x => true).ToListAsync<ProductItem>();
        }

        public async Task<bool> UpdateProduct(ProductItem productItem)
        {
            await ProductItemCollection.ReplaceOneAsync<ProductItem>(pro => pro.Id == productItem.Id, productItem);
            return true;
        }
    }
}
