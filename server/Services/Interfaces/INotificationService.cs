using server.DTOs.Notification;

namespace server.Services.Interfaces
{
    public interface INotificationService
    {
        Task CreateNotificationAsync(CreateNotificationDto dto);

        Task<List<NotificationResponseDto>> GetUserNotificationsAsync(int userId);

        Task<int> GetUnreadCountAsync(int userId);

        Task MarkAsReadAsync(int notificationId);

        Task MarkAllAsReadAsync(int userId);
    }
}