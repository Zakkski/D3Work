using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TM.API.Models;

namespace TM.API.Data
{
    public class ListRepository : IListRepository
    {
        private readonly DataContext _context;

        public ListRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List> AddList(List list)
        {
            await _context.Lists.AddAsync(list);
            await _context.SaveChangesAsync();

            return list;
        }

        public async Task<bool> DeleteList(int listId)
        {
            var entity = await _context.Lists.Where(x => x.Id == listId).SingleAsync();
            _context.Lists.Remove(entity);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List> GetList(int listId)
        {
           return await _context.Lists.Where(x => x.Id == listId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<List>> GetLists()
        {
            return await _context.Lists.ToListAsync();
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateList(List list)
        {
            var entity = await _context.Lists.Where(x => x.Id == list.Id).SingleAsync();
            if (entity == null)
                return false;

            _context.Entry(entity).CurrentValues.SetValues(list);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}