using server.Models;

namespace server.Repositories.Interfaces
{
    public interface INotificationRepository
    {
        Task AddAsync(Notification notification);

        Task<List<Notification>> GetByUserIdAsync(int userId);

        Task<Notification?> GetByIdAsync(int notificationId);

        Task<int> GetUnreadCountAsync(int userId);

        Task MarkAsReadAsync(Notification notification);

        Task MarkAllAsReadAsync(int userId);

        Task SaveChangesAsync();
    }
}