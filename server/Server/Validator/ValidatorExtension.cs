using FluentValidation.Results;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Validator
{
    public static class ValidatorExtension
    {
        public static string GetErrors(ValidationResult results)
        {
            IList<ValidationFailure> validationErrors = results.Errors;
            return JsonConvert.SerializeObject(validationErrors
                    .Select(e => new { e.ErrorMessage })); //e.PropertyName, 
        }
        public static string GetErrorsJson(ValidationResult results)
        {
            IList<ValidationFailure> validationErrors = results.Errors;
            string errors = JsonConvert.SerializeObject(validationErrors
                    .Select(e => new { e.ErrorMessage })); //e.PropertyName, 
            return "{ \"success\": false, \"errors\": " + errors + " }";
        }
    }
}
