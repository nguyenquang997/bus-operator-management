using BusOperator.Domain.Entities;
using BusOperator.Infrastructure.Seeding;
using Microsoft.EntityFrameworkCore;

namespace BusOperator.Infrastructure.Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Branch> Branches => Set<Branch>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<User> Users => Set<User>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<Route> Routes => Set<Route>();
    public DbSet<RouteStop> RouteStops => Set<RouteStop>();
    public DbSet<Vehicle> Vehicles => Set<Vehicle>();
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Trip> Trips => Set<Trip>();
    public DbSet<TripStatusHistory> TripStatusHistories => Set<TripStatusHistory>();
    public DbSet<RevenueType> RevenueTypes => Set<RevenueType>();
    public DbSet<TripRevenue> TripRevenues => Set<TripRevenue>();
    public DbSet<TripRevenueDetail> TripRevenueDetails => Set<TripRevenueDetail>();
    public DbSet<ExpenseType> ExpenseTypes => Set<ExpenseType>();
    public DbSet<TripExpense> TripExpenses => Set<TripExpense>();
    public DbSet<TripExpenseDetail> TripExpenseDetails => Set<TripExpenseDetail>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Branch>(entity =>
        {
            entity.ToTable("Branches");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Code).HasMaxLength(50).IsRequired();
            entity.Property(x => x.Name).HasMaxLength(255).IsRequired();
            entity.Property(x => x.PhoneNumber).HasMaxLength(20);
            entity.HasIndex(x => x.Code).IsUnique();

            entity.HasData(new Branch
            {
                Id = AppSeedData.DefaultBranchId,
                Code = "HQ",
                Name = "Head Quarter",
                Address = "Default Branch",
                PhoneNumber = "0000000000",
                IsActive = true,
                CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                CreatedBy = "SYSTEM"
            });
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Roles");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Code).HasMaxLength(50).IsRequired();
            entity.Property(x => x.Name).HasMaxLength(100).IsRequired();
            entity.HasIndex(x => x.Code).IsUnique();
            entity.HasData(AppSeedData.Roles);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("Users");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Username).HasMaxLength(100).IsRequired();
            entity.Property(x => x.PasswordHash).HasMaxLength(500).IsRequired();
            entity.Property(x => x.FullName).HasMaxLength(255).IsRequired();
            entity.Property(x => x.Email).HasMaxLength(255);
            entity.Property(x => x.PhoneNumber).HasMaxLength(20);
            entity.HasIndex(x => x.Username).IsUnique();

            entity.HasOne(x => x.Branch)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.BranchId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.ToTable("UserRoles");
            entity.HasKey(x => new { x.UserId, x.RoleId });
            entity.HasOne(x => x.User)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(x => x.Role)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => x.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Route>(entity =>
        {
            entity.ToTable("Routes");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Code).HasMaxLength(50).IsRequired();
            entity.Property(x => x.Name).HasMaxLength(255).IsRequired();
            entity.Property(x => x.FromLocation).HasMaxLength(255).IsRequired();
            entity.Property(x => x.ToLocation).HasMaxLength(255).IsRequired();
            entity.Property(x => x.DistanceKm).HasPrecision(10, 2);
            entity.Property(x => x.BaseTicketPrice).HasPrecision(18, 2);
            entity.HasIndex(x => x.Code).IsUnique();
        });

        modelBuilder.Entity<RouteStop>(entity =>
        {
            entity.ToTable("RouteStops");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.StopName).HasMaxLength(255).IsRequired();
            entity.Property(x => x.StopType).HasMaxLength(50).IsRequired();
            entity.HasIndex(x => new { x.RouteId, x.StopOrder }).IsUnique();

            entity.HasOne(x => x.Route)
                .WithMany(x => x.Stops)
                .HasForeignKey(x => x.RouteId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Vehicle>(entity =>
        {
            entity.ToTable("Vehicles");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Code).HasMaxLength(50).IsRequired();
            entity.Property(x => x.PlateNumber).HasMaxLength(50).IsRequired();
            entity.Property(x => x.VehicleType).HasMaxLength(100).IsRequired();
            entity.Property(x => x.Status).HasMaxLength(50).IsRequired();
            entity.HasIndex(x => x.Code).IsUnique();
            entity.HasIndex(x => x.PlateNumber).IsUnique();

            entity.HasOne(x => x.Branch)
                .WithMany(x => x.Vehicles)
                .HasForeignKey(x => x.BranchId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.ToTable("Employees");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Code).HasMaxLength(50).IsRequired();
            entity.Property(x => x.FullName).HasMaxLength(255).IsRequired();
            entity.Property(x => x.EmployeeType).HasMaxLength(50).IsRequired();
            entity.Property(x => x.Status).HasMaxLength(50).IsRequired();
            entity.HasIndex(x => x.Code).IsUnique();

            entity.HasOne(x => x.Branch)
                .WithMany(x => x.Employees)
                .HasForeignKey(x => x.BranchId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Trip>(entity =>
        {
            entity.ToTable("Trips");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.TripCode).HasMaxLength(50).IsRequired();
            entity.Property(x => x.BaseTicketPriceSnapshot).HasPrecision(18, 2);
            entity.Property(x => x.Status).HasMaxLength(50).IsRequired();
            entity.HasIndex(x => x.TripCode).IsUnique();

            entity.HasOne(x => x.Branch)
                .WithMany(x => x.Trips)
                .HasForeignKey(x => x.BranchId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Route)
                .WithMany(x => x.Trips)
                .HasForeignKey(x => x.RouteId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Vehicle)
                .WithMany(x => x.Trips)
                .HasForeignKey(x => x.VehicleId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Driver)
                .WithMany(x => x.DriverTrips)
                .HasForeignKey(x => x.DriverId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Assistant)
                .WithMany(x => x.AssistantTrips)
                .HasForeignKey(x => x.AssistantId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<TripStatusHistory>(entity =>
        {
            entity.ToTable("TripStatusHistories");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.OldStatus).HasMaxLength(50).IsRequired();
            entity.Property(x => x.NewStatus).HasMaxLength(50).IsRequired();
            entity.Property(x => x.Note).HasMaxLength(500);

            entity.HasOne(x => x.Trip)
                .WithMany(x => x.StatusHistories)
                .HasForeignKey(x => x.TripId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(x => x.ChangedByUser)
                .WithMany(x => x.TripStatusChanges)
                .HasForeignKey(x => x.ChangedBy)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<RevenueType>(entity =>
        {
            entity.ToTable("RevenueTypes");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Code).HasMaxLength(50).IsRequired();
            entity.Property(x => x.Name).HasMaxLength(100).IsRequired();
            entity.HasIndex(x => x.Code).IsUnique();
            entity.HasData(AppSeedData.RevenueTypes);
        });

        modelBuilder.Entity<TripRevenue>(entity =>
        {
            entity.ToTable("TripRevenues");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.RevenueSourceType).HasMaxLength(50).IsRequired();
            entity.Property(x => x.TotalAmount).HasPrecision(18, 2);
            entity.HasIndex(x => x.TripId).IsUnique();

            entity.HasOne(x => x.Trip)
                .WithOne(x => x.TripRevenue)
                .HasForeignKey<TripRevenue>(x => x.TripId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<TripRevenueDetail>(entity =>
        {
            entity.ToTable("TripRevenueDetails");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Amount).HasPrecision(18, 2);

            entity.HasOne(x => x.TripRevenue)
                .WithMany(x => x.Details)
                .HasForeignKey(x => x.TripRevenueId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(x => x.RevenueType)
                .WithMany(x => x.TripRevenueDetails)
                .HasForeignKey(x => x.RevenueTypeId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<ExpenseType>(entity =>
        {
            entity.ToTable("ExpenseTypes");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Code).HasMaxLength(50).IsRequired();
            entity.Property(x => x.Name).HasMaxLength(100).IsRequired();
            entity.HasIndex(x => x.Code).IsUnique();
            entity.HasData(AppSeedData.ExpenseTypes);
        });

        modelBuilder.Entity<TripExpense>(entity =>
        {
            entity.ToTable("TripExpenses");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.TotalAmount).HasPrecision(18, 2);
            entity.HasIndex(x => x.TripId).IsUnique();

            entity.HasOne(x => x.Trip)
                .WithOne(x => x.TripExpense)
                .HasForeignKey<TripExpense>(x => x.TripId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<TripExpenseDetail>(entity =>
        {
            entity.ToTable("TripExpenseDetails");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Amount).HasPrecision(18, 2);

            entity.HasOne(x => x.TripExpense)
                .WithMany(x => x.Details)
                .HasForeignKey(x => x.TripExpenseId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(x => x.ExpenseType)
                .WithMany(x => x.TripExpenseDetails)
                .HasForeignKey(x => x.ExpenseTypeId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        base.OnModelCreating(modelBuilder);
    }
}
