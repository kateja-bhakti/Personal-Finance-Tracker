import React, { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { Filter, XCircle } from 'lucide-react';

export default function AdvancedFilters() {
  const { filters, setFilters } = useContext(FinanceContext);

  const resetFilters = () => {
    setFilters({
      type: 'all',
      dateRange: { start: '', end: '' }
    });
  };

  return (
    <div className="advanced-filters-bar glass-morphism">
      <div className="filter-group">
        <Filter size={16} />
        <select 
          value={filters.type} 
          onChange={(e) => setFilters({...filters, type: e.target.value})}
        >
          <option value="all">All Types</option>
          <option value="income">Income Only</option>
          <option value="expense">Expenses Only</option>
        </select>
      </div>

      <div className="v-divider"></div>

      <button className="btn-text-only" onClick={resetFilters}>
        <XCircle size={16} /> Reset
      </button>
    </div>
  );
}