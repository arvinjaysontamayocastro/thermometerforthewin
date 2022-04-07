namespace Server.Models
{
    public class NotificationSettings
    {
        public bool IsReportWhenFreezingReached { get; set; }
        public bool IsReportWhenBoilingReached { get; set; }

        public bool IsReportWhenFreezingApproaching { get; set; }
        public bool IsReportWhenBoilingApproaching { get; set; }

        public bool IsReportWhenFreezingOnce { get; set; }
        public bool IsReportWhenBoilingOnce { get; set; }

        public float IsReportWhenFreezingFluctuation { get; set; }
        public float IsReportWhenBoilingFluctuation { get; set; }
    }
}