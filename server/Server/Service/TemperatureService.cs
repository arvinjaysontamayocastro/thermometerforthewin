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
    public interface ITemperatureService
    {
        TemperatureReading AddTemperature(DeviceTemperatureReading deviceTemperatureReading);
        Statistics GetStatistics(string deviceId);
    }
    public class TemperatureService : ITemperatureService
    {
        public TemperatureService()
        {
        }

        public TemperatureReading AddTemperature(DeviceTemperatureReading deviceTemperatureReading)
        {
            AddDeviceTemperatureReadingValidator validator = new AddDeviceTemperatureReadingValidator();
            ValidationResult results = validator.Validate(deviceTemperatureReading);

            if (results.IsValid)
            {
                Device _device = ApplicationData.devices.Find(d => d.DeviceId == deviceTemperatureReading.DeviceId);
                TemperatureReading temperatureReading = new TemperatureReading();
                temperatureReading.Temperature = deviceTemperatureReading.Temperature;
                temperatureReading.ReadingDate = DateTime.Now;

                if (_device != null)
                {
                    _device.TemperatureReadings.Add(temperatureReading);
                }
                // Save, yet since in memory, auto
                return temperatureReading;
            }
            else
            {
                return null;
            }
        }

        public Statistics GetStatistics(string deviceId)
        {
            Statistics statistics = new Statistics();
            Device _device = ApplicationData.devices.Find(d => d.DeviceId == deviceId);
            statistics.Reading = _device.TemperatureReadings.Last().Temperature;
            statistics.FreezingPoint = _device.FreezingPoint;
            statistics.BoilingPoint = _device.BoilingPoint;

            statistics.IsFreezingReached = statistics.Reading <= statistics.FreezingPoint;
            statistics.IsBoilingReached = statistics.Reading >= statistics.BoilingPoint;

            // NOTE TO SELF or THE READER: the order here is important, if you have other implementations with this one, go back to it later
            statistics.IsFreezingApproaching = IsFreezingApproaching(_device);
            statistics.IsBoilingApproaching = IsBoilingApproaching(_device);

            // NOTE TO SELF (fluctuation logic and report only once logic is not fully implemented)
            // Amongst the ways of doing it is
            // Setting a max amount of notif per user, per device per given time since previous reading
            //      Like if reading was 10 seconds ago, even if they are 10 readings, only take 1
            // Also 
            statistics.IsFreezingFluctuation = 0;
            statistics.IsBoilingFluctuation = 0;

            statistics.IsFreezingOnce = false;
            statistics.IsBoilingOnce = false;

            return statistics;
        }

        private bool IsFreezingApproaching(Device _device)
        {
            Statistics statistics = new Statistics();
            statistics.Reading = _device.TemperatureReadings.Last().Temperature;
            statistics.FreezingPoint = _device.FreezingPoint;
            statistics.BoilingPoint = _device.BoilingPoint;
            statistics.IsFreezingReached = statistics.Reading <= statistics.FreezingPoint;
            statistics.IsBoilingReached = statistics.Reading >= statistics.BoilingPoint;

            bool isFreezingApproaching =
                // first, readings should atleast be 2
                _device.TemperatureReadings.Count > 2
                // second, should not be freezing or boiling
                && !(statistics.IsFreezingReached || statistics.IsBoilingReached)
                // third, direction should be towards freezing
                && (_device.TemperatureReadings.ToList()[_device.TemperatureReadings.Count - 1].Temperature < _device.TemperatureReadings.ToList()[_device.TemperatureReadings.Count - 2].Temperature)
                // fourth, temperature should be 1 degree near
                // NOTE: improve to use user settings
                && (statistics.Reading <= statistics.FreezingPoint + 1);

            return isFreezingApproaching;
        }
        private bool IsBoilingApproaching(Device _device)
        {
            Statistics statistics = new Statistics();
            statistics.Reading = _device.TemperatureReadings.Last().Temperature;
            statistics.FreezingPoint = _device.FreezingPoint;
            statistics.BoilingPoint = _device.BoilingPoint;
            statistics.IsFreezingReached = statistics.Reading <= statistics.FreezingPoint;
            statistics.IsBoilingReached = statistics.Reading >= statistics.BoilingPoint;

            bool isBoilingApproaching =
                // first, readings should atleast be 2
                _device.TemperatureReadings.Count > 2
                // second, should not be freezing or boiling
                && !(statistics.IsFreezingReached || statistics.IsBoilingReached)
                // third, direction should be towards freezing
                && (_device.TemperatureReadings.ToList()[_device.TemperatureReadings.Count - 1].Temperature > _device.TemperatureReadings.ToList()[_device.TemperatureReadings.Count - 2].Temperature)
                // fourth, temperature should be 1 degree near
                // NOTE: improve to use user settings
                && (statistics.Reading >= statistics.BoilingPoint - 1);

            return isBoilingApproaching;
        }
    }
}