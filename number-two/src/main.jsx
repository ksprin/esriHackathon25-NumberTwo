import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import esriConfig from "@arcgis/core/config";

//  global API key
esriConfig.apiKey = import.meta.env.VITE_AGO_KEY;

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)