import React from "react";
import { RiSearchEyeLine } from "react-icons/ri";

const VideoComponent = ({ video }) => {
    const handleMouseEnter = () => {
        const videoElement = document.getElementById("video-" + video.id);
        const thumbnailImg = document.getElementById("thumbnail-img-" + video.id);
        thumbnailImg.style.display = "none";
        videoElement.style.display = "block";
        videoElement.play();
    };

    const handleMouseLeave = () => {
        const videoElement = document.getElementById("video-" + video.id);
        const thumbnailImg = document.getElementById("thumbnail-img-" + video.id);
        videoElement.style.display = "none";
        thumbnailImg.style.display = "block";
        videoElement.pause();
    };

    return (
        <div className="video-component w-[300px] h-[280px] bg-white shadow-md rounded-md flex flex-col">
            <div className="thumbnail w-full h-[180px] bg-gray-300 rounded-t-md"
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            >
                <img src={video.thumbnail} alt="thumbnail" className="block thumbnail-img w-full h-full object-cover rounded-md" 
                id={`thumbnail-img-${video.id}`}
                />
                <video 
                    id={"video-" + video.id} src={video.path}
                    className="hidden w-full h-full object-cover rounded-md"
                    loop muted
                ></video>
            </div>
            <div className="info p-3">
                <h1 className="text-lg font-semibold">{video.title}</h1>
                <p className="text-sm text-gray-500">{video.channelName}</p>
                <div className="views flex items-center mt-2">
                    <RiSearchEyeLine className="text-gray-500" />
                    <p className="text-sm text-gray-500 ml-2">{video.views}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoComponent;
