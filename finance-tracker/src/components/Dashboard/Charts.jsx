import React, { useContext, useMemo } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import "../../styles/global.css";


export default function Charts() {
  const context = useContext(FinanceContext);
  
  if (!context) return <div className="loading">Syncing Terminal...</div>;

  const { theme, transactions, role } = context;
  const isDark = theme === 'dark';

  // ✅ FLIPPED COLOR ENGINE
  // Admin: Success Green | User: Professional Blue
  const roleConfig = {
    admin: {
      primary: isDark ? "#34d399" : "#007c55", 
      palette: isDark 
        ? ['#34d399', '#10b981', '#059669', '#6ee7b7'] 
        : ['#059669', '#065f46', '#047857', '#10b981'], 
    },
    user: {
      primary: isDark ? "#818cf8" : "#4338ca", 
      palette: isDark 
        ? ['#818cf8', '#a78bfa', '#6366f1', '#c084fc'] 
        : ['#4338ca', '#5b21b6', '#3730a3', '#6d28d9'], 
    }
  };

  const activeTheme = roleConfig[role] || roleConfig.user;
  const textColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";

  // ✅ DATA PROCESSING
  const { chartDataPoints, categorySummary } = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let cumulative = 0;

    const points = sorted.map(t => {
      const amt = Number(t.amount) || 0;
      cumulative += t.type === 'income' ? amt : -amt;
      return {
        name: new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        balance: cumulative,
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

    if (transactions.length === 0) return <div className="empty-state">No data available.</div>;

  return (
    <div className={`premium-charts-container role-${role}`}>
      
      {/* --- WEALTH TREND (FREEFLOW) --- */}
      <div className="chart-card main-trend">
        <div className="chart-header">
          <h3>Wealth Trend</h3>
          <p className="subtitle">Visualizing {role} growth curve</p>
        </div>
        <div className="chart-body">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartDataPoints}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeTheme.primary} stopOpacity={isDark ? 0.4 : 0.2}/>
                  <stop offset="95%" stopColor={activeTheme.primary} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="name" stroke={textColor} fontSize={11} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke={textColor} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', border: 'none', 
                  backgroundColor: isDark ? "#1e293b" : "#fff",
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke={activeTheme.primary} 
                strokeWidth={3}
                fill="url(#colorBalance)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- CATEGORY DONUT --- */}
      <div className="chart-card category-share">
        <div className="chart-header">
          <h3>Expense Distribution</h3>
          <p className="subtitle">Breakdown by category</p>
        </div>
        <div className="chart-body">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={categorySummary}
                innerRadius={80} 
                outerRadius={105}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {categorySummary.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={activeTheme.palette[index % activeTheme.palette.length]}/>
                ))}
              </Pie>
              <Tooltip />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}