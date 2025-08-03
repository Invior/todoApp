import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchTodos = async () => {
    const response = await axios.get(`${API_URL}/todos?page=1&limit=10`);
    return response.data;
};

export const createTodo = async (text: string) => {
    try {
        const response = await axios.post(`${API_URL}/todos`, { text });
        return response.data;
    } catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }
}

export const deleteTodo = async (id: number) => {
    try {
        await axios.delete(`${API_URL}/todos/${id}`);
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
}

export const toggleTodo = async (id: number, completed: boolean) => {
    try {
        const response = await axios.patch(`${API_URL}/todos/${id}/toggle`, { completed });
        return response.data;
    } catch (error) {
        console.error('Error toggling todo:', error);
        throw error;
    }
}

export const changeTodoText = async (id: number, text: string) => {
    try {
        const response = await axios.put(`${API_URL}/todos/${id}`, { text });
        return response.data;
    } catch (error) {
        console.error('Error changing todo text:', error);
        throw error;
    }
}