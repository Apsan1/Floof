export default async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/users/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
}

export async function fetchUser(id) {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export async function fetchUserVideos(id) {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}/videos`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user videos:', error);
        return null;
    }
}