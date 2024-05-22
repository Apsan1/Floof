import { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import VideoComponent from './components/VideoComponent';

function App() {
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
              <VideoComponent />
              <VideoComponent />
              <VideoComponent />
              <VideoComponent />
              <VideoComponent />
              <VideoComponent />
              <VideoComponent />
              <VideoComponent />
              <VideoComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
