using FluentValidation;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Validator
{
    public class AddDeviceTemperatureReadingValidator : AbstractValidator<DeviceTemperatureReading>
    {
        public AddDeviceTemperatureReadingValidator()
        {
            RuleFor(device => device.DeviceId)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .WithMessage("Please include device id")
                .NotEmpty()
                .WithMessage("Please add device id");

            RuleFor(device => device.Temperature)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .WithMessage("Please add temperature");
        }
    }
}
