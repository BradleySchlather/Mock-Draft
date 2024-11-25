using Microsoft.AspNetCore.Mvc;
using MockDraftApi.Configuration;
using MockDraftApi.Models;
using System.Data;

namespace MockDraftApi.Repositories
{
    public class MockDraftRepository
    {
        //private string conn { get; set; }
        //public MockDraftRepository(MockDraftConfiguration connection) {
        //    this.conn = connection.DbConnectionString; 
        //}
        public IEnumerable<Team> GetTeams()
        {
            //using OdbcConnection connection = new OdbcConnection(this.conn);
            //var procedure = "CALL PROCNAME();"
            //var result = connection.Query<Team>(procedure, CommandType.StoredProcedure);
            //return result;
            return [
                new Team { Name = "Bears", Image = "../../assets/BearsLogo.gif",
                    PickNumbersNotAdjusted = "0", PickPlayersNotAdjusted = "" },
                new Team { Name = "Cowboys", Image = "../../assets/CowboysLogo.gif",
                    PickNumbersNotAdjusted = "1", PickPlayersNotAdjusted = "" },
                new Team { Name = "Falcons", Image = "../../assets/FalconsLogo.gif",
                    PickNumbersNotAdjusted = "2", PickPlayersNotAdjusted = "" },
                ];
        }
        public IEnumerable<Player> GetPlayers()
        {
            return [
                new Player { Rank = 1, PlayerName = "Marvin Harrison Jr.", Position = "WR", HeightWeight = "6-4 / 205", College = "Ohio St", IsStar = true , IsBust = false },
                new Player { Rank = 2, PlayerName = "Caleb Williams", Position = "QB", HeightWeight = "6-1 / 215", College = "USC", IsStar = true, IsBust = false },
                new Player { Rank = 3, PlayerName = "Olumuyiwa Fashanu", Position = "OT", HeightWeight = "6-6 / 316", College = "PSU", IsStar = false, IsBust = false },
                new Player { Rank = 4, PlayerName = "Brock Bowers", Position = "TE", HeightWeight = "6-4 / 240", College = "Georgia", IsStar = true, IsBust = false },
                new Player { Rank = 5, PlayerName = "Joe Alt", Position = "OT", HeightWeight = "6-7 / 322", College = "ND", IsStar = false, IsBust = false },
                new Player { Rank = 6, PlayerName = "Drake Maye", Position = "QB", HeightWeight = "6-4 / 230", College = "UNC", IsStar = false, IsBust = true },
                new Player { Rank = 7, PlayerName = "JC Latham", Position = "OT", HeightWeight = "6-6 / 360", College = "Bama", IsStar = false, IsBust = false },
                new Player { Rank = 8, PlayerName = "Laiatu Latu", Position = "EDGE", HeightWeight = "6-5 / 265", College = "UCLA", IsStar = false, IsBust = false },
                new Player { Rank = 9, PlayerName = "Jared Verse", Position = "EDGE", HeightWeight = "6-4 / 260", College = "FSU", IsStar = false, IsBust = false },
                new Player { Rank = 10, PlayerName = "Dallas Turner", Position = "EDGE", HeightWeight = "6-4 / 252", College = "Bama", IsStar = false, IsBust = false }
            ];
        }

        public IEnumerable<Scoreboard> GetScoreboard()
        {
            return [
                new Scoreboard { Ranking = 1, UserName = "SirIsaacJohnathonMcPanda", Score = 10000000000, CorrectFirstRoundPicks = 32, TotalFirstRoundPredictions = 32, TotalPredicionPercentage = 100, PredictedTrades = 2 },
                new Scoreboard { Ranking = 2, UserName = "JordaaanAlvarezTheSecond", Score = 800000000, CorrectFirstRoundPicks = 12, TotalFirstRoundPredictions = 32, TotalPredicionPercentage = 28, PredictedTrades = 1 },
                new Scoreboard { Ranking = 3, UserName = "BradfordTheClassless", Score = 1, CorrectFirstRoundPicks = 1, TotalFirstRoundPredictions = 32, TotalPredicionPercentage = 3, PredictedTrades = 0 },
                new Scoreboard { Ranking = 1, UserName = "SirIsaacJohnathonMcPanda", Score = 10000000000, CorrectFirstRoundPicks = 32, TotalFirstRoundPredictions = 32, TotalPredicionPercentage = 100, PredictedTrades = 2 },
                new Scoreboard { Ranking = 2, UserName = "JordaaanAlvarezTheSecond", Score = 800000000, CorrectFirstRoundPicks = 12, TotalFirstRoundPredictions = 32, TotalPredicionPercentage = 28, PredictedTrades = 1 },
                new Scoreboard { Ranking = 3, UserName = "BradfordTheClassless", Score = 1, CorrectFirstRoundPicks = 1, TotalFirstRoundPredictions = 32, TotalPredicionPercentage = 3, PredictedTrades = 0 },
                new Scoreboard { Ranking = 1, UserName = "SirIsaacJohnathonMcPanda", Score = 10000000000, CorrectFirstRoundPicks = 32, TotalFirstRoundPredictions = 32, TotalPredicionPercentage = 100, PredictedTrades = 2 },
                new Scoreboard { Ranking = 2, UserName = "JordaaanAlvarezTheSecond", Score = 800000000, CorrectFirstRoundPicks = 12, TotalFirstRoundPredictions = 32, TotalPredicionPercentage = 28, PredictedTrades = 1 },
                new Scoreboard { Ranking = 3, UserName = "BradfordTheClassless", Score = 1, CorrectFirstRoundPicks = 1, TotalFirstRoundPredictions = 32, TotalPredicionPercentage = 3, PredictedTrades = 0 },
                new Scoreboard { Ranking = 1, UserName = "SirIsaacJohnathonMcPanda", Score = 10000000000, CorrectFirstRoundPicks = 32, TotalFirstRoundPredictions = 32, TotalPredicionPercentage = 100, PredictedTrades = 2 },
                new Scoreboard { Ranking = 2, UserName = "JordaaanAlvarezTheSecond", Score = 800000000, CorrectFirstRoundPicks = 12, TotalFirstRoundPredictions = 32, TotalPredicionPercentage = 28, PredictedTrades = 1 },
                new Scoreboard { Ranking = 3, UserName = "BradfordTheClassless", Score = 1, CorrectFirstRoundPicks = 1, TotalFirstRoundPredictions = 32, TotalPredicionPercentage = 3, PredictedTrades = 0 },
            ];
        }
    }
}