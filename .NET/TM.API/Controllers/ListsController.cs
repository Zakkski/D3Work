using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TM.API.Data;
using TM.API.Dtos;
using TM.API.Models;

namespace TM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListsController : ControllerBase
    {
        private readonly IListRepository _repo;

        public ListsController(IListRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var lists = await _repo.GetLists();
            return Ok(lists);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Show(int id)
        {
            var list = await _repo.GetList(id);
            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ListForCreateDto listForCreate)
        {
            var newList = new List {
                Name = listForCreate.Name,
                UserId = listForCreate.UserId
            };

            await _repo.AddList(newList);

            return Ok(newList);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ListForUpdateDto listForUpdate)
        {
            List list = await _repo.GetList(id);

            list.Name = listForUpdate.Name;
            list.UserId = listForUpdate.UserId;

            await _repo.Save();

            return Ok(list);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteList(id);
            return Ok();
        }
    }
}