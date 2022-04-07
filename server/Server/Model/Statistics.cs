namespace Server.Models
{
    public class Statistics
    {
        public float Reading { get; set; }
        public float FreezingPoint { get; set; }
        public float BoilingPoint { get; set; }

        public bool IsFreezingReached { get; set; }
        public bool IsBoilingReached { get; set; }

        public bool IsFreezingApproaching { get; set; }
        public bool IsBoilingApproaching { get; set; }

        public bool IsFreezingOnce { get; set; }
        public bool IsBoilingOnce { get; set; }

        public float IsFreezingFluctuation { get; set; }
        public float IsBoilingFluctuation { get; set; }
    }
}