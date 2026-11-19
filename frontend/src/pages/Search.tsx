import { useState } from 'react';
import { useSearchParams } from 'react-router';
import * as stylex from '@stylexjs/stylex';
import { Search as SearchIcon } from 'lucide-react';
import { useSearch } from '../features/mods/api/mods';
import { colors, fonts } from '../styles/tokens.stylex';

const styles = stylex.create({
  container: {
    padding: 24,
    maxWidth: 1200,
    margin: 'auto',
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 36,
    marginBottom: 24,
    color: colors.text,
  },
  searchForm: {
    display: 'flex',
    gap: 8,
    marginBottom: 32,
  },
  searchInput: {
    flex: 1,
    padding: '12px 16px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    fontSize: 16,
    boxSizing: 'border-box',
  },
  searchButton: {
    padding: '12px 24px',
    border: `1px solid ${colors.primary}`,
    borderRadius: 0,
    backgroundColor: colors.primary,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  loading: {
    padding: 16,
    color: colors.textSecondary,
  },
});

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const { data, isLoading, error } = useSearch(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      setParams({ q: searchQuery });
    }
  };

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.title)}>Search</h1>
      <form onSubmit={handleSearch} {...stylex.props(styles.searchForm)}>
        <input
          type="text"
          placeholder="Search mods..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          {...stylex.props(styles.searchInput)}
        />
        <button type="submit" {...stylex.props(styles.searchButton)}>
          <SearchIcon size={16} />
          Search
        </button>
      </form>
      {isLoading && <div {...stylex.props(styles.loading)}>Searching...</div>}
      {error && <div {...stylex.props(styles.loading)}>Error searching</div>}
      {!isLoading && data && (
        <div>
          <h2>Mods</h2>
          {data.mods?.length > 0 ? (
            <ul>
              {data.mods.map((mod) => (
                <li key={mod.id}>{mod.name}</li>
              ))}
            </ul>
          ) : (
            <p>No mods found</p>
          )}
          <h2>Games</h2>
          {data.games?.length > 0 ? (
            <ul>
              {data.games.map((game) => (
                <li key={game.id}>{game.name}</li>
              ))}
            </ul>
          ) : (
            <p>No games found</p>
          )}
        </div>
      )}
    </div>
  );
}
