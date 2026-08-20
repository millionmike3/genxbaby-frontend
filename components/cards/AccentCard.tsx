export default function AccentCard({ title, children }) {
  return (
    <div className="bg-surface border border-electricBlue rounded-md p-5 shadow-card">
      <h3 className="text-electricBlue font-semibold text-lg">{title}</h3>
      <p className="text-textSecondary text-sm mt-2">{children}</p>
    </div>
  );
}
