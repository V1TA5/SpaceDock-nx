import { useQuery } from '@tanstack/react-query';

export interface ModResult {
  id: number;
  name: string;
  short_description: string;
  downloads: number;
}

export interface SearchResult {
  mods: ModResult[];
  games: Array<{ id: number; name: string }>;
}

export const RANDOM_MOD_QUERY_KEY = 'random-mod';

export function useRandomMod() {
  return useQuery<ModResult, Error>({
    queryKey: [RANDOM_MOD_QUERY_KEY],
    queryFn: async () => {
      const response = await fetch('/api/mods/random');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to fetch random mod');
      }
      return response.json();
    },
  });
}

export const SEARCH_QUERY_KEY = 'search';

export function useSearch(q: string) {
  return useQuery<SearchResult, Error>({
    queryKey: [SEARCH_QUERY_KEY, q],
    queryFn: async () => {
      if (!q) return { mods: [], games: [] };
      const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to search');
      }
      return response.json();
    },
    enabled: !!q,
  });
}
