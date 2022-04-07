using System;

namespace Server.Models
{
    public class DeviceTemperatureReading
    {
        public string DeviceId { get; set; }
        public float Temperature { get; set; }
        public DateTime ReadingDate { get; set; }
    }
}