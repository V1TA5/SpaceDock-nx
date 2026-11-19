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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  card: {
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    padding: 16,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.text,
  },
  parent: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  count: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  button: {
    padding: '4px 8px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: 12,
    margin: '0 2px',
  },
  addButton: {
    padding: '8px 16px',
    border: `1px solid ${colors.primary}`,
    borderRadius: 0,
    backgroundColor: colors.primary,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
  },
  input: {
    padding: '4px 8px',
    border: `1px solid ${colors.border}`,
    borderRadius: 0,
    fontSize: 14,
  },
});

const categories = [
  { id: 1, name: 'Vehicles', slug: 'vehicles', parent: null, count: 1200 },
  { id: 2, name: 'Rocket Parts', slug: 'rocket-parts', parent: 1, count: 450 },
  { id: 3, name: 'Ship Parts', slug: 'ship-parts', parent: 1, count: 380 },
  { id: 4, name: 'Visual', slug: 'visual', parent: null, count: 2100 },
];

export function AdminCategories() {
  const [editing, setEditing] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const getParentName = (parentId: number | null) => {
    if (!parentId) return null;
    const parent = categories.find((c) => c.id === parentId);
    return parent ? parent.name : null;
  };

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
  count: number;
}
const handleEdit = (cat: Category) => {
    setEditing(cat.id);
    setEditName(cat.name);
  };

  const handleSave = () => {
    setEditing(null);
  };

  const handleDelete = () => {
    // Delete category logic
  };

  const renderCategories = (parentId: number | null, depth = 0) => {
    const children = categories.filter((c) => c.parent === parentId);
    if (children.length === 0) return null;

    return (
      <div>
        {children.map((cat) => (
          <div key={cat.id}>
            <div {...stylex.props(styles.row)}>
              <div style={{ paddingLeft: depth > 0 ? 24 : 0, flex: 1 }}>
                {editing === cat.id ? (
                  <div>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      {...stylex.props(styles.input)}
                    />
                    <button {...stylex.props(styles.button)} onClick={handleSave}>Save</button>
                    <button {...stylex.props(styles.button)} onClick={() => setEditing(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <div {...stylex.props(styles.name)}>{cat.name}</div>
                    {getParentName(cat.parent) && (
                      <div {...stylex.props(styles.parent)}>Parent: {getParentName(cat.parent)}</div>
                    )}
                    <div {...stylex.props(styles.count)}>{cat.count} mods</div>
                  </div>
                )}
              </div>
              {editing !== cat.id && (
                <div>
                  <button {...stylex.props(styles.button)} onClick={() => handleEdit(cat)}>Edit</button>
                  <button {...stylex.props(styles.button)} onClick={() => handleDelete(cat.id)}>Delete</button>
                </div>
              )}
            </div>
            {renderCategories(cat.id, depth + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.heading)}>Manage Categories</h1>
        <button {...stylex.props(styles.addButton)}>Add Category</button>
      </div>
      <div {...stylex.props(styles.card)}>
        {renderCategories(null)}
      </div>
    </div>
  );
}
