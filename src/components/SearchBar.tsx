import Icon from "@/components/ui/icon";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative w-full max-w-xl">
      <Icon
        name="Search"
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: "var(--gallery-muted)" }}
      />
      <input
        type="text"
        placeholder="Поиск по названию, автору или тегу..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input w-full pl-10 pr-10 py-3 rounded-lg text-sm"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--gallery-muted)" }}
        >
          <Icon name="X" size={14} />
        </button>
      )}
    </div>
  );
}
