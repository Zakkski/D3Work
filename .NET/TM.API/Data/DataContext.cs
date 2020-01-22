using Microsoft.EntityFrameworkCore;
using TM.API.Models;

namespace TM.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<List> Lists { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Task>().Property(x => x.Complete)
            .HasDefaultValue(false);
        }
    }
}