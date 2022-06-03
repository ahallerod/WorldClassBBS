using Microsoft.EntityFrameworkCore;
using WorldClassBBS.Entities;
using Board = WorldClassBBS.Entities.Board;

namespace WorldClassBBS.Helpers
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;
        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Board> Boards { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey("UserId");
                entity.Property("Username")
                    .IsRequired()
                    .HasMaxLength(30);
                entity.Property("IsDeactivated").HasDefaultValue(false);
                entity.HasMany(x => x.Posts)
                    .WithOne(y => y.CreatedByUser)
                    .HasForeignKey(y => y.CreatedByUserId)
                    .OnDelete(DeleteBehavior.NoAction);
                entity.HasMany(x => x.Boards)
                    .WithOne(x => x.CreatedByUser)
                    .HasForeignKey(x => x.CreatedByUserId)
                    .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasKey("PostId");
                entity.Property("Message")
                    .IsRequired()
                    .HasMaxLength(200);
                entity.Property("CreatedByUserId").IsRequired();
                entity.Property("BoardId").IsRequired();
                entity.Property("IsDeleted").HasDefaultValue(false);

                entity.HasOne(x => x.CreatedByUser)
                    .WithMany(x => x.Posts)
                    .HasForeignKey(x => x.CreatedByUserId)
                    .OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(x => x.Board)
                    .WithMany(x => x.Posts)
                    .HasForeignKey(x => x.BoardId)
                    .OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Board>(entity =>
            {
                entity.HasKey("BoardId");
                entity.Property("IsArchived").HasDefaultValue(false);
                entity.Property("Title")
                    .IsRequired()
                    .HasMaxLength(70);
                entity.Property("CreatedByUserId").IsRequired();
                entity.HasMany(x => x.Posts)
                    .WithOne(x => x.Board)
                    .HasForeignKey(x => x.BoardId)
                    .OnDelete(DeleteBehavior.NoAction);
                entity.HasMany(x => x.Categories)
                    .WithMany(x => x.Boards);

            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey("CategoryId");
                entity.Property("CategoryName")
                    .IsRequired()
                    .HasMaxLength(20);
                entity.Property("CreatedByUserId").IsRequired();
                entity.HasMany(x => x.Boards)
                    .WithMany(x => x.Categories);
            });
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            switch (Configuration.GetValue(typeof(String), "DatabaseServer"))
            {
                case "SQLServer":
                    options.UseSqlServer(Configuration.GetConnectionString("SQLServer"));
                    break;
                case "SQLite":
                    options.UseSqlite(Configuration.GetConnectionString("SQLite"));
                    break;
                default:
                    throw new Exception("No DB Server specified");
            }

        }
    }
}
