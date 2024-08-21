namespace MockDraftApi.Models
{
    public class Player
    {
        public int Rank { get; set; }
        public string? PlayerName { get; set; }
        public string? Position { get; set; }
        public string? HeightWeight { get; set; }
        public string? College { get; set; }
        public bool IsStar { get; set; }
        public bool IsBust { get; set; }
    }
}
