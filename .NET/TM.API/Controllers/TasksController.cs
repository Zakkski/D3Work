using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TM.API.Data;
using TM.API.Dtos;

namespace TM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskRepository _repo;

        public TasksController(ITaskRepository repo)
        {   
            _repo = repo;
        }

        [HttpGet("{listId}")]
        public async Task<IActionResult> Show(int listId)
        {
            var tasks = await _repo.GetTasks(listId);
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> Create(TaskForCreateDto taskForCreate)
        {
            var task = new Models.Task {
                ListId = taskForCreate.ListId,
                Description = taskForCreate.Description
            };
            await _repo.AddTask(task);
            return Ok(task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TaskForUpdateDto taskForUpdate)
        {
            var task = await _repo.GetTask(id);

            task.Description = taskForUpdate.Description;
            task.Complete = taskForUpdate.Complete;

            await _repo.Save();

            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteTask(id);
            return Ok();
        }

    }
}