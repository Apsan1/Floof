import React from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import VideoComponent from './components/VideoComponent';
import fetchUsers from './api_fetch/users.jsx';

const videosprops = [
  {
    id: 1,
    title: 'People Playing Football',
    channelName: 'FEFA',
    views : '10M+ views',
    path: '/video/football.mp4',
    thumbnail: 'https://cdn.britannica.com/69/228369-050-0B18A1F6/Asian-Cup-Final-2019-Hasan-Al-Haydos-Qatar-Japan-Takumi-Minamino.jpg'
  },
];

function App() {
  fetchUsers();
  return (
    <>
      <div className="layout h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-1 h-full">
          <div className="sidebar w-[180px] h-[93vh] border-r-2">
            <Sidebar />
          </div>
          <div className="main flex-1 h-full overflow-auto">
            <div className="videos grid grid-cols-4 gap-5 p-5">
              {videosprops.map(video => (
                <VideoComponent key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
