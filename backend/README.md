# BusOperator Backend (Phase 1)

## Tech stack
- ASP.NET Core Web API
- EF Core + SQL Server
- FluentValidation
- Serilog
- Swagger/OpenAPI
- JWT Authentication + Role-based Authorization

## Solution structure
- `src/BusOperator.Api`
- `src/BusOperator.Application`
- `src/BusOperator.Domain`
- `src/BusOperator.Infrastructure`

## Prerequisites
- .NET SDK 10.0+
- SQL Server running locally

## Configure
1. Update connection string and JWT settings in `src/BusOperator.Api/appsettings.json`.
2. Optional: change seeded admin credentials in `Seed:Admin`.

## Migration and database
Migration is already created at:
- `src/BusOperator.Infrastructure/Persistence/Migrations/20260329155422_InitialCreate.cs`

Apply database:

```powershell
dotnet ef database update --project src/BusOperator.Infrastructure/BusOperator.Infrastructure.csproj --startup-project src/BusOperator.Api/BusOperator.Api.csproj
```

## Run

```powershell
dotnet run --project src/BusOperator.Api/BusOperator.Api.csproj
```

Swagger URL (development):
- `http://localhost:5000/swagger`

## Default admin
- Username: `admin`
- Password: `Admin@123`

Created automatically on first startup if not exists.
