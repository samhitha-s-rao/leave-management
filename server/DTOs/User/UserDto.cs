namespace server.DTOs.User
{
    public class UserDto
    {
        public int UserId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public string? Address { get; set; }

        public string Designation { get; set; } = string.Empty;

        public DateOnly DateOfJoining { get; set; }

        public bool IsActive { get; set; }

        public int RoleId { get; set; }

        public string RoleName { get; set; } = string.Empty;

        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; } = string.Empty;

        public int? ManagerId { get; set; }

        public string? ManagerName { get; set; }
    }
}