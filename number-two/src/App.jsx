import { useState } from "react";
import "./index.css";
// Individual imports for each component used in this sample
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-search";

// Core API import
import Graphic from "@arcgis/core/Graphic.js";

function App() {
  const handleViewReady = (event) => {
    const viewElement = event.target;

    const point = {
      type: "point",
      longitude: -73.9856644,
      latitude: 40.7484405,
    };

    const markerSymbol = {
      type: "simple-marker",
      style: "triangle",
      size: 15,
      color: "red",
      outline: {
        color: "white",
        width: 2,
      },
    };

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
    });

    viewElement.graphics.add(pointGraphic);
  };

  return (
    <arcgis-map
      item-id="15ec06d72ad541af89ae3440b9bf6337"
      onarcgisViewReadyChange={handleViewReady}
      center="-73.9856644, 40.7484405"
      zoom="10"
    >
      <arcgis-zoom position="top-left" />
      <arcgis-search position="top-right" />
      <arcgis-legend position="bottom-left" />
    </arcgis-map>
  );
}

export default App;
