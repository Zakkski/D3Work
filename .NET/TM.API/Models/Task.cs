using System.Collections.Generic;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore;

namespace TM.API.Models
{
    public class Task
    {
        public int Id { get; set; }
        public Models.List List { get; set; }
        public int ListId { get; set; }
        public string Description { get; set; }
        public bool Complete { get; set; }
    }
}