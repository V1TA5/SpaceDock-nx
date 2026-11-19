import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../styles/tokens.stylex';

const styles = stylex.create({
  container: { padding: 24 },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    marginBottom: 24,
    padding: 24,
    backgroundColor: '#f8f8f8',
    border: `1px solid ${colors.border}`,
  },
  gameLogo: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    backgroundColor: '#e0e0e0',
  },
  gameInfo: { flex: 1 },
  gameName: {
    fontFamily: fonts.heading,
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  stats: {
    display: 'flex',
    gap: 24,
    marginTop: 12,
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  tabs: {
    display: 'flex',
    gap: 0,
    marginBottom: 24,
    borderBottom: `1px solid ${colors.border}`,
  },
  tab: {
    padding: '12px 20px',
    cursor: 'pointer',
    borderBottom: `2px solid transparent`,
    color: colors.textSecondary,
    fontSize: 14,
  },
  tabActive: {
    borderBottomColor: colors.primary,
    color: colors.primary,
    fontWeight: 'bold',
  },
  section: { marginBottom: 32 },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: 20,
    color: colors.text,
  },
  sectionLink: {
    color: colors.primary,
    textDecoration: 'none',
    fontSize: 14,
  },
  modGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
  },
  modCard: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  modImage: {
    width: '100%',
    height: 140,
    objectFit: 'cover',
    backgroundColor: '#f0f0f0',
    display: 'block',
  },
  modContent: { padding: 12 },
  modTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  modGame: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  loading: {
    padding: 24,
    fontSize: 16,
    color: colors.textSecondary,
  },
});

interface Game {
  id: number;
  name: string;
  short: string;
  active: boolean;
  logo?: string;
}

export function GameDetail() {
  const { gameshort } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetch('/api/game/all')
      .then(res => res.json())
      .then(games => {
        const found = games.find((g: Game) => g.short === gameshort);
        setGame(found || games[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [gameshort]);

  if (loading) {
    return <div {...stylex.props(styles.loading)}>Loading game...</div>;
  }

  if (!game) {
    return <div {...stylex.props(styles.loading)}>Game not found</div>;
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.header)}>
        <img
          src={game.logo || '/static/default_game.png'}
          alt={game.name}
          {...stylex.props(styles.gameLogo)}
        />
        <div {...stylex.props(styles.gameInfo)}>
          <h1 {...stylex.props(styles.gameName)}>{game.name}</h1>
          <div {...stylex.props(styles.stats)}>
            <div {...stylex.props(styles.statItem)}>
              <span {...stylex.props(styles.statValue)}>0</span>
              <span {...stylex.props(styles.statLabel)}>Mods</span>
            </div>
            <div {...stylex.props(styles.statItem)}>
              <span {...stylex.props(styles.statValue)}>0</span>
              <span {...stylex.props(styles.statLabel)}>Users</span>
            </div>
            <div {...stylex.props(styles.statItem)}>
              <span {...stylex.props(styles.statValue)}>0</span>
              <span {...stylex.props(styles.statLabel)}>Downloads</span>
            </div>
          </div>
        </div>
      </div>

      <div {...stylex.props(styles.tabs)}>
        {['all', 'mods', 'vessels', 'parts'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            {...stylex.props(styles.tab, activeTab === tab && styles.tabActive)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div {...stylex.props(styles.section)}>
        <div {...stylex.props(styles.sectionHeader)}>
          <h2 {...stylex.props(styles.sectionTitle)}>Featured Mods</h2>
          <Link to={`/${game.short}/browse`} {...stylex.props(styles.sectionLink)}>
            View all →
          </Link>
        </div>
        <div {...stylex.props(styles.modGrid)}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Link
              key={i}
              to={`/${game.short}/mod/${i}/example-mod`}
              {...stylex.props(styles.modCard)}
            >
              <img
                src="/static/default_mod.png"
                alt={`Mod ${i}`}
                {...stylex.props(styles.modImage)}
              />
              <div {...stylex.props(styles.modContent)}>
                <div {...stylex.props(styles.modTitle)}>Example Mod {i + 1}</div>
                <div {...stylex.props(styles.modGame)}>{game.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
