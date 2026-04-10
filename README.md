# Bus Operator Fullstack Project

## 1. Gioi thieu
Du an quan ly nha xe gom:
- Backend: ASP.NET Core Web API + EF Core + SQL Server + FluentValidation + Serilog + Swagger
- Frontend: Next.js + TypeScript + Tailwind + TanStack Query + React Hook Form

Muc tieu tai lieu nay: clone ve may moi, copy config mau, migrate DB, chay duoc ngay ma khong can sua code.

## 2. Tech stack
- Backend: .NET 10, ASP.NET Core Web API, EF Core 10, SQL Server, FluentValidation, Serilog, Swagger
- Frontend: Next.js 14, React 18, TypeScript, TailwindCSS, TanStack Query, React Hook Form
- DevOps: PowerShell scripts, Docker (optional)

## 3. Yeu cau moi truong
- .NET SDK: 10.0.x
- Node.js: 20.x (khuyen nghi LTS)
- SQL Server: SQL Server 2019+ (hoac SQL Server Express/Developer)
- (Optional) Docker Desktop + docker compose v2

## 4. Setup backend
1. Mo terminal tai thu muc root du an.
2. Chuyen vao backend API project:
   ```powershell
   cd backend/src/BusOperator.Api
   ```
3. Tao file config local tu file mau:
   ```powershell
   Copy-Item appsettings.example.json appsettings.json
   ```
4. Chinh `ConnectionStrings:DefaultConnection` va `Jwt:Key` trong `appsettings.json`.
5. Quay lai root va migrate database:
   ```powershell
   cd ../../..
   .\scripts\db-init.ps1
   ```
6. Chay backend:
   ```powershell
   .\scripts\run-backend.ps1
   ```

## 5. Setup frontend
1. Chuyen vao frontend:
   ```powershell
   cd frontend
   ```
2. Tao env local tu file mau:
   ```powershell
   Copy-Item .env.local.example .env.local
   ```
3. Neu backend khong chay o `http://localhost:5000` thi sua `NEXT_PUBLIC_API_BASE_URL`.
4. Quay lai root va chay frontend:
   ```powershell
   cd ..
   .\scripts\run-frontend.ps1
   ```

## 6. Login mac dinh
- username: `admin`
- password: `admin123`

Tai khoan nay duoc seed tu backend khi migrate/chay lan dau.

## 7. Ports
- backend: `http://localhost:5000`
- frontend: `http://localhost:3000`
- swagger: `http://localhost:5000/swagger`

## 8. Scripts nhanh
- Khoi tao DB: `./scripts/db-init.ps1`
- Chay backend: `./scripts/run-backend.ps1`
- Chay frontend: `./scripts/run-frontend.ps1`
- Chay ca 2 service: `./scripts/run-all.ps1`

## 9. Config files quan trong
### Backend
- `backend/src/BusOperator.Api/appsettings.example.json`: mau config de clone may moi
- `backend/src/BusOperator.Api/appsettings.json`: config thuc te (copy tu example)
- `backend/src/BusOperator.Api/appsettings.Development.json`: optional cho local override
- `backend/src/BusOperator.Api/appsettings.Production.json`: optional cho production override

### Frontend
- `frontend/.env.local.example`: mau env
- `frontend/.env.local`: env local thuc te (khong commit)

## 10. Database va seed data
Project da co EF migration dau tien: `InitialCreate`.

Khi chay `db-init.ps1` hoac backend startup:
- DB se duoc migrate
- Seed data duoc tao:
  - Roles
  - RevenueTypes
  - ExpenseTypes
  - Admin user

## 11. Fix cac van de thuong gap
### 11.1 CORS loi tren frontend
- Dam bao backend `Cors:AllowedOrigins` co `http://localhost:3000`
- Dam bao frontend chay dung port 3000

### 11.2 Swagger khong gui JWT
- Vao `/swagger`, bam `Authorize`
- Nhap token theo format: `Bearer <token>`

### 11.3 Frontend goi sai API URL
- Kiem tra `frontend/.env.local`
- Bien dung: `NEXT_PUBLIC_API_BASE_URL=http://localhost:5000`
- Restart frontend sau khi doi env

### 11.4 Database chua migrate
- Chay lai:
  ```powershell
  .\scripts\db-init.ps1
  ```

### 11.5 dotnet-ef chua cai
`db-init.ps1` se tu cai `dotnet-ef` global neu may chua co.

## 12. Docker (optional)
Da cung cap:
- `backend/src/BusOperator.Api/Dockerfile`
- `frontend/Dockerfile`
- `docker-compose.yml`

Chay:
```powershell
docker compose up --build
```

Sau khi chay:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- SQL Server: `localhost:1433`

## 13. Quy trinh onboarding de xac nhan runnable
1. Clone source.
2. Backend: copy `appsettings.example.json` -> `appsettings.json`, cap nhat connection string + jwt key.
3. Frontend: copy `.env.local.example` -> `.env.local`.
4. Chay `./scripts/db-init.ps1`.
5. Chay backend/frontend bang scripts.
6. Dang nhap tai frontend bang `admin/admin123`.

Neu dung cac buoc tren, khong can sua code de chay tren may moi.
