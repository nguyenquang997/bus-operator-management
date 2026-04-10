using System.Linq.Expressions;
using System.Net;
using BusOperator.Application.Common;
using BusOperator.Application.DTOs.Vehicles;
using BusOperator.Application.Interfaces;
using BusOperator.Domain.Entities;
using BusOperator.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BusOperator.Infrastructure.Services;

public class VehicleService(AppDbContext dbContext, ICurrentUserContext currentUserContext) : IVehicleService
{
    public async Task<IReadOnlyCollection<VehicleResponse>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await dbContext.Vehicles.AsNoTracking()
            .OrderBy(x => x.Code)
            .Select(ToResponseExpr)
            .ToListAsync(cancellationToken);
    }

    public async Task<VehicleResponse> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await dbContext.Vehicles.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(ToResponseExpr)
            .FirstOrDefaultAsync(cancellationToken)
            ?? throw new AppException("Vehicle not found.", HttpStatusCode.NotFound);
    }

    public async Task<VehicleResponse> CreateAsync(VehicleCreateRequest request, CancellationToken cancellationToken = default)
    {
        if (!await dbContext.Branches.AnyAsync(x => x.Id == request.BranchId, cancellationToken))
        {
            throw new AppException("Branch not found.", HttpStatusCode.NotFound);
        }

        await EnsureUniqueAsync(request.Code, request.PlateNumber, null, cancellationToken);

        var entity = new Vehicle
        {
            BranchId = request.BranchId,
            Code = request.Code,
            PlateNumber = request.PlateNumber,
            VehicleType = request.VehicleType,
            Brand = request.Brand,
            Model = request.Model,
            SeatCount = request.SeatCount,
            YearOfManufacture = request.YearOfManufacture,
            Status = request.Status,
            IsActive = request.IsActive,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = AuditHelper.Actor(currentUserContext)
        };

        dbContext.Vehicles.Add(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return await GetByIdAsync(entity.Id, cancellationToken);
    }

    public async Task<VehicleResponse> UpdateAsync(int id, VehicleUpdateRequest request, CancellationToken cancellationToken = default)
    {
        var entity = await dbContext.Vehicles.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
            ?? throw new AppException("Vehicle not found.", HttpStatusCode.NotFound);

        if (!await dbContext.Branches.AnyAsync(x => x.Id == request.BranchId, cancellationToken))
        {
            throw new AppException("Branch not found.", HttpStatusCode.NotFound);
        }

        await EnsureUniqueAsync(request.Code, request.PlateNumber, id, cancellationToken);

        entity.BranchId = request.BranchId;
        entity.Code = request.Code;
        entity.PlateNumber = request.PlateNumber;
        entity.VehicleType = request.VehicleType;
        entity.Brand = request.Brand;
        entity.Model = request.Model;
        entity.SeatCount = request.SeatCount;
        entity.YearOfManufacture = request.YearOfManufacture;
        entity.Status = request.Status;
        entity.IsActive = request.IsActive;
        entity.UpdatedAt = DateTime.UtcNow;
        entity.UpdatedBy = AuditHelper.Actor(currentUserContext);

        await dbContext.SaveChangesAsync(cancellationToken);
        return await GetByIdAsync(entity.Id, cancellationToken);
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var entity = await dbContext.Vehicles.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
            ?? throw new AppException("Vehicle not found.", HttpStatusCode.NotFound);
        dbContext.Vehicles.Remove(entity);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private async Task EnsureUniqueAsync(string code, string plateNumber, int? ignoreId, CancellationToken cancellationToken)
    {
        if (await dbContext.Vehicles.AnyAsync(x => x.Code == code && (!ignoreId.HasValue || x.Id != ignoreId.Value), cancellationToken))
        {
            throw new AppException("Vehicle code already exists.", HttpStatusCode.Conflict);
        }

        if (await dbContext.Vehicles.AnyAsync(x => x.PlateNumber == plateNumber && (!ignoreId.HasValue || x.Id != ignoreId.Value), cancellationToken))
        {
            throw new AppException("Vehicle plate number already exists.", HttpStatusCode.Conflict);
        }
    }

    private static readonly Expression<Func<Vehicle, VehicleResponse>> ToResponseExpr = x => new VehicleResponse
    {
        Id = x.Id,
        BranchId = x.BranchId,
        Code = x.Code,
        PlateNumber = x.PlateNumber,
        VehicleType = x.VehicleType,
        Brand = x.Brand,
        Model = x.Model,
        SeatCount = x.SeatCount,
        YearOfManufacture = x.YearOfManufacture,
        Status = x.Status,
        IsActive = x.IsActive
    };
}


