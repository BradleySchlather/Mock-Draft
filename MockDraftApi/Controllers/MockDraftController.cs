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

        public MockDraftController(ILogger<MockDraftController> logger)
        {
            _logger = logger;
            //_repo = repo;
        }
        [HttpGet]
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

//namespace MockDraftApi.Controllers
//{
//    [ApiController]
//    [Route("[controller]")]
//    public class WeatherForecastController : ControllerBase
//    {

//        private readonly MockDraftRepository _repo;
//        private readonly ILogger<WeatherForecastController> _logger;

//        public WeatherForecastController(ILogger<WeatherForecastController> logger, MockDraftRepository repo)
//        {
//            _logger = logger;
//            _repo = repo;
//        }

//        [HttpGet(Name = "GetWeatherForecast")]
//        public IEnumerable<WeatherForecast> Get()
//        {
//            return _repo.Get();
//        }
//    }
//}