using FluentValidation.Results;
using Microsoft.AspNetCore.SignalR;
using Server.Data;
using Server.Models;
using Service.Validator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Service
{
    public interface IDeviceNotificationService
    {
        void AddDevice(Device device);
        void UpdateDevice(Device device);
        void AddDeviceTemperatureReading(DeviceTemperatureReading deviceTemperatureReading);
    }
    public class DeviceNotificationService : IDeviceNotificationService
    {
        private IHubContext<DeviceHub, IDeviceHubService> _hubContext;
        public DeviceNotificationService(IHubContext<DeviceHub, IDeviceHubService> hubContext)
        {
            _hubContext = hubContext;
        }

        public void AddDevice(Device device)
        {
            IHubClients<IDeviceHubService> isAll = _hubContext.Clients;

            _hubContext.Clients.All.AddDevice(device);
        }

        public void UpdateDevice(Device device)
        {
            IHubClients<IDeviceHubService> isAll = _hubContext.Clients;

            _hubContext.Clients.All.UpdateDevice(device);
        }

        public void AddDeviceTemperatureReading(DeviceTemperatureReading deviceTemperatureReading)
        {
            IHubClients<IDeviceHubService> isAll = _hubContext.Clients;

            _hubContext.Clients.All.AddDeviceTemperatureReading(deviceTemperatureReading);
        }
    }
}