import { useQuery } from '@tanstack/react-query';

interface Game {
  id: number;
  name: string;
  short: string;
  active: boolean;
  thumbnail?: string;
  version?: string;
}

export const GAME_QUERY_KEY = 'games';

export function useGames() {
  return useQuery<Game[], Error>({
    queryKey: [GAME_QUERY_KEY],
    queryFn: async () => {
      const response = await fetch('/api/game/all');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to fetch games');
      }
      return response.json();
    },
  });
}
