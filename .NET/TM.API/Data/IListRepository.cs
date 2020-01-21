using System.Collections.Generic;
using System.Threading.Tasks;
using TM.API.Models;

namespace TM.API.Data
{
    public interface IListRepository
    {
        Task<IEnumerable<List>> GetLists();
        Task<List> GetList(int listId);
        Task<List> AddList(List list);
        Task<bool> UpdateList(List list);
        Task<bool> DeleteList(int listId);
        Task<bool> Save();
    }
}