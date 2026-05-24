import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Navbar() {
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Галерея" },
    { to: "/categories", label: "Категории" },
    { to: "/favorites", label: "Избранное" },
  ];

  return (
    <header
      style={{ background: "var(--gallery-dark)", borderBottom: "1px solid var(--gallery-border)" }}
      className="sticky top-0 z-40 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl" style={{ color: "var(--gallery-gold)" }}>
            ✦
          </span>
          <span
            className="font-display text-xl tracking-widest uppercase"
            style={{ color: "var(--gallery-text)" }}
          >
            Галерея
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-item text-sm tracking-wide uppercase ${pathname === to ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link to="/favorites" className="relative">
          <Icon name="Bookmark" size={20} style={{ color: "var(--gallery-muted)" }} />
        </Link>
      </div>
    </header>
  );
}
