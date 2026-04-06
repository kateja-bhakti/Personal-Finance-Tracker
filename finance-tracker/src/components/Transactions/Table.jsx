import React, { useContext, useState } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { 
  Search, Download, Trash2, Edit3, ArrowUpDown, XCircle 
} from 'lucide-react';

// ✅ Confirmation Modal (kept inside same file for speed)
function GlassConfirmation({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <div className="glass-modal-overlay">
      <div className="glass-modal">
        <h3>Are you sure?</h3>
        <p>{message}</p>
        <div className="glass-modal-actions">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function TransactionTable({ onEdit }) {
  const { transactions, deleteTransaction, role, filters, setFilters } = useContext(FinanceContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  // ✅ Delete modal state
  const [deleteId, setDeleteId] = useState(null);

  // --- FILTERING ---
  const filteredData = transactions.filter(t => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      t.category.toLowerCase().includes(search) ||
      t.type.toLowerCase().includes(search) ||
      String(t.amount).includes(search);

    const matchesType = filters.type === 'all' || t.type === filters.type;

    const tDate = new Date(t.date);
    const start = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
    const end = filters.dateRange.end ? new Date(filters.dateRange.end) : null;

    const matchesDate = (!start || tDate >= start) && (!end || tDate <= end);

    return matchesSearch && matchesType && matchesDate;
  });

  // --- SORTING ---
  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === 'amount') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // --- EXPORT ---
  const handleExport = (format) => {
    let content =
      format === 'csv'
        ? "Date,Amount,Category,Type\n" +
          sortedData.map(t => `${t.date},${t.amount},${t.category},${t.type}`).join("\n")
        : JSON.stringify(sortedData, null, 2);

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Finance_Report.${format}`;
    link.click();
  };

  return (
    <div className="table-section glass-morphism">

      {/* ✅ DELETE MODAL */}
      <GlassConfirmation
        isOpen={!!deleteId}
        message="This transaction will be permanently deleted."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          deleteTransaction(deleteId);
          setDeleteId(null);
        }}
      />

      {/* CONTROLS */}
      <div className="table-controls">

        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search category, type, amount..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-actions">

          <div className="date-inputs">
            <input 
              type="date" 
              value={filters.dateRange.start} 
              onChange={(e) => setFilters({
                ...filters,
                dateRange: { ...filters.dateRange, start: e.target.value }
              })}
            />

            <span>to</span>

            <input 
              type="date" 
              value={filters.dateRange.end} 
              onChange={(e) => setFilters({
                ...filters,
                dateRange: { ...filters.dateRange, end: e.target.value }
              })}
            />

            <button
              className="clear-btn"
              onClick={() => {
                setSearchTerm("");
                setFilters({
                  ...filters,
                  dateRange: { start: '', end: '' },
                  type: 'all'
                });
              }}
            >
              <XCircle size={16}/>
            </button>
          </div>

          <div className="export-dropdown">
            <button className="btn-secondary">
              <Download size={16} /> Export
            </button>
            <div className="dropdown-content">
              <button onClick={() => handleExport('csv')}>CSV</button>
              <button onClick={() => handleExport('json')}>JSON</button>
            </div>
          </div>

        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort('date')}>Date <ArrowUpDown size={14}/></th>
              <th onClick={() => requestSort('category')}>Category <ArrowUpDown size={14}/></th>
              <th>Type</th>
              <th onClick={() => requestSort('amount')}>Amount <ArrowUpDown size={14}/></th>
              {role === 'admin' && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  No transactions found
                </td>
              </tr>
            ) : (
              sortedData.map(t => (
                <tr key={t.id} className="table-row-animate">
                  <td>{t.date}</td>

                  <td>
                    <span className="category-pill">{t.category}</span>
                  </td>

                  <td>
                    <span className={`status-pill ${t.type}`}>
                      {t.type}
                    </span>
                  </td>

                  <td className={`amount-cell ${t.type}`}>
                    {t.type === 'income' ? '+' : '-'}₹
                    {Math.abs(t.amount).toLocaleString()}
                  </td>

                  {role === 'admin' && (
                    <td className="action-btns">

                      <button onClick={() => onEdit(t)}>
                        <Edit3 size={18}/>
                      </button>

                      <button onClick={() => setDeleteId(t.id)}>
                        <Trash2 size={16}/>
                      </button>

                    </td>
                  )}

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}