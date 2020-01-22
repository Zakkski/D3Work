using System.Collections.Generic;
using System.Threading.Tasks;

namespace TM.API.Data
{
    public interface ITaskRepository
    {
         Task<IEnumerable<Models.Task>> GetTasks(int listId);
         Task<Models.Task> GetTask(int id);
         Task<Models.Task> AddTask(Models.Task task);
         Task<bool> UpdateTask(Models.Task task);
         Task<bool> DeleteTask(int taskId);
         Task<bool> Save();
    }
}