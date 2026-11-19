Frontend Stack Recommendations
1. Project Goals

The frontend is a complete replacement of the existing SpaceDock frontend.

Primary goals:

Reproduce the existing SpaceDock design, layout and functionality.
Use modern, maintainable React architecture.
Prioritize fast initial rendering and perceived performance.
Use backend-provided data exclusively. Never invent static application data.
Maintain consistent styling and reusable components.
Support desktop, tablet and mobile layouts.
Support light and dark themes.
Keep the application responsive even with large numbers of creations and games.

The existing SpaceDock frontend is a read-only reference.

2. Core Framework
React
React 19
React DOM 19
TypeScript
React Compiler (optional optimization)

React is the only UI framework.

Use functional components and React hooks.

Avoid unnecessary component abstractions and excessive prop drilling.

React Compiler may be enabled after the application is functional and its build integration has been verified.

TypeScript

Use TypeScript throughout the application.

Requirements:

Strict TypeScript mode.
Avoid any.
Explicit types for API responses.
Shared types for reusable components.
Properly typed route parameters.
Properly typed application state.
Avoid unnecessary type assertions.
3. Build and Development Environment
Vite

Vite is the official build and development system.

Do not use Metro.

Reasons:

Excellent React and TypeScript integration.
Fast development server.
Fast production builds.
Native support for code splitting.
Good integration with StyleX.

Use Vite for both development and production builds.

Docker

All frontend development must happen through Docker Compose.

Never run the frontend directly on the host machine.

Requirements:

Dockerfile for production builds.
Docker Compose development configuration.
Docker Compose production configuration where appropriate.
Nginx for production static file serving.
Development server accessible through the frontend container.
Hot module replacement through Docker.
Persistent dependency caching where appropriate.

Do not install Node.js dependencies or run npm commands directly on the host.

4. Styling System
StyleX

StyleX is the exclusive styling system.

Package:

@stylexjs/stylex
@stylexjs/unplugin
@stylexjs/eslint-plugin

Use the official Vite integration for StyleX.

Requirements:

Build-time style extraction.
Atomic CSS generation.
Type-safe styling.
No competing styling systems.
Centralized design tokens.
Reusable style definitions.
Theme-aware styling.

Do not introduce:

Tailwind CSS.
CSS Modules.
Styled Components.
Emotion.
Material UI styling.
Inline style objects for ordinary component styling.

Plain CSS is permitted only for necessary global browser styles, resets and third-party integration.

Design tokens

Create centralized StyleX design tokens.

At minimum:

Colors
Purpose	Value
Primary accent	#07acd2
Error / danger	#b3182d
Success	#20bb20
Special accent	#743af3
Warning	#e1cb3f
Light mode dark text	#333333
Light mode secondary text	#666666

More saturated shades of the primary accent are allowed.

Support light and dark themes.

Avoid rounded corners. The design should use square corners consistently.

Typography
Headings: MOONLIGHT / MOON font.
General text: Glacial Indifference.
Bold and italic variants are allowed.

Reuse fonts already available in the project.

Do not introduce replacement fonts without a compelling reason.

5. Routing
React Router 7

Use React Router 7.

Primary package:

react-router

Requirements:

Reproduce the routes of the original SpaceDock frontend.
Support nested routes.
Support route parameters.
Support direct URL navigation.
Support browser back and forward navigation.
Support refreshing nested routes.
Use lazy loading for route components.
Preserve existing URL conventions.

A game context is determined by the presence of a game ID in the route.

All game-specific navigation, categories, searches and creation listings must respect the current game context.

Do not invent routes without inspecting the reference project.

6. Data Fetching and Server State
TanStack Query

Use TanStack Query 5 for backend communication and server state.

Package:

@tanstack/react-query

Use it for:

Games.
Creations.
Categories.
Users.
Search results.
Pagination.
Infinite scrolling.
Background refetching.
Cache invalidation.
Mutations.

Requirements:

Centralized QueryClient configuration.
Consistent query key conventions.
Appropriate stale times.
Appropriate cache times.
Loading states.
Error states.
Retry behavior.
Cache invalidation after mutations.
Avoid duplicate requests.

Do not use React Context or global client state for backend data that belongs in TanStack Query.

API architecture

Use native fetch through a centralized API client.

Organize API access by feature.

Example:

src/features/creations/api/creations.ts

Requirements:

Centralized base URL configuration.
Consistent error handling.
Consistent response handling.
Proper authentication handling.
Request cancellation using AbortSignal where appropriate.
Typed request and response definitions.

If the backend provides OpenAPI documentation, use generated TypeScript API types.

Do not duplicate backend business logic in the frontend.

Never introduce fabricated static games, creations, users or other backend data.

If required data is unavailable, investigate the backend and implement the necessary API functionality.

7. Client State Management

Use React Context and useReducer for application-wide client state.

Appropriate examples:

Theme preference.
Sidebar state.
Global UI state.
Temporary application preferences.

Do not introduce Redux, Jotai or Zustand without a demonstrated need.

Use local React state for component-specific interactions.

Use TanStack Query for server state.

Keep the distinction between server state and client state clear.

8. UI Components
Radix UI Primitives

Use Radix UI Primitives for accessible, behavior-heavy interface components.

Examples:

Dropdown menus.
Dialogs.
Popovers.
Tooltips.
Switches.
Accessible menus.
Select components.

Style all primitives using StyleX.

Do not use Radix Themes as the primary design system.

The visual appearance must follow SpaceDock's existing design.

Component architecture

Build reusable components.

Examples:

Header.
Sidebar.
Navigation groups.
Game cards.
Creation cards.
Search bar.
User menu.
Theme switcher.
Section headers.
Loading skeletons.
Error states.
Pagination controls.

Keep components focused and avoid unnecessarily large files.

9. Icons

Use Lucide React.

Requirements:

Import individual icons.
Use consistent icon sizes.
Use consistent stroke widths.
Use icons appropriate to the meaning of navigation items.
Avoid mixing multiple icon libraries.
10. Forms and Validation

Use Zod for validation.

Package:

zod

Requirements:

Validate user input.
Validate URL parameters where appropriate.
Validate API data at important boundaries.
Provide consistent validation messages.
Keep validation schemas reusable.

Initially use native React forms.

Introduce TanStack Form only if complex form requirements justify it.

11. Date Handling

Use date-fns.

Avoid introducing multiple date libraries.

Use consistent date formatting and timezone handling.

12. Performance and Optimization

Performance is a primary architectural requirement.

The application must display useful content as quickly as possible.

Initial rendering
Render the application shell immediately.
Do not block initial rendering on non-essential API requests.
Load page content asynchronously.
Use skeleton placeholders.
Avoid unnecessary JavaScript execution during startup.
Avoid layout shifts.
Code splitting
Lazy-load route components.
Split large feature modules.
Avoid loading unnecessary dependencies.
Keep the initial JavaScript bundle small.
Data loading
Use TanStack Query.
Use pagination or infinite queries for large listings.
Avoid downloading entire creation catalogs.
Avoid duplicate requests.
Use appropriate caching.
Virtualization

Use TanStack Virtual when rendering large lists or grids.

Do not render thousands of creation cards simultaneously.

Only render visible items and a reasonable surrounding buffer.

Images
Use backend-provided images.
Use appropriately sized thumbnails.
Lazy-load images outside the viewport.
Specify image dimensions or aspect ratios.
Prevent layout shifts.
Prefer WebP or AVIF where supported.
Do not download original-sized images for browse cards unnecessarily.

Creation and game cards use 16:9 thumbnails.

Animation

Prefer native CSS transitions for simple interactions.

Avoid unnecessary animation libraries.

Use Motion only if complex animations are genuinely needed.

Animations must not interfere with perceived performance or accessibility.

Performance monitoring

Use:

Web Vitals.
Lighthouse.
rollup-plugin-visualizer.

Monitor:

Largest Contentful Paint (LCP).
Interaction to Next Paint (INP).
Cumulative Layout Shift (CLS).
Initial JavaScript bundle size.
Image loading performance.
13. Testing
Unit and component testing

Use Vitest.

Packages:

vitest
@testing-library/react
@testing-library/user-event
@testing-library/jest-dom

Use React Testing Library for component behavior.

Test meaningful application behavior rather than implementation details.

End-to-end testing

Use Playwright.

Requirements:

All browser testing through Docker Compose.
Never run the frontend directly on the host.
Test desktop, tablet and mobile layouts.
Test light and dark themes.
Test all important routes.
Test direct URL navigation.
Test browser refresh.
Test navigation and search.
Test loading and error states.
Check browser console errors.
Check failed network requests.
Accessibility

Use:

eslint-plugin-jsx-a11y
@axe-core/playwright

Requirements:

Keyboard navigation.
Accessible names.
Proper semantic HTML.
Visible focus states.
Sufficient color contrast.
Accessible menus and dialogs.
14. Code Quality
ESLint

Use ESLint 9 or newer with:

TypeScript ESLint.
React ESLint.
React Hooks ESLint.
StyleX ESLint plugin.
JSX accessibility ESLint plugin.
Formatting

Use Prettier if consistent formatting is not already provided by the existing project.

Git hooks

Husky and lint-staged are optional.

Do not make Git hooks a prerequisite for development.

CI/CD

GitHub Actions may be used for:

Type checking.
Linting.
Unit tests.
Production builds.
Playwright tests.
15. Recommended Directory Structure

Use feature-based organization.

text
frontend/
├── src/
│   ├── app/
│   │   ├── app.tsx
│   │   ├── router.tsx
│   │   └── providers.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── shared/
│   │
│   ├── features/
│   │   ├── games/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   │
│   │   ├── creations/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   │
│   │   ├── categories/
│   │   ├── search/
│   │   ├── auth/
│   │   └── users/
│   │
│   ├── routes/
│   ├── hooks/
│   ├── lib/
│   │   ├── api/
│   │   ├── query/
│   │   └── validation/
│   │
│   ├── styles/
│   │   ├── tokens.stylex.ts
│   │   ├── themes.stylex.ts
│   │   └── global.css
│   │
│   ├── types/
│   └── main.tsx
│
├── public/
├── Dockerfile
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── package.json
└── package-lock.json


This is a recommended structure, not a requirement to create empty directories. Only create directories when they are needed.

16. Dependencies

Use compatible, current stable versions when implementing the project.

Do not blindly copy old dependency versions from this document.

Runtime dependencies
text
react
react-dom
@stylexjs/stylex
react-router
@tanstack/react-query
@tanstack/react-virtual
@radix-ui/react-dialog
@radix-ui/react-dropdown-menu
@radix-ui/react-popover
@radix-ui/react-tooltip
lucide-react
zod
date-fns


Add other Radix primitives only when needed.

Development dependencies
text
typescript
vite
@vitejs/plugin-react
@stylexjs/unplugin
@stylexjs/eslint-plugin
eslint
typescript-eslint
eslint-plugin-react
eslint-plugin-react-hooks
eslint-plugin-jsx-a11y
prettier
vitest
@testing-library/react
@testing-library/user-event
@testing-library/jest-dom
playwright
@axe-core/playwright
rollup-plugin-visualizer
web-vitals


React Compiler and its build integration may be added after the initial application is working.

Use the current compatible versions of all dependencies.

17. Development Rules

These rules are mandatory.

Always use Docker Compose for development.
Never run frontend code directly on the host.
Always inspect the existing backend before implementing API functionality.
Never invent static application data.
Always use StyleX for component styling.
Always follow the existing SpaceDock design.
Never modify the reference project.
Use Playwright for browser verification.
Keep frontend-todo.md updated.
Update progress after meaningful completed tasks.
Never mark unverified work as complete.
Keep the implementation simple and maintainable.
Avoid unnecessary dependencies.
Follow existing backend API conventions.
Do not blindly rename backend identifiers when migrating terminology.
18. Important Architectural Decisions

The following decisions are intentional:

Concern	Decision
UI framework	React
Language	TypeScript
Styling	StyleX exclusively
Bundler	Vite
Development environment	Docker Compose
Production server	Nginx
Routing	React Router 7
Backend data	TanStack Query
Client state	React Context / useReducer
Virtualization	TanStack Virtual
UI primitives	Radix Primitives
Icons	Lucide React
Validation	Zod
Unit tests	Vitest
E2E tests	Playwright

Do not replace these technologies with alternatives without first establishing a concrete technical reason.

19. Final Priority

When making implementation decisions, use this priority order:

Correctness and compatibility with the existing backend.
Fidelity to the original SpaceDock design and functionality.
Fast initial rendering and perceived performance.
Maintainability and clean architecture.
Accessibility and responsive behavior.
Code optimization and bundle size.
Additional visual effects and animations.

Do not sacrifice functionality or maintainability for premature optimization.

The objective is a fast, faithful, maintainable replacement of the SpaceDock frontend.