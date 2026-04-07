import React, { createContext, useState, useEffect, useMemo } from 'react';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('finance_data');
      return saved
        ? JSON.parse(saved)
        : [
            { id: 1, date: '2026-04-01', amount: 5000, category: 'Salary', type: 'income' },
            { id: 2, date: '2026-04-02', amount: 1200, category: 'Rent', type: 'expense' },
          ];
    } catch {
      return [];
    }
  });

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [role, setRole] = useState('admin');
  const [filters, setFilters] = useState({ type: 'all', dateRange: { start: '', end: '' } });

  // Save transactions & theme to localStorage
  useEffect(() => {
    localStorage.setItem('finance_data', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Actions
  const addTransaction = (item) => {
    if (!item.amount || !item.category || !item.type) return;
    const newItem = { ...item, id: Date.now() };
    setTransactions((prev) => [newItem, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = (updatedItem) => {
    setTransactions((prev) => prev.map((t) => (t.id === updatedItem.id ? updatedItem : t)));
  };

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      transactions,
      addTransaction,
      deleteTransaction,
      updateTransaction,
      theme,
      setTheme,
      role,
      setRole,
      filters,
      setFilters,
    }),
    [transactions, theme, role, filters]
  );

  // ✅ Proper closing tag with {children}
  return <FinanceContext.Provider value={contextValue}>{children}</FinanceContext.Provider>;
};