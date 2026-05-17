export default function EmptyState({ message }) {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold text-slate-400">
        {message}
      </h2>
    </div>
  );
}