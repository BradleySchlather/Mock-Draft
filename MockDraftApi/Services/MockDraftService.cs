﻿using MockDraftApi.Models;
using MockDraftApi.Repositories;

namespace MockDraftApi.Services
{
    public class MockDraftService
    {
        private readonly MockDraftRepository _repo;  

        public MockDraftService(MockDraftRepository repo)
        {
            _repo = repo;

        }

        public Player[] GetPlayerList(int userId)
        {
            var defaultPlayerData = _repo.GetDefaultPlayerData();
            var playersObj = _repo.GetUserSelections(userId);
            var playersListArr = playersObj.Result.PlayersListOrder;
            var playerNotes = _repo.GetPlayerNotes(userId);

            var playerListToReturn = defaultPlayerData.Result.ToArray();
            var playerNotesArr = playerNotes.Result.ToArray();

            foreach (var player in playerListToReturn)
            {
                for (global::System.Int32 i = 0; i < playersListArr?.Length; i++)
                {
                    if (playersListArr[i] == player.PlayerId)
                    {
                        player.PlayerRank = i + 1;
                    }
                }

                foreach (var notes in playerNotesArr)
                {
                    if (notes.PlayerId == player.PlayerId)
                    {
                        player.Note = notes.Note;
                        player.IsBust = notes.IsBust;
                        player.IsStar = notes.IsStar;
                    }
                }
            }
            Array.Sort(playerListToReturn, (x, y) => x.PlayerRank.CompareTo(y.PlayerRank));

            return playerListToReturn;
        }

        public MockDraft GetMockDraftData(int userId)
        {
            var defaultPlayerData = _repo.GetDefaultPlayerData().Result.ToArray();
            var defaultTeamData = _repo.GetDefaultTeamData().Result.ToArray();
            var userSelections = _repo.GetUserSelections(userId).Result;

            var MockDraft = new MockDraft() { 
                Players = defaultPlayerData, 
                Teams = defaultTeamData, 
                UserSelections = userSelections };
            return MockDraft;
        }
    }
}
