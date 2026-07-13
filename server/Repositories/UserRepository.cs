using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Repositories.Interfaces;

namespace server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users
                .Include(x => x.Role)
                .Include(x => x.Department)
                .Include(x => x.Manager)
                .ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users
                .Include(x => x.Role)
                .Include(x => x.Department)
                .Include(x => x.Manager)
                .FirstOrDefaultAsync(x => x.UserId == id);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .Include(x => x.Role)
                .Include(x => x.Department)
                .Include(x => x.Manager)
                .FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<IEnumerable<User>> GetAdminsAsync()
        {
            return await _context.Users
                .Include(x => x.Role)
                .Where(x => x.Role.RoleName == "Admin" && x.IsActive)
                .ToListAsync();
        }

        public async Task<IEnumerable<User>> GetManagersAsync()
        {
            return await _context.Users
                .Include(x => x.Role)
                .Where(x => x.Role.RoleName == "Manager" && x.IsActive)
                .ToListAsync();
        }

        public async Task<IEnumerable<User>> GetEmployeesAsync()
        {
            return await _context.Users
                .Include(x => x.Role)
                .Where(x => x.Role.RoleName == "Employee" && x.IsActive)
                .ToListAsync();
        }

        public async Task<User> CreateAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task DeactivateAsync(User user)
{
    user.IsActive = false;

    _context.Users.Update(user);

    await _context.SaveChangesAsync();
}

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users
                .AnyAsync(x => x.Email == email);
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Users
                .AnyAsync(x => x.UserId == id);
        }
    }
}