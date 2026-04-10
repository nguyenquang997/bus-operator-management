# Bus Operator Admin Frontend (Phase 1)

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query
- React Hook Form

## Environment
Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

## Run local
```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Main routes
- `/login`
- `/dashboard`
- `/routes`
- `/routes/new`
- `/routes/[id]/edit`
- `/routes/[id]/stops`
- `/vehicles`
- `/vehicles/new`
- `/vehicles/[id]/edit`
- `/employees`
- `/employees/new`
- `/employees/[id]/edit`
- `/trips`
- `/trips/new`
- `/trips/[id]`
- `/trips/[id]/edit`
- `/trips/[id]/revenue`
- `/trips/[id]/expense`
- `/reports/trips`

## Structure
- `app/` routes + layouts
- `components/` reusable UI/layout
- `context/` auth + toast providers
- `features/` module forms
- `hooks/queries/` tanstack query hooks
- `services/` API clients per module
- `types/` domain types
- `utils/` formatter helpers
