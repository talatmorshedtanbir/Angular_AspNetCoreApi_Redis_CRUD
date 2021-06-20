using RedisCRUDPractice.DataAccessLayers.Interfaces;
using RedisCRUDPractice.DTOs;
using RedisCRUDPractice.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedisCRUDPractice.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeDAL _employeeDAL;
        public EmployeeService(IEmployeeDAL employeeDAL)
        {
            _employeeDAL = employeeDAL;
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            return await _employeeDAL.GetAllEmployees();
        }

        public async Task<Employee> GetEmployee(string userName)
        {
            return await _employeeDAL.GetEmployee(userName);
        }

        public async Task AddEmployee(Employee employee)
        {
            await _employeeDAL.AddEmployee(employee);
        }

        public async Task UpdateEmployee(Employee employee)
        {
            await _employeeDAL.UpdateEmployee(employee);
        }

        public async Task DeleteEmployee(string userName)
        {
            await _employeeDAL.DeleteEmployee(userName);
        }

    }
}
