using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TM.API.Data
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DataContext _context;

        public TaskRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Models.Task> AddTask(Models.Task task)
        {
            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<bool> DeleteTask(int taskId)
        {
            var entity = await _context.Tasks.Where(x => x.Id == taskId).SingleAsync();
            _context.Tasks.Remove(entity);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Models.Task> GetTask(int id)
        {
            return await _context.Tasks.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Models.Task>> GetTasks(int listId)
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateTask(Models.Task task)
        {
            var entity = await _context.Tasks.Where(x => x.Id == task.Id).FirstOrDefaultAsync();
            if (entity == null)
                return false;

            _context.Entry(entity).CurrentValues.SetValues(task);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}