export default function Loader() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="skeleton"></div>
        ))}
    </div>
  );
}