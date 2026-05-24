import { CATEGORIES } from "@/data/images";

interface Props {
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`cat-chip px-4 py-1.5 rounded-full text-xs tracking-wide uppercase ${
            active === cat ? "active" : ""
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
