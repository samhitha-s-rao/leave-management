using System.ComponentModel.DataAnnotations;

namespace server.DTOs.Leave
{
    public class ApproveLeaveDto : IValidatableObject
    {
        [Required]
        [RegularExpression("Approved|Rejected")]
        public string Status { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? ManagerRemarks { get; set; }

        public IEnumerable<ValidationResult> Validate(
            ValidationContext validationContext)
        {
            if (Status == "Rejected" &&
                string.IsNullOrWhiteSpace(ManagerRemarks))
            {
                yield return new ValidationResult(
                    "Manager remarks are required when rejecting a leave request.",
                    new[] { nameof(ManagerRemarks) });
            }
        }
    }
}