using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Server.Data
{
    // internal for this test purposes
    public static class ApplicationData
    {
        public static List<Device> devices;
        static ApplicationData()
        {
            devices = new List<Device>(); // For now, make it in memory, singleton
        }
    }
}
