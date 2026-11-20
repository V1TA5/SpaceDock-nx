import { ReactNode } from 'react';
import { Link } from 'react-router';
import * as stylex from '@stylexjs/stylex';
import { colors, fonts, spacing, radii } from '../styles/tokens.stylex';
import fallbackThumbnail from '../assets/images/background-s.png';

const styles = stylex.create({
  card: {
    flex: '1 1 280px',
    minWidth: 280,
    maxWidth: '100%',
    borderRadius: radii.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#d0d0d0',
    backgroundColor: colors.bgAlt,
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    boxShadow: colors.shadow,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    paddingBottom: '56.25%',
    backgroundColor: colors.bgAlt,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  version: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: `${spacing.xs} ${spacing.sm}`,
    fontSize: 12,
    borderRadius: radii.xs,
    fontFamily: fonts.body,
  },
  info: {
    padding: `${spacing.xs} ${spacing.sm}`,
    backgroundColor: colors.cardInfo,
  },
  name: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: 600,
    color: colors.text,
    marginBottom: 0,
    marginTop: 0,
  },
});

export interface ItemCardProps {
  to: string;
  image?: string;
  title: string;
  version?: string;
  children?: ReactNode;
}

export function ItemCard({ to, image, title, version, children }: ItemCardProps) {
  return (
    <Link to={to} {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.imageWrapper)}>
        <img
          src={image || fallbackThumbnail}
          alt={title}
          {...stylex.props(styles.image)}
        />
        {version && (
          <span {...stylex.props(styles.version)}>{version}</span>
        )}
      </div>
      <div {...stylex.props(styles.info)}>
        <h3 {...stylex.props(styles.name)}>{title}</h3>
        {children}
      </div>
    </Link>
  );
}