import * as stylex from '@stylexjs/stylex';
import { Search } from 'lucide-react';
import { fonts, colors, spacing } from '../styles/tokens.stylex';
import { useGames } from '../features/games/api/games';
import { ItemCard } from '../components/ItemCard';

const styles = stylex.create({
  container: { maxWidth: '100%',alignContent: 'center', margin: 'auto', padding: 15 },
  hero: {
    textAlign: 'center',
    padding: '40px 0',
    marginBottom: 40,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 48,
    marginBottom: 16,
    color: colors.text,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  searchForm: {
    display: 'flex',
    maxWidth: 600,
    margin: 'auto',
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
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: 24,
    marginBottom: 16,
    color: colors.text,
  },
  gamesGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  loading: {
    color: colors.textSecondary,
  },
});

export function Home() {
  const { data: games, isLoading: gamesLoading, error: gamesError } = useGames();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div {...stylex.props(styles.container)}>
      {gamesLoading ? (
        <div {...stylex.props(styles.loading)}>Loading games...</div>
      ) : gamesError ? (
        <div {...stylex.props(styles.loading)}>Error loading games</div>
      ) : (
        <div {...stylex.props(styles.gamesGrid)}>
          {games?.map((game) => (
            <ItemCard
              key={game.id}
              to={`/${game.short}`}
              image={game.thumbnail}
              title={game.name}
              version={game.version}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
