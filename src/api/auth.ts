import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const login = async (username: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data.token; // Retorna o token JWT
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao realizar login';
    throw new Error(errorMessage);
  }
};