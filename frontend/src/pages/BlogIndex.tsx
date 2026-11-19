import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router';
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
  loading: {
    padding: 16,
    color: colors.textSecondary,
  },
  grid: {
    display: 'grid',
    gap: 16,
  },
  card: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 16,
  },
  link: {
    color: colors.primary,
    textDecoration: 'none',
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 18,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

interface BlogPost {
  id: number;
  title: string;
  date: string;
}

export function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setPosts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Blog</h1>

      {loading && <div {...stylex.props(styles.loading)}>Loading...</div>}

      {!loading && posts.length === 0 && (
        <div {...stylex.props(styles.loading)}>No blog posts yet.</div>
      )}

      {!loading && posts.length > 0 && (
        <div {...stylex.props(styles.grid)}>
          {posts.map((post) => (
            <div key={post.id} {...stylex.props(styles.card)}>
              <Link to={`/blog/${post.id}`} {...stylex.props(styles.link)}>
                <h3 {...stylex.props(styles.title)}>{post.title}</h3>
              </Link>
              <div {...stylex.props(styles.date)}>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
