import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/category`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateCategory = async (categoryId, color) => {
    try {
        const categoryUpdate = { id: categoryId, color: color };
        console.log(categoryUpdate);
        const response = await axios.put(`${API_URL}/category`, categoryUpdate);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getCards = async () => {
    try {
        const response = await axios.get(`${API_URL}/cards`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createCard = async ( categoryId, description) => {
    try {
        const newCard = {
            description: description,
            categoryId: categoryId
          };
        const response = await axios.post(`${API_URL}/card`, newCard);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const deleteCard = async (cardId) => {
    try {
        const cardDelete = { id: cardId };
        const response = await axios.delete(`${API_URL}/card`, { data: cardDelete });
        return response.data;
    }catch (error) {
        console.log(error);
        return null;
    }
}

export const updateCard = async (cardId, description) => {
    try {
        const cardUpdate = { id: cardId, description: description };
        const response = await axios.put(`${API_URL}/card`, cardUpdate);
        return response.data;
    }catch (error) {
        console.log(error);
        return null;
    }
}

export const likeCard = async (cardId) => {
    try {
        const cardLike = { id: cardId };
        const response = await axios.put(`${API_URL}/card/like`, cardLike);
        return response.data;
    }catch (error) {
        console.log(error);
        return null;
    }
}

export const addComment = async (cardId, comment) => {
    try {
        const commentAdd = { id: cardId, comment: comment };
        const response = await axios.put(`${API_URL}/card/comment`, commentAdd);
        return response.data;
    }catch (error) {
        console.log(error);
        return null;
    }
}