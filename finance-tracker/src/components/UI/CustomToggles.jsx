import React from 'react';
import { Sun, Moon, Shield, User } from 'lucide-react';
import './Toggles.css';

export const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <button 
      className={`theme-switch ${theme}`} 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="switch-handle">
        {theme === 'light' ? <Sun size={14} /> : <Moon size={14} />}
      </div>
    </button>
  );
};

export const RoleToggle = ({ role, setRole }) => {
  const toggleRole = () => setRole(role === 'user' ? 'admin' : 'user');

  return (
    <button 
      className={`role-switch ${role}`} 
      onClick={toggleRole}
      aria-pressed={role === 'admin'}
    >
      <div className="role-handle">
        {role === 'user' ? <User size={14} /> : <Shield size={14} />}
      </div>
      <span className="role-label">
        {role === 'user' ? 'Viewer' : 'Admin'}
      </span>
    </button>
  );
};