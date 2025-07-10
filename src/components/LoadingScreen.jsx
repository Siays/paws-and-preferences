import React from "react";
import "./LoadingScreen.css";
import nyanGif from './assets/nyan-cat.gif';

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <img
        src={nyanGif}
        alt="Nyan Cat Loading .gif"
        className="nyan-cat"
        draggable="false"
      />
      <p className="loading-text">Your furr paws incoming</p>
    </div>
  );
};

export default LoadingScreen;
