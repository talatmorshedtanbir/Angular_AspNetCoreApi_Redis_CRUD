using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using RedisCRUDPractice.DataAccessLayers.Interfaces;
using RedisCRUDPractice.DTOs;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace RedisCRUDPractice.DataAccessLayers
{
    public class EmployeeDAL : IEmployeeDAL
    {
        private readonly IDistributedCache _redisCache;
        private readonly IConnectionMultiplexer _connectionMultiplexer;
        public EmployeeDAL(IDistributedCache redisCache, IConnectionMultiplexer connectionMultiplexer)
        {
            _redisCache = redisCache;
            _connectionMultiplexer = connectionMultiplexer;
        }

        public async Task<Employee> GetEmployee(string userName)
        {
            var employee = await _redisCache.GetStringAsync(userName);

            if (String.IsNullOrEmpty(employee))
                return null;

            return JsonConvert.DeserializeObject<Employee>(employee);
        }

        public async Task AddEmployee(Employee employee)
        {
            if ((await _redisCache.GetStringAsync(employee.UserName) == null) && employee.UserName != "")
            {
                await _redisCache.SetStringAsync(employee.UserName, JsonConvert.SerializeObject(employee));
            }
            else
                throw new Exception("Data already exists");
        }

        public async Task UpdateEmployee(Employee employee)
        {
            if (await _redisCache.GetStringAsync(employee.UserName) != null)
            {
                await _redisCache.SetStringAsync(employee.UserName, JsonConvert.SerializeObject(employee));
            }
            else
                throw new Exception("Data not found");
        }

        public async Task DeleteEmployee(string userName)
        {
            if (await _redisCache.GetStringAsync(userName) != null)
            {
                await _redisCache.RemoveAsync(userName);
            }
            else
                throw new Exception("Data not found");        
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            var endPoint = _connectionMultiplexer.GetEndPoints().First();
            var keys = _connectionMultiplexer.GetServer(endPoint).Keys(pattern: "*").ToArray();
            var employeeList = new List<Employee>();

            foreach (string key in keys)
            {
                var result = await _redisCache.GetStringAsync(key);
                employeeList.Add(JsonConvert.DeserializeObject<Employee>(result));
            }

            return employeeList;
        }
    }
}
