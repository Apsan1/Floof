import React, { useState, useEffect } from "react";
import { FiMic } from "react-icons/fi";

function Navbar() {
    const [micState, setMicState] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [dots, setDots] = useState("");

    const clickedmic = () => {
        setMicState(!micState);
        console.log("Mic Clicked");
    }

    useEffect(() => {
        let interval;
        if (hovered) {
            interval = setInterval(() => {
                setDots((prev) => {
                    if (prev.length < 3) {
                        return prev + ".";
                    }
                    return "";
                });
            }, 500); // Change dots every 500ms
        } else {
            setDots(""); // Reset dots when not hovered
        }

        return () => clearInterval(interval);
    }, [hovered]);

    return (
        <div className="navbar w-full h-[60px] bg-white grid grid-cols-3 justify-between items-center px-3 py-2 top-0 z-50">
            <div className="image flex items-center justify-center grid grid-cols-2">
                <img src="/logo/png/logo-black.png" className="h-[50px]" alt="logo" />
            </div>
            <div className="searchbar flex items-center">
                <input 
                    type="text" 
                    placeholder={hovered ? `Search anything${dots}` : "Search"} 
                    className="searchfield w-[500px] h-[40px] border border-gray-400 rounded-3xl px-5 focus:outline-none transition-all duration-300"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                />
                <button 
                    className="bg-white border-[1px] border-gray-400 flex items-center justify-center text-black h-[40px] w-[50px] rounded-3xl ml-3"
                    onClick={clickedmic}
                >
                    <FiMic />
                </button>
            </div>
            {/* <div className="menu flex items-center justify-center">
                <ul className="flex flex-row">
                    <li className="mx-3">Home</li>
                    <li className="mx-3">About</li>
                    <li className="mx-3">Contact</li>
                </ul>
            </div> */}
        </div>
    );
}

export default Navbar;
