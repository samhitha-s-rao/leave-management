namespace server.DTOs.User
{
    public class UserProfileDto
    {
        public int UserId { get; set; }
 
        public string EmployeeId { get; set; } = string.Empty;
 
        public string Name { get; set; } = string.Empty;
 
        public string Email { get; set; } = string.Empty;
 
        public string? Phone { get; set; }
 
        public string? Address { get; set; }
 
        public string Role { get; set; } = string.Empty;
 
        public string Department { get; set; } = string.Empty;
    }
}