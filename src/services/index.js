import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getCategories = async (text) => {
    try {
        const response = await axios.get(`${API_URL}/category`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getCards = async (text) => {
    try {
        const response = await axios.get(`${API_URL}/cards`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}