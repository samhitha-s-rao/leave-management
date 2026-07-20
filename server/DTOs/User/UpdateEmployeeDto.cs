namespace server.DTOs.User
{
    public class UpdateEmployeeDto
    {
        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public int DepartmentId { get; set; }

        public int RoleId { get; set; }

        public string Designation { get; set; } = string.Empty;

        public DateTime DateOfJoining { get; set; }

        public string? ProfileImage { get; set; }
    }
}