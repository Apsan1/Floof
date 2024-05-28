import getAPIURL from './api_fetch/api_url';

let apiUrl;

async function initializeApiUrl() {
    apiUrl = await getAPIURL();
}

export { apiUrl, initializeApiUrl };