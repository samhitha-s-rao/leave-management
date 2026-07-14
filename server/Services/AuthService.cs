using BCrypt.Net;
using server.DTOs.Auth;
using server.Helpers;
using server.Repositories.Interfaces;
using server.Services.Interfaces;
namespace server.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly JwtTokenGenerator _jwtTokenGenerator;
    private readonly IConfiguration _configuration;

    public AuthService(
        IUserRepository userRepository,
        JwtTokenGenerator jwtTokenGenerator,
        IConfiguration configuration)
    {
        _userRepository = userRepository;
        _jwtTokenGenerator = jwtTokenGenerator;
        _configuration = configuration;
    }

    public async Task<LoginResponseDto?> LoginAsync(LoginRequestDto request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);

        if (user == null)
            return null;

        if (!user.IsActive)
            throw new Exception("Your account has been deactivated.");

        bool validPassword = PasswordHelper.VerifyPassword(
    request.Password,
    user.PasswordHash
);

        if (!validPassword)
            return null;

        var token = _jwtTokenGenerator.GenerateToken(user);

        return new LoginResponseDto
        {
            UserId = user.UserId,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role.RoleName,
            Token = token,
            ExpiresAt = DateTime.UtcNow.AddMinutes(
                Convert.ToDouble(_configuration["Jwt:ExpiryInMinutes"])
            )
        };
    }
}