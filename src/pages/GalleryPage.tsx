import { useState, useMemo } from "react";
import { IMAGES, GalleryImage } from "@/data/images";
import { useGalleryState } from "@/hooks/useGalleryState";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ImageCard from "@/components/ImageCard";
import Lightbox from "@/components/Lightbox";

const STAGGER = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5", "stagger-6"];

export default function GalleryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Все");
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const { likes, favorites, toggleLike, toggleFavorite } = useGalleryState();

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return IMAGES.filter((img) => {
      const matchCat = category === "Все" || img.category === category;
      const matchQ =
        !q ||
        img.title.toLowerCase().includes(q) ||
        img.author.toLowerCase().includes(q) ||
        img.tags.some((t) => t.includes(q));
      return matchCat && matchQ;
    });
  }, [query, category]);

  const selectedIndex = selected ? filtered.findIndex((i) => i.id === selected.id) : -1;

  const handlePrev = () => {
    if (selectedIndex > 0) setSelected(filtered[selectedIndex - 1]);
  };
  const handleNext = () => {
    if (selectedIndex < filtered.length - 1) setSelected(filtered[selectedIndex + 1]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl mb-1" style={{ color: "var(--gallery-text)" }}>
          Галерея
        </h1>
        <p className="text-sm" style={{ color: "var(--gallery-muted)" }}>
          {filtered.length} {filtered.length === 1 ? "фотография" : "фотографий"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="mb-8">
        <CategoryFilter active={category} onChange={setCategory} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24" style={{ color: "var(--gallery-muted)" }}>
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg">Ничего не найдено</p>
          <p className="text-sm mt-2">Попробуйте другой запрос или категорию</p>
        </div>
      ) : (
        <div className="masonry">
          {filtered.map((img, i) => (
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
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
