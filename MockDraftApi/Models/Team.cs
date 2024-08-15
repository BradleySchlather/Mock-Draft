namespace MockDraftApi.Models
{
    public class Team
    {
        public string Name { get; set; }
        public string Image {  get; set; }
        public string PicksNotAdjusted { get; set; }
        public Pick[] Picks { get; set; }
    }
}
