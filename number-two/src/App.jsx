// App.jsx
import { useState, useEffect } from "react";
import WelcomePage from "./WelcomePage.jsx";
import MainApp from "./MainApp.jsx";
import "./index.css";
import "./BathroomCard.jsx";

function App() {
    const [currentPage, setCurrentPage] = useState('welcome'); // 'welcome' or 'main'

    const handleGetStarted = () => {
        setCurrentPage('main');
        // Add to browser history
        window.history.pushState({ page: 'main' }, '', '/main');
    };

    const handleBackToWelcome = () => {
        setCurrentPage('welcome');
        // Add to browser history
        window.history.pushState({ page: 'welcome' }, '', '/');
    };

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = (event) => {
            if (event.state && event.state.page) {
                setCurrentPage(event.state.page);
            } else {
                // Default to welcome page if no state
                setCurrentPage('welcome');
            }
        };

        // Set initial state
        window.history.replaceState({ page: currentPage }, '', currentPage === 'welcome' ? '/' : '/main');

        // Listen for browser navigation
        window.addEventListener('popstate', handlePopState);

        // Cleanup
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    if (currentPage === 'welcome') {
        return <WelcomePage onGetStarted={handleGetStarted} />;
    }

    return <MainApp onBackToWelcome={handleBackToWelcome} />;
}

export default App;