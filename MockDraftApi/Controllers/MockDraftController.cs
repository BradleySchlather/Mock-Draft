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
        public IEnumerable<Player> GetPlayers()
        {
            var data = _repo.GetPlayers();
            return data;
        }

        [HttpGet]
        public IEnumerable<Team> GetTeams()
        {
            var data = _repo.GetTeams();
            return data;
        }

        [HttpGet]
        public IEnumerable<Scoreboard> GetScoreboard()
        {
            var data = _repo.GetScoreboard();
            return data;
        }
    }
}