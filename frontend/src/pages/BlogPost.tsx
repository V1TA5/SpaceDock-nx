import { useParams, Link } from 'react-router';
import { blogPostIdSchema } from '../lib/validate';
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
    fontSize: 28,
    marginBottom: 16,
    color: colors.text,
  },
  meta: {
    display: 'flex',
    gap: 16,
    marginBottom: 24,
    fontSize: 14,
    color: colors.textSecondary,
  },
  content: {
    fontSize: 16,
    lineHeight: 1.6,
    color: colors.text,
  },
  tags: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 24,
  },
  link: {
    color: colors.primary,
    textDecoration: 'none',
  },
});

const posts = {
  'announcing-spacedock-20': {
    title: 'Announcing SpaceDock 2.0',
    author: 'Admin',
    date: 'November 16, 2026',
    content: 'We are excited to announce the release of SpaceDock 2.0! This major update brings a completely redesigned interface, improved mod management, and better search functionality. Thank you to all our users who contributed to the development of this version.',
    tags: ['announcement', 'update'],
  },
};

export function BlogPost() {
  const params = useParams();
  const validated = blogPostIdSchema.safeParse(params);
  if (!validated.success) {
    return <div {...stylex.props(styles.container)}>Invalid post</div>;
  }
  const { post } = validated.data;
  const p = posts[post as string] || posts['announcing-spacedock-20'];

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>{p.title}</h1>
      <div {...stylex.props(styles.meta)}>
        <span>By {p.author}</span>
        <span>{p.date}</span>
      </div>
      <div {...stylex.props(styles.content)}>{p.content}</div>
      <div {...stylex.props(styles.tags)}>Tags: {p.tags.join(', ')}</div>
      <Link to="/blog" {...stylex.props(styles.link)}>
        Back to blog
      </Link>
    </div>
  );
}
