using System.Linq.Expressions;
using System.Net;
using BusOperator.Application.Common;
using BusOperator.Application.DTOs.Employees;
using BusOperator.Application.Interfaces;
using BusOperator.Domain.Entities;
using BusOperator.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BusOperator.Infrastructure.Services;

public class EmployeeService(AppDbContext dbContext, ICurrentUserContext currentUserContext) : IEmployeeService
{
    public async Task<IReadOnlyCollection<EmployeeResponse>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await dbContext.Employees.AsNoTracking()
            .OrderBy(x => x.Code)
            .Select(ToResponseExpr)
            .ToListAsync(cancellationToken);
    }

    public async Task<EmployeeResponse> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await dbContext.Employees.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(ToResponseExpr)
            .FirstOrDefaultAsync(cancellationToken)
            ?? throw new AppException("Employee not found.", HttpStatusCode.NotFound);
    }

    public async Task<EmployeeResponse> CreateAsync(EmployeeCreateRequest request, CancellationToken cancellationToken = default)
    {
        if (!await dbContext.Branches.AnyAsync(x => x.Id == request.BranchId, cancellationToken))
        {
            throw new AppException("Branch not found.", HttpStatusCode.NotFound);
        }

        if (await dbContext.Employees.AnyAsync(x => x.Code == request.Code, cancellationToken))
        {
            throw new AppException("Employee code already exists.", HttpStatusCode.Conflict);
        }

        var entity = new Employee
        {
            BranchId = request.BranchId,
            Code = request.Code,
            FullName = request.FullName,
            PhoneNumber = request.PhoneNumber,
            EmployeeType = request.EmployeeType,
            LicenseNumber = request.LicenseNumber,
            LicenseClass = request.LicenseClass,
            HireDate = request.HireDate,
            Status = request.Status,
            IsActive = request.IsActive,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = AuditHelper.Actor(currentUserContext)
        };

        dbContext.Employees.Add(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return await GetByIdAsync(entity.Id, cancellationToken);
    }

    public async Task<EmployeeResponse> UpdateAsync(int id, EmployeeUpdateRequest request, CancellationToken cancellationToken = default)
    {
        var entity = await dbContext.Employees.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
            ?? throw new AppException("Employee not found.", HttpStatusCode.NotFound);

        if (!await dbContext.Branches.AnyAsync(x => x.Id == request.BranchId, cancellationToken))
        {
            throw new AppException("Branch not found.", HttpStatusCode.NotFound);
        }

        if (await dbContext.Employees.AnyAsync(x => x.Code == request.Code && x.Id != id, cancellationToken))
        {
            throw new AppException("Employee code already exists.", HttpStatusCode.Conflict);
        }

        entity.BranchId = request.BranchId;
        entity.Code = request.Code;
        entity.FullName = request.FullName;
        entity.PhoneNumber = request.PhoneNumber;
        entity.EmployeeType = request.EmployeeType;
        entity.LicenseNumber = request.LicenseNumber;
        entity.LicenseClass = request.LicenseClass;
        entity.HireDate = request.HireDate;
        entity.Status = request.Status;
        entity.IsActive = request.IsActive;
        entity.UpdatedAt = DateTime.UtcNow;
        entity.UpdatedBy = AuditHelper.Actor(currentUserContext);

        await dbContext.SaveChangesAsync(cancellationToken);
        return await GetByIdAsync(entity.Id, cancellationToken);
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var entity = await dbContext.Employees.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
            ?? throw new AppException("Employee not found.", HttpStatusCode.NotFound);

        dbContext.Employees.Remove(entity);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private static readonly Expression<Func<Employee, EmployeeResponse>> ToResponseExpr = x => new EmployeeResponse
    {
        Id = x.Id,
        BranchId = x.BranchId,
        Code = x.Code,
        FullName = x.FullName,
        PhoneNumber = x.PhoneNumber,
        EmployeeType = x.EmployeeType,
        LicenseNumber = x.LicenseNumber,
        LicenseClass = x.LicenseClass,
        HireDate = x.HireDate,
        Status = x.Status,
        IsActive = x.IsActive
    };
}
