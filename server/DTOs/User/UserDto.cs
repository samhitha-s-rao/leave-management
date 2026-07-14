<<<<<<< HEAD
using System;

namespace server.DTOs
=======
namespace server.DTOs.User
>>>>>>> d913bddf6e86c523d8d43a21c9b82bbf6a2440cc
{
    public class UserDto
    {
        public int UserId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

<<<<<<< HEAD
        public string Address { get; set; } = string.Empty;

        public string DateofJoining { get; set; } = string.Empty;

        public string ProfilePictureUrl { get; set; } = string.Empty;
=======
        public string? Address { get; set; }

        public string Designation { get; set; } = string.Empty;

        public DateOnly DateOfJoining { get; set; }
>>>>>>> d913bddf6e86c523d8d43a21c9b82bbf6a2440cc

        public bool IsActive { get; set; }

        public int RoleId { get; set; }

        public string RoleName { get; set; } = string.Empty;

        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; } = string.Empty;

        public int? ManagerId { get; set; }

        public string? ManagerName { get; set; }
    }
}