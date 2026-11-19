SpaceDock Frontend Rebuild — Development Todo

Status: Investigation and implementation in progress
Authoritative specification: System prompt for SpaceDock Frontend Replacement
Technology specification: docs/frontend-stack.md
Progress tracker: docs/frontend-todo.md

1. Project Status and Ground Rules
1.1 Project objective

Replace the existing SpaceDock frontend with a modern React 19, TypeScript, Vite and StyleX application.

The replacement must:

Preserve existing SpaceDock functionality.
Mirror legacy routes.
Reproduce the existing SpaceDock design and identity.
Replace user-facing "mods" terminology with "creations".
Use backend-provided data exclusively.
Improve initial rendering and overall performance.
Support desktop, tablet and mobile.
Support light and dark themes.
Run through Docker Compose.
Use Playwright for browser testing.
1.2 Sources of truth
Legacy source: ~/Documents/projects/spacedock/SpaceDock
Legacy production: https://alpha.spacedock.info/
Technology specification: docs/frontend-stack.md
Master implementation specification: SpaceDock Frontend Replacement system prompt.

The legacy source project is strictly read-only.

Never modify anything inside it.

1.3 Mandatory development rules
All development through Docker Compose.
Never run frontend code directly on the host.
Never modify the legacy reference project.
Never invent static application data.
Never implement fake functionality.
Use StyleX for component styling.
Use the actual backend for application data.
Use Playwright for browser verification.
Update this todo after meaningful completed tasks.
Verify existing implementations before marking tasks complete.
2. Historical Implementation Status

The previous todo reported the following work on 2026-11-16.

These are historical claims and must be independently verified.

2.1 Previously reported completed work
New frontend/ directory created.
Initial dependency installation completed.
Initial Vite build pipeline created.
Initial development scripts added.
Basic application shell created.
Initial routing configuration created.
Frontend container created.
Frontend container reported working on port 5080.
2.2 Previously reported architectural decisions
Legacy frontend removed rather than migrated.
Minimal Jinja templates retained for error pages and backend test coverage.
Backend previously served built React assets from frontend/build/.
Frontend container also served the React application independently on port 5080.

These decisions must be investigated.

Determine the current intended production architecture and ensure it is consistent with the master system prompt.

Do not automatically preserve outdated architectural decisions.

2.3 Previous unfinished work
Component library.
State management.
Remaining frontend functionality.
Testing.
Performance optimization.
Production deployment.

Do not assume the previous phase numbering or completion status remains valid.

3. Phase 1 — Investigation and Current-State Audit

Priority: Critical

Before implementing additional functionality, establish what currently exists.

3.1 Inspect project documentation
Read docs/frontend-stack.md.
Read this todo document.
Read the master implementation specification.
Inspect current frontend directory.
Inspect current backend directory.
Inspect current Docker Compose configuration.
Inspect Git status.
Identify the actual frontend project root.
Identify existing build and deployment workflows.
3.2 Inspect legacy reference

Reference:

~/Documents/projects/spacedock/SpaceDock

Inspect complete route definitions.
Inspect page templates.
Inspect navigation.
Inspect header and sidebar.
Inspect game browsing.
Inspect creation browsing.
Inspect creation detail pages.
Inspect search.
Inspect authentication.
Inspect creator functionality.
Inspect uploads.
Inspect downloads.
Inspect version management.
Inspect user profiles.
Inspect statistics.
Inspect notifications and community functionality.
Identify all relevant assets.
Identify existing fonts.
Identify logos and images.
Document all discovered functionality.

Verification: Confirm that the reference project has not been modified.

3.3 Inspect production frontend

URL: https://alpha.spacedock.info/

Inspect homepage.
Inspect browse pages.
Inspect game pages.
Inspect creation pages.
Inspect category navigation.
Inspect search.
Inspect user interface.
Inspect responsive layout.
Inspect light/dark appearance if available.
Record important visual differences between production and source code.
3.4 Inspect backend
Identify backend framework and architecture.
Inspect API routes.
Inspect database models.
Inspect authentication mechanism.
Inspect game endpoints.
Inspect creation endpoints.
Inspect category endpoints.
Inspect search endpoints.
Inspect image handling.
Inspect upload functionality.
Inspect download functionality.
Inspect version management.
Inspect user-related endpoints.
Identify missing API capabilities.
Identify existing API functionality that can be reused.

Do not implement duplicate backend functionality.

3.5 Create investigation documents
Create docs/frontend-route-inventory.md.
Create docs/frontend-api-inventory.md.
Create docs/frontend-design-inventory.md.
Create docs/frontend-functionality-inventory.md.

These documents should contain actual findings, not assumptions.

4. Phase 2 — Foundation and Toolchain Verification

Priority: Critical

The previous implementation reported that the foundation was complete.

Verify it against the current stack before extending it.

4.1 React and TypeScript
Verify React 19.
Verify React DOM 19.
Verify TypeScript.
Enable strict TypeScript.
Verify type checking.
Verify existing dependency compatibility.
4.2 Vite and StyleX
Verify Vite configuration.
Verify StyleX integration.
Verify @stylexjs/stylex.
Verify @stylexjs/unplugin.
Verify StyleX CSS extraction.
Verify production build output.
Verify development HMR.
Verify StyleX ESLint plugin.
Remove obsolete StyleX integrations.
Remove competing styling systems.
Document the actual build configuration.
4.3 Dependencies
Verify React Router 7.
Verify TanStack Query.
Verify TanStack Virtual.
Verify Radix UI Primitives.
Verify Lucide React.
Verify Zod.
Verify date-fns.
Verify Vitest.
Verify React Testing Library.
Verify Playwright.
Verify accessibility testing dependencies.

Remove obsolete dependencies where they are no longer needed.

Do not install duplicate or competing libraries.

4.4 Scripts and quality tools
Verify development script.
Verify production build script.
Verify TypeScript checking script.
Verify lint script.
Verify unit test script.
Verify Playwright test script.
Verify formatting script.
Verify bundle analysis script.
5. Phase 3 — Docker Development Infrastructure

Priority: Critical

The application must run entirely through Docker Compose.

5.1 Development environment
Inspect existing Docker Compose architecture.
Integrate frontend with existing backend services.
Create or update frontend development Dockerfile.
Configure Vite development server.
Configure HMR through Docker.
Configure volume mounts.
Configure dependency caching.
Configure frontend/backend networking.
Verify backend hostname resolution.
Verify API connectivity.
Verify frontend accessibility from host browser.
5.2 Production environment
Create or update multi-stage production Dockerfile.
Use Node.js 26 for the build stage.
Use Nginx stable Alpine for production.
Install dependencies using npm ci.
Build Vite production output.
Copy dist/ into Nginx document root.
Configure complete Nginx configuration.
Configure SPA fallback.
Configure /api/ reverse proxy.
Configure appropriate response headers.
Add .dockerignore.
Add health checks where appropriate.
Verify final container does not include Node.js.
Verify production container runs correctly.
5.3 Architecture decision
Determine whether backend currently serves frontend assets.
Determine whether frontend should be served exclusively by Nginx.
Remove conflicting or obsolete serving configurations if appropriate.
Ensure no duplicate frontend serving architecture remains.
Preserve backend API availability.
Document the final architecture.
6. Phase 4 — Design System

Priority: High

6.1 Assets and typography
Locate SpaceDock logo.
Locate /static/sublogo.png.
Locate MOONLIGHT / MOON fonts.
Locate Glacial Indifference fonts.
Verify font licenses and local availability.
Integrate original fonts.
Verify heading typography.
Verify general typography.
6.2 StyleX tokens
Create centralized StyleX design tokens.
Define primary accent #07acd2.
Define error #b3182d.
Define success #20bb20.
Define special accent #743af3.
Define warning #e1cb3f.
Define light-mode text #333333.
Define light-mode secondary text #666666.
Define dark-mode equivalents.
Define spacing tokens.
Define typography tokens.
Define sizing tokens.
Define borders and corner styles.
6.3 Themes
Implement light theme.
Implement dark theme.
Implement theme switching.
Persist theme preference.
Prevent incorrect-theme flashes.
Verify contrast.
Verify theme consistency across all components.
6.4 Shared UI components
Buttons.
Inputs.
Cards.
Dialogs.
Dropdowns.
Tooltips.
Switches.
Loading skeletons.
Error states.
Empty states.
Section headers.

All components must use StyleX.

Avoid rounded corners.

7. Phase 5 — Global Application Shell

Priority: Critical

7.1 Header
Implement uniform header.
Add SpaceDock logo.
Add /static/sublogo.png.
Display current game name when applicable.
Implement user menu.
Implement theme switcher.
Implement game-specific search.
Position search correctly relative to theme switcher.
Verify responsive header behavior.
7.2 Sidebar
Implement desktop sidebar.
Implement mobile burger menu.
Implement collapsible navigation.
Implement navigation groups.
Add navigation prefix icons.
Add Blog.
Add Donate external link.
Add Chat external link.
Implement active navigation state.
Verify responsive behavior.
7.3 Game-specific sidebar
Detect game context from route game ID.
Display Lucky Dip when inside a game.
Retrieve game categories from backend.
Display category navigation.
Highlight active category.
Implement default category behavior.
Preserve game context during navigation.
Verify navigation on mobile.
7.4 Global layout
Implement consistent page container.
Implement content area.
Implement section header component.
Align section actions to the right.
Verify consistent spacing.
Verify desktop layout.
Verify tablet layout.
Verify mobile layout.
8. Phase 6 — Routing and Backend Integration

Priority: Critical

8.1 Routing
Reproduce all legacy routes.
Implement nested routes.
Implement route parameters.
Implement 404 handling.
Implement direct URL navigation.
Verify browser back and forward.
Verify nested-route refresh.
Implement lazy-loaded routes.
Verify game context.
Verify category context.

The route inventory is authoritative.

Do not use invented example routes.

8.2 API architecture
Implement centralized fetch client.
Implement API base URL configuration.
Implement authentication handling.
Implement standardized errors.
Implement AbortSignal support.
Implement typed API responses.
Implement Zod validation where appropriate.
Implement TanStack Query provider.
Configure query defaults.
Define query key conventions.
Define cache policies.
Verify API error handling.
8.3 Backend integration
Games API.
Creations API.
Categories API.
Search API.
User API.
Authentication API.
Upload API.
Download API.
Version API.
Statistics API.
Other endpoints discovered during investigation.

Only implement endpoints actually required by the legacy functionality or new specification.

If backend changes are required, implement them following existing conventions.

9. Phase 7 — Main Public Pages

Priority: High

9.1 Homepage
Inspect legacy homepage.
Identify all homepage sections.
Retrieve actual backend data.
Implement section headers.
Implement related action buttons.
Implement game and creation cards.
Implement loading states.
Implement empty states.
Implement error handling.
Verify visual fidelity.
9.2 Game browsing
Retrieve games from backend.
Implement game grid.
Implement 16:9 thumbnails.
Implement centered game names.
Make complete cards clickable.
Implement pagination or infinite loading where appropriate.
Implement search/filtering if supported by legacy behavior.
Verify direct game navigation.
9.3 Creation browsing
Retrieve creations from backend.
Implement creation grid.
Implement 16:9 thumbnails.
Implement centered creation names.
Make complete cards clickable.
Implement pagination or infinite loading.
Respect current game context.
Respect current category context.
Implement loading states.
Implement empty states.
Implement error states.
9.4 Creation details
Inspect legacy creation detail layout.
Retrieve creation data from backend.
Implement creation information.
Implement images.
Implement creator information.
Implement download functionality.
Implement version information.
Implement changelogs where available.
Implement related functionality.
Verify all interactions.
9.5 Search
Inspect legacy search behavior.
Implement game-specific search.
Implement category-specific search.
Implement actual backend search.
Implement loading state.
Implement empty results.
Implement error handling.
Verify search navigation.
9.6 Lucky Dip
Implement random creation selection.
Scope selection to current game.
Scope selection to active category when applicable.
Use actual backend data.
Handle empty result sets.
Navigate to selected creation.
Verify repeated usage.
10. Phase 8 — Remaining Legacy Functionality

Priority: High

Use the functionality inventory as the authoritative task list.

10.1 Authentication
Login.
Registration.
Logout.
Password recovery.
Authentication persistence.
Session expiration.
Protected routes.
Authentication error handling.
10.2 User functionality
User profiles.
User-owned creations.
User statistics.
Account settings.
Other existing user workflows.
10.3 Creator functionality
Creation uploads.
Creation editing.
Creation management.
Version management.
Changelogs.
Creator statistics.
Download statistics.
Upload validation.
Error handling.
10.4 Community functionality
Favorites or following.
Notifications.
Blog.
Other existing community features.
10.5 Remaining legacy routes
Implement every remaining route in the route inventory.
Verify each route against its legacy behavior.
Verify backend integration.
Add Playwright coverage.

Do not implement speculative functionality.

11. Phase 9 — Performance Optimization

Priority: High

11.1 Initial rendering
Render application shell immediately.
Avoid blocking initial render on non-essential requests.
Load important content first.
Implement skeleton placeholders.
Prevent layout shifts.
Verify first meaningful content appears quickly.
11.2 JavaScript optimization
Implement route-level code splitting.
Lazy-load large features.
Remove unused dependencies.
Analyze bundle size.
Optimize dependency imports.
Verify tree shaking.
11.3 Data loading
Implement appropriate TanStack Query caching.
Implement pagination or infinite queries.
Avoid duplicate API requests.
Cancel obsolete requests.
Avoid downloading complete catalogs unnecessarily.
11.4 Image optimization
Use backend-provided image URLs.
Investigate thumbnail generation.
Use responsive image sizes.
Lazy-load below-the-fold images.
Preserve aspect ratios.
Prevent layout shifts.
Verify image loading behavior.
11.5 Virtualization
Evaluate creation listing sizes.
Evaluate game listing sizes.
Implement TanStack Virtual where justified.
Verify scrolling performance.
11.6 Performance measurement
Run Lighthouse.
Measure LCP.
Measure INP.
Measure CLS.
Measure initial JavaScript size.
Identify bottlenecks.
Document results.
Verify improvements.

Initial targets:

LCP <= 2.5 seconds.
INP <= 200 ms.
CLS <= 0.1.
12. Phase 10 — Testing and Accessibility

Priority: High

12.1 Unit tests
Configure Vitest.
Configure React Testing Library.
Configure test environment.
Test shared UI components.
Test important utility functions.
Test API client behavior.
Test validation logic.
Test application state.

Test meaningful behavior rather than implementation details.

12.2 Integration tests
Test API integration.
Test TanStack Query behavior.
Test authentication flows.
Test navigation.
Test search.
Test game/category context.
Test creation interactions.
12.3 Playwright
Configure Playwright through Docker Compose.
Configure browser test environment.
Test homepage.
Test game browsing.
Test creation browsing.
Test category navigation.
Test Lucky Dip.
Test search.
Test creation detail pages.
Test authentication.
Test user menu.
Test theme switcher.
Test sidebar.
Test responsive layouts.
Test direct URL navigation.
Test nested-route refresh.
Test browser back and forward.
Test error states.
12.4 Visual testing
Compare homepage with legacy.
Compare game browsing.
Compare creation browsing.
Compare creation detail pages.
Compare header.
Compare sidebar.
Compare responsive layouts.
Compare light theme.
Compare dark theme.
12.5 Accessibility
Verify semantic HTML.
Verify keyboard navigation.
Verify visible focus states.
Verify accessible names.
Verify dialogs and dropdowns.
Verify image alt text.
Run axe-core checks.
Resolve important accessibility violations.
12.6 Regression verification
Verify all previously implemented routes.
Verify all previously implemented features.
Check browser console.
Check failed network requests.
Verify production build after changes.
13. Phase 11 — Production Readiness

Priority: High

13.1 Docker production
Verify production Dockerfile.
Verify multi-stage build.
Verify Nginx configuration.
Verify SPA fallback.
Verify API reverse proxy.
Verify static asset MIME types.
Verify production image size.
Verify container startup.
Verify container restart behavior.
13.2 Deployment integration
Inspect existing production Compose configuration.
Inspect existing Docker Swarm deployment.
Determine frontend service configuration.
Integrate new frontend image.
Verify networking.
Verify backend connectivity.
Verify deployment configuration.
Verify rollback strategy.

Do not deploy to production without explicit authorization.

13.3 Documentation
Update docs/frontend-stack.md to reflect actual implementation.
Update route inventory.
Update API inventory.
Document Docker development commands.
Document production build.
Document known issues.
Document architectural decisions.
14. Explicitly Removed from the Previous Plan

The following items are no longer requirements unless a concrete need is discovered.

Jotai as mandatory state management — replaced by React Context and useReducer.
Jest — replaced by Vitest.
Tailwind — replaced by StyleX.
Sass as component styling — replaced by StyleX.
Metro — replaced by Vite.
@stylexjs/babel-plugin as the prescribed Vite integration — use the supported StyleX Vite integration.
React Icons — replaced by Lucide React.
Radix Themes — use Radix Primitives with StyleX.
Matomo — not part of the current requirements.
Sentry — optional, not mandatory.
PWA/service worker — optional, not mandatory.
Gamification system — only implement if confirmed as existing functionality.
Build time below 10 seconds as a hard completion criterion — measure and optimize rather than use an arbitrary universal threshold.
Automatic Swarm deployment — only after inspecting the existing deployment architecture and obtaining authorization.

These decisions must not be silently reintroduced.

15. Definition of Done

The project is complete only when:

Design
Original SpaceDock visual identity preserved.
Correct logos and fonts.
Correct design tokens.
Light and dark themes.
Responsive header and sidebar.
Consistent section headers.
Correct game cards.
Correct creation cards.
Functionality
All relevant legacy routes implemented.
All relevant legacy functionality preserved.
User-facing terminology migrated to creations.
Backend-driven data.
Search works.
Game context works.
Category context works.
Lucky Dip works.
Authentication works.
Creator workflows work.
Downloads work.
No fake application data.
Technology
React 19.
TypeScript.
Vite.
StyleX.
React Router 7.
TanStack Query.
Docker Compose.
Nginx production serving.
Quality
Type checking passes.
ESLint passes.
Unit tests pass.
Playwright tests pass.
Accessibility checked.
No significant browser console errors.
No unexpected failed API requests.
Performance measured.
Deployment
Development runs through Docker Compose.
Production image builds.
Nginx serves the application.
API proxy works.
Nested route refresh works.
Production container does not include Node.js.
Documentation
Stack documentation updated.
Route inventory complete.
API inventory complete.
Functionality inventory complete.
Known issues documented.
Interruption recovery notes current.
16. Current Session Recovery Notes

Update this section whenever work stops or is interrupted.

Last completed phase:

To be verified.

Current phase:

Phase 1 — Investigation and Current-State Audit.

Last completed task:

To be verified against the actual project.

Current task:

Inspect current frontend, backend, documentation and Docker architecture.

Files currently being modified:

Record actual files here.

Known issues:

Record verified issues here.

Next steps:

Read docs/frontend-stack.md.
Inspect the replacement frontend.
Inspect Docker Compose.
Inspect the backend.
Inspect the read-only legacy reference.
Inspect the live Alpha frontend.
Produce route, API, design and functionality inventories.
Update this document with verified progress.

Last updated:

Update with actual date and time when progress is recorded.

17. Progress Log

Record meaningful completed milestones here.

Format:

YYYY-MM-DD — Milestone
Completed:
Files changed:
Verification:
Remaining:
Next steps:

Do not record a milestone as complete without verification.