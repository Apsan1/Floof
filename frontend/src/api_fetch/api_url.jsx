export default async function getAPIURL() {
    try {
        const response = await fetch("http://localhost:3000/apiurl");
        const data = await response.json();
        console.log("API URL fetched:", data.apiUrl); // Print response to console
        return data.apiUrl;
    } catch (error) {
        console.error('Error fetching API URL 3333:', error);
        return "https://healthy-muskox-shortly.ngrok-free.app";
    }
}
