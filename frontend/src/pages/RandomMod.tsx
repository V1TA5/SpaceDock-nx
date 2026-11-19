import { useEffect } from 'react';
import { useNavigate } from 'react-router';
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
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export function RandomMod() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    fetch('/api/mods/random')
      .then(res => {
        if (res.redirected) {
          const url = new URL(res.url);
          if (!cancelled) {
            navigate(url.pathname, { replace: true });
          }
        } else {
          res.json().then(data => {
            if (!cancelled) {
              navigate(
                `/${data.game}/${data.category}/${data.id}/${data.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]/g, '-')}`,
                { replace: true }
              );
            }
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          navigate('/', { replace: true });
        }
      });
    return () => { cancelled = true; };
  }, [navigate]);

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Random Mod</h1>
      <p {...stylex.props(styles.text)}>Finding a random mod...</p>
    </div>
  );
}
