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
    fontSize: 18,
    marginBottom: 12,
    color: colors.text,
  },
  text: {
    fontSize: 14,
    lineHeight: 1.6,
    color: colors.text,
    marginBottom: 12,
  },
  code: {
    display: 'block',
    padding: 12,
    backgroundColor: '#f0f0f0',
    fontFamily: 'monospace',
    fontSize: 13,
    overflow: 'auto',
    marginBottom: 12,
  },
  link: {
    color: colors.primary,
    textDecoration: 'none',
  },
});

export function MarkdownInfo() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>SpaceDock Markdown</h1>
      <p {...stylex.props(styles.text)}>
        Markdown is a way of adding formatting to your mod listing, including headers and code and
        embedded videos, images, etc. You should definitely use them to spice up mod listings. The full
        specification is{' '}
        <a href="http://daringfireball.net/projects/markdown/" {...stylex.props(styles.link)}>here</a>, but here's a
        quick overview:
      </p>

      <h2 {...stylex.props(styles.heading2)}>Crash Course</h2>
      <p {...stylex.props(styles.text)}>Quickest way to get started is an example.</p>
      <div {...stylex.props(styles.code)}>
        {`## My super cool mod

This is a very neat mod I wrote that lets you do *super cool things*.

**Features**

* Adds more parts
* Adds more science
* Adds more fun

**Installation**

1. Copy the files into GameData
2. Say a little prayer
3. Make a little love
4. Get down tonight

[Forum Thread](http://forum.kerbalspaceprogram.com/threads/84154)`}
      </div>

      <h2 {...stylex.props(styles.heading2)}>User profile links</h2>
      <p {...stylex.props(styles.text)}>You can create a link to a user's profile like this:</p>
      <div {...stylex.props(styles.code)}>{`@username`}</div>

      <h2 {...stylex.props(styles.heading2)}>Embedding videos and images</h2>
      <p {...stylex.props(styles.text)}>You can easily embed a single image like so:</p>
      <div {...stylex.props(styles.code)}>{`![](http://example.com/image.png)`}</div>
      <p {...stylex.props(styles.text)}>
        You can also embed YouTube videos by wrapping the URL in brackets:
      </p>
      <div {...stylex.props(styles.code)}>{`[[https://www.youtube.com/watch?v=T4rfHAqs9EI]]`}</div>
    </div>
  );
}
