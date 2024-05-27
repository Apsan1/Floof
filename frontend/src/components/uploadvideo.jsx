import React from "react";
import { uploadVideofunc } from '../api_fetch/videos.jsx';

const UploadVideo = () => {
    return (
        // form to upload video
        <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={uploadVideofunc} className="flex flex-col gap-5 p-5 bg-gray-200 rounded-lg shadow-lg w-96">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" required />
            <label htmlFor="video">Video</label>
            <input type="file" id="video" name="video" required />
            <button type="submit">Upload</button>
        </form>
        </div>
    );
}

export default UploadVideo;