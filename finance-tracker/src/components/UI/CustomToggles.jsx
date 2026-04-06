import React from 'react';
import { Sun, Moon, Shield, User } from 'lucide-react';
import './Toggles.css';

export const ThemeToggle = ({ theme, setTheme }) => (
  <div
    className={`theme-switch ${theme}`}
    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
  >
    <div className="switch-handle">
      {theme === 'light'
        ? <Sun size={14} />
        : <Moon size={14} />}
    </div>
  </div>
);

export const RoleToggle = ({ role, setRole }) => (
  <div
    className={`role-switch ${role}`}
    onClick={() => setRole(role === 'user' ? 'admin' : 'user')}
  >
    <div className="role-handle">
      {role === 'user' ? <User size={14} /> : <Shield size={14} />}
    </div>
    <span className="role-label">
      {role === 'user' ? 'Viewer' : 'Admin'}
    </span>
  </div>
);
