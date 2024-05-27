export default async function fetchVideos() {
    try {
        const response = await fetch('http://localhost:3000/videos/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
}

export async function fetchVideo(id) {
    try {
        const response = await fetch(`http://localhost:3000/videos/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching video:', error);
        return null;
    }
}

export async function fetchVideoComments(id) {
    try {
        const response = await fetch(`http://localhost:3000/videos/${id}/comments`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching video comments:', error);
        return null;
    }
}

export async function uploadVideofunc(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        const response = await fetch('http://localhost:3000/videos/add', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
    } catch (error) {
        console.error('Error uploading video:', error);
    }
}

export async function getThumbnail(id) {
    try {
        const response = await fetch(`http://localhost:3000/thumbnail/${id}`);
        const data = await response.blob();
        return URL.createObjectURL(data);
    } catch (error) {
        console.error('Error fetching thumbnail:', error);
        return null;
    }
}
