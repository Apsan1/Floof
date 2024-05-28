import React, { useEffect, useState } from "react";
import { RiSearchEyeLine } from "react-icons/ri";
import { fetchUser } from "../api_fetch/users";
import { apiUrl, initializeApiUrl } from '../config.js';

if (!apiUrl) {
  await initializeApiUrl();
}

const VideoComponent = ({ video }) => {
    const [username, setUsername] = useState('');
    const [TypeofAccount, setTypeofAccount] = useState('');

    useEffect(() => {
        async function getUser() {
            try {
                const userdata = await fetchUser(video.user_id);
                setTypeofAccount(userdata.AccountType);
                setUsername(userdata.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        getUser();
    }, [video.user_id]);

    const handleMouseEnter = () => {
        const videoElement = document.getElementById(`video-${video.id}`);
        const thumbnailImg = document.getElementById(`thumbnail-img-${video.id}`);
        if (thumbnailImg) {
            thumbnailImg.style.display = "none";
        }
        if (videoElement) {
            videoElement.style.display = "block";
            videoElement.play();
        }
    };

    const handleMouseLeave = () => {
        const videoElement = document.getElementById(`video-${video.id}`);
        const thumbnailImg = document.getElementById(`thumbnail-img-${video.id}`);
        if (videoElement) {
            videoElement.style.display = "none";
            videoElement.pause();
        }
        if (thumbnailImg) {
            thumbnailImg.style.display = "block";
        }
    };

    const onVideoClick = () => {
        window.location.href = `/watch/${video.id}`;
    };

    const userimage = `${apiUrl}/users/${video.user_id}/image`;
    return (
        <div className="video-component w-[300px] h-[280px] bg-white shadow-md rounded-md flex flex-col">
            <div className="thumbnail w-full h-[180px] bg-gray-300 rounded-t-md"
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            >
                <img 
                    src={`${apiUrl}/videos/thumbnail/${video.id}`}
                    alt="thumbnail" 
                    className="block thumbnail-img w-full h-full object-cover rounded-md" 
                    id={`thumbnail-img-${video.id}`}
                    onClick={onVideoClick}
                />
                <video 
                    id={`video-${video.id}`} 
                    src={`${apiUrl}/${video.link}`}
                    className="hidden w-full h-full object-cover rounded-md"
                    loop 
                    muted
                    onClick={onVideoClick}
                >
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="info p-3">
                <div className="title">
                    <h1 className="text-lg font-semibold">{video.title}</h1>
                </div>           
                <div className="user-info flex flex-row gap-3">
                    <div className="user-image w-8 h-8 rounded-full border-2 p-1">
                        <img src={userimage} alt="user" className="w-full h-full rounded-full" />
                    </div>
                <div className="channel-info w-[50%]">
                    <p className="text-sm text-gray-500 font-semibold">{username}</p>
                    <p className="text-xs text-gray-500">{TypeofAccount}</p>
                </div>
                <div className="views flex w-[30%] justify-end mt-2">
                    <RiSearchEyeLine className="text-gray-500" />
                    <p className="text-sm text-gray-500">{video.view_count}</p>
                </div>
                </div>
                
            </div>
        </div>
    );
};

const SmallVideoComponent = ({ video }) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        async function getUser() {
            try {
                const userdata = await fetchUser(video.user_id);
                setUsername(userdata.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        getUser();
    }, [video.user_id]);

    const onVideoClick = () => {
        window.location.href = `/watch/${video.id}`;
    };

    return (
        <div className="video-component w-full h-[150px] bg-white rounded-md flex flex-row p-2">
            <div className="thumbnail w-[200px] h-[135px] bg-gray-300 rounded-md cursor-pointer"
                onClick={onVideoClick}
            >
                <img 
                    src={`${apiUrl}/videos/thumbnail/${video.id}`}
                    alt="thumbnail" 
                    className="block thumbnail-img w-full h-full object-cover rounded-md" 
                    id={`thumbnail-img-${video.id}`}
                />
            </div>
            <div className="info p-3">
                <h1 className="text-lg font-semibold">{video.title}</h1>
                <p className="text-sm text-gray-500">{username}</p>
                <div className="views flex items-center mt-2">
                    <RiSearchEyeLine className="text-gray-500" />
                    <p className="text-sm text-gray-500 ml-2">{video.view_count}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoComponent;
export { SmallVideoComponent };
