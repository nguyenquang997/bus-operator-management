export function LoadingState({ message = "Dang tai du lieu..." }: { message?: string }) {
  return <div className="rounded-md border border-slate-200 bg-white p-6 text-sm text-slate-600">{message}</div>;
}

export function ErrorState({ message = "Co loi xay ra" }: { message?: string }) {
  return <div className="rounded-md border border-red-200 bg-red-50 p-6 text-sm text-red-700">{message}</div>;
}

export function EmptyState({ message = "Khong co du lieu" }: { message?: string }) {
  return <div className="rounded-md border border-slate-200 bg-white p-6 text-sm text-slate-500">{message}</div>;
}
