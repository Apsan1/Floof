import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import VideoComponent from './components/VideoComponent';
import fetchVideos from './api_fetch/videos';

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getVideos() {
      const fetchedVideos = await fetchVideos();
      setVideos(fetchedVideos);
    }

    getVideos();
  }, []);

  return (
    <div className="layout h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 h-full">
        <div className="sidebar w-[180px] h-[93vh] border-r-2">
          <Sidebar />
        </div>
        <div className="main flex-1 h-full overflow-auto">
          <div className="videos grid grid-cols-4 gap-5 p-5">
            {videos.map(video => (
              <VideoComponent key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
