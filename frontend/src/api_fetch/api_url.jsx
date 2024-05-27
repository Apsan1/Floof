async function fetchApiUrl() {
    const response = await fetch("http://localhost:3000/apiurl");
    const data = await response.json();
    return data.apiUrl;
}

async function ApiWorking(apiUrl) {
    try {
        const response = await fetch(`${apiUrl}/users/1`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true', // Add this header
            }
        });
        return true;
    }
    catch (error) {
        console.error('Error fetching users:', error);
        return false;
    }
}

async function main() {
    try {
        const goturl = await fetchApiUrl();
        console.log("API URL is set to " + goturl);
        const isApiWorking = await ApiWorking(goturl);
        if (isApiWorking) {
            console.log("API is working correctly.");

            return goturl;
        } else {
            console.log("API URL is not set correctly.");
            return "http://localhost:3000";
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
export default main;