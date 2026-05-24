import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, IMAGES, GalleryImage } from "@/data/images";
import { useGalleryState } from "@/hooks/useGalleryState";
import ImageCard from "@/components/ImageCard";
import Lightbox from "@/components/Lightbox";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [lightboxPool, setLightboxPool] = useState<GalleryImage[]>([]);
  const { likes, favorites, toggleLike, toggleFavorite } = useGalleryState();

  const cats = CATEGORIES.filter((c) => c !== "Все");

  const handleOpen = (img: GalleryImage, pool: GalleryImage[]) => {
    setSelected(img);
    setLightboxPool(pool);
  };

  const selectedIndex = selected ? lightboxPool.findIndex((i) => i.id === selected.id) : -1;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1" style={{ color: "var(--gallery-text)" }}>
          Категории
        </h1>
        <p className="text-sm" style={{ color: "var(--gallery-muted)" }}>
          {cats.length} категорий
        </p>
      </div>

      <div className="space-y-12">
        {cats.map((cat) => {
          const imgs = IMAGES.filter((img) => img.category === cat).slice(0, 4);
          if (!imgs.length) return null;
          return (
            <section key={cat}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold tracking-wide" style={{ color: "var(--gallery-text)" }}>
                  {cat}
                </h2>
                <button
                  onClick={() => navigate(`/?category=${encodeURIComponent(cat)}`)}
                  className="text-xs ghost-btn px-3 py-1.5 rounded-lg"
                  style={{ color: "var(--gallery-gold)", borderColor: "rgba(245,197,24,0.3)" }}
                >
                  Все →
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imgs.map((img) => (
                  <div key={img.id} className="gallery-card rounded-lg overflow-hidden cursor-pointer fade-in"
                    onClick={() => handleOpen(img, imgs)}>
                    <div className="relative">
                      <img src={img.url} alt={img.title} className="w-full h-48 object-cover" loading="lazy" />
                      <div className="img-overlay absolute inset-0" />
                    </div>
                    <div className="px-3 py-2 flex items-center justify-between"
                      style={{ background: "var(--gallery-surface)" }}>
                      <p className="text-xs truncate" style={{ color: "var(--gallery-text)" }}>{img.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Lightbox
        image={selected}
        isLiked={selected ? likes.has(selected.id) : false}
        isFavorited={selected ? favorites.has(selected.id) : false}
        onLike={toggleLike}
        onFavorite={toggleFavorite}
        onClose={() => setSelected(null)}
        onPrev={() => selectedIndex > 0 && setSelected(lightboxPool[selectedIndex - 1])}
        onNext={() => selectedIndex < lightboxPool.length - 1 && setSelected(lightboxPool[selectedIndex + 1])}
      />
    </div>
  );
}
