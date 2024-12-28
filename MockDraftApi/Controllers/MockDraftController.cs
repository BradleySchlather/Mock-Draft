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

        //[HttpGet]
        //public IEnumerable<Team> GetTeams()
        //{
        //    var data = _repo.GetTeams();
        //    return data;
        //}

        [HttpGet]
        public IEnumerable<Scoreboard> GetScoreboard()
        {
            var data = _repo.GetScoreboard();
            return data;
        }

        [HttpPost]
        public async void CreateUser(User user)
        {
            _repo.CreateUser(user);
        }

        [HttpPost]
        public async Task<User> GetUser(User userSignIn)
        {
            var data = await _repo.GetUser(userSignIn);
            return data;
        } 
    }
}