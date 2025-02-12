using Microsoft.AspNetCore.Mvc;
using MockDraftApi.Models;
using MockDraftApi.Repositories;
using MockDraftApi.Services;

namespace MockDraftApi.Controllers
{
    [ApiController]
    [Route("api/auth")]

    public class AuthController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly MockDraftRepository _repo;

        public AuthController(TokenService tokenService, MockDraftRepository repo)
        {
            _tokenService = tokenService;
            _repo = repo;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            var userData = _repo.GetUser(user);
            if (user == null) return Unauthorized(new { message = "Invalid username or password" });

            var token = _tokenService.GenerateJwtToken(user);
            return Ok(new { Token = token });
        }
    }
}