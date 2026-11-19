import { Routes, Route, Outlet, Link, useNavigate } from 'react-router';
import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Search, Moon, Sun, User } from 'lucide-react';
import { colors, fonts } from './styles/tokens.stylex';

// Import all pages
import { Home } from './pages/Home';
import { GameDetail } from './pages/GameDetail';
import { SearchPage } from './pages/Search';
import { ModsList } from './pages/ModsList';
import { ModDetail } from './pages/ModDetail';
import { Profile } from './pages/Profile';
import { ProfileEdit } from './pages/ProfileEdit';
import { CreateUpload } from './pages/CreateUpload';
import { CreatePack } from './pages/CreatePack';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { BlogIndex } from './pages/BlogIndex';
import { BlogPost } from './pages/BlogPost';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { MarkdownInfo } from './pages/MarkdownInfo';
import { RandomMod } from './pages/RandomMod';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { AdminMain } from './pages/admin/AdminMain';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminGames } from './pages/admin/AdminGames';
import { AdminMods } from './pages/admin/AdminMods';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminNotifications } from './pages/admin/AdminNotifications';
import { AdminEmails } from './pages/admin/AdminEmails';
import { AdminLinks } from './pages/admin/AdminLinks';
import { AdminLockedMods } from './pages/admin/AdminLockedMods';
import { Layout } from './components/Layout';


export function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:gameshort" element={<GameDetail />} />
        <Route path="/:gameshort/:modcategory" element={<GameDetail />} />
        <Route path="/:gameshort/browse" element={<ModsList />} />
        <Route path="/:gameshort/browse/:sort" element={<ModsList />} />
        <Route path="/:gameshort/:modcategory/browse" element={<ModsList />} />
        <Route path="/:gameshort/:modcategory/browse/:sort" element={<ModsList />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:gameshort/search" element={<SearchPage />} />
        <Route path="/:gameshort/:modcategory/:mod_id/:mod_name" element={<ModDetail />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/:username/edit" element={<ProfileEdit />} />
        <Route path="/create/upload" element={<CreateUpload />} />
        <Route path="/create/pack" element={<CreatePack />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:post" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/markdown" element={<MarkdownInfo />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/random" element={<RandomMod />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/games" element={<AdminGames />} />
        <Route path="/admin/mods" element={<AdminMods />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/emails" element={<AdminEmails />} />
        <Route path="/admin/links" element={<AdminLinks />} />
        <Route path="/admin/locked-mods" element={<AdminLockedMods />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
