import { Search, X } from "lucide-react";

export default function AdminSearch({
  value,
  onChange,
  placeholder = "Search",
  label = "Search",
  className = "",
}) {
  return (
    <label className={`relative block w-full sm:max-w-sm ${className}`}>
      <Search
        size={17}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-10 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={`Clear ${label.toLowerCase()}`}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          <X size={15} />
        </button>
      )}
    </label>
  );
}
