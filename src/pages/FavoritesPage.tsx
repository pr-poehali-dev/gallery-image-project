import { useState } from "react";
import { IMAGES, GalleryImage } from "@/data/images";
import { useGalleryState } from "@/hooks/useGalleryState";
import ImageCard from "@/components/ImageCard";
import Lightbox from "@/components/Lightbox";
import { Link } from "react-router-dom";

const STAGGER = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5", "stagger-6"];

export default function FavoritesPage() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const { likes, favorites, toggleLike, toggleFavorite } = useGalleryState();

  const favImages = IMAGES.filter((img) => favorites.has(img.id));
  const selectedIndex = selected ? favImages.findIndex((i) => i.id === selected.id) : -1;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1" style={{ color: "var(--gallery-text)" }}>
          Избранное
        </h1>
        <p className="text-sm" style={{ color: "var(--gallery-muted)" }}>
          {favImages.length} сохранённых фото
        </p>
      </div>

      {favImages.length === 0 ? (
        <div className="text-center py-24" style={{ color: "var(--gallery-muted)" }}>
          <p className="text-5xl mb-4">🔖</p>
          <p className="text-lg">Пока ничего не сохранено</p>
          <p className="text-sm mt-2 mb-6">
            Нажмите на значок закладки, чтобы добавить фото в избранное
          </p>
          <Link to="/" className="gold-btn px-6 py-2.5 rounded-lg text-sm inline-block">
            Перейти в галерею
          </Link>
        </div>
      ) : (
        <div className="masonry">
          {favImages.map((img, i) => (
            <ImageCard
              key={img.id}
              image={img}
              isLiked={likes.has(img.id)}
              isFavorited={favorites.has(img.id)}
              onLike={toggleLike}
              onFavorite={toggleFavorite}
              onClick={setSelected}
              staggerClass={STAGGER[i % STAGGER.length]}
            />
          ))}
        </div>
      )}

      <Lightbox
        image={selected}
        isLiked={selected ? likes.has(selected.id) : false}
        isFavorited={selected ? favorites.has(selected.id) : false}
        onLike={toggleLike}
        onFavorite={toggleFavorite}
        onClose={() => setSelected(null)}
        onPrev={() => selectedIndex > 0 && setSelected(favImages[selectedIndex - 1])}
        onNext={() => selectedIndex < favImages.length - 1 && setSelected(favImages[selectedIndex + 1])}
      />
    </div>
  );
}
