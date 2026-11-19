import { useParams } from 'react-router';
import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../styles/tokens.stylex';

const styles = stylex.create({
  container: {
    padding: 24,
    maxWidth: 600,
    margin: 'auto',
  },
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

export function ModPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Mod #{id}</h1>
      <p {...stylex.props(styles.text)}>Loading mod details...</p>
    </div>
  );
}
