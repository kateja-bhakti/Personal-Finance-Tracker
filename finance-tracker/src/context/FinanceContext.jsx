import React, { createContext, useState, useEffect } from 'react';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {

  // ✅ Load from localStorage safely
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('finance_data');
      return saved ? JSON.parse(saved) : [
        { id: 1, date: '2026-04-01', amount: 5000, category: 'Salary', type: 'income' },
        { id: 2, date: '2026-04-02', amount: 1200, category: 'Rent', type: 'expense' }
      ];
    } catch {
      return [];
    }
  });

  const [theme, setTheme] = useState('dark');
  const [role, setRole] = useState('admin');

  const [filters, setFilters] = useState({ 
    type: 'all', 
    dateRange: { start: '', end: '' } 
  });

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem('finance_data', JSON.stringify(transactions));
  }, [transactions]);

  // ✅ Actions
  const addTransaction = (item) => {
    const newItem = { ...item, id: Date.now() }; // unique ID
    setTransactions(prev => [newItem, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateTransaction = (updatedItem) => {
    setTransactions(prev =>
      prev.map(t => (t.id === updatedItem.id ? updatedItem : t))
    );
  };

  return (
    <FinanceContext.Provider value={{ 
      transactions, 
      addTransaction, 
      deleteTransaction, 
      updateTransaction,
      theme, 
      setTheme, 
      role, 
      setRole, 
      filters, 
      setFilters 
    }}>
      {children}
    </FinanceContext.Provider>
  );
};