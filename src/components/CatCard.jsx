import React from "react";
import { motion, useAnimation } from "framer-motion";
import { FaRegHeart, FaHeartBroken } from "react-icons/fa";

function CatCard({ cat, onSwipe, isTop }) {
  const controls = useAnimation();

  const triggerSwipe = (direction) => {
    const x = direction === "like" ? 1000 : -1000;

    controls
      .start({
        x,
        opacity: 0,
        transition: { duration: 0.4 },
      })
      .then(() => {
        onSwipe(direction, cat);
      });
  };

  return (
    <>
      <motion.div
        animate={controls}
        initial={{ x: 0 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, info) => {
          if (!isTop) return;

          if (info.offset.x > 100) {
            onSwipe("like", cat);
          } else if (info.offset.x < -100) {
            onSwipe("dislike", cat);
          } else {
            controls.start({
              x: 0,
              transition: { type: "spring", stiffness: 300 },
            });
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          margin: "0 auto",

          width: "90vw",
          maxWidth: "320px",
          aspectRatio: "3 / 4",

          borderRadius: 20,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          backgroundImage: `url(${cat.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            color: "white",
            padding: "1rem",
          }}
        >
          <h3>{cat.name}</h3>
          <p>{cat.description}</p>
        </div>
      </motion.div>

      {isTop && (
        <div
          style={{
            position: "absolute",
            top: 440,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            width: "100%",
          }}
        >
          <button
            onClick={() => triggerSwipe("dislike")}
            style={{
              background: "none",
              border: "none",
              fontSize: "2rem",
              color: "gray",
              cursor: "pointer",
            }}
          >
            <FaHeartBroken />
          </button>
          <button
            onClick={() => triggerSwipe("like")}
            style={{
              background: "none",
              border: "none",
              fontSize: "2rem",
              color: "red",
              cursor: "pointer",
            }}
          >
            <FaRegHeart />
          </button>
        </div>
      )}
    </>
  );
}

export default CatCard;
