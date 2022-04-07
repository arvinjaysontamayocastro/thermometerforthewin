using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Server.Models
{
    [BsonIgnoreExtraElements]
    public class Device
    {
        public string Id { get; set; }
        public string DeviceId { get; set; }
        public string DeviceCode { get; set; }
        public float FreezingPoint { get; set; }
        public float BoilingPoint { get; set; }
        public List<TemperatureReading> TemperatureReadings { get; set; }
    }
}