namespace MockDraftApi.Models
{
    public class UserSelections
    {
        public string? TeamsDraftOrderNotAdjusted { get; set; }
        public int[]? TeamsDraftOrder => TeamsDraftOrderNotAdjusted != "" && TeamsDraftOrderNotAdjusted != null ?
            TeamsDraftOrderNotAdjusted.Split(',').Select(int.Parse).ToArray() : null;
        public string? PlayersListOrderNotAdjusted { get; set; }
        public int[]? PlayersListOrder => PlayersListOrderNotAdjusted != "" && PlayersListOrderNotAdjusted != null ?
            PlayersListOrderNotAdjusted.Split(',').Select(int.Parse).ToArray() : null;
        public string? PlayerDraftOrderNotAdjusted { get; set; }
        public int[]? PlayerDraftOrder => PlayerDraftOrderNotAdjusted != "" && PlayerDraftOrderNotAdjusted != null ?
            PlayerDraftOrderNotAdjusted.Split(',').Select(int.Parse).ToArray() : null;
    }
}
