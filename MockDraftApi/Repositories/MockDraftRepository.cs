﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Infrastructure;
using MockDraftApi.Configuration;
using MockDraftApi.Models;
using MockDraftApi.Services;
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

        public async void CreateUser(User user)
        {
            var hashedPassword = PasswordHasher.HashPassword(user.Password);

            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("create_user", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("password_input", hashedPassword);
                    command.Parameters.AddWithValue("username_input", user.Username);
                    command.Parameters.AddWithValue("email_input", user.Email);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task<User> GetUser(User signInData)
        {
            var user = new User();
            var hashedPassword = "";
            
            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                await using (var command = new MySqlCommand("get_hashed_password", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("email_input", signInData.Email);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            hashedPassword = reader.GetString("password");
                        }
                    }
                }
                
                if(PasswordHasher.VerifyPassword(signInData.Password, hashedPassword)) {

                    using (var command = new MySqlCommand("get_user", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("email_input", signInData.Email);
                        command.Parameters.AddWithValue("password_input", hashedPassword);

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
                }

                return user;
            }
        }

        public async Task<User> GetUserDataFromToken(User tokenData)
        {
            var user = new User();
            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("get_user_from_token", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("user_id_input", tokenData.UserId);

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

        public async Task<UserSelections> GetUserSelections(int userId)
        {
            var userSelections = new UserSelections();

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
                            userSelections = (new UserSelections
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
        public async Task<IEnumerable<Player>> GetDefaultPlayerData()
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
        public async void SetPlayerNotes(PlayerNotes data)
        {
            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("set_player_notes", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("in_user_id", data.UserId);
                    command.Parameters.AddWithValue("in_player_id", data.PlayerId);
                    command.Parameters.AddWithValue("in_player_note", data.Note);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async void SetPlayerIsBustOrStar(PlayerNotes data)
        {
            using (var connection = new MySqlConnection(_conn))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("set_player_is_star_bust", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("in_user_id", data.UserId);
                    command.Parameters.AddWithValue("in_player_id", data.PlayerId);
                    command.Parameters.AddWithValue("in_is_bust", data.IsBust);
                    command.Parameters.AddWithValue("in_is_star", data.IsStar);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        //To Do: get_scoreboard
        //To Do: set_scoreboard
    }
}