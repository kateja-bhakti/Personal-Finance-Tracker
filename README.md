It looks like you have two different versions of the same README mixed together (one referencing `npm start` and another referencing `Vite`). I've consolidated them into a single, high-quality, professional README that highlights the tech stack, features, and role-based logic clearly.

-----

# 💰 FinanceFlow: Personal Finance Tracker

A sleek, modern dashboard designed to help users effortlessly track, manage, and visualize their personal finances. Built with **React** and **Tailwind CSS**, FinanceFlow provides real-time insights into spending habits with a focus on speed and user experience.

[Link to Live Demo](https://personal-finance-tracker-npte.vercel.app/)

-----

## ✨ Features

### 📊 Comprehensive Dashboard

  * **Summary Cards:** Instantly monitor total income, total expenses, and your current balance.
  * **Interactive Analytics:** Visualize spending trends using responsive charts (Monthly Income vs. Expenses).
  * **Real-Time Updates:** All changes reflect immediately across cards and charts.

### 🔐 Role-Based Access

  * **User Role:** Access to the dashboard, analytics, and transaction history.
  * **Admin Role:** Elevated permissions to add new entries, manage all transactions, and clear data permanently.

### 🎨 Premium UI/UX

  * **Theme Toggle:** Seamless transition between **Dark & Light modes** with persistent CSS variables.
  * **Responsive Design:** Fully optimized for Desktop, Tablet, and Mobile devices.
  * **Export Data:** Quickly export your financial records as **CSV or JSON**.

-----

## 🛠 Tech Stack

  * **Frontend:** [React.js](https://reactjs.org/)
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/) & CSS Variables
  * **Icons:** [Lucide React](https://lucide.dev/)
  * **State Management:** React Context API
  * **Build Tool:** [Vite](https://vitejs.dev/)
  * **Deployment:** Vercel

-----

## 📂 Project Structure

```text
finance-tracker/
├── public/              # Static assets
├── src/
│   ├── components/      # UI Components (Sidebar, Navbar, Cards, etc.)
│   ├── context/         # Global State (FinanceContext.jsx)
│   ├── styles/          # Theme variables & Global CSS
│   ├── js/              # Theme & Helper logic
│   ├── App.jsx          # Main App Logic
│   └── main.jsx         # Entry point
├── package.json
└── README.md
```

-----

## ⚡ Getting Started

### 1\. Clone the Repository

```bash
git clone <your-repo-url>
cd finance-tracker
```

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) in your browser.

### 4\. Build for Production

```bash
npm run build
```

-----

## 🎯 How to Use

1.  **Toggle Roles:** Use the Navbar to switch between **User** and **Admin** views.
2.  **Add Transactions (Admin):** Click the "New Entry" button in the Sidebar. Enter the title, amount, and type (Income/Expense).
3.  **Analyze Trends:** Hover over the interactive charts to see exact amounts for specific timeframes.
4.  **Exporting:** Navigate to **Sidebar \> Export** to generate a data log in the console (ready for CSV/JSON integration).
5.  **Theme Switch:** Use the Sun/Moon icon in the Navbar to toggle the visual theme.

-----

## 📝 Key Implementation Details

  * **Context API:** Used for global state management of transactions, user roles, and theme settings to avoid "prop drilling."
  * **CSS Variables:** Centralized in `variables.css` to allow for instant, app-wide theme switching.
  * **Client-Side Only:** This version is fully functional in-browser. Note that data is currently stored in the session/local state and will reset upon page refresh unless LocalStorage is implemented.

-----

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

