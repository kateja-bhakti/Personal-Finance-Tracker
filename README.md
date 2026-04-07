💰 Personal-Finance-Tracker

A sleek and modern dashboard to effortlessly track, manage, and visualize your personal finances. Designed to give users full control over their income and expenses with interactive charts, summary cards, and a user-friendly interface.

✨ Key Features
Add Transactions: Quickly log income or expenses.
Delete Transactions: Remove entries instantly.
Dark & Light Mode: Toggle themes for comfortable viewing.
Summary Cards: Monitor total income, total expenses, and balance at a glance.
Interactive Charts: Visualize your spending trends.
Responsive Design: Perfectly optimized for desktop, tablet, and mobile.
Real-Time Updates: All changes reflect immediately on cards and charts.

📂 Project Structure
finance-dashboard/
│
├─ public/
│   └─ index.html
│
├─ src/
│   ├─ components/
│   │   ├─ Card.jsx
│   │   ├─ Sidebar.jsx
│   │   ├─ TransactionForm.jsx
│   │   └─ Charts.jsx
│   │
│   ├─ css/
│   │   ├─ global.css
│   │   └─ variables.css
│   │
│   ├─ js/
│   │   └─ theme.js
│   │
│   ├─ main.jsx
│   └─ App.jsx
│
├─ package.json
└─ README.md

Live working link: https://personal-finance-tracker-npte.vercel.app/
🚀 Getting Started

1️⃣ Clone the Repository
git clone <your-repo-url>
cd finance-dashboard

2️⃣ Install Dependencies
npm install

3️⃣ Run the Dashboard Locally
npm start

Open http://localhost:3000
 in your browser.

4️⃣ Build for Production
npm run build

The optimized production files will appear in the build/ folder.

🛠 How to Use

Add a Transaction
Click “Add Transaction”.
Enter:
Title / Description
Amount
Type: Income or Expense
Date
Click Save → Summary cards and charts update instantly.
Delete a Transaction
Hover and click the delete icon.
The dashboard updates automatically.
Switch Dark/Light Mode
Click the sun/moon icon at the top-right.
All elements, including charts and icons, adapt automatically.
View Summary
Income: Total money received
Expenses: Total money spent
Balance: Income minus expenses
Explore Interactive Charts
Analyze your monthly income vs. expenses.
Hover over graph bars or pie sections for exact amounts.

💡 Pro Tips
Use descriptive titles for transactions for easier tracking.
Check charts regularly to identify spending habits.
Switch themes based on the time of day for better visibility.
The app is fast and client-side, no backend required.

⚙️ Customization (Optional)
Change theme colors in variables.css
Add new charts or graphs in Charts.jsx
Use SVG icons for theme-aware logos

📌 Notes
Fully client-side, no backend needed.
Transactions exist only in the browser session unless storage is added.

📄 License

MIT License – Free to use and modify.
