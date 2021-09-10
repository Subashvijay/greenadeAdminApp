using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GreenadeAdminApi.Models
{
    public class ProductItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        public int PricePerQuantity { get; set; }
        public string QuantityType { get; set; }
        public int DiscountInPercent { get; set; }
        public int FinalPricePerQty { get; set; }
        public string Category { get; set; }
        [Required]
        public string ImgUrl { get; set; }
        [Required]
        public int MinimumQuantity { get; set; }
    }
}
