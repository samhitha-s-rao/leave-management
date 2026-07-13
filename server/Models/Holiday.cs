using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Holiday
    {
        [Key]
        public int HolidayId { get; set; }

        [Required]
        [MaxLength(100)]
        public string HolidayName { get; set; } = string.Empty;

        [Required]
        public DateOnly HolidayDate { get; set; }
    }
}
