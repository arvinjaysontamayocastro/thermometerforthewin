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
    public interface INotificationService
    {
        void AlertTemperature(string deviceId, Statistics statistics);
    }
    public class NotificationService : INotificationService
    {
        private IHubContext<NotificationHub, INotificationHubService> _hubContext;
        public NotificationService(IHubContext<NotificationHub, INotificationHubService> hubContext)
        {
            _hubContext = hubContext;
        }

        public void AlertTemperature(string deviceId, Statistics statistics)
        {
            if(statistics.IsFreezingReached)
            {
                AlertIsFreezingReached(deviceId);
            }
            if (statistics.IsBoilingReached)
            {
                AlertIsBoilingReached(deviceId);
            }
            if (statistics.IsFreezingApproaching)
            {
                AlertIsFreezingApproaching(deviceId);
            }
            if (statistics.IsBoilingApproaching)
            {
                AlertIsBoilingApproaching(deviceId);
            }
        }

        private void AlertIsFreezingReached(string deviceId)
        {
            TemperatureNotification temperatureNotification = new TemperatureNotification();
            temperatureNotification.DeviceId = deviceId;
            temperatureNotification.Message = "Alert: Freezing point reached"; // NOTE to self: Messages can be saved somewhere else
            IHubClients<INotificationHubService> isAll = _hubContext.Clients;
            var clients = _hubContext.Clients;
            _hubContext.Clients.All.AlertTemperature(temperatureNotification);
        }
        private void AlertIsBoilingReached(string deviceId)
        {
            TemperatureNotification temperatureNotification = new TemperatureNotification();
            temperatureNotification.DeviceId = deviceId;
            temperatureNotification.Message = "Alert: boiling point reached"; // NOTE to self: Messages can be saved somewhere else
            IHubClients<INotificationHubService> isAll = _hubContext.Clients;
            var clients = _hubContext.Clients;
            _hubContext.Clients.All.AlertTemperature(temperatureNotification);
        }
        private void AlertIsFreezingApproaching(string deviceId)
        {
            TemperatureNotification temperatureNotification = new TemperatureNotification();
            temperatureNotification.DeviceId = deviceId;
            temperatureNotification.Message = "Alert: Freezing point is approaching"; // NOTE to self: Messages can be saved somewhere else
            IHubClients<INotificationHubService> isAll = _hubContext.Clients;
            var clients = _hubContext.Clients;
            _hubContext.Clients.All.AlertTemperature(temperatureNotification);
        }
        private void AlertIsBoilingApproaching(string deviceId)
        {
            TemperatureNotification temperatureNotification = new TemperatureNotification();
            temperatureNotification.DeviceId = deviceId;
            temperatureNotification.Message = "Alert: boiling point is approaching"; // NOTE to self: Messages can be saved somewhere else
            IHubClients<INotificationHubService> isAll = _hubContext.Clients;
            var clients = _hubContext.Clients;
            _hubContext.Clients.All.AlertTemperature(temperatureNotification);
        }
    }
}