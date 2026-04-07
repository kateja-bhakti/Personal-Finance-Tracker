import React, { useContext, useState, useMemo } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { 
  Search, Trash2, Edit3, Filter, SortAsc, XCircle, AlertCircle, Calendar 
} from 'lucide-react';

// ✅ Premium Glass Confirmation Modal
function GlassConfirmation({ isOpen, onConfirm, onCancel, title, message, isDelete }) {
  if (!isOpen) return null;
  const accentColor = isDelete ? '#ef4444' : '#6366f1';

  return (
    <div className="glass-modal-overlay">
      <div className="glass-modal animate-slide-up">
        <div className="modal-icon" style={{ backgroundColor: `${accentColor}20` }}>
          <AlertCircle size={32} color={accentColor} />
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="glass-modal-actions">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button 
            className="btn-confirm-delete" 
            style={{ backgroundColor: accentColor }} 
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TransactionTable({ onEdit }) {
  const { transactions, deleteTransaction, setTransactions, role, filters, setFilters } = useContext(FinanceContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState('date-new');
  const [confirmState, setConfirmState] = useState({ open: false, type: null, id: null });

  // --- ADVANCED FILTER & SORT LOGIC ---
  const processedData = useMemo(() => {
    let data = transactions.filter(t => {
      const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filters.type === 'all' || t.type === filters.type;
      
      const tDate = new Date(t.date);
      const start = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
      const end = filters.dateRange.end ? new Date(filters.dateRange.end) : null;
      const matchesDate = (!start || tDate >= start) && (!end || tDate <= end);

      return matchesSearch && matchesType && matchesDate;
    });

    return data.sort((a, b) => {
      switch (sortConfig) {
        case 'amt-high': return b.amount - a.amount;
        case 'amt-low': return a.amount - b.amount;
        case 'date-old': return new Date(a.date) - new Date(b.date);
        case 'name-az': return a.category.localeCompare(b.category);
        case 'name-za': return b.category.localeCompare(a.category);
        default: return new Date(b.date) - new Date(a.date); // date-new
      }
    });
  }, [transactions, searchTerm, filters, sortConfig]);

  return (
    <div className={`table-section role-${role}`}>
      {/* MODAL HANDLER */}
      <GlassConfirmation 
        isOpen={confirmState.open}
        title={confirmState.type === 'clear' ? "Clear All Data?" : "Delete Transaction?"}
        message={confirmState.type === 'clear' ? "This will wipe your entire financial history." : "This action cannot be undone."}
        isDelete={true}
        onCancel={() => setConfirmState({ open: false, type: null, id: null })}
        onConfirm={() => {
          if (confirmState.type === 'clear') setTransactions([]);
          else deleteTransaction(confirmState.id);
          setConfirmState({ open: false, type: null, id: null });
        }}
      />

      {/* NEW COMMAND BAR */}
      <div className="table-controls">
        <div className="command-bar">
          <div className="command-box">
            <Search size={16} />
            <input 
              placeholder="Search category..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          <div className="command-box">
            <Filter size={16} />
            <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="command-box">
            <SortAsc size={16} />
            <select value={sortConfig} onChange={(e) => setSortConfig(e.target.value)}>
              <option value="date-new">Newest First</option>
              <option value="date-old">Oldest First</option>
              <option value="amt-high">Highest Amount</option>
              <option value="amt-low">Lowest Amount</option>
              <option value="name-az">Name (A-Z)</option>
              <option value="name-za">Name (Z-A)</option>
            </select>
          </div>
          <div>

        {/* ✅ CLEAR ALL - ADMIN ONLY */}
        {role === 'admin' && (
          <button className="command-box clear-btn" onClick={() => setConfirmState({ open: true, type: 'clear' })}>
            <XCircle size={16} /> <span>Clear Ledger</span>
          </button>
        )}
      </div>
        </div>
      </div>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              {role === 'admin' && <th style={{textAlign: 'right'}}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {processedData.map(t => (
              <tr key={t.id} className="premium-row animate-slide-up">
                <td>{t.date}</td>
                <td><span className="category-pill">{t.category}</span></td>
                <td><span className={`pill-${t.type}`}>{t.type}</span></td>
                <td className={`amt-${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString()}
                </td>
                {role === 'admin' && (
                  <td className="row-actions">
                    <button onClick={() => onEdit(t)} className="edit-icon"><Edit3 size={16}/></button>
                    <button onClick={() => setConfirmState({ open: true, type: 'delete', id: t.id })} className="delete-icon"><Trash2 size={16}/></button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}