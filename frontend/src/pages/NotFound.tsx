import { Link } from 'react-router';
import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../styles/tokens.stylex';

const styles = stylex.create({
  container: {
    padding: 24,
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
  },
  heading: {
    fontFamily: fonts.heading,
    fontSize: 24,
    marginBottom: 8,
    color: colors.text,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
  },
  link: {
    color: colors.primary,
    textDecoration: 'none',
  },
});

export function NotFound() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Upload not found</h1>
      <p {...stylex.props(styles.text)}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" {...stylex.props(styles.link)}>Return to home</Link>
    </div>
  );
}
