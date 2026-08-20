export default function InteractiveCard({ title, children }) {
  return (
    <div className="bg-surface border border-border rounded-md p-5 shadow-card
                    transition-all duration-200 hover:border-electricBlue hover:shadow-dropdown">
      <h3 className="text-textPrimary font-medium">{title}</h3>
      <p className="text-textSecondary text-sm mt-2">{children}</p>
    </div>
  );
}
