import React from "react";
import { RiSearchEyeLine } from "react-icons/ri";

const VideoComponent = () => {
    return (
        <div className="video-component w-[300px] h-[280px] bg-white shadow-md rounded-md flex flex-col">
            <div className="thumbnail w-full h-[180px] bg-gray-300 rounded-t-md">
                <img src="https://via.placeholder.com/300" alt="thumbnail" className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="info p-3">
                <h1 className="text-lg font-semibold">Video Title</h1>
                <p className="text-sm text-gray-500">Channel Name</p>
                <div className="views flex items-center mt-2">
                    <RiSearchEyeLine className="text-gray-500" />
                    <p className="text-sm text-gray-500 ml-2">100k views</p>
                </div>
            </div>
        </div>
    );
};

export default VideoComponent;