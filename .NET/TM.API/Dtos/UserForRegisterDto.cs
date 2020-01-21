using System.ComponentModel.DataAnnotations;

namespace TM.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(20, MinimumLength = 6, ErrorMessage = "You must specify a password of at least 6 characters and no more than 20")]
        public string Password { get; set; }
    }
}