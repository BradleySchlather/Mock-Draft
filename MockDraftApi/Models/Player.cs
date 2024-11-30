namespace MockDraftApi.Models
{
    public class Player
    {
        public int PlayerId { get; set; }
        public int PlayerRank {  get; set; }
        public string? PlayerName { get; set; }
        public string? Position { get; set; }
        public string? Height { get; set; }
        public int Weight { get; set; }
        public string? College { get; set; }
        public bool IsStar { get; set; }
        public bool IsBust { get; set; }
        public string? PlayerClass { get; set; }
    }
}
