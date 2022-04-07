//using Server.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using MongoDB.Driver;
//using MongoDB.Bson;
//using MongoDB.Driver.Linq;

//namespace Server.Data
//{
//    // internal for this test purposes
//    public class MongoData: IMongoData
//    {
//        public List<Device> devices;
//        private MongoClient client;
//        private string databaseName;
//        public MongoData()
//        {
//            MongoClientSettings settings = MongoClientSettings.FromConnectionString(
//                Environment.GetEnvironmentVariable("ATLAS_URI")
//            );
//            databaseName = Environment.GetEnvironmentVariable("DATABASE_NAME");
//            settings.LinqProvider = LinqProvider.V3;
//            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
//            client = new MongoClient(settings);
//        }

//        public async Task<int> GetAllDevice()
//        {
//            var database = client.GetDatabase(databaseName);

//            var postsCollection = database.GetCollection<Post>("posts");

//            var documents = await postsCollection.Find(_ => true).ToListAsync();

//            return documents.Count;
//        }
//    }
//}


// NOTE: Now using in memory