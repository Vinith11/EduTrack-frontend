const LOCALHOST = "http://localhost:5454";
const DEPLOYED = import.meta.env.VITE_DEPLOYED_URL;

// Export the current base URL based on environment or condition
export const API_BASE_URL = DEPLOYED;