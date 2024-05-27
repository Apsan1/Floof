import React, { useEffect, useState } from "react";
import { RiSearchEyeLine } from "react-icons/ri";
import { fetchUser } from "../api_fetch/users";
import { fetchVideo } from "../api_fetch/videos";
import { useParams } from "react-router-dom";

const WatchingVideo = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState({});
    const [username, setUsername] = useState('');

    useEffect(() => {
        async function getVideo() {
            try {
                const fetchedVideo = await fetchVideo(videoId);
                setVideo(fetchedVideo);
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        }

        getVideo();
    }, [videoId]);

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

    return (
        <div className="video-container w-full h-full flex flex-col p-3">
            <div className="video w-[800px] h-[450px] bg-gray-300 rounded-md shadow-md">
                <video 
                    src={`http://localhost:3000/${video.link}`}
                    id={`video-${video.id}`}
                    controls
                    className="block w-full h-full object-cover rounded-md"
                />
            </div>
            <div className="video-info mt-5">
                <h2 className="text-xl font-semibold">{video.title}</h2>
                <p className="text-sm text-gray-500">Uploaded by: {username}</p>
                <p className="text-sm text-gray-500">Views: {video.view_count}</p>
                <p className="text-sm text-gray-500">Likes: {video.like_count}</p>
                <p className="text-sm text-gray-500">Dislikes: {video.dislikes_count}</p>
                <p className="text-sm text-gray-500">Uploaded on: {video.created_date}</p>
            </div>
        </div>
    );
};

export default WatchingVideo;