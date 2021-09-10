using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreenadeAdminApi.Configurations
{
    public class MongoDbSettings: IMongoDbSettings
    {
       public string DbName { get; set; }
       public string ProductCollectionName { get; set; }
       public string ConnectionString { get; set; }
    }

    public interface IMongoDbSettings
    {
        string DbName { get; set; }
        string ProductCollectionName { get; set; }
        string ConnectionString { get; set; }

    }
}
