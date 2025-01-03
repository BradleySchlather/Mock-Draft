namespace MockDraftApi.Models
{
    public class Scoreboard
    {
        public string? Username { get; set; }
        public long? Score {  get; set; }
        public int? CorrectPicks { get; set; }
        public int? CorrectOffenseDefense { get; set; }
        public int CorrectPosition {  get; set; }
        public int? TotalFirstRoundPredictions { get; set; }
        public double? TotalPredictionPercentage { get; set; }
        public int? PredictedTrades { get; set; }
    }
}
