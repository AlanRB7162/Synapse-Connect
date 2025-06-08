//src/services/api.ts

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

export const registerUser = async (nome: string, email: string, username: string, senha: string) => {
    try {
        const response = await api.post("/user/register", { nome, email, username, senha });
        console.log("Server response:", response.data.message);
        return response.data;
    } catch (error: any) {
        console.error("Error sending data to server: ", error.response?.data || error.message);
        throw error;
    }
};

export const loginUser = async (loginInput: string, senha: string) => {
    try {
        const response = await api.post("/user/login", { loginInput, senha });
        console.log("Logged in successfully: ", response.data);
        return response.data;
    } catch (error: any) {
        console.error ("Error logging in: ", error.response?.data || error.message);
        throw error;
    }
}

export default api;