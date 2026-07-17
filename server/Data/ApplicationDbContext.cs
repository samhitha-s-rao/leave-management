using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }

    public DbSet<Role> Roles { get; set; }

    public DbSet<Department> Departments { get; set; }

    public DbSet<LeaveType> LeaveTypes { get; set; }

    public DbSet<LeaveBalance> LeaveBalances { get; set; }

    public DbSet<LeaveRequest> LeaveRequests { get; set; }

    public DbSet<Attendance> Attendances { get; set; }

    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Holiday> Holidays { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        ConfigureRelationships(modelBuilder);
        ConfigureConstraints(modelBuilder);
        SeedData(modelBuilder);


        modelBuilder.Entity<Notification>()
        .HasOne(n => n.User)
        .WithMany(u => u.Notifications)
        .HasForeignKey(n => n.UserId)
        .OnDelete(DeleteBehavior.Cascade);
    }
    

    private static void ConfigureRelationships(ModelBuilder modelBuilder)
    {
        // User-Manager relationship
        modelBuilder.Entity<User>()
            .HasOne(u => u.Manager)
            .WithMany(m => m.Employees)
            .HasForeignKey(u => u.ManagerId)
            .OnDelete(DeleteBehavior.Restrict);

        // Role relationships
        modelBuilder.Entity<User>()
            .HasOne(u => u.Role)
            .WithMany(r => r.Users)
            .HasForeignKey(u => u.RoleId);

        // Department relationships
        modelBuilder.Entity<User>()
            .HasOne(u => u.Department)
            .WithMany(d => d.Users)
            .HasForeignKey(u => u.DepartmentId);

        //leave balance relationships
        modelBuilder.Entity<LeaveBalance>()
            .HasOne(lb => lb.User)
            .WithMany(u => u.LeaveBalances)
            .HasForeignKey(lb => lb.EmployeeId);

        modelBuilder.Entity<LeaveBalance>()
            .HasOne(lb => lb.LeaveType)
            .WithMany(lt => lt.LeaveBalances)
            .HasForeignKey(lb => lb.LeaveTypeId);

        //leave request relationships
        modelBuilder.Entity<LeaveRequest>()
            .HasOne(lr => lr.User)
            .WithMany(u => u.LeaveRequests)
            .HasForeignKey(lr => lr.UserId);

        modelBuilder.Entity<LeaveRequest>()
            .HasOne(lr => lr.LeaveType)
            .WithMany(lt => lt.LeaveRequests)
            .HasForeignKey(lr => lr.LeaveTypeId);

        // Attendance relationships
        modelBuilder.Entity<Attendance>()
            .HasOne(a => a.User)
            .WithMany(u => u.Attendances)
            .HasForeignKey(a => a.UserId);
    }
    

    private static void ConfigureConstraints(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.UserId)
            .IsUnique();

        modelBuilder.Entity<Role>()
            .HasIndex(r => r.RoleName)
            .IsUnique();

        modelBuilder.Entity<Department>()
            .HasIndex(d => d.DepartmentName)
            .IsUnique();

        modelBuilder.Entity<LeaveType>()
            .HasIndex(l => l.LeaveTypeName)
            .IsUnique();
    }

    private static void SeedData(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<User>().HasData(

    new User
    {
        UserId = 1,
        Name = "Admin User",
        Email = "admin@test.com",
        PasswordHash = "$2a$11$dIRcqLN9ra7kSjzxrk8.ZuAEaPHfo0i4PZL7ek8LyjI1Gx/XOgtsm",
        RoleId = 1,
        DepartmentId = 1,
        IsActive = true
    },

    new User
    {
        UserId = 2,
        Name = "Jane Smith",
        Email = "manager@test.com",
        PasswordHash = "$2a$11$Cg1Fem.NDJO/UtHAnOGLXOTm8I7tDnFC2gUHEApqvSl7UNJKFW0Au",
        RoleId = 2,
        DepartmentId = 2,
        IsActive = true
    },

    new User
    {
        UserId = 3,
        Name = "John Doe",
        Email = "employee@test.com",
        PasswordHash = "$2a$11$90gTurBEthchZx57oyM8Aed7r511ob.c1kIV/76ThFpQOCHxrhNXG",
        RoleId = 3,
        DepartmentId = 2,
        ManagerId = 2,
        IsActive = true
    }

);
modelBuilder.Entity<Role>().HasData(


    new Role
    {
        RoleId = 1,
        RoleName = "Admin"
    },

    new Role
    {
        RoleId = 2,
        RoleName = "Manager"
    },

    new Role
    {
        RoleId = 3,
        RoleName = "Employee"
    }

);
modelBuilder.Entity<Department>().HasData(

    new Department
    {
        DepartmentId = 1,
        DepartmentName = "Administration"
    },

    new Department
    {
        DepartmentId = 2,
        DepartmentName = "Development"
    },

    new Department
    {
        DepartmentId = 3,
        DepartmentName = "Human Resources"
    },

    new Department
    {
        DepartmentId = 4,
        DepartmentName = "Finance"
    }

);
modelBuilder.Entity<LeaveType>().HasData(

    new LeaveType
    {
        LeaveTypeId = 1,
        LeaveTypeName = "Casual Leave",
        AllocatedLeaves = 12
    },

    new LeaveType
    {
        LeaveTypeId = 2,
        LeaveTypeName = "Sick Leave",
        AllocatedLeaves = 10
    },

    new LeaveType
    {
        LeaveTypeId = 3,
        LeaveTypeName = "Earned Leave",
        AllocatedLeaves = 15
    }

);
}
  
}
