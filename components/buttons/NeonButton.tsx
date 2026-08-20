export default function NeonButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-neonGreen text-black font-semibold px-4 py-2 rounded-md
                 shadow-card hover:bg-neonGreen/90 transition-all duration-150"
    >
      {children}
    </button>
  );
}
