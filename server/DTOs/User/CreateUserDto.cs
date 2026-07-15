using System.ComponentModel.DataAnnotations;

namespace server.DTOs.User
{
    public class CreateUserDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Enter a valid email address.")]
        [MaxLength(100, ErrorMessage = "Email cannot exceed 100 characters.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters.")]
        [MaxLength(50, ErrorMessage = "Password cannot exceed 50 characters.")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone number is required.")]
        [Phone(ErrorMessage = "Enter a valid phone number.")]
        [MaxLength(15, ErrorMessage = "Phone number cannot exceed 15 characters.")]
        public string PhoneNumber { get; set; } = string.Empty;

        [MaxLength(300, ErrorMessage = "Address cannot exceed 300 characters.")]
        public string? Address { get; set; }

        [Required(ErrorMessage = "Designation is required.")]
        [MaxLength(100, ErrorMessage = "Designation cannot exceed 100 characters.")]
        public string Designation { get; set; } = string.Empty;

        [Required(ErrorMessage = "Date of Joining is required.")]
        public DateOnly DateOfJoining { get; set; }

        [Required(ErrorMessage = "Department is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Please select a department.")]
        public int DepartmentId { get; set; }

        [Required(ErrorMessage = "Role is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Please select a role.")]
        public int RoleId { get; set; }

        public int? ManagerId { get; set; }
    }
}