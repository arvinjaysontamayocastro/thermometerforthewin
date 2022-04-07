using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Driver;
using Newtonsoft.Json;
using Server.Models;
using Server.Service;

namespace Server.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly IDeviceService _deviceService;
        private readonly IDeviceNotificationService _deviceNotificationService;

        public DeviceController(IDeviceService deviceService, IDeviceNotificationService deviceNotificationService)
        {
            _deviceService = deviceService;
            _deviceNotificationService = deviceNotificationService;
        }

        [HttpGet]
        public string Get()
        {
            string retMessage = string.Empty;

            try
            {
                // Save Device
                List<Device> devices = _deviceService.GetAllDevice();

                if (devices != null)
                {
                    return JsonConvert.SerializeObject(devices);
                }
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }

            return retMessage;
        }

        [HttpPost]
        public string Post([FromBody] Device device)
        {
            string retMessage = string.Empty;

            try
            {
                Device newDevice = _deviceService.AddDevice(device);
                if (newDevice != null)
                {
                    // NOTE: We can also let device service call deviceNotificationService yet this is our approach for a more linear form
                    _deviceNotificationService.AddDevice(device);
                    return JsonConvert.SerializeObject(newDevice);
                }
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }

            return retMessage;
        }

        [HttpPut]
        public string Put([FromBody] Device device)
        {
            string retMessage = string.Empty;

            try
            {
                Device updateDevice = _deviceService.UpdateDevice(device);
                if (updateDevice != null)
                {
                    _deviceNotificationService.UpdateDevice(updateDevice);
                    return JsonConvert.SerializeObject(updateDevice);
                }
            }
            catch (Exception e)
            {
                retMessage = e.ToString();
            }

            return retMessage;
        }
    }
}