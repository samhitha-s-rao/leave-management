namespace server.DTOs
{
    public class UpdateProfileDto
    {
        public string PhoneNumber { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string ProfilePictureUrl { get; set; } = string.Empty;
    }
}