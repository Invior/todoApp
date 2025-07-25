import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchTodos = async () => {
    const response = await axios.get(`${API_URL}/todos?page=1&limit=10`);
    return response.data;
};