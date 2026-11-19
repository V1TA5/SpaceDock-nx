import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as stylex from '@stylexjs/stylex';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
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
  field: { marginBottom: 16 },
  label: {
    display: 'block',
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.text,
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    fontSize: 14,
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    fontSize: 14,
    minHeight: 120,
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  select: {
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    fontSize: 14,
    boxSizing: 'border-box',
  },
  checkbox: {
    width: 16,
    height: 16,
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modList: {
    display: 'grid',
    gap: 8,
    maxHeight: 300,
    overflow: 'auto',
  },
  modItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    border: `1px solid ${colors.border}`,
  },
  error: {
    color: colors.error,
    marginBottom: 16,
    fontSize: 14,
  },
  button: {
    padding: '8px 16px',
    border: `1px solid ${colors.primary}`,
    borderRadius: 0,
    backgroundColor: colors.primary,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
  },
});

const GAMES = [
  { id: 1, name: 'Kerbal Space Program' },
  { id: 2, name: 'FTL: Faster Than Light' },
  { id: 3, name: 'Stellaris' },
];

const MODS = [
  { id: 1, name: 'Advanced Propulsion', game: 'Kerbal Space Program' },
  { id: 2, name: 'Realistic Atmosphere', game: 'Kerbal Space Program' },
  { id: 3, name: 'Colonial Expansion', game: 'Kerbal Space Program' },
];

export function CreatePack() {
  const [gameId, setGameId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMods, setSelectedMods] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleModToggle = (modId: number) => {
    setSelectedMods(prev =>
      prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!gameId) { setError('Please select a game.'); return; }
    if (!name) { setError('Please provide a pack name.'); return; }
    if (selectedMods.length === 0) { setError('Please select at least one mod.'); return; }

    setLoading(true);
    try {
      // Simulate API call
      navigate('/');
    } catch {
      setError('Error creating modpack. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Create Modpack</h1>
      {error && <div {...stylex.props(styles.error)}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Game</label>
          <select value={gameId} onChange={(e) => setGameId(e.target.value)} {...stylex.props(styles.select)}>
            <option value="">Select a game</option>
            {GAMES.map((game) => (
              <option key={game.id} value={game.id}>{game.name}</option>
            ))}
          </select>
        </div>

        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Pack Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required {...stylex.props(styles.input)} />
        </div>

        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} {...stylex.props(styles.textarea)} />
        </div>

        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Mods</label>
          <div {...stylex.props(styles.modList)}>
            {MODS.map((mod) => (
              <div key={mod.id} {...stylex.props(styles.modItem)}>
                <CheckboxPrimitive.Root
                  checked={selectedMods.includes(mod.id)}
                  onCheckedChange={() => handleModToggle(mod.id)}
                  {...stylex.props(styles.checkbox, selectedMods.includes(mod.id) && styles.checkboxChecked)}
                >
                  <CheckboxPrimitive.Indicator>✓</CheckboxPrimitive.Indicator>
                </CheckboxPrimitive.Root>
                <span>{mod.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" {...stylex.props(styles.button)} disabled={loading}>
          {loading ? 'Creating...' : 'Create Modpack'}
        </button>
      </form>
    </div>
  );
}
