export default function SecondaryButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-surface border border-border text-textPrimary px-4 py-2
                 rounded-md hover:border-electricBlue transition-all duration-150"
    >
      {children}
    </button>
  );
}
