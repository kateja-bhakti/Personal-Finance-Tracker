import React, { useContext, useState, useMemo } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Maximize2, X } from 'lucide-react';

export default function Charts() {
  const context = useContext(FinanceContext);
  const [zoomedChart, setZoomedChart] = useState(null);

  if (!context) return <div>Loading...</div>;

  const { theme, transactions } = context;

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'];
  const textColor = theme === 'light' ? '#64748b' : '#94a3b8';

  // ✅ DATA PROCESSING
  const { chartDataPoints, categorySummary } = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let cumulative = 0;

    const points = sorted.map(t => {
      const amt = Number(t.amount) || 0;
      cumulative += t.type === 'income' ? amt : -amt;

      return {
        name: new Date(t.date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short'
        }),
        balance: cumulative,
        amount: amt,
        type: t.type,
        category: t.category
      };
    });

    const categories = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        const found = acc.find(i => i.name === t.category);
        if (found) found.value += Number(t.amount);
        else acc.push({ name: t.category, value: Number(t.amount) });
        return acc;
      }, []);

    return { chartDataPoints: points, categorySummary: categories };
  }, [transactions]);

  // ✅ EMPTY STATE
  if (transactions.length === 0) {
    return <div className="empty-state">No data to visualize</div>;
  }

  // ---------------- CHARTS ----------------

  const renderBalance = (zoom) => (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartDataPoints}>
        {zoom && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey="name" stroke={textColor} hide={!zoom} />
        <YAxis stroke={textColor} hide={!zoom} />
        <Tooltip formatter={(v) => `₹${v}`} />
        <Area
          type="monotone"
          dataKey="balance"
          stroke="var(--accent)"
          fill="var(--accent)"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderExpenses = (zoom) => {
    const expenseData = chartDataPoints.filter(d => d.type === 'expense');

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={expenseData.length ? expenseData : [{ name: 'Empty', amount: 0 }]}>
          {zoom && <XAxis dataKey="name" stroke={textColor} />}
          <Tooltip formatter={(v) => `₹${v}`} />
          <Bar dataKey="amount" fill="var(--expense)" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderCategories = () => {
    const data = categorySummary.length
      ? categorySummary
      : [{ name: 'No Data', value: 1 }];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius="60%" outerRadius="85%">
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `₹${v}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const charts = [
    { id: 'bal', title: 'Wealth Trend', render: renderBalance },
    { id: 'exp', title: 'Expense History', render: renderExpenses },
    { id: 'cat', title: 'Category Share', render: renderCategories }
  ];

  return (
    <div className="charts-wrapper">
      <div className="charts-row">
        {charts.map(c => (
          <div key={c.id} className="chart-box" onClick={() => setZoomedChart(c)}>
            <h4>{c.title}</h4>
            <div className="chart-content">
              {c.render(false)}
            </div>
          </div>
        ))}
      </div>

      {zoomedChart && (
        <div className="chart-modal-overlay" onClick={() => setZoomedChart(null)}>
          <div className="chart-modal-content" onClick={e => e.stopPropagation()}>
            <h2>{zoomedChart.title}</h2>
            <div className="modal-body">
              {zoomedChart.render(true)}
            </div>
            <button onClick={() => setZoomedChart(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}