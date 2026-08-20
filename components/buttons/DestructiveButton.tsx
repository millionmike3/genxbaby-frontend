export default function DestructiveButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-danger text-white font-medium px-4 py-2 rounded-md
                 hover:bg-danger/90 transition-all duration-150"
    >
      {children}
    </button>
  );
}
