import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../../styles/tokens.stylex';

const styles = stylex.create({
  container: { padding: 24 },
  heading: {
    fontFamily: fonts.heading,
    fontSize: 24,
    marginBottom: 16,
    color: colors.text,
  },
  card: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 16,
    marginBottom: 16,
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
  button: {
    padding: '4px 8px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: 12,
  },
  primaryButton: {
    padding: '8px 16px',
    border: `1px solid ${colors.primary}`,
    borderRadius: 0,
    backgroundColor: colors.primary,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: `1px solid ${colors.border}`,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.text,
  },
  url: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

interface LinkItem {
  id: number;
  name: string;
  url: string;
  order: number;
  section: string;
}

const defaultLinks: LinkItem[] = [
  { id: 1, name: 'Home', url: '/', order: 1, section: 'Main' },
  { id: 2, name: 'Games', url: '/games', order: 2, section: 'Main' },
  { id: 3, name: 'Mods', url: '/mods', order: 3, section: 'Main' },
];

export function AdminLinks() {
  const [links, setLinks] = useState<LinkItem[]>(defaultLinks);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newOrder, setNewOrder] = useState(0);
  const [newSection] = useState('Main');
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editOrder, setEditOrder] = useState(0);
  const [editSection, setEditSection] = useState('Main');

  const addLink = () => {
    if (!newName || !newUrl) return;
    const newLink: LinkItem = { id: links.length + 1, name: newName, url: newUrl, order: newOrder, section: newSection };
    setLinks([...links, newLink].sort((a, b) => a.order - b.order));
    setNewName('');
    setNewUrl('');
    setNewOrder(0);
  };

  const startEdit = (link: LinkItem) => {
    setEditId(link.id);
    setEditName(link.name);
    setEditUrl(link.url);
    setEditOrder(link.order);
    setEditSection(link.section);
  };

  const saveEdit = () => {
    setLinks(links.map(l => {
      if (l.id === editId) {
        return { ...l, name: editName, url: editUrl, order: editOrder, section: editSection };
      }
      return l;
    }));
    setEditId(null);
  };

  const deleteLink = (id: number) => {
    setLinks(links.filter(l => l.id !== id));
  };

  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.heading)}>Manage Links</h1>

      <div {...stylex.props(styles.card)}>
        <h2 {...stylex.props(styles.heading)}>Add Link</h2>
        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Name</label>
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} {...stylex.props(styles.input)} />
        </div>
        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>URL</label>
          <input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} {...stylex.props(styles.input)} />
        </div>
        <div {...stylex.props(styles.field)}>
          <label {...stylex.props(styles.label)}>Order</label>
          <input type="number" value={newOrder} onChange={(e) => setNewOrder(Number(e.target.value))} {...stylex.props(styles.input)} />
        </div>
        <button onClick={addLink} {...stylex.props(styles.primaryButton)}>Add Link</button>
      </div>

      <h2 {...stylex.props(styles.heading)}>Existing Links</h2>
      {links.map(link => (
        <div key={link.id} {...stylex.props(styles.row)}>
          <div>
            <div {...stylex.props(styles.name)}>{link.name}</div>
            <div {...stylex.props(styles.url)}>{link.url}</div>
          </div>
          <div {...stylex.props(styles.field)}>
            <button onClick={() => startEdit(link)} {...stylex.props(styles.button)}>Edit</button>
            <button onClick={() => deleteLink(link.id)} {...stylex.props(styles.button)}>Delete</button>
          </div>
        </div>
      ))}

      {editId !== null && (
        <div {...stylex.props(styles.card)}>
          <h2 {...stylex.props(styles.heading)}>Edit Link</h2>
          <div {...stylex.props(styles.field)}>
            <label {...stylex.props(styles.label)}>Name</label>
            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} {...stylex.props(styles.input)} />
          </div>
          <div {...stylex.props(styles.field)}>
            <label {...stylex.props(styles.label)}>URL</label>
            <input type="text" value={editUrl} onChange={(e) => setEditUrl(e.target.value)} {...stylex.props(styles.input)} />
          </div>
          <div {...stylex.props(styles.field)}>
            <label {...stylex.props(styles.label)}>Order</label>
            <input type="number" value={editOrder} onChange={(e) => setEditOrder(Number(e.target.value))} {...stylex.props(styles.input)} />
          </div>
          <div {...stylex.props(styles.field)}>
            <button onClick={saveEdit} {...stylex.props(styles.primaryButton)}>Save</button>
            <button onClick={() => setEditId(null)} {...stylex.props(styles.button)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
