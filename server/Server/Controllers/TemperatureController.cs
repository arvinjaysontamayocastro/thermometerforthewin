using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Server.Models;
using Server.Service;

namespace Server.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TemperatureController : ControllerBase
    {
        private readonly ITemperatureService _temperatureService;

        private readonly IDeviceNotificationService _deviceNotificationService;
        private readonly INotificationService _notificationService;


        public TemperatureController(ITemperatureService temperatureService, IDeviceNotificationService deviceNotificationService,
            INotificationService notificationService)
        {
            _temperatureService = temperatureService;
            _deviceNotificationService = deviceNotificationService;
            _notificationService = notificationService;
        }

        [HttpPost]
        public string Post([FromBody] DeviceTemperatureReading deviceTemperatureReading)
        {
            string retMessage = string.Empty;

            try
            {
                // Save Temperature
                TemperatureReading temperatureReading = _temperatureService.AddTemperature(deviceTemperatureReading);

                // Push notification on all listeners
                deviceTemperatureReading.ReadingDate = temperatureReading.ReadingDate;
                _deviceNotificationService.AddDeviceTemperatureReading(deviceTemperatureReading);

                // Create Statistics for user-device based settings push notification
                // An improved version of this is to send the settings from user specific notification as well
                Statistics deviceStatistics = _temperatureService.GetStatistics(deviceTemperatureReading.DeviceId);

                _notificationService.AlertTemperature(deviceTemperatureReading.DeviceId, deviceStatistics);
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }

            return retMessage;
        }
    }
}