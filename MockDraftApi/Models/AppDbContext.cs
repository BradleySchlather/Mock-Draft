using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MockDraftApi.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
        public DbSet<Player> Players { get; set; }
        //To Do: Create more DbSets for other models
    }
}
