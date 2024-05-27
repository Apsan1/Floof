import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import App from './App.jsx'
import './index.css'
import WatchingVideo from './components/WatchingVideo.jsx'

const WatchingVideoComponent = () => {
  return(
    <React.StrictMode>
    <Navbar />
    <div className="flex flex-1 h-full">
      <div className="sidebar w-[180px] h-[93vh] border-r-2">
        <Sidebar />
      </div>
    <WatchingVideo />
    </div>
    </React.StrictMode>
  );
}

const HomePageComponent = () => {
  return(
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