using Microsoft.AspNetCore.Mvc;
using MockDraftApi.Models;
using MockDraftApi.Repositories;
using MockDraftApi.Services;

namespace MockDraftApi.Controllers
{
    [ApiController]
    [Route("api/auth/[action]")]

    public class AuthController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly MockDraftRepository _repo;

        public AuthController(TokenService tokenService, MockDraftRepository repo)
        {
            _tokenService = tokenService;
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> Login(User user)
        {
            var userData = await _repo.GetUser(user);
            if (userData == null) return Unauthorized(new { message = "Invalid username or password" });

            var token = _tokenService.GenerateJwtToken(userData);
            return Ok(new { Token = token });
        }
    }
}