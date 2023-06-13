﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceMakerLib
{
    public class Employee
    {
        public string? Name { get;}
        public Positions? Position { get;}
        public DateTime Date { get;}
        public decimal HourlyRate { get; }
        public decimal HoursWorked { get;}
        
        public Employee(string name, Positions position, DateTime date, decimal hourlyRate, decimal hoursWorked)
        {
            Name = name;
            Position = position;
            Date = date;
            HourlyRate = hourlyRate;
            HoursWorked = hoursWorked;
        }

        public enum Positions 
        {
            RN, RPN, PSW, Cook, Housekeeper, Maintenance, Administrator, Other
        }

        public static Positions StringToPosition(string s)
        {
            switch (s.ToLower())
            {
                case "rn":
                    return Positions.RN;
                case "rpn":
                    return Positions.RPN;
                case "psw":
                    return Positions.PSW;
                case "cook":
                    return Positions.Cook;
                case "housekeeper":
                    return Positions.Housekeeper;
                case "maintenance":
                    return Positions.Maintenance;
                case "administrator":
                    return Positions.Administrator;
                default:
                    return Positions.Other;
            }
        }
    }
}
