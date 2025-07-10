import React from "react";
import "./LoadingScreen.css";


const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <img
        src={`${process.env.PUBLIC_URL}/nyan-cat.gif`}
        alt="Nyan Cat Loading .gif"
        className="nyan-cat"
        draggable="false"
      />
      <p className="loading-text">Your furr paws incoming</p>
    </div>
  );
};

export default LoadingScreen;
