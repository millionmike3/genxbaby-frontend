export default function PrimaryButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-electricBlue text-black font-medium px-4 py-2 rounded-md
                 shadow-card hover:bg-electricBlue/90 transition-all duration-150"
    >
      {children}
    </button>
  );
}
