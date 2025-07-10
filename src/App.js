import React, { useEffect, useState } from "react";
import SwipeDeck from "./components/SwipeDeck";
import LoadingScreen from "./components/LoadingScreen";
import { fetchCats } from "./axios";

function App() {
  const [cats, setCats] = useState([]);
  const [liked, setLiked] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    async function loadCats() {
      setIsLoading(true);

      const data = await fetchCats(20);
      const allowedTypes = ["image/jpeg", "image/png"];

      const filteredCats = data
        .filter((cat) => allowedTypes.includes(cat.mimetype))
        .slice(0, 10)
        .map((cat, i) => ({
          id: cat.id,
          imageUrl: `https://cataas.com/cat/${cat.id}`,
          name: catNames[i % catNames.length],
          description: catDescriptions[i % catDescriptions.length],
        }));

      await Promise.all(
        filteredCats.map(
          (cat) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = cat.imageUrl;
              img.onload = resolve;
              img.onerror = resolve;
            })
        )
      );

      setCats(filteredCats);
      setIsLoading(false);
    }

    loadCats();
  }, []);

  const handleSwipe = (direction, cat) => {
    if (direction === "like") setLiked((prev) => [...prev, cat]);

    setCats((prev) => {
      const next = prev.slice(1);
      if (next.length === 0) setFinished(true);
      return next;
    });
  };

  if (isLoading) return <LoadingScreen />;

  if (finished) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>You liked {liked.length} cat(s)</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {liked.map((cat) => (
            <img
              key={cat.id}
              src={cat.imageUrl}
              alt="liked"
              style={{
                maxWidth: "150px",
                height: "auto",
                objectFit: "contain",
                margin: 10,
                borderRadius: 10,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Paws & Preferences</h1>
      <SwipeDeck cats={cats} onSwipe={handleSwipe} />
    </div>
  );
}

export default App;

const catNames = [
  "Whiskers",
  "Mittens",
  "Tiger",
  "Luna",
  "Shadow",
  "Coco",
  "Smokey",
  "Oreo",
  "Pumpkin",
  "Ziggy",
];

const catDescriptions = [
  "Loves chasing lasers.",
  "Professional napper.",
  "Fierce and fluffy.",
  "Queen of the house.",
  "Always curious.",
  "Knocks things off tables.",
  "Loud meower.",
  "Cuddle expert.",
  "Sunbeam seeker.",
  "Box connoisseur.",
];
