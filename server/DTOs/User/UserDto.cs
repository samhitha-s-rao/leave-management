using System;

namespace server.DTOs
{
    public class UserDto
    {
        public int UserId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string DateofJoining { get; set; } = string.Empty;

        public string ProfilePictureUrl { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public int RoleId { get; set; }

        public string RoleName { get; set; } = string.Empty;

        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; } = string.Empty;

        public int? ManagerId { get; set; }

        public string? ManagerName { get; set; }
    }
}