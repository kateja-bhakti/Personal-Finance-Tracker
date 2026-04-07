import React, { useContext, useState, useEffect } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { 
  LayoutDashboard, ReceiptText, PieChart, 
  PlusCircle, Trash2, HardDriveDownload, FileSpreadsheet, FileJson 
} from 'lucide-react';

export default function Sidebar() {
  const { role, setTransactions } = useContext(FinanceContext);
  const [showExport, setShowExport] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detect mobile width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (isMobile) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div className="sidebar-overlay mobile" onClick={() => setMobileOpen(false)}></div>
      )}

      <aside className={`premium-sidebar ${isMobile ? 'mobile' : ''} ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="abstract-logo"></div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-link" onClick={() => scrollTo('stats-section')}>
            <LayoutDashboard size={22} />
            <span>Dashboard</span>
          </button>
          <button className="nav-link" onClick={() => scrollTo('charts-section')}>
            <PieChart size={22} />
            <span>Analytics</span>
          </button>
          <button className="nav-link" onClick={() => scrollTo('table-section')}>
            <ReceiptText size={22} />
            <span>Transactions</span>
          </button>

          <div className="nav-separator"></div>

          {/* Export Stack */}
          <div className="export-wrapper">
            <button className="nav-link" onClick={() => setShowExport(!showExport)}>
              <HardDriveDownload size={22} />
              <span>Export Data</span>
            </button>
            {showExport && (
              <div className="export-stack">
                <button onClick={() => console.log('CSV')}>
                  <FileSpreadsheet size={20} /><span>CSV</span>
                </button>
                <button onClick={() => console.log('JSON')}>
                  <FileJson size={20} /><span>JSON</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex-spacer"></div>

          {/* Admin Actions */}
          {role === 'admin' && (
            <div className="bottom-stack admin-power-stack">
              <button className="admin-btn add-btn" onClick={() => window.dispatchEvent(new CustomEvent('openAdminModal'))}>
                <PlusCircle size={22} /><span>New Entry</span>
              </button>
              <button className="admin-btn clear-btn" onClick={() => { if (window.confirm("Permanent Wipe?")) setTransactions([]) }}>
                <Trash2 size={22} /><span>Clear All Data</span>
              </button>
            </div>
          )}

          {/* Theme Toggle Placeholder */}
          <button className="theme-toggle-btn">
            {/* Add Sun/Moon icon */}
          </button>
        </nav>
      </aside>

      {/* Mobile Toggle Button */}
      {isMobile && (
        <button className="mobile-toggle-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          ☰
        </button>
      )}
    </>
  );
}