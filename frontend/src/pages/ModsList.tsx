import { useParams, Link } from 'react-router';
import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
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
  tabs: {
    display: 'flex',
    gap: 16,
    marginBottom: 24,
  },
  tab: {
    color: colors.primary,
    textDecoration: 'none',
    fontSize: 14,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
  },
  card: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 16,
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  game: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  downloads: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

const mods = [
  { id: 1, name: 'Advanced Propulsion', game: 'Kerbal Space Program', downloads: 15420, author: 'RocketMan' },
  { id: 2, name: 'Realistic Atmosphere', game: 'Kerbal Space Program', downloads: 8932, author: 'SpaceSim' },
  { id: 3, name: 'Colonial Expansion', game: 'FTL: Faster Than Light', downloads: 12100, author: 'EmpireBuilder' },
];

export function ModsList() {
  const { sort } = useParams();
  const title = sort === 'new' || sort === 'newest' ? 'New Mods' : sort === 'featured' ? 'Featured Mods' : sort === 'popular' ? 'Popular Mods' : 'All Mods';

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: mods.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>{title}</h1>
      <div {...stylex.props(styles.tabs)}>
        <Link to="/mods/newest" {...stylex.props(styles.tab)}>Newest</Link>
        <Link to="/mods/featured" {...stylex.props(styles.tab)}>Featured</Link>
        <Link to="/mods/popular" {...stylex.props(styles.tab)}>Popular</Link>
        <Link to="/mods/all" {...stylex.props(styles.tab)}>All</Link>
      </div>
      <div ref={parentRef} {...stylex.props(styles.grid)} style={{ height: 400 }}>
        <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const mod = mods[virtualRow.index];
            return (
              <Link
                key={virtualRow.key}
                to={`/mods/${mod.id}`}
                {...stylex.props(styles.card)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div {...stylex.props(styles.name)}>{mod.name}</div>
                <div {...stylex.props(styles.game)}>{mod.game}</div>
                <div {...stylex.props(styles.downloads)}>{mod.downloads.toLocaleString()} downloads</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
