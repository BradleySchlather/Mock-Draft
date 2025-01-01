using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Infrastructure;
using MockDraftApi.Configuration;
using MockDraftApi.Models;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Bcpg;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Drawing.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace MockDraftApi.Repositories
{
    public class MockDraftRepository
    {
        private readonly string _conn;
        public MockDraftRepository(IConfiguration configuration) {

            _conn = configuration.GetConnectionString("DefaultConnection");
            
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
                                PlayerRank = reader.GetInt32("player_rank"),
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

        public async void CreateUser(User user)
        {
            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("create_user", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("password_input", user.Password);
                    command.Parameters.AddWithValue("username_input", user.Username);
                    command.Parameters.AddWithValue("email_input", user.Email);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task<User> GetUser(User signInData)
        {
            var user = new User();
            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("get_user", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("username_input", signInData.Username);
                    command.Parameters.AddWithValue("password_input", signInData.Password);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            user = new User
                            {
                                UserId = reader.GetInt32("user_id"),
                                Username = reader.GetString("username"),
                                Email = reader.GetString("email")
                            };
                        }
                    }
                }
                return user;
            }
        }

        //To do: need to get the default team data from the database and tie that data to the users selections in a service
        public async Task<IEnumerable<Team>> GetDefaultTeamData()
        {
            var teams = new List<Team>();

            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("get_teams", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            teams.Add(new Team
                            {
                                Id = reader.GetInt32("team_id"),
                                Name = reader.GetString("team_name"),
                                ActualPickNumbersNotAdjusted = reader.GetString("draft_position"),
                                ActualPickPlayersNotAdjusted = reader.GetString("draft_pick")
                            });
                        }
                    }

                }
                return teams;
            }
        }

        public async Task<IEnumerable<UserSelections>> GetUserSelections(int userId)
        {
            var userSelections = new List<UserSelections>();

            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("get_user_selections", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("in_user_id", userId);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            userSelections.Add(new UserSelections
                            {
                                TeamsDraftOrderNotAdjusted = reader.GetString("teams_draft_order"),
                                PlayersListOrderNotAdjusted = reader.GetString("players_list_order"),
                                PlayerDraftOrderNotAdjusted = reader.GetString("player_draft_order")
                            });
                        }
                    }
                }
                return userSelections;
            }
        }

        public async Task<IEnumerable<Team>> GetDefaultPlayerData()
        {
            var teams = new List<Team>();

            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("get_teams", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            teams.Add(new Team
                            {
                                Id = reader.GetInt32("team_id"),
                                Name = reader.GetString("team_name"),
                                ActualPickNumbersNotAdjusted = reader.GetString("draft_position"),
                                ActualPickPlayersNotAdjusted = reader.GetString("draft_pick")
                            });
                        }
                    }
                }
                return teams;
            }
        }


        public async Task<IEnumerable<PlayerNotes>> GetPlayerNotes(int userId)
        {
            var playerNotes = new List<PlayerNotes>();

            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("get_player_notes", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("in_user_id", userId);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            playerNotes.Add(new PlayerNotes
                            {
                                PlayerId = reader.GetInt32("player_id"),
                                Note = reader.GetString("player_note"),
                                IsStar = reader.GetBoolean("is_star"),
                                IsBust = reader.GetBoolean("is_bust")

                            });
                        }
                    }
                }
                return playerNotes;
            }
        }

        public async void SetUsersPlayersDraftOrder(SetUsersPlayersOrTeams data)
        {
            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("set_users_players_draft_order", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("in_players", data.PlayersOrTeams);
                    command.Parameters.AddWithValue("in_user_id", data.UserId);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async void SetUsersPlayersList(SetUsersPlayersOrTeams data)
        {
            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("set_users_players_list", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("in_players", data.PlayersOrTeams);
                    command.Parameters.AddWithValue("in_user_id", data.UserId);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async void SetUsersTeams(SetUsersPlayersOrTeams data)
        {
            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("set_users_teams", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("in_teams", data.PlayersOrTeams);
                    command.Parameters.AddWithValue("in_user_id", data.UserId);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        //To Do: create procs for set_is_star and set_is_bust
        //To Do: get_scoreboard
        //To Do: set_player_notes

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