import React, { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Insights() {
  const { transactions } = useContext(FinanceContext);

  if (!transactions || transactions.length === 0) {
    return <div className="empty-state">No insights available</div>;
  }

  const expenses = transactions.filter(t => t.type === 'expense');
  const income = transactions.filter(t => t.type === 'income');

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
    return acc;
  }, {});

  const topCategory = Object.keys(categoryTotals).length
    ? Object.keys(categoryTotals).reduce((a, b) =>
        categoryTotals[a] > categoryTotals[b] ? a : b
      )
    : null;

  const totalExpense = expenses.reduce((sum, t) => sum + Number(t.amount), 0);
  const totalIncome = income.reduce((sum, t) => sum + Number(t.amount), 0);

  const savingsRate =
    totalIncome > 0
      ? ((totalIncome - totalExpense) / totalIncome) * 100
      : 0;

  const observations = [
    {
      title: "Top Spending",
      desc: topCategory
        ? `You spend the most on ${topCategory}.`
        : "No expense data yet.",
      icon: <AlertCircle color="var(--expense)" />,
      color: "var(--expense)"
    },
    {
      title: "Savings Rate",
      desc: `You are saving ${savingsRate.toFixed(1)}% of your income.`,
      icon: <TrendingUp color="var(--income)" />,
      color: "var(--income)"
    },
    {
      title: "Financial Health",
      desc:
        savingsRate > 20
          ? "Great job! Your savings are strong."
          : "Try reducing expenses to improve savings.",
      icon: <CheckCircle2 color="var(--accent)" />,
      color: "var(--accent)"
    }
  ];

  return (
    <div className="insights-section">
      <div className="section-header">
        <Lightbulb size={20} color="var(--accent)" />
        <h2>Smart Insights</h2>
      </div>

      <div className="insights-grid">
        {observations.map((obs, i) => (
          <div key={i} className="insight-card" style={{ borderLeft: `4px solid ${obs.color}` }}>
            <div className="insight-icon">{obs.icon}</div>
            <div>
              <h4>{obs.title}</h4>
              <p>{obs.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}