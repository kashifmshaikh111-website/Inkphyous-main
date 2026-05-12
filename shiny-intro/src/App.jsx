import React from 'react';
import LogoScene from './components/LogoScene';
import './App.css';

function App() {
    const handleIntroComplete = () => {
        // Redirect to Inkphyous home page after logo zoom completes
        setTimeout(() => {
            window.location.href = 'http://localhost:1122';
        }, 500); // Small delay for smooth transition
    };

    return (
        <div className="app-container">
            <div className="scene-container">
                <LogoScene onIntroComplete={handleIntroComplete} />
            </div>
        </div>
    );
}

export default App;
