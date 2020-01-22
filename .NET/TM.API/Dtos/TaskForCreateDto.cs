using System.ComponentModel.DataAnnotations;

namespace TM.API.Dtos
{
    public class TaskForCreateDto
    {
        [Required]
        public int ListId { get; set; }
        [Required]
        public string Description { get; set; }
    }
}