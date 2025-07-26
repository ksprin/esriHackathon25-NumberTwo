import { useEffect, useRef, useState } from "react";
import "./index.css";
import "./BathroomCard.jsx"
// Individual imports for each component used in this sample
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-locate";


// Core API import
import Graphic from "@arcgis/core/Graphic.js";
import BathroomCard from "./BathroomCard.jsx";

function App() {
  const defaultCenter = [-73.9856644, 40.7484405]; 
  const defaultZoom = 10;

  const [viewPoint, setViewPoint] = useState(null); // Viewpoint set state
  const [addPin, setAddPin] = useState(false);

  const locateRef = useRef(null); // Reference to locate widget

  const handleViewReady = (event) => {
    const viewElement = event.target;
    setViewPoint(viewElement);
    const view = viewElement.arcgisView;
  };

  const recenterMap = () => {
    if (viewPoint) {
      viewPoint.goTo({
        center: defaultCenter,
        zoom: defaultZoom
      })
    }
  }

  // Override default goto behavior
  useEffect(() => {
    if(locateRef.current){
      locateRef.current.goToOverride = (view, options) => {
        options.target.scale = 1500;
        return view.goTo(options.target);
      };
    }
  }, []);

  const enableAddPinMode = () => {
    setAddPin(true);
  };

  return (
    <div className="content">
      <h1 className="title">Gotta Go</h1>
      <div className="navbar">
        <button onClick={() => recenterMap()} className="recenter-button">
          Recenter
        </button>
        <button onClick={() => enableAddPinMode} className="pin-button">
          Toggle Pin Mode
        </button>
      </div>
      <div className="cards">
        <BathroomCard
          title="TEST CARD"
          description="TEST DESCRIPTION BLAH BLAH"
          location={[0,0,0]}
        />
        <BathroomCard
          title="TEST CARD"
          description="TEST DESCRIPTION BLAH BLAH"
          location={[0,0,0]}
        />
        <BathroomCard
          title="TEST CARD"
          description="TEST DESCRIPTION BLAH BLAH"
          location={[0,0,0]}
        />
      </div>
      <div className="map-container">
        <arcgis-map
          item-id="5fcd777290d04ea2bcaa94a77374eeca"
          onarcgisViewReadyChange={handleViewReady}
          center={defaultCenter.join(",")}
          zoom={defaultZoom.toString()}
        >
          <arcgis-zoom position="top-left" />
          <arcgis-locate ref={locateRef} position="top-left" />
        </arcgis-map>
      </div>
    </div> 
  );
}

export default App;
