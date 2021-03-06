using RedisCRUDPractice.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedisCRUDPractice.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task<Employee> GetEmployee(string userName);
        Task AddEmployee(Employee employee);
        Task UpdateEmployee(Employee employee);
        Task DeleteEmployee(string userName);
        Task<List<Employee>> GetAllEmployees();
    }
}
