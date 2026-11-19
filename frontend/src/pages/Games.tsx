import * as stylex from '@stylexjs/stylex';
import { Link } from 'react-router';
import { useGames } from '../features/games/api/games';
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24,
  },
  gameCard: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 16,
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
  },
  gameName: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.text,
  },
  loading: {
    padding: 16,
    color: colors.textSecondary,
  },
});

export function Games() {
  const { data: games, isLoading, error } = useGames();

  if (isLoading) {
    return (
      <div {...stylex.props(styles.container)}>
        <h1 {...stylex.props(styles.title)}>Games</h1>
        <div {...stylex.props(styles.loading)}>Loading games...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div {...stylex.props(styles.container)}>
        <h1 {...stylex.props(styles.title)}>Games</h1>
        <div {...stylex.props(styles.loading)}>Error loading games</div>
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.title)}>Games</h1>
      <div {...stylex.props(styles.grid)}>
        {games?.map((game) => (
          <Link key={game.id} to={`/${game.short}`} {...stylex.props(styles.gameCard)}>
            <div {...stylex.props(styles.gameName)}>{game.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
