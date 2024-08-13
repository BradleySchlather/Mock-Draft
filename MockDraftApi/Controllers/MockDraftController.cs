using Microsoft.AspNetCore.Mvc;

namespace MockDraftApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MockDraftController : ControllerBase
    {

        private readonly ILogger<MockDraftController> _logger;

        public MockDraftController(ILogger<MockDraftController> logger)
        {
            _logger = logger;
        }



        
        
    }
}