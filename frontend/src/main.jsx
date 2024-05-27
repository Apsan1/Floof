import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import App from './App.jsx'
import './index.css'
import WatchingVideo from './components/WatchingVideo.jsx'

const WatchingVideoComponent = () => {
  return (
    <React.StrictMode>
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]"> {/* Adjusted height for full viewport */}
        <div className="sidebar w-[180px] h-full border-r-2">
          <Sidebar />
        </div>
        <div className="main w-full h-full flex flex-col items-center justify-start overflow-y-auto">
          <WatchingVideo />
        </div>
      </div>
    </React.StrictMode>
  );
}

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
