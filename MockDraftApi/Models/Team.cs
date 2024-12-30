namespace MockDraftApi.Models
{
    public class Team
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? PickNumbersNotAdjusted { get; set; }
        public int[]? PickNumbers =>
            PickNumbersNotAdjusted != "" && PickNumbersNotAdjusted != null ? PickNumbersNotAdjusted?.Split(',').Select(int.Parse).ToArray()
            : null;
        public string? PickPlayersNotAdjusted { get; set; }
        public string[]? PickPlayers =>
            PickPlayersNotAdjusted != "" && PickPlayersNotAdjusted != null ? PickPlayersNotAdjusted?.Split(',').ToArray() : null;
        public string? ActualPickNumbersNotAdjusted { get; set; }
        public int[]? ActualPickNumbers =>
            ActualPickNumbersNotAdjusted != "" && ActualPickNumbersNotAdjusted != null ? ActualPickNumbersNotAdjusted?.Split(',').Select(int.Parse).ToArray()
            : null;
        public string? ActualPickPlayersNotAdjusted { get; set; }
        public int[]? ActualPickPlayers =>
            ActualPickPlayersNotAdjusted != "" && ActualPickPlayersNotAdjusted != null ? ActualPickPlayersNotAdjusted?.Split(',').Select(int.Parse).ToArray() : null;
    }
}