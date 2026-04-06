import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="top-navbar glass-morphism">
      <div className="nav-search">
        <Search size={18} />
        <input type="text" placeholder="Search analytics..." />
      </div>
      <div className="nav-actions">
        <button className="icon-btn"><Bell size={20} /></button>
        <div className="user-profile">
          <div className="user-info">
            <span>Welcome back,</span>
            <strong>Finance Guru</strong>
          </div>
          <div className="user-avatar"><User size={20} /></div>
        </div>
      </div>
    </nav>
  );
}