namespace MockDraftApi.Models
{
    public class Scoreboard
    {
        public int Ranking { get; set; }
        public string? UserName { get; set; }
        public long Score {  get; set; }
        public int CorrectFirstRoundPicks { get; set; }
        public int TotalFirstRoundPredictions { get; set; }
        public double TotalPredicionPercentage { get; set; }
        public int PredictedTrades { get; set; }
    }
}
