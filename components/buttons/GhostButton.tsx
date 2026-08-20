export default function GhostButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="text-textSecondary px-3 py-2 rounded-md hover:bg-border/40
                 transition-all duration-150"
    >
      {children}
    </button>
  );
}
