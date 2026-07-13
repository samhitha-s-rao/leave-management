using AutoMapper;
using server.DTOs.Department;
using server.DTOs.Roles;
using server.DTOs.User;
using server.Models;

namespace server.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.RoleName,
                    opt => opt.MapFrom(src => src.Role.RoleName))
                .ForMember(dest => dest.DepartmentName,
                    opt => opt.MapFrom(src => src.Department.DepartmentName))
                .ForMember(dest => dest.ManagerName,
                    opt => opt.MapFrom(src =>
                        src.Manager != null ? src.Manager.Name : null));

            CreateMap<CreateUserDto, User>()
                .ForMember(dest => dest.PasswordHash,
                    opt => opt.Ignore());

            CreateMap<UpdateUserDto, User>();

            // Role
            CreateMap<Role, RoleDto>();

            // Department
            CreateMap<Department, DepartmentDto>();
        }
    }
}