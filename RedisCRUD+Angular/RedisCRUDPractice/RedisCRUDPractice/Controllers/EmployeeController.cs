using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RedisCRUDPractice.DTOs;
using RedisCRUDPractice.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace RedisCRUDPractice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<ActionResult<Employee>> Get()
        {
            var employees = await _employeeService.GetAllEmployees();

            if (employees != null)
            {
                var result = new
                {
                    statusCode = 200,
                    success = true,
                    data = employees
                };

                return Ok(result);
            }
            else
            {
                var result = new
                {
                    statusCode = 400,
                    success = false,
                    data = "Data Not Found",
                };

                return BadRequest(result);
            }
        }

        [HttpGet("GetEmployee")]
        public async Task<ActionResult<Employee>> GetEmployee(string userName)
        {
            var employee = await _employeeService.GetEmployee(userName);

            if (employee != null)
            {
                var result = new
                {
                    statusCode = 200,
                    success = true,
                    data = employee
                };

                return Ok(result);
            }
            else
            {
                var result = new
                {
                    statusCode = 400,
                    success = false,
                    data = "Data Not Found",
                };

                return BadRequest(result);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Employee employee)
        {
            try
            {
                await _employeeService.AddEmployee(employee);

                var result = new
                {
                    statusCode = 200,
                    success = true,
                    data = ""
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                var result = new
                {
                    statusCode = 400,
                    success = false
                };

                return BadRequest(result);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteEmployee(string userName)
        {
            try
            {
                await _employeeService.DeleteEmployee(userName);
                var result = new
                {
                    statusCode = 200,
                    success = true,
                    data = ""
                };

                return Ok(result);
            }
            catch
            {
                var result = new
                {
                    statusCode = 400,
                    success = false
                };

                return BadRequest(result);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Employee employee)
        {
            try
            {
                await _employeeService.UpdateEmployee(employee);

                var result = new
                {
                    statusCode = 200,
                    success = true,
                    data = ""
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                var result = new
                {
                    statusCode = 400,
                    success = false
                };

                return BadRequest(result);
            }
        }
    } 
}
