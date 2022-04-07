using Microsoft.AspNetCore.SignalR;
using Server.Models;
using System.Threading.Tasks;

namespace Server.Service
{
    public interface INotificationHubService
    {
        Task AlertTemperature(TemperatureNotification temperatureNotification);
    }

    public class NotificationHub : Hub<INotificationHubService>
    {
        public override Task OnConnectedAsync()
        {
            // NOTE: Settings Based, Note that another implementation is to save token only and get these settings on the database instead
            var isReportWhenFreezingReached = Context.GetHttpContext().Request.Query["isReportWhenFreezingReached"];
            var isReportWhenBoilingReached = Context.GetHttpContext().Request.Query["isReportWhenBoilingReached"];
            var isReportWhenFreezingApproaching = Context.GetHttpContext().Request.Query["isReportWhenFreezingApproaching"];
            var isReportWhenBoilingApproaching = Context.GetHttpContext().Request.Query["isReportWhenBoilingApproaching"];
            var isReportWhenFreezingOnce = Context.GetHttpContext().Request.Query["isReportWhenFreezingOnce"];
            var isReportWhenBoilingOnce = Context.GetHttpContext().Request.Query["isReportWhenBoilingOnce"];
            var isReportWhenFreezingFluctuation = Context.GetHttpContext().Request.Query["isReportWhenFreezingFluctuation"];
            var isReportWhenBoilingFluctuation = Context.GetHttpContext().Request.Query["isReportWhenBoilingFluctuation"];

            Context.Items.Add("isReportWhenFreezingReached", isReportWhenFreezingReached);
            Context.Items.Add("isReportWhenBoilingReached", isReportWhenBoilingReached);
            Context.Items.Add("isReportWhenFreezingApproaching", isReportWhenFreezingApproaching);
            Context.Items.Add("isReportWhenBoilingApproaching", isReportWhenBoilingApproaching);
            Context.Items.Add("isReportWhenFreezingOnce", isReportWhenFreezingOnce);
            Context.Items.Add("isReportWhenBoilingOnce", isReportWhenBoilingOnce);
            Context.Items.Add("isReportWhenFreezingFluctuation", isReportWhenFreezingFluctuation);
            Context.Items.Add("isReportWhenBoilingFluctuation", isReportWhenBoilingFluctuation);

            return base.OnConnectedAsync();
        }
    }
}