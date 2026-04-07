import React, { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { Sun, Moon, Shield, UserCircle, User } from 'lucide-react';

export default function Navbar() {
  const { theme, setTheme, role, setRole } = useContext(FinanceContext);

  return (
    <nav className="premium-navbar">
      <div className="nav-brand">
        <h1>FINANCE<span>FLOW</span></h1>
      </div>

      <div className="nav-actions">
        {/* Role Switcher */}
        <div className="xl-role-pill">
          <button className={`xl-btn ${role==='user'?'active-user':''}`} onClick={()=>setRole('user')}>
            <UserCircle size={26}/><span>User</span>
          </button>
          <button className={`xl-btn ${role==='admin'?'active-admin':''}`} onClick={()=>setRole('admin')}>
            <Shield size={26}/><span>Admin</span>
          </button>
        </div>

        {/* Theme Toggle */}
        <button className="theme-xl-toggle" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>
          {theme==='dark'?<Sun size={28}/>:<Moon size={28}/>}
        </button>

        <div className="v-divider"></div>

        {/* Profile */}
        <div className="nav-profile-group">
          <div className="profile-info">
            <p>User</p>
            <span className={`status-${role}`}>{role.toUpperCase()}</span>
          </div>
          <div className="avatar-gold-lg"><User size={26}/></div>
        </div>
      </div>
    </nav>
  );
}