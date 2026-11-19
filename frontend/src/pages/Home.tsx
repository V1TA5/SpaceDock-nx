import * as stylex from '@stylexjs/stylex';
import { Link } from 'react-router';
import { Search } from 'lucide-react';
import { useGames } from '../features/games/api/games';
import { useRandomMod } from '../features/mods/api/mods';
import { colors, fonts, spacing, radii } from '../styles/tokens.stylex';

const styles = stylex.create({
  container: { maxWidth: 1200, margin: 'auto', padding: 24 },
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
  gameCard: {
    flex: '0 1 calc(33.33% - 16px)',
    minWidth: 280,
    maxWidth: '100%',
    borderRadius: radii.sm,
    overflow: 'hidden',
    boxShadow: `0 2px 4px ${colors.shadow}`,
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  gameCardImageWrapper: {
    position: 'relative',
    width: '100%',
    paddingBottom: '56.25%',
    backgroundColor: colors.backgroundSecondary,
  },
  gameCardImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  gameCardVersion: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: `${spacing.xs} ${spacing.sm}`,
    fontSize: 12,
    borderRadius: radii.xs,
    fontFamily: fonts.body,
  },
  gameCardInfo: {
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  gameCardName: {
    fontFamily: fonts.heading,
    fontSize: 16,
    fontWeight: 600,
    color: colors.text,
    marginBottom: 0,
  },
  randomMod: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loading: {
    padding: 16,
    color: colors.textSecondary,
  },
});

export function Home() {
  const { data: games, isLoading: gamesLoading, error: gamesError } = useGames();
  const { data: randomMod, isLoading: modLoading } = useRandomMod();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.hero)}>
        <h1 {...stylex.props(styles.title)}>SpaceDock</h1>
        <p {...stylex.props(styles.subtitle)}>
          The ultimate content hosting platform for your favorite space games.
        </p>
      </div>

      <div {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Games</h2>
        {gamesLoading ? (
          <div {...stylex.props(styles.loading)}>Loading games...</div>
        ) : gamesError ? (
          <div {...stylex.props(styles.loading)}>Error loading games</div>
        ) : (
          <div {...stylex.props(styles.gamesGrid)}>
            {games?.map((game) => (
              <Link key={game.id} to={`/${game.short}`} {...stylex.props(styles.gameCard)}>
                <div {...stylex.props(styles.gameName)}>{game.name}</div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Random Mod</h2>
        {modLoading ? (
          <div {...stylex.props(styles.loading)}>Loading...</div>
        ) : randomMod ? (
          <div {...stylex.props(styles.randomMod)}>
            <Link to={`/mods/${randomMod.id}`} style={{ textDecoration: 'none' }}>
              <h3 style={{ color: colors.primary, fontFamily: fonts.heading, margin: 0 }}>{randomMod.name}</h3>
            </Link>
          </div>
        ) : (
          <div {...stylex.props(styles.loading)}>No mods available</div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
