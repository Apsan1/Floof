import React from "react";
import { RiFireFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { ImBookmark } from "react-icons/im";
import { AiOutlinePlaySquare, AiOutlineClockCircle, AiOutlineUser } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

const Home = () => (
    <div className="flex items-center gap-2">
        <TiHome className="text-black-600 text-2xl" />
        <span>Home</span>
    </div>
);

const Subscriptions = () => (
    <div className="flex items-center gap-2">
        <AiOutlinePlaySquare className="text-purple-600 text-2xl" />
        <span>Subscriptions</span>
    </div>
);

const Live = () => (
    <div className="flex items-center gap-2">
        <RiFireFill className="text-orange-500 text-2xl" />
        <span>Live</span>
    </div>
);

const YourVault = () => (
    <div>
        <span>Your Vault</span>
    </div>
);

const FloofMarks = () => (
    <div className="flex items-center gap-2">
        <ImBookmark className="text-blue-600 text-2xl" />
        <span>FloofMarks</span>
    </div>
);

const LikedVideos = () => (
    <div className="flex items-center gap-2">
        <FaHeart className="text-red-600 text-2xl" />
        <span>Liked Videos</span>
    </div>
);

const Archive = () => (
    <div className="flex items-center gap-2">
        <AiOutlineClockCircle className="text-gray-600 text-2xl" />
        <span>Archive</span>
    </div>
);

const YourProfile = () => (
    <div className="flex items-center gap-2">
        <AiOutlineUser className="text-gray-600 text-2xl" />
        <span>Your Profile</span>
    </div>
);

function Sidebar() {
    return (
        <div className="sidebar w-[180px] h-full bg-white p-5 shadow-lg">
            <div className="menu flex flex-col gap-5">
                <button className="transition-transform hover:scale-105 flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
                    <Home />
                </button>
                <button className="transition-transform hover:scale-105 flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
                    <Subscriptions />
                </button>
                <button className="transition-transform hover:scale-105 flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
                    <Live />
                </button>
                <div className="p-2 rounded">
                    <YourVault />
                </div>
                <button className="transition-transform hover:scale-105 flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
                    <FloofMarks />
                </button>
                <button className="transition-transform hover:scale-105 flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
                    <LikedVideos />
                </button>
                <button className="transition-transform hover:scale-105 flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
                    <Archive />
                </button>
                <button className="transition-transform hover:scale-105 flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
                    <YourProfile />
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
