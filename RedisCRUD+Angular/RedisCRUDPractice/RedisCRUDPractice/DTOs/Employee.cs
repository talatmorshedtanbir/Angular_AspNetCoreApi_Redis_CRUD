﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RedisCRUDPractice.DTOs
{
    public class Employee
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public int Salary { get; set; }
    }
}
