import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Navigation, Plus } from "lucide-react";
import "./index.css";
import "./BathroomCard.jsx";

// Individual imports for each component used in this sample
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-locate";

import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import View from "@arcgis/core/views/View.js";
import Graphic from "@arcgis/core/Graphic.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";

// Simple BathroomCard component using your original BathroomCard.css
function BathroomCard({ title, description, location }) {
    return (
        <div className="bathroom-card" style={{ marginBottom: '12px' }}>
            <div className="card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h1 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#16a34a', fontSize: '12px', fontWeight: '500' }}>Open</span>
                        <div style={{ color: '#eab308', fontSize: '14px' }}>★★★★☆</div>
                    </div>
                </div>
                <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px', lineHeight: '1.4' }}>{description}</p>
                <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '12px' }}>
                    <MapPin style={{ width: '14px', height: '14px', marginRight: '6px' }} />
                    <span>0.2 miles away</span>
                </div>
            </div>
        </div>
    );
}

function App() {
    const defaultCenter = [-73.9856644, 40.7484405];
    const defaultZoom = 10;

    let clickPoint; // Clicked Point on Map

    const [viewPoint, setViewPoint] = useState(null);
    const [addPin, setAddPin] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const locateRef = useRef(null);

    let pointLayer = new GraphicsLayer({
        id: "pointLayer",
    });

    const handleViewReady = (event) => {
        let viewElement = event.target;
        //setViewPoint(viewElement); 
        const view = viewElement.arcgisView;
        viewElement.map.add(pointLayer); // Layer for point
    };

    const recenterMap = () => {
        if (viewPoint) {
            viewPoint.goTo({
                center: defaultCenter,
                zoom: defaultZoom,
            });
        }
    };

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

    // Clear Pin Layer
    function clearGraphics() {
        pointLayer.removeAll(); // Remove graphics from GraphicsLayer
    }

    // Event Listener for dropping pin
    const handleClick = async (event) => {
        clearGraphics();
        clickPoint = event.detail.mapPoint;
        // Pass point to the showPlaces() function
        clickPoint && placePoint(clickPoint);
    };

    // Place point based on click
    async function placePoint(click) {
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
            geometry: click,
            symbol: markerSymbol,
        });

        pointLayer.graphics.add(pointGraphic);
    }

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            width: '100vw',
            fontFamily: 'Helvetica, Arial, sans-serif'
        }}>
            {/* LEFT SIDEBAR */}
            <div style={{
                width: '420px',
                minWidth: '420px',
                maxWidth: '420px',
                height: '100vh',
                background: 'white',
                borderRight: '1px solid #d1d5db',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>

                {/* LOGO AND SEARCH SECTION */}
                <div style={{
                    padding: '24px',
                    borderBottom: '1px solid #e5e7eb',
                    flexShrink: 0
                }}>
                    {/* Logo */}
                    <div style={{ marginBottom: '24px' }}>
                        {/* OPTION 1: Replace with your own image file */}
                        <img
                            src="/logo.png"  // Replace with your image path
                            alt="GottaGo"
                            style={{ height: '48px', width: 'auto' }}
                        />

                        {/* OPTION 2: Or use the original SVG logo */}
                        {/*
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'%3E%3Cpath d='M20 20 Q20 10 30 10 L170 10 Q180 10 180 20 L180 60 Q180 70 170 70 L30 70 Q20 70 20 60 Z' fill='%23D4AF37'/%3E%3Ctext x='100' y='45' text-anchor='middle' font-family='serif' font-size='24' font-weight='bold' fill='%23654321'%3EGottaGo%3C/text%3E%3C/svg%3E"
              alt="GottaGo"
              style={{ height: '48px', width: 'auto' }}
            />
            */}

                        {/* OPTION 3: Or use a simple text logo */}
                        {/*
            <div style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              fontFamily: 'serif'
            }}>
              🚽 GottaGo
            </div>
            */}
                    </div>

                    {/* Search Bar */}
                    <div style={{ position: 'relative' }}>
                        <Search style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#9ca3af',
                            width: '16px',
                            height: '16px'
                        }} />
                        <input
                            type="text"
                            placeholder="Search for a place, address, or location of interest"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px 12px 40px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '14px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>
                </div>

                {/* LOCATIONS HEADER */}
                <div style={{
                    padding: '16px 24px',
                    background: '#f9fafb',
                    borderBottom: '1px solid #e5e7eb',
                    flexShrink: 0
                }}>
                    <h2 style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#111827'
                    }}>
                        Nearby Restrooms (12)
                    </h2>
                </div>

                {/* SCROLLABLE LOCATIONS LIST */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    background: '#f9fafb',
                    padding: '16px',
                    minHeight: 0
                }}>
                    <BathroomCard
                        title="Starbucks Coffee"
                        description="Clean restroom, customer access only"
                        location={[0,0,0]}
                    />
                    <BathroomCard
                        title="Central Park Visitor Center"
                        description="Public restroom, accessible, family-friendly"
                        location={[0,0,0]}
                    />
                    <BathroomCard
                        title="McDonald's"
                        description="Fast food restaurant restroom"
                        location={[0,0,0]}
                    />
                    <BathroomCard
                        title="Public Library"
                        description="Clean public restroom, accessible"
                        location={[0,0,0]}
                    />
                    <BathroomCard
                        title="Gas Station"
                        description="24/7 access, may require key"
                        location={[0,0,0]}
                    />
                    <BathroomCard
                        title="Shopping Mall"
                        description="Large restroom facility"
                        location={[0,0,0]}
                    />
                    <BathroomCard
                        title="City Hall"
                        description="Public access during hours"
                        location={[0,0,0]}
                    />
                </div>

                {/* BOTTOM SECTION */}
                <div style={{
                    padding: '24px',
                    background: 'white',
                    borderTop: '1px solid #e5e7eb',
                    flexShrink: 0
                }}>
                    <p style={{
                        margin: '0 0 16px 0',
                        color: '#4b5563',
                        fontSize: '14px',
                        lineHeight: '1.5'
                    }}>
                        Click to drop a pin and explore available restrooms around you.
                    </p>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={recenterMap}
                            style={{
                                flex: 1,
                                background: '#f3f4f6',
                                border: '1px solid #d1d5db',
                                color: '#374151',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'inherit'
                            }}
                        >
                            <Navigation style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                            Recenter
                        </button>
                        <button
                            onClick={enableAddPinMode}
                            style={{
                                flex: 1,
                                background: '#f3f4f6',
                                border: '1px solid #d1d5db',
                                color: '#374151',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'inherit'
                            }}
                        >
                            <Plus style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                            Toggle Pin Mode
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div style={{
                flex: 1,
                height: '100vh',
                position: 'relative'
            }}>
                <arcgis-map
                    item-id="5fcd777290d04ea2bcaa94a77374eeca"
                    onarcgisViewReadyChange={handleViewReady}
                    onarcgisViewClick={handleClick}  
                    center={defaultCenter.join(",")}
                    zoom={defaultZoom.toString()}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                >
                    <arcgis-zoom position="top-left" />
                    <arcgis-locate ref={locateRef} position="top-left" />
                </arcgis-map>

                {/* Map overlay */}
                {addPin && (
                    <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: '#2563eb',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        zIndex: 1000
                    }}>
                        Click on the map to add a restroom location
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
