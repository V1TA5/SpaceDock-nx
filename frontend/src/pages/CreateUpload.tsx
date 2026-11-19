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
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  fileInput: {
    width: '100%',
    padding: 8,
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    boxSizing: 'border-box',
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
  text: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

const GAMES = [
  { id: 1, name: 'Kerbal Space Program' },
  { id: 2, name: 'FTL: Faster Than Light' },
  { id: 3, name: 'Stellaris' },
];

const CATEGORIES = [
  { id: 1, name: 'Mods' },
  { id: 2, name: 'Parts' },
  { id: 3, name: 'Textures' },
  { id: 4, name: 'Tools' },
];

const LICENSES = [
  'MIT', 'CC-BY', 'CC-BY-SA', 'CC-BY-ND', 'CC-BY-NC-SA', 'CC-BY-NC-ND', 'CC0', 'GPL-2.0', 'GPL-3.0', 'LGPL', 'BSD', 'Other'
];

export function CreateUpload() {
  const [gameId, setGameId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [license, setLicense] = useState('MIT');
  const [hasML, setHasML] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!gameId) { setError('Please select a game.'); return; }
    if (!categoryId) { setError('Please select a category.'); return; }
    if (!name) { setError('Please provide a mod name.'); return; }
    if (!file) { setError('Please select a file.'); return; }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('game_id', gameId);
      formData.append('category_id', categoryId);
      formData.append('name', name);
      formData.append('short_description', shortDescription);
      formData.append('description', description);
      formData.append('license', license);
      formData.append('has_ml', hasML.toString());
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Upload failed');
      }

      navigate('/');
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Upload Mod</h1>
      {error && <div {...stylex.props(styles.error)}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Game</label>
          <select value={gameId} onChange={(e) => setGameId(e.target.value)} required {...stylex.props(styles.select)}>
            <option value="">Select a game</option>
            {GAMES.map((game) => (
              <option key={game.id} value={game.id}>{game.name}</option>
            ))}
          </select>
        </div>

        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required {...stylex.props(styles.select)}>
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Mod Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required {...stylex.props(styles.input)} />
        </div>

        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Short Description</label>
          <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} {...stylex.props(styles.input)} />
        </div>

        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} {...stylex.props(styles.textarea)} />
        </div>

        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>License</label>
          <select value={license} onChange={(e) => setLicense(e.target.value)} {...stylex.props(styles.select)}>
            {LICENSES.map((lic) => (
              <option key={lic} value={lic}>{lic}</option>
            ))}
          </select>
        </div>

        <div {...stylex.props(styles.field)}>
          <div {...stylex.props(styles.checkboxRow)}>
            <CheckboxPrimitive.Root
              checked={hasML}
              onCheckedChange={(checked) => setHasML(checked)}
              {...stylex.props(styles.checkbox, hasML && styles.checkboxChecked)}
            >
              <CheckboxPrimitive.Indicator>✓</CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            <span>Contains machine learning files</span>
          </div>
        </div>

        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>File</label>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} required {...stylex.props(styles.fileInput)} />
        </div>

        <button type="submit" {...stylex.props(styles.button)} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Mod'}
        </button>
      </form>
    </div>
  );
}
