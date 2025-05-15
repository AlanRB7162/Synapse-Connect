import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3001", //Backend URL
});

export const pingServer = async () => {
    try {
        const response = await api.get("/ping");
        console.log ("Ping:", response.data.message);
    } catch (error) {
        console.error("Error pinging server:", error);
    }
};

export default api;