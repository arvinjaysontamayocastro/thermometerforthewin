using FluentValidation;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Validator
{
    public class UpdateDeviceValidator : AbstractValidator<Device>
    {
        public UpdateDeviceValidator()
        {
            RuleFor(device => device.DeviceId)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .WithMessage("Please include device id")
                .NotEmpty()
                .WithMessage("Please add device id");

            RuleFor(device => device.DeviceCode)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .WithMessage("Please add device code")
                .NotEmpty()
                .WithMessage("Please add device code")
                .Length(0, 100)
                .WithMessage("Maximum length for device code is 100 characters");

            RuleFor(device => device.BoilingPoint)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .WithMessage("Please add boiling point");

            RuleFor(device => device.FreezingPoint)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .WithMessage("Please add freezing point");
        }
    }
}
