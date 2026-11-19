import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../styles/tokens.stylex';

const styles = stylex.create({
  container: {
    padding: 24,
    maxWidth: 800,
    margin: 'auto',
  },
  heading: {
    fontFamily: fonts.heading,
    fontSize: 24,
    marginBottom: 16,
    color: colors.text,
  },
  heading2: {
    fontFamily: fonts.heading,
    fontSize: 20,
    marginBottom: 12,
    color: colors.text,
  },
  heading3: {
    fontFamily: fonts.heading,
    fontSize: 16,
    marginBottom: 8,
    color: colors.text,
  },
  text: {
    fontSize: 14,
    lineHeight: 1.6,
    color: colors.text,
    marginBottom: 12,
  },
  list: {
    paddingLeft: 24,
    margin: '0 0 12px 0',
  },
  listItem: {
    fontSize: 14,
    lineHeight: 1.6,
    color: colors.text,
    marginBottom: 4,
  },
  link: {
    color: colors.primary,
    textDecoration: 'none',
  },
});

export function Privacy() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Terms &amp; Privacy</h1>

      <p {...stylex.props(styles.text)}>
        The SpaceDock mod repository is run by volunteers and relies on community contributions to operate. By using SpaceDock, you agree to the following terms.
      </p>

      <h2 {...stylex.props(styles.heading2)}>Terms of Use</h2>
      <p {...stylex.props(styles.text)}>
        The general idea is "be responsible". Follow these basic rules:
      </p>
      <ul {...stylex.props(styles.list)}>
        <li {...stylex.props(styles.listItem)}>Do not upload mods you don't have permission to distribute</li>
        <li {...stylex.props(styles.listItem)}>Do not use SpaceDock for spam</li>
        <li {...stylex.props(styles.listItem)}>Be nice to other users</li>
      </ul>

      <h2 {...stylex.props(styles.heading2)}>Legal Disclosure</h2>
      <p {...stylex.props(styles.text)}>Information in accordance with section 5 TMG</p>
      <p {...stylex.props(styles.text)}>
        SpaceDock<br />
        Operated by community volunteers
      </p>
      <p {...stylex.props(styles.text)}>
        E-Mail: alpha@spacedock.info<br />
        Website: spacedock.info
      </p>

      <h2 {...stylex.props(styles.heading2)}>Privacy Statement</h2>
      <h3 {...stylex.props(styles.heading3)}>General</h3>
      <p {...stylex.props(styles.text)}>
        This website collects and uses personal data only to the extent necessary to provide our services.
      </p>
    </div>
  );
}
