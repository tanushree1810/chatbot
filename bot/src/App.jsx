import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ChatbotPage from './pages/ChatbotPage';
import Footer from './components/Footer';
import ShodanReport from './components/ShodanReport';
import CVEReport from './components/CveReport';
import VirusTotalReport from './components/VirusTotal';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`App flex flex-col min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Navbar */}
      <header>
        <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
      </header>

      {/* Main Content */}
      <main className="flex-grow space-y-8 p-4">
        <ChatbotPage />
        <ShodanReport />
        <CVEReport/>
        <VirusTotalReport/>
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
