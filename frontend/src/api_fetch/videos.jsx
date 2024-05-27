import main from "./api_url";
const apiUrl = main();
// Fetch all videos
export default async function fetchVideos() {
    try {
        const url = `${apiUrl}/videos/all`;
        console.log(url);  // Verify the URL being requested
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true', // Add this header
            }
        });

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

// Fetch a single video by ID
export async function fetchVideo(id) {
    try {
        const response = await fetch(`${apiUrl}/videos/${id}`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true', // Add this header
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching video:', error);
        return null;
    }
}

// Fetch comments for a video by ID
export async function fetchVideoComments(id) {
    try {
        const response = await fetch(`${apiUrl}/videos/${id}/comments`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true', // Add this header
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching video comments:', error);
        return null;
    }
}

// Upload a new video
export async function uploadVideofunc(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
        const response = await fetch(`${apiUrl}/videos/add`, {
            method: 'POST',
            headers: {
                'ngrok-skip-browser-warning': 'true', // Add this header
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading video:', error);
    }
}

// Fetch the thumbnail of a video by ID
export async function getThumbnail(id) {
    try {
        const response = await fetch(`${apiUrl}/thumbnail/${id}`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true', // Add this header
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.blob();
        return URL.createObjectURL(data);
    } catch (error) {
        console.error('Error fetching thumbnail:', error);
        return null;
    }
}
