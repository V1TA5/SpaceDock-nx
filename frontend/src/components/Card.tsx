import { ReactNode } from 'react';
import { stylex } from '@stylexjs/stylex';

interface CardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  children?: ReactNode;
  onClick?: () => void;
}

const cardStyles = stylex.create({
  base: {
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  content: {
    padding: '16px',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
});

export function Card({ title, subtitle, image, children, onClick }: CardProps) {
  return (
    <div {...stylex.props(cardStyles.base)} onClick={onClick}>
      {image && <img {...stylex.props(cardStyles.image)} src={image} alt={title} />}
      <div {...stylex.props(cardStyles.content)}>
        {title && <h3 {...stylex.props(cardStyles.title)}>{title}</h3>}
        {subtitle && <p {...stylex.props(cardStyles.subtitle)}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}