import React, { useEffect, useState } from "react";
import { RiEyeFill, RiHeartFill, RiSendPlane2Fill } from "react-icons/ri";
import { TfiBookmark } from "react-icons/tfi";
import { fetchUser } from "../api_fetch/users";
import fetchVideos, { fetchVideo } from "../api_fetch/videos";
import { useParams } from "react-router-dom";
import { SmallVideoComponent } from "./VideoComponent";
import apiUrl from "../api_fetch/api_url";

const WatchingVideo = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState({});
    const [username, setUsername] = useState('');
    const [subcount, setSubcount] = useState(0);
    const [subscribed, setSubscribed] = useState(false);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [TypeOfAccount, setTypeOfAccount] = useState('User'); // ['Official', 'User', 'Dev', 'Creator', 'Artist']
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function getVideos() {
            try {
                const fetchedVideos = await fetchVideos();
                setVideos(fetchedVideos);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        }
        getVideos();
    }, []);

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
                const userPic = userdata.image_url;
                const userBanner = userdata.banner_url;
                const userSubcount = userdata.SubCount;
                const userSubscribed = userdata.subscribed;
                const userLiked = userdata.liked;
                const userBookmarked = userdata.bookmarked;
                const userTypeOfAccount = userdata.AccountType;
                setSubcount(userSubcount);
                setSubscribed(userSubscribed);
                setLiked(userLiked);
                setBookmarked(userBookmarked);
                setTypeOfAccount(userTypeOfAccount);
                setUsername(userdata.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        getUser();
    }, [video.user_id]);

    return (
        <div className="watchingvideo w-full h-full flex flex-col md:flex-row gap-5">
            <div className="viddescom w-full h-full flex flex-col md:px-2">
                <div className="video-container w-full h-full flex flex-col md:p-3">
                    <div className="video w-full md:w-[800px] md:h-[450px] bg-gray-300 rounded-md shadow-md">
                        <video 
                            src={`${apiUrl}/${video.link}`}
                            id={`video-${video.id}`}
                            controls
                            className="block w-full h-full object-cover rounded-md"
                        />
                    </div>
                    <div className="video-info mt-5 px-3 md:px-0">
                        <div className="titles">
                            <h1 className="text-2xl font-bold">{video.title}</h1>
                        </div>
                        <div className="info flex justify-between items-center mt-2">
                            <div className="user flex items-center">
                                <div className="userprofile w-14 h-14 rounded-full overflow-hidden shadow-xl p-2">
                                    <img
                                        src={`${apiUrl}/users/${video.user_id}/image`}
                                        alt="user"
                                        className="w-full h-full object-cover rounded-full "
                                    />
                                </div>
                                <div className="user-info flex flex-col">
                                    <div className="name-status flex items-center gap-2 flex-row">
                                        <p className="text-lg font-semibold ml-2">{username}</p>
                                        <p className="text-xs font-semibold">{TypeOfAccount}</p>
                                    </div>
                                    <div className="subcount flex items-center ml-2">
                                        <p className="md:text-lg text-xs md:ml-2">{subcount} <span className="text-xs">Subscribers</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="stats-subs flex items-center gap-4">
                                <div className="video-stats flex flex-row md:gap-5 gap-2">
                                    <div className="views flex items-center justify-center flex-col">
                                        <RiEyeFill className="md:text-3xl text-xl text-purple-300" />
                                        <p className="md:text-lg text-sm">{video.view_count}</p>
                                    </div>
                                    <div className="likes flex items-center justify-center flex-col">
                                        <RiHeartFill className="md:text-3xl text-xl text-red-600" />
                                        <p className="md:text-lg text-sm">{video.like_count}</p>
                                    </div>
                                    <div className="dislikes flex items-center justify-center flex-col">
                                        <TfiBookmark className="md:text-3xl text-xl text-purple-400" />
                                        <p className="md:text-lg text-sm">{video.dislike_count}</p>
                                    </div>
                                </div>
                                <div className="subscribe-btn">
                                    <button className="w-28 h-8 md:w-44 md:h-12 bg-purple-300 text-white font-semibold rounded-md">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="description w-full h-full p-3 rounded-md shadow-xs mt-5">
                    <p className="text-base p-3">{video.description}</p>
                </div>
                <div className="comments w-full h-full bg-gray-100 rounded-md shadow-md mt-5 py-5 px-2">
                    <h1 className="text-2xl font-bold text-center">Comments</h1>
                    <div className="comment-input w-full h-20 flex items-center justify-center">
                        <input 
                            type="text" 
                            placeholder="Write a comment..." 
                            className="w-[500px] h-[40px] border border-gray-400 rounded-3xl px-5 focus:outline-none transition-all duration-300"
                        />
                        <button 
                            className="bg-purple-300 text-white h-[40px] w-[50px] rounded-3xl ml-3 flex items-center justify-center"
                        >
                            <RiSendPlane2Fill />
                        </button>
                    </div>
                    <div className="comment-list w-full h-full flex flex-col gap-5 p-3">
                        <div className="comment w-full h-20 flex items-center gap-5">
                            <div className="userprofile w-14 h-14 rounded-full overflow-hidden shadow-xl p-2">
                                <img
                                    src={`${apiUrl}/users/${video.user_id}/image`}
                                    alt="user"
                                    className="w-full h-full object-cover rounded-full "
                                />
                            </div>
                            <div className="comment-info flex flex-col">
                                <div className="name-status flex items-center gap-2 flex-row">
                                    <p className="text-lg font-semibold ml-2">{username}</p>
                                    <p className="text-lg font-semibold">{TypeOfAccount}</p>
                                </div>
                                <div className="comment-text">
                                    <p className="text-base">This is a comment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="other-videos w-full h-full flex flex-col">
                <h1 className="text-2xl font-bold text-center">Other Videos</h1>
                <div className="other-videos-list w-full h-full flex flex-col gap-5">
                    {videos.map(video => (
                        <SmallVideoComponent key={video.id} video={video} />
                    ))}
                    {videos.map(video => (
                        <SmallVideoComponent key={video.id} video={video} />
                    ))}
                </div>
            </div>   
        </div>
    );
};

export default WatchingVideo;
