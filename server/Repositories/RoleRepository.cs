using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Repositories.Interfaces;

namespace server.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly ApplicationDbContext _context;

        public RoleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _context.Roles
                .OrderBy(r => r.RoleName)
                .ToListAsync();
        }

        public async Task<Role?> GetByIdAsync(int roleId)
        {
            return await _context.Roles
                .FirstOrDefaultAsync(r => r.RoleId == roleId);
        }

        public async Task<Role?> GetByNameAsync(string roleName)
        {
            return await _context.Roles
                .FirstOrDefaultAsync(r => r.RoleName == roleName);
        }

        public async Task<Role> CreateAsync(Role role)
        {
            await _context.Roles.AddAsync(role);

            await _context.SaveChangesAsync();

            return role;
        }

        public async Task<Role> UpdateAsync(Role role)
        {
            _context.Roles.Update(role);

            await _context.SaveChangesAsync();

            return role;
        }

        public async Task DeleteAsync(Role role)
        {
            _context.Roles.Remove(role);

            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExistsAsync(int roleId)
        {
            return await _context.Roles
                .AnyAsync(r => r.RoleId == roleId);
        }

        public async Task<bool> NameExistsAsync(string roleName)
        {
            return await _context.Roles
                .AnyAsync(r => r.RoleName == roleName);
        }
    }
}