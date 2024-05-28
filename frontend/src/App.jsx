import React, { useEffect, useState } from 'react';
import './App.css';
import { Sidebar, Bottombar } from './components/sidebar';
import Navbar from './components/navbar';
import VideoComponent from './components/VideoComponent';
import fetchVideos from './api_fetch/videos';

function App() {
  const [videos, setVideos] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showBottombar, setShowBottombar] = useState(false);

  // Use useEffect to fetch videos when component mounts
  useEffect(() => {
    async function getVideos() {
      const fetchedVideos = await fetchVideos();
      setVideos(fetchedVideos);
    }

    getVideos();
  }, []);

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
    <div className="layout h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 h-full">
        {showSidebar && (
          <div className="mainsidebar w-[180px] h-[93vh] border-r-2">
            <Sidebar />
          </div>
        )}
        <div className="main flex-1 h-full overflow-auto">
          <div className="videos flex flex-col md:grid  md:grid-cols-4 gap-y-5 md:gap-y-5 md:gap-x-5 md:p-5">
            {videos.map(video => (
              <VideoComponent key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
      {showBottombar && <Bottombar />}
    </div>
  );
}

export default App;
