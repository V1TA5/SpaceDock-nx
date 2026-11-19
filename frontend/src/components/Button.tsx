import { stylex } from '@stylexjs/stylex';

interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
}

const buttonStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.2s, transform 0.1s',
  },
  primary: {
    backgroundColor: '#2563eb',
    color: 'white',
  },
  secondary: {
    backgroundColor: '#6b7280',
    color: 'white',
  },
  tertiary: {
    backgroundColor: 'transparent',
    color: '#2563eb',
    border: '1px solid #2563eb',
  },
  small: {
    padding: '4px 8px',
    fontSize: 12,
  },
  medium: {
    padding: '8px 16px',
    fontSize: 14,
  },
  large: {
    padding: '12px 24px',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export function Button({ text, variant = 'primary', size = 'medium', onClick, disabled }: ButtonProps) {
  return (
    <button
      {...stylex.props(
        buttonStyles.base,
        variant === 'primary' ? buttonStyles.primary :
        variant === 'secondary' ? buttonStyles.secondary :
        buttonStyles.tertiary,
        size === 'small' ? buttonStyles.small :
        size === 'medium' ? buttonStyles.medium :
        buttonStyles.large,
        disabled ? buttonStyles.disabled : null
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}