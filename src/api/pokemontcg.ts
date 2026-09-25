import axios from 'axios';
import { PokemonCardData } from '../types/pokemon';

const API_BASE_URL = 'https://api.pokemontcg.io/v2';

export const searchCardsByName = async (name: string): Promise<PokemonCardData[]> => {
  try {
    const cleanName = name.trim();
    
    if (!cleanName) return [];

    const response = await axios.get(`${API_BASE_URL}/cards`, {
      params: {
        q: `name:*${cleanName}*`,
        pageSize: 20,
      },
      headers: {
        'User-Agent': 'PokemonCardApp/1.0',
      },
    });

    console.log('Resultados encontrados:', response.data.data?.length);
    return response.data.data || [];
  } catch (error) {
    console.error('Erro detalhado na requisição:', error);
    return [];
  }
};