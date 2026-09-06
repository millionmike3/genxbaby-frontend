"use client";

interface SplitSectionProps {
  title: string;
  text: string;
  image: string;
  reverse?: boolean;
}

export default function SplitSection({
  title,
  text,
  image,
  reverse = false,
}: SplitSectionProps) {
  return (
    <section className="w-full py-16">
      <div
        className={`mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
          reverse ? "md:grid-flow-dense" : ""
        }`}
      >
        {/* Text Block */}
        <div className={`${reverse ? "md:order-2" : ""} space-y-6`}>
          <h2 className="text-3xl font-bold text-white leading-snug">{title}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{text}</p>
        </div>

        {/* Image Block */}
        <div className={`${reverse ? "md:order-1" : ""} flex justify-center`}>
          <img
            src={image}
            alt={title}
            className="rounded-2xl shadow-xl w-full max-w-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}
