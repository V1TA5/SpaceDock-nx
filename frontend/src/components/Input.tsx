import { InputHTMLAttributes } from 'react';
import { stylex } from '@stylexjs/stylex';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const inputStyles = stylex.create({
  base: {
    width: '100%',
    padding: '8px 12px',
    fontSize: 14,
    borderRadius: 4,
    border: '1px solid #d1d5db',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  error: {
    borderColor: '#ef4444',
  },
  label: {
    display: 'block',
    marginBottom: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#ef4444',
  },
});

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      {label && <label {...stylex.props(inputStyles.label)}>{label}</label>}
      <input
        {...stylex.props(inputStyles.base, error ? inputStyles.error : null)}
        {...props}
      />
      {error && <p {...stylex.props(inputStyles.errorText)}>{error}</p>}
    </div>
  );
}