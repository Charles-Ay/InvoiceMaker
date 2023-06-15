using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace InvoiceEntities
{
    public class Employee
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("rate")]
        public decimal Rate { get; set; }

        [JsonProperty("hours")]
        public decimal Hours { get; set; }

        [JsonProperty("date")]
        public string Date { get; set; }

        [JsonProperty("role")]
        public string Role { get; set; }

        public Employee(string name, Positions position, DateTime date, decimal hourlyRate, decimal hoursWorked)
        {
            Name = name;
            Role = position.ToString();
            Date = date.ToString("yyyy-MM-dd");
            Rate = hourlyRate;
            Hours = hoursWorked;
        }

        public Employee()
        {

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
