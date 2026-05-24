import { GalleryImage } from "@/data/images";
import Icon from "@/components/ui/icon";

interface Props {
  image: GalleryImage;
  isLiked: boolean;
  isFavorited: boolean;
  onLike: (id: number) => void;
  onFavorite: (id: number) => void;
  onClick: (image: GalleryImage) => void;
  staggerClass?: string;
}

export default function ImageCard({
  image,
  isLiked,
  isFavorited,
  onLike,
  onFavorite,
  onClick,
  staggerClass = "",
}: Props) {
  return (
    <div
      className={`gallery-card masonry-item rounded-lg overflow-hidden cursor-pointer fade-in ${staggerClass}`}
      onClick={() => onClick(image)}
    >
      <div className="relative overflow-hidden">
        <img
          src={image.url}
          alt={image.title}
          className="w-full object-cover"
          loading="lazy"
        />
        <div className="img-overlay absolute inset-0" />

        <div
          className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity duration-300"
          style={{ opacity: "inherit" }}
        >
          <p className="text-white text-sm font-medium truncate">{image.title}</p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
            {image.author}
          </p>
        </div>

        <div
          className="absolute top-2 right-2 flex gap-1.5 opacity-0 transition-opacity duration-300"
          style={{ opacity: "inherit" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onFavorite(image.id)}
            className="p-1.5 rounded-md backdrop-blur-sm"
            style={{ background: "rgba(0,0,0,0.6)" }}
          >
            <Icon
              name={isFavorited ? "Bookmark" : "BookmarkPlus"}
              size={14}
              className={isFavorited ? "favorited" : ""}
              style={{ color: isFavorited ? undefined : "white" }}
            />
          </button>
        </div>
      </div>

      <div
        className="px-3 py-2.5 flex items-center justify-between"
        style={{ background: "var(--gallery-surface)" }}
      >
        <div className="min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: "var(--gallery-text)" }}>
            {image.title}
          </p>
          <p className="text-xs truncate mt-0.5" style={{ color: "var(--gallery-muted)" }}>
            {image.author} · {image.category}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike(image.id);
          }}
          className="flex items-center gap-1 ml-3 shrink-0"
        >
          <Icon
            name="Heart"
            size={14}
            className={isLiked ? "liked" : ""}
            style={{ color: isLiked ? undefined : "var(--gallery-muted)" }}
            fill={isLiked ? "#ff4757" : "none"}
          />
          <span
            className="text-xs tabular-nums"
            style={{ color: isLiked ? "#ff4757" : "var(--gallery-muted)" }}
          >
            {image.likes + (isLiked ? 1 : 0)}
          </span>
        </button>
      </div>
    </div>
  );
}
