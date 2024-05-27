import main from "./api_url";
const apiUrl = main();
// Fetch all users
export default async function fetchUsers() {
    try {
        const response = await fetch(`${apiUrl}/users/all`, {
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
        console.error('Error fetching users:', error);
        return null;
    }
}

// Fetch a single user by ID
export async function fetchUser(id) {
    try {
        const response = await fetch(`${apiUrl}/users/${id}`, {
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
        console.error('Error fetching user:', error);
        return null;
    }
}

// Fetch videos of a user by ID
export async function fetchUserVideos(id) {
    try {
        const response = await fetch(`${apiUrl}/users/${id}/videos`, {
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
        console.error('Error fetching user videos:', error);
        return null;
    }
}
