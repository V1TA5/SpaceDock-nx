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
    color: colors.text,
    lineHeight: 1.5,
  },
});

export function About() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>About SpaceDock</h1>
      <p {...stylex.props(styles.text)}>
        SpaceDock is a community-run mod repository for games including Kerbal Space Program, FTL: Faster Than Light, and more. We provide a platform for modders to share their creations and for players to discover and download mods safely.
      </p>
    </div>
  );
}
