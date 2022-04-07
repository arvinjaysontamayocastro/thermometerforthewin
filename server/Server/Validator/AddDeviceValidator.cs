using FluentValidation;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Validator
{
    public class AddDeviceValidator : AbstractValidator<Device>
    {
        //UserRepository _userRepository;
        public AddDeviceValidator()
        {
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
