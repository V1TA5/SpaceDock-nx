import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../styles/tokens.stylex';

const styles = stylex.create({
  container: { padding: 24 },
  heading: {
    fontFamily: fonts.heading,
    fontSize: 24,
    marginBottom: 16,
    color: colors.text,
  },
  text: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 1.6,
  },
  card: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 16,
    marginBottom: 16,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
  },
  modCard: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 12,
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  modName: {
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
    padding: 16,
    color: colors.textSecondary,
  },
  error: {
    padding: 16,
    color: colors.error,
  },
  link: {
    color: colors.primary,
    textDecoration: 'none',
  },
});

interface Mod {
  id: number;
  name: string;
  game: string;
  category: string;
}

export function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError(null);
    setProfile(null);

    fetch(`/api/user/${username}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || 'User not found');
        }
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <div {...stylex.props(styles.container)}><div {...stylex.props(styles.loading)}>Loading profile...</div></div>;
  }

  if (error) {
    return <div {...stylex.props(styles.container)}><div {...stylex.props(styles.error)}>{error}</div></div>;
  }

  if (!profile) {
    return null;
  }

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>{profile.username}</h1>
      {profile.description && <p {...stylex.props(styles.text)}>{profile.description}</p>}
      <div {...stylex.props(styles.card)}>
        <h2 {...stylex.props(styles.heading)}>Mods</h2>
        {profile.mods && profile.mods.length > 0 ? (
          <div {...stylex.props(styles.grid)}>
            {profile.mods.map((mod: Mod) => (
              <Link key={mod.id} to={`/mods/${mod.id}`} {...stylex.props(styles.modCard)}>
                <div {...stylex.props(styles.modName)}>{mod.name}</div>
                <div {...stylex.props(styles.modGame)}>{mod.game}</div>
              </Link>
            ))}
          </div>
        ) : (
          <p {...stylex.props(styles.text)}>No mods yet.</p>
        )}
      </div>
    </div>
  );
}
