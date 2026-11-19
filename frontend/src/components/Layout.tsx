
import {
  useEffect,
  useState,
  type ComponentType,
  type FormEvent,
  type ReactNode,
} from 'react';

import { Link, useNavigate, Outlet } from 'react-router';
import * as stylex from '@stylexjs/stylex';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import {
  BookOpen,
  Dice5,
  Heart,
  Layers,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Sun,
  Upload,
  User,
  X,
} from 'lucide-react';

import {
  colors,
  fonts,
  themes,
  spacing,
  radii,
  fontSizes,
  headerColors,
  headerDark,
} from '../styles/tokens.stylex';

// ============================================
// Dimensions
// ============================================

const DIMS = {
  headerHeight: 56,
  sidebarWidth: 240,
};

// ============================================
// Types
// ============================================

export interface Game {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  to: string;
}

interface LayoutProps {
  children?: ReactNode;
  game?: Game;
  categories?: Category[];
  activeCategoryId?: number;
  user?: { name: string } | null;
  luckyDipTo?: string;
  searchPath?: string;
  onLogout?: () => void;
}

const DONATE_URL = 'https://www.patreon.com/user?u=2903335&ty=p';
const CHAT_URL = 'https://matrix.to/#/#SpaceDock:52k.de';

// ============================================
// Styles
// ============================================

const styles = stylex.create({

  // Main layout

  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: colors.bg,
    color: colors.text,
    fontFamily: fonts.body,
  },

  header: {
    position: 'sticky',
    top: 0,
    zIndex: 30,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    height: DIMS.headerHeight,
    flexShrink: 0,
    paddingInline: spacing.md,
    backgroundColor: headerColors.bg,
    color: headerColors.text,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: headerColors.border,
    boxShadow: headerColors.shadow,
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    minWidth: 0,
  },

  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    marginInlineStart: 'auto',
  },

  logoLink: {
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    textDecoration: 'none',
  },

  logo: {
    height: 32,
    display: 'block',
  },

  gameBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    minWidth: 0,
  },

  sublogo: {
    height: 24,
    display: 'block',
  },

  burger: {
    display: 'none',
    padding: spacing.sm,
    border: 'none',
    cursor: 'pointer',
    appearance: 'none',
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: colors.text,
    alignItems: 'center',
    justifyContent: 'center',

    ':hover': {
      color: colors.primary,
    },

    ':focus-visible': {
      outline: `2px solid ${colors.primary}`,
      outlineOffset: 2,
    },

    '@media (max-width: 768px)': {
      display: 'flex',
    },
  },

  // Buttons

  iconButton: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: spacing.sm,
    color: colors.text,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    ':hover': {
      color: colors.primary,
    },

    ':focus-visible': {
      outline: `2px solid ${colors.primary}`,
      outlineOffset: 2,
    },
  },

  // Search

  searchForm: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },

  searchInput: {
    padding: `${spacing.xs}px ${spacing.sm}px`,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.none,
    fontSize: fontSizes.body,
    width: 200,
    backgroundColor: colors.bg,
    color: colors.text,
    fontFamily: fonts.body,
  },

  searchButton: {
    padding: spacing.sm,
    border: `1px solid ${colors.primary}`,
    borderRadius: radii.none,
    backgroundColor: colors.primary,
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },

  // Dropdown

  dropdownButton: {
    padding: spacing.sm,
    border: 'none',
    borderRadius: radii.none,
    backgroundColor: 'transparent',
    color: colors.text,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
  },

  dropdownContent: {
    backgroundColor: colors.surface,
    color: colors.text,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.md,
    padding: spacing.xs,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    minWidth: 180,
    zIndex: 100,
  },

  dropdownItem: {
    padding: `${spacing.sm}px ${spacing.md}px`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    color: colors.text,
    fontSize: fontSizes.body,
    fontFamily: fonts.body,
    textDecoration: 'none',
    borderRadius: radii.sm,
    outline: 'none',

    ':hover': {
      backgroundColor: colors.surfaceHover,
    },

    ':focus': {
      backgroundColor: colors.surfaceHover,
    },
  },

  dropdownSeparator: {
    height: 1,
    backgroundColor: colors.border,
    marginBlock: spacing.xs,
  },

  // Main body

  body: {
    display: 'flex',
    flex: 1,
    minHeight: 0,
    backgroundColor: colors.bg,
    color: colors.text,
  },

  // Sidebar

  sidebar: {
    width: DIMS.sidebarWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    padding: spacing.md,
    backgroundColor: colors.bgAlt,
    color: colors.text,
    borderRight: `1px solid ${colors.border}`,
    position: 'sticky',
    top: DIMS.headerHeight,
    height: `calc(100vh - ${DIMS.headerHeight}px)`,
    overflowY: 'auto',

    '@media (max-width: 768px)': {
      position: 'fixed',
      top: DIMS.headerHeight,
      left: 0,
      bottom: 0,
      height: `calc(100vh - ${DIMS.headerHeight}px)`,
      zIndex: 40,
      transform: 'translateX(-100%)',
      transition: 'transform 0.2s ease',
      boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
    },
  },

  sidebarOpen: {
    '@media (max-width: 768px)': {
      transform: 'translateX(0)',
    },
  },

  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs / 2,
    marginBottom: spacing.lg,
  },

  groupLabel: {
    margin: `0 0 ${spacing.xs}px`,
    paddingInline: spacing.sm,
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },

  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderLeft: '3px solid transparent',
    color: colors.text,
    textDecoration: 'none',
    fontSize: 15,
    cursor: 'pointer',

    ':hover': {
      backgroundColor: colors.surfaceHover,
    },
  },

  navItemActive: {
    borderLeftColor: colors.primary,
    backgroundColor: colors.surface,
    color: colors.primary,
    fontWeight: 'bold',
  },

  // Main content

  main: {
    flex: 1,
    minWidth: 0,
    padding: spacing.lg,
    backgroundColor: colors.bg,
    color: colors.text,
  },

  // Footer

  footer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: spacing.xl,
    rowGap: spacing.sm,
    padding: `${spacing.md}px ${spacing.lg}px`,
    backgroundColor: colors.bgAlt,
    borderTop: `1px solid ${colors.border}`,
    fontSize: fontSizes.body,
    flexShrink: 0,
    padding: `${spacing.lg}px ${spacing.xl}px`,
  },

  footerLink: {
    color: colors.textSecondary,
    textDecoration: 'none',

    ':hover': {
      color: colors.primary,
    },
  },
});

// ============================================
// Navigation item
// ============================================

type IconType = ComponentType<{ size?: number }>;

function NavItem(props: {
  icon: IconType;
  children: ReactNode;
  to?: string;
  href?: string;
  active?: boolean;
  onNavigate: () => void;
}) {
  const {
    icon: Icon,
    children,
    to,
    href,
    active,
    onNavigate,
  } = props;

  const sx = stylex.props(
    styles.navItem,
    active && styles.navItemActive,
  );

  const inner = (
    <>
      <Icon size={18} />
      {children}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        {...sx}
        aria-current={active ? 'page' : undefined}
        onClick={onNavigate}
      >
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      {...sx}
    >
      {inner}
    </a>
  );
}

// ============================================
// Dark mode
// ============================================

function useDarkMode() {
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme');

    if (stored !== null) {
      return stored === 'dark';
    }

    return window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle('dark', dark);
    root.classList.toggle('light', !dark);

    root.style.colorScheme = dark ? 'dark' : 'light';

    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return [dark, setDark] as const;
}

// ============================================
// Layout
// ============================================

export function Layout({
  children,
  game,
  categories = [],
  activeCategoryId,
  user,
  luckyDipTo = '/random',
  searchPath = '/search',
  onLogout,
}: LayoutProps) {

  const navigate = useNavigate();

  const [dark, setDark] = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');

  const closeSidebar = () => setSidebarOpen(false);

  const currentCategory =
    categories.find((c) => c.id === activeCategoryId) ?? categories[0];

  function onSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!game) return;

    const scope = [
      `game:${game.id}`,
      currentCategory ? `category:"${currentCategory.name}"` : '',
      query.trim(),
    ]
      .filter(Boolean)
      .join(' ');

    navigate(
      `${searchPath}?query=${encodeURIComponent(scope)}`
    );
  }

  // Apply the selected theme to the entire layout.
  const theme = dark ? themes.dark : themes.light;

  return (
    <div {...stylex.props(theme, styles.root)}>

      {/* Header */}

      <header
        {...stylex.props(
          dark ? headerDark.dark : null,
          styles.header
        )}
      >

        <div {...stylex.props(styles.headerLeft)}>

          <button
            type="button"
            aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((o) => !o)}
            {...stylex.props(styles.iconButton)}
            {...stylex.props(styles.burger)}
            
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link
            to="/"
            aria-label="SpaceDock home"
            {...stylex.props(styles.logoLink)}
          >
            <img
              src="/logo.png"
              alt="SpaceDock"
              {...stylex.props(styles.logo)}
            />
          </Link>

          {game && (
            <Link
              to={`/${game.slug}`}
              {...stylex.props(styles.logoLink)}
            >
              <span {...stylex.props(styles.gameBlock)}>
                <img
                  src="/static/sublogo.png"
                  alt=""
                  {...stylex.props(styles.sublogo)}
                />
              </span>
            </Link>
          )}

        </div>

        <div {...stylex.props(styles.headerRight)}>

          {game && (
            <form
              role="search"
              onSubmit={onSearch}
              {...stylex.props(styles.searchForm)}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  currentCategory
                    ? `Search ${currentCategory.name}…`
                    : 'Search creations…'
                }
                aria-label="Search creations"
                {...stylex.props(styles.searchInput)}
              />

              <button
                type="submit"
                aria-label="Search"
                {...stylex.props(styles.searchButton)}
              >
                <Search size={16} />
              </button>
            </form>
          )}

          {/* User dropdown */}

          {user && (
            <DropdownMenuPrimitive.Root>
              <DropdownMenuPrimitive.Trigger asChild>
                <button
                  type="button"
                  aria-label="User menu"
                  {...stylex.props(styles.dropdownButton)}
                >
                  <User size={18} />
                </button>
              </DropdownMenuPrimitive.Trigger>

              <DropdownMenuPrimitive.Portal>
                <DropdownMenuPrimitive.Content
                  align="end"
                  sideOffset={5}
                  {...stylex.props(
                    theme,
                    styles.dropdownContent
                  )}
                >
                  <DropdownMenuPrimitive.Item asChild>
                    <Link
                      to="/profile"
                      {...stylex.props(styles.dropdownItem)}
                    >
                      <User size={16} />
                      Profile
                    </Link>
                  </DropdownMenuPrimitive.Item>

                  <DropdownMenuPrimitive.Item asChild>
                    <Link
                      to="/create"
                      {...stylex.props(styles.dropdownItem)}
                    >
                      <Upload size={16} />
                      Upload creation
                    </Link>
                  </DropdownMenuPrimitive.Item>

                  <DropdownMenuPrimitive.Separator
                    {...stylex.props(styles.dropdownSeparator)}
                  />

                  <DropdownMenuPrimitive.Item
                    onSelect={onLogout}
                    {...stylex.props(styles.dropdownItem)}
                  >
                    <LogOut size={16} />
                    Log out
                  </DropdownMenuPrimitive.Item>

                </DropdownMenuPrimitive.Content>
              </DropdownMenuPrimitive.Portal>
            </DropdownMenuPrimitive.Root>
          )}

          {/* Theme toggle */}

          <button
            type="button"
            aria-label={
              dark ? 'Switch to light mode' : 'Switch to dark mode'
            }
            onClick={() => setDark(!dark)}
            {...stylex.props(styles.iconButton)}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Profile shortcut */}

          <button
            type="button"
            aria-label="User profile"
            onClick={() => navigate(user ? '/profile' : '/login')}
            {...stylex.props(styles.iconButton)}
          >
            <User size={18} />
          </button>

        </div>
      </header>

      {/* Main body */}

      <div {...stylex.props(styles.body)}>

        {/* Sidebar */}

        {sidebarOpen && (
          <button
          type="button"
          aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen((open) => !open)}
          {...stylex.props(styles.iconButton)}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        )}

        {/* Sidebar */}

        <aside
          {...stylex.props(
            styles.sidebar,
            sidebarOpen && styles.sidebarOpen
          )}
        >

          <nav aria-label="Main">

            <div {...stylex.props(styles.group)}>

              <NavItem
                to="/blog"
                icon={BookOpen}
                onNavigate={closeSidebar}
              >
                Blog
              </NavItem>

              <NavItem
                href={DONATE_URL}
                icon={Heart}
                onNavigate={closeSidebar}
              >
                Donate
              </NavItem>

              <NavItem
                href={CHAT_URL}
                icon={MessageCircle}
                onNavigate={closeSidebar}
              >
                Chat
              </NavItem>

            </div>

            {game && (
              <>
                <div {...stylex.props(styles.group)}>
                  <NavItem
                    to={luckyDipTo}
                    icon={Dice5}
                    onNavigate={closeSidebar}
                  >
                    Lucky dip
                  </NavItem>
                </div>

                {categories.length > 0 && (
                  <div {...stylex.props(styles.group)}>

                    <h2 {...stylex.props(styles.groupLabel)}>
                      Categories
                    </h2>

                    {categories.map((c) => (
                      <NavItem
                        key={c.id}
                        to={c.to}
                        icon={Layers}
                        active={c.id === currentCategory?.id}
                        onNavigate={closeSidebar}
                      >
                        {c.name}
                      </NavItem>
                    ))}

                  </div>
                )}
              </>
            )}

          </nav>
        </aside>

        {/* Page content */}

        <main {...stylex.props(styles.main)}>
          <Outlet />
        </main>

      </div>

      {/* Footer */}

      <footer {...stylex.props(styles.footer)}>

        <a
          href="https://github.com/KSP-SpaceDock/SpaceDock"
          {...stylex.props(styles.footerLink)}
        >
          Source Code
        </a>

        <a
          href="https://github.com/KSP-SpaceDock/SpaceDock/blob/master/api.md"
          {...stylex.props(styles.footerLink)}
        >
          API
        </a>

        <Link
          to="/privacy"
          {...stylex.props(styles.footerLink)}
        >
          Terms &amp; Privacy
        </Link>

        <a
          href="mailto:alpha@spacedock.info"
          {...stylex.props(styles.footerLink)}
        >
          Support
        </a>

        <a
          href="https://discord.gg/htPQYqC"
          {...stylex.props(styles.footerLink)}
        >
          Discord
        </a>

        <a
          href="http://webchat.esper.net/?channels=spacedock"
          {...stylex.props(styles.footerLink)}
        >
          IRC
        </a>

      </footer>

    </div>
  );
}
