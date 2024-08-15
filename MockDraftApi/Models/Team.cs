namespace MockDraftApi.Models
{
    public class Team
    {
        public string Name { get; set; }
        public string Image {  get; set; }
        public string PickNumbersNotAdjusted { get; set; }
        //Will use listagg in the stored proc to pull this
        public int[]? PickNumbers =>
            PickNumbersNotAdjusted != "" ? PickNumbersNotAdjusted.Split(',').Select(int.Parse).ToArray()
            : null;
        //Will use listagg in the stored proc to pull this
        public string PickPlayersNotAdjusted { get; set; }
        public string[]? PickPlayers =>
            PickPlayersNotAdjusted != "" ? PickPlayersNotAdjusted.Split(',').ToArray() : null;
    }
}