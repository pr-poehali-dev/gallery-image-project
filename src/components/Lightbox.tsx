import { useEffect } from "react";
import { GalleryImage } from "@/data/images";
import Icon from "@/components/ui/icon";

interface Props {
  image: GalleryImage | null;
  isLiked: boolean;
  isFavorited: boolean;
  onLike: (id: number) => void;
  onFavorite: (id: number) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  image,
  isLiked,
  isFavorited,
  onLike,
  onFavorite,
  onClose,
  onPrev,
  onNext,
}: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  if (!image) return null;

  return (
    <div
      className="lightbox-bg fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full"
        style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
      >
        <Icon name="X" size={20} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full"
        style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
      >
        <Icon name="ChevronLeft" size={24} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full"
        style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
      >
        <Icon name="ChevronRight" size={24} />
      </button>

      <div
        className="relative max-w-4xl w-full rounded-xl overflow-hidden"
        style={{ background: "var(--gallery-surface)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.url.replace("w=800", "w=1200")}
          alt={image.title}
          className="w-full max-h-[70vh] object-contain"
          style={{ background: "#000" }}
        />

        <div className="p-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold" style={{ color: "var(--gallery-text)" }}>
              {image.title}
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--gallery-muted)" }}>
              {image.author} · {image.category}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {image.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(245,197,24,0.1)",
                    color: "var(--gallery-gold)",
                    border: "1px solid rgba(245,197,24,0.2)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => onLike(image.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg ghost-btn"
            >
              <Icon
                name="Heart"
                size={16}
                className={isLiked ? "liked" : ""}
                style={{ color: isLiked ? "#ff4757" : undefined }}
                fill={isLiked ? "#ff4757" : "none"}
              />
              <span className="text-sm">{image.likes + (isLiked ? 1 : 0)}</span>
            </button>

            <button
              onClick={() => onFavorite(image.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg ghost-btn"
            >
              <Icon
                name={isFavorited ? "Bookmark" : "BookmarkPlus"}
                size={16}
                className={isFavorited ? "favorited" : ""}
              />
              <span className="text-sm">{isFavorited ? "Сохранено" : "Сохранить"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
