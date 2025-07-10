import React from "react";
import CatCard from "./CatCard";

function SwipeDeck({ cats, onSwipe }) {
  return (
    <div style={{ position: "relative", height: 450 }}>
      {cats
        .slice(0)
        .reverse()
        .map((cat, index) => (
          <CatCard
            key={cat.id}
            cat={cat}
            onSwipe={onSwipe}
            isTop={index === cats.length - 1}
          />
        ))}
    </div>
  );
}

export default SwipeDeck;
