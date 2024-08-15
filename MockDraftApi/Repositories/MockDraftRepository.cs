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
            //    var result = connection.Query<Team>(procedure, CommandType.StoredProcedure);
            //return result;
            return [
                new Team { Name = "Bears", Image = "../../assets/BearsLogo.gif",
                    PickNumbersNotAdjusted = "1,2,3", PickPlayersNotAdjusted = "" }
                ];
        }
        public IEnumerable<Player> GetPlayers()
        {
            return [
                new Player { Rank = 1, PlayerName = "Marvin Harrison Jr.", Position = "WR", HeightWeight = "6-4 / 205", College = "Ohio St" },
                new Player { Rank = 2, PlayerName = "Caleb Williams", Position = "QB", HeightWeight = "6-1 / 215", College = "USC" },
                new Player { Rank = 3, PlayerName = "Olumuyiwa Fashanu", Position = "OT", HeightWeight = "6-6 / 316", College = "PSU" },
                new Player { Rank = 4, PlayerName = "Brock Bowers", Position = "TE", HeightWeight = "6-4 / 240", College = "Georgia" },
                new Player { Rank = 5, PlayerName = "Joe Alt", Position = "OT", HeightWeight = "6-7 / 322", College = "ND" },
                new Player { Rank = 6, PlayerName = "Drake Maye", Position = "QB", HeightWeight = "6-4 / 230", College = "UNC" },
                new Player { Rank = 7, PlayerName = "JC Latham", Position = "OT", HeightWeight = "6-6 / 360", College = "Bama" },
                new Player { Rank = 8, PlayerName = "Laiatu Latu", Position = "EDGE", HeightWeight = "6-5 / 265", College = "UCLA" },
                new Player { Rank = 9, PlayerName = "Jared Verse", Position = "EDGE", HeightWeight = "6-4 / 260", College = "FSU" },
                new Player { Rank = 10, PlayerName = "Dallas Turner", Position = "EDGE", HeightWeight = "6-4 / 252", College = "Bama" }
            ];
        }
    }
}
