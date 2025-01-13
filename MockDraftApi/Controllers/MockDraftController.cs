using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using MockDraftApi.Models;
using MockDraftApi.Repositories;
using MockDraftApi.Configuration;
using MockDraftApi.Services;

namespace MockDraftApi.Controllers
{
    [ApiController]
    [Route("api/[action]")]
    public class MockDraftController : ControllerBase
    {
        private readonly ILogger<MockDraftController> _logger;
        private readonly MockDraftRepository _repo;
        private readonly MockDraftService _service;

        public MockDraftController(ILogger<MockDraftController> logger, MockDraftRepository repo, MockDraftService service)
        {
            _logger = logger;
            _repo = repo;
            _service = service;
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
            return (IEnumerable<UserSelections>)data;
        }

        [HttpGet]
        public async Task<IEnumerable<Player>> GetDefaultPlayerData()
        {
            var data = await _repo.GetDefaultPlayerData();
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
        
        [HttpPost]
        public void SetPlayerNotes (PlayerNotes data)
        {
            _repo.SetPlayerNotes(data);
        }
        
        [HttpPost]
        public void SetPlayerIsBustOrIsStar (PlayerNotes data)
        {
            _repo.SetPlayerIsBustOrStar(data);
        }

        [HttpGet]
        public Player[] GetPlayerList (int userId)
        {
            var data = _service.GetPlayerList(userId);
            return data;
        }

        [HttpGet]
        public MockDraft GetMockDraft (int userId)
        {
            var data = _service.GetMockDraftData(userId);
            return data;
        }
    }
}