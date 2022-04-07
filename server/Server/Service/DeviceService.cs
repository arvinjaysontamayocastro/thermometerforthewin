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
    public interface IDeviceService
    {
        Device AddDevice(Device device);
        Device UpdateDevice(Device device);
        List<Device> GetAllDevice();
    }
    public class DeviceService : IDeviceService
    {
        public DeviceService()
        {
        }

        public Device AddDevice(Device device)
        {
            AddDeviceValidator validator = new AddDeviceValidator();
            ValidationResult results = validator.Validate(device);

            if (results.IsValid)
            {
                device.DeviceId = Guid.NewGuid().ToString();
                device.TemperatureReadings = new List<TemperatureReading>();
                ApplicationData.devices.Add(device);
                return device;
            }
            else
            {
                return null;
            }
        }

        public Device UpdateDevice(Device device)
        {
            UpdateDeviceValidator validator = new UpdateDeviceValidator();
            ValidationResult results = validator.Validate(device);

            if (results.IsValid)
            {
                Device _device = ApplicationData.devices.Find(d => d.DeviceId == device.DeviceId);
                _device.DeviceCode = device.DeviceCode;
                _device.BoilingPoint = device.BoilingPoint;
                _device.FreezingPoint = device.FreezingPoint;
                return device;
            }
            else
            {
                return null;
            }
        }

        public List<Device> GetAllDevice()
        {
            return ApplicationData.devices;
        }
    }
}