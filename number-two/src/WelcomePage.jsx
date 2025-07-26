// WelcomePage.jsx
function WelcomePage({ onGetStarted }) {
    return (
        <>
            {/* Import Google Font */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&display=swap" rel="stylesheet" />

            <div style={{
                minHeight: '100vh',
                background: '#75B2BF',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
                    radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px),
                    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
                    radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                    backgroundSize: '100px 100px, 150px 150px, 120px 120px'
                }} />

                {/* Main Content Container */}
                <div style={{
                    maxWidth: '600px',
                    width: '100%',
                    textAlign: 'center',
                    zIndex: 2,
                    padding: '0 20px'
                }}>
                    {/* Headline */}
                    <h1 style={{
                        fontSize: window.innerWidth <= 768 ? '32px' : '42px',
                        color: '#593A28',
                        marginBottom: '16px',
                        fontWeight: '400',
                        lineHeight: '1.3'
                    }}>
                        Need to get to public restroom quick?
                    </h1>

                    {/* Main Statement */}
                    <h2 style={{
                        fontSize: window.innerWidth <= 768 ? '48px' : '64px',
                        color: '#593A28',
                        marginBottom: '60px',
                        fontWeight: 'normal',
                        fontFamily: '"Bagel Fat One", Georgia, serif',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        We've got you.
                    </h2>

                    {/* Get Started Button */}
                    <button
                        onClick={onGetStarted}
                        style={{
                            background: '#d2691e',
                            color: 'white',
                            border: 'none',
                            padding: window.innerWidth <= 768 ? '16px 32px' : '20px 40px',
                            borderRadius: '50px',
                            fontSize: window.innerWidth <= 768 ? '18px' : '22px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s ease',
                            marginBottom: '80px',
                            fontFamily: 'inherit',
                            transform: 'scale(1)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 12px 25px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                        }}
                    >
                        Click to get started
                    </button>

                    {/* Logo Section */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '16px'
                    }}>
                        {/* Logo Options */}
                        {/* OPTION 1: Use your own logo file (requires logo.png in public folder) */}
                        {/*
                    <img
                        src="/logo.png"
                        alt="GottaGo"
                        style={{ height: window.innerWidth <= 768 ? '40px' : '50px', width: 'auto' }}
                    />
                    */}

                        {/* OPTION 2: Your Custom Logo */}
                        <img
                            src="/DesktopView.png"
                            alt="GottaGo"
                            style={{ height: window.innerWidth <= 768 ? '60px' : '80px', width: 'auto' }}
                        />

                        {/* OPTION 3: Toilet Icon + Text (current fallback) */}
                        {/*
                    <div style={{
                        fontSize: window.innerWidth <= 768 ? '40px' : '50px',
                        background: '#f7fafc',
                        borderRadius: '12px',
                        padding: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                        🚽
                    </div>

                    <div>
                        <h1 style={{
                            fontSize: window.innerWidth <= 768 ? '32px' : '42px',
                            color: '#8b4513',
                            margin: 0,
                            fontWeight: 'bold',
                            fontFamily: 'Georgia, serif',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            GottaGo
                        </h1>
                        <p style={{
                            fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                            color: '#4a5568',
                            margin: 0,
                            fontStyle: 'italic'
                        }}>
                            where to go when<br />you gotta go
                        </p>
                    </div>
                    */}
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '12px',
                    zIndex: 2
                }}>
                    Find clean, accessible restrooms near you
                </div>
            </div>
        </>
    );
}


export default WelcomePage;