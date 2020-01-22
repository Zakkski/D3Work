using System.ComponentModel.DataAnnotations;

namespace TM.API.Dtos
{
    public class TaskForUpdateDto
    {
        [Required]
        public string Description { get; set; }
        [Required]
        public bool Complete { get; set; }
    }
}