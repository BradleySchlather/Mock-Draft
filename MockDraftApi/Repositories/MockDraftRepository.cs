using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Infrastructure;
using MockDraftApi.Configuration;
using MockDraftApi.Models;
using MySql.Data.MySqlClient;
using System.Data;
using System.Drawing.Text;

namespace MockDraftApi.Repositories
{
    public class MockDraftRepository
    {
        private readonly string _conn;
        public MockDraftRepository(IConfiguration configuration) {

            _conn = configuration.GetConnectionString("DefaultConnection");
            
        }
        public IEnumerable<Team> GetTeams()
        {
            //using OdbcConnection connection = new OdbcConnection(this.conn);
            //var procedure = "CALL PROCNAME();"
            //    var result = connection.Query<Team>(procedure, CommandType.StoredProcedure);
            //return result;
            Team[] teams = new Team[3]
                { new Team { Name = "Bears", Image = "../../assets/BearsLogo.gif",
                    PickNumbersNotAdjusted = "0", PickPlayersNotAdjusted = "" },
                new Team { Name = "Cowboys", Image = "../../assets/CowboysLogo.gif",
                    PickNumbersNotAdjusted = "1", PickPlayersNotAdjusted = "" },
                new Team { Name = "Falcons", Image = "../../assets/FalconsLogo.gif",
                    PickNumbersNotAdjusted = "2", PickPlayersNotAdjusted = "" } };
            return teams;
        }

        public async Task<IEnumerable<Player>> GetPlayers()
        {
            var players = new List<Player>();

            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("get_players", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            players.Add(new Player
                            {
                                PlayerId = reader.GetInt32("player_id"),
                                PlayerName = reader.GetString("player_name"),
                                Position = reader.GetString("player_position"),
                                Height = reader.GetString("height"),
                                Weight = reader.GetInt32("weight"),
                                College = reader.GetString("college"),
                                PlayerClass = reader.GetString("player_class")
                            });
                        }
                    }

                }
                return players;
            }
        }

        public IEnumerable<Scoreboard> GetScoreboard()
        {
            Scoreboard[] scoreboard = new Scoreboard[12]
                {
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
            };
            return scoreboard;
        }
    }
}