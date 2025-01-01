using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using MockDraftApi.Models;
using MockDraftApi.Repositories;
using MockDraftApi.Configuration;

namespace MockDraftApi.Controllers
{
    [ApiController]
    [Route("api/[action]")]
    public class MockDraftController : ControllerBase
    {
        private readonly ILogger<MockDraftController> _logger;
        private readonly MockDraftRepository _repo;

        public MockDraftController(ILogger<MockDraftController> logger, MockDraftRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IEnumerable<Player>> GetPlayers()
        {
            var data = await _repo.GetPlayers();
            return data;
        }

        [HttpGet]
        public async Task<IEnumerable<Team>> GetTeams()
        {
            var data = await _repo.GetDefaultTeamData();
            return data;
        }

        [HttpGet]
        public async Task<IEnumerable<UserSelections>> GetUserSelections(int userId)
        {
            var data = await _repo.GetUserSelections(userId);
            return data;
        }

        [HttpGet]
        public async Task<IEnumerable<PlayerNotes>> GetPlayerNotes(int userId)
        {
            var data = await _repo.GetPlayerNotes(userId);
            return data;
        }

        [HttpGet]
        public IEnumerable<Scoreboard> GetScoreboard()
        {
            var data = _repo.GetScoreboard();
            return data;
        }

        [HttpPost]
        public void CreateUser(User user)
        {
            _repo.CreateUser(user);
        }

        [HttpPost]
        public async Task<User> GetUser(User userSignIn)
        {
            var data = await _repo.GetUser(userSignIn);
            return data;
        }

        [HttpPost]
        public void SetUserPlayersDraftOrder (SetUsersPlayersOrTeams data)
        {
            _repo.SetUsersPlayersDraftOrder(data);
        }

        [HttpPost]
        public void SetUsersPlayersList (SetUsersPlayersOrTeams data)
        {
            _repo.SetUsersPlayersList(data);
        }

        [HttpPost]
        public void SetUsersTeams (SetUsersPlayersOrTeams data)
        {
            _repo.SetUsersTeams(data);
        }

    }
}