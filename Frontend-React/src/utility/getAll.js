import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/foto/';

export default async function getAll(id = null){
  try {
    const idNumerico = id ? Number(id) : null;
    const url = id ? `${API_BASE_URL}${idNumerico}` : API_BASE_URL;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};
