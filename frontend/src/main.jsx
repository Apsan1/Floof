import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Sidebar, Bottombar}from './components/sidebar';
import Navbar from './components/navbar';
import App from './App.jsx'
import './index.css'
import WatchingVideo from './components/WatchingVideo.jsx'

const WatchingVideoComponent = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showBottombar, setShowBottombar] = useState(false);

  // Use useEffect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 768);
      setShowBottombar(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call handleResize once to set initial state based on window width

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <React.StrictMode>
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]"> {/* Adjusted height for full viewport */}
        {showSidebar && (
          <div className="sidebar w-[180px] h-full border-r-2">
            <Sidebar />
          </div>
        )}
        <div className="main w-full h-full flex flex-col items-center justify-start overflow-y-auto">
          <WatchingVideo />
        </div>
        <Bottombar />
      </div>
    </React.StrictMode>
  );
};

const HomePageComponent = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

const RouterPaths = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageComponent />} />
        <Route path="/watch/:videoId" element={<WatchingVideoComponent />} />
      </Routes>
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<RouterPaths />);
