using System.Collections.Generic;

namespace TM.API.Models
{
    public class Task
    {
        public int Id { get; set; }
        public ICollection<TM.API.Models.List> ListId { get; set; }
        public string Description { get; set; }
        public bool Complete { get; set; }
    }
}