import React, { useContext, useState } from 'react';
import { FinanceContext } from './context/FinanceContext';

import { ThemeToggle, RoleToggle } from './components/UI/CustomToggles';
import Sidebar from './components/Layout/Sidebar';
import StatCards from './components/Dashboard/StatCards';
import Charts from './components/Dashboard/Charts';
import Insights from './components/Dashboard/Insights';
import TransactionTable from './components/Transactions/Table';
import AdminModal from './components/Transactions/AdminModals';

import { Plus } from 'lucide-react';

// Styles
import './styles/variables.css';
import './styles/global.css';
import './components/UI/Toggles.css';

export default function App() {
  const { theme, setTheme, role, setRole } = useContext(FinanceContext);

  // Modal + Edit State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className={`app-container app-${role} ${theme}`}>
      
      <div className="main-layout">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <main className="dashboard-content">

          {/* HEADER */}
          <header className="main-header">
            <div className="header-left">
              <h2 className="brand-logo">
                FINANCE<span>FLOW</span>
              </h2>
              <span className="role-badge">
                {role.toUpperCase()} VIEW
              </span>
            </div>

            <div className="header-right">

              {role === 'admin' && (
                <button
                  className="btn-add"
                  onClick={() => {
                    setEditingItem(null); // IMPORTANT FIX
                    setIsModalOpen(true);
                  }}
                >
                  <Plus size={18} /> Add Transaction
                </button>
              )}

              <div className="v-divider"></div>

              <RoleToggle role={role} setRole={setRole} />
              <ThemeToggle theme={theme} setTheme={setTheme} />

            </div>
          </header>

          {/* PAGE CONTENT */}
          <div className="view-container">

            <div className="view-header">
              <h1>Dashboard Overview</h1>
              <p>Track, analyze and manage your finances in real-time.</p>
            </div>

            <StatCards />

            <Charts />

            <TransactionTable onEdit={handleEdit} />

            <Insights />

          </div>
        </main>
      </div>

      {/* MODAL */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleClose}
        editData={editingItem}
      />
    </div>
  );
}