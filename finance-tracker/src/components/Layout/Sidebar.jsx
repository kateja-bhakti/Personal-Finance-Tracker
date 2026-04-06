import React, { useContext, useState } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { 
  LayoutDashboard, ReceiptText, PieChart, Settings, 
  ShieldCheck, Download, Menu, X, FileJson, FileSpreadsheet 
} from 'lucide-react';

export default function Sidebar() {
  const { role, transactions } = useContext(FinanceContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // CSV Export Logic
  const exportCSV = () => {
    const headers = ["Date,Amount,Category,Type\n"];
    const rows = transactions.map(t => `${t.date},${t.amount},${t.category},${t.type}`);
    const blob = new Blob([headers + rows.join("\n")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'finance_report.csv');
    a.click();
  };

  const menuItems = [
    { icon: <LayoutDashboard />, label: 'Dashboard', roles: ['user', 'admin'] },
    { icon: <ReceiptText />, label: 'Transactions', roles: ['user', 'admin'] },
    { icon: <PieChart />, label: 'Insights', roles: ['user', 'admin'] },
    { icon: <Settings />, label: 'Admin Panel', roles: ['admin'] },
    { icon: <ShieldCheck />, label: 'User Logs', roles: ['admin'] },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="brand-icon">💎</div>
        {!isCollapsed && <span className="brand-name">FinanceFlow</span>}
        <button className="collapse-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <Menu size={18}/> : <X size={18}/>}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.filter(item => item.roles.includes(role)).map((item, index) => (
          <button key={index} className="nav-link">
            {item.icon}
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
        
        <button className="nav-link export" onClick={exportCSV}>
          <FileSpreadsheet size={20}/>
          {!isCollapsed && <span>Export CSV</span>}
        </button>
      </nav>
    </aside>
  );
}