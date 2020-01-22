using System.Collections.Generic;

namespace TM.API.Models
{
    public class List
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public ICollection<Models.Task> Tasks { get; set; }

    }
}