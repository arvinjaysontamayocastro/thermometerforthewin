using Microsoft.AspNetCore.SignalR;
using Server.Models;
using System.Threading.Tasks;

namespace Server.Service
{
    public interface IDeviceHubService
    {
        Task AddDevice(Device device);
        Task UpdateDevice(Device device);
        Task AddDeviceTemperatureReading(DeviceTemperatureReading deviceTemperatureReading);
    }

    public class DeviceHub : Hub<IDeviceHubService>
    {

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
    }
}