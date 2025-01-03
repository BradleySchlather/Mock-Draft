namespace MockDraftApi.Models
{
    public class PlayerNotes
    {
        public int? UserId { get; set; }
        public int? PlayerId { get; set; }
        public string? Note { get; set; }
        public bool? IsStar { get; set; }
        public bool? IsBust { get; set; }
    }
}
