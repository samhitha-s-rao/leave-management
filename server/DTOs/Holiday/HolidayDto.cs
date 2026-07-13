using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class HolidayDto
    {
        public int HolidayId { get; set; }

        [Required]
        public string HolidayName { get; set; } = string.Empty;

        [Required]
        public DateOnly HolidayDate { get; set; }
    }
}