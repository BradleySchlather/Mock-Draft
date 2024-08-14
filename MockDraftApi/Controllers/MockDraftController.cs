using Microsoft.AspNetCore.Mvc;
using MockDraftApi.Models;
using MockDraftApi.Repositories;
using MockDraftApi.Configuration;

namespace MockDraftApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MockDraftController : ControllerBase
    {
        private readonly ILogger<MockDraftController> _logger;
        private readonly MockDraftRepository _repo;
        private readonly MockDraftConfiguration _config;

        public MockDraftController(ILogger<MockDraftController> logger, MockDraftRepository repo,
            MockDraftConfiguration config)
        {
            _logger = logger;
            _repo = repo;
            _config = config;
        }
        [HttpGet]
        public IEnumerable<Player> GetPlayers()
        {
            var data = _repo.GetPlayers();
        }
    }
}