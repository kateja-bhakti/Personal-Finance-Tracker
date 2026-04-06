import React, { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function StatCards() {
  const { transactions } = useContext(FinanceContext);

  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
  const balance = income - expense;

  const cardData = [
    { title: "Total Balance", value: `₹${balance}`, icon: <Wallet />, color: "var(--accent)", detail: "Available Funds" },
    { title: "Total Income", value: `+₹${income}`, icon: <TrendingUp />, color: "var(--income)", detail: "Monthly Growth" },
    { title: "Total Expense", value: `-₹${expense}`, icon: <TrendingDown />, color: "var(--expense)", detail: "Monthly Spend" }
  ];

  return (
    <div className="stats-grid">
      {cardData.map((card, i) => (
        <div className="flip-card" key={i}>
          <div className="flip-inner">
            <div className="flip-front card-base" style={{ borderLeft: `4px solid ${card.color}` }}>
              <div className="card-header">
                <span className="card-icon" style={{ color: card.color }}>{card.icon}</span>
                <span className="card-title">{card.title}</span>
              </div>
              <h2 className="card-value" style={{ color: card.color }}>{card.value}</h2>
            </div>
            <div className="flip-back card-base">
              <h3>{card.detail}</h3>
              <p>Updated just now</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}