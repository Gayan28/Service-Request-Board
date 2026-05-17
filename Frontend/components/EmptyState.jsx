import { SearchX } from "lucide-react";

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      
      <SearchX size={60} className="text-slate-500 mb-4" />

      <h2 className="text-2xl font-semibold text-slate-400">
        {message}
      </h2>
    </div>
  );
}