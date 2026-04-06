import React, { useState, useContext, useEffect } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { X, CheckCircle, PlusCircle, Edit } from 'lucide-react';

export default function AdminPanel({ isOpen, onClose, editData }) {
  const { addTransaction, updateTransaction } = useContext(FinanceContext);

  const [showToast, setShowToast] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const initialState = {
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: '',
    type: 'expense'
  };

  const [formData, setFormData] = useState(initialState);

  // ✅ HANDLE EDIT MODE + RESET
  useEffect(() => {
    if (editData) {
      const standardCategories = ["Food", "Salary", "Travel", "Shopping"];

      if (!standardCategories.includes(editData.category)) {
        setFormData({ ...editData, category: 'Other' });
        setCustomCategory(editData.category);
      } else {
        setFormData(editData);
        setCustomCategory("");
      }
    } else {
      setFormData(initialState);
      setCustomCategory("");
    }
  }, [editData, isOpen]);

  // ✅ SUBMIT HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();

    const finalCategory =
      formData.category === 'Other' ? customCategory : formData.category;

    if (!finalCategory) {
      alert("Please select or enter a category");
      return;
    }

    const amountNumber = Number(formData.amount);

    if (!amountNumber || amountNumber <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const payload = {
      ...formData,
      amount: amountNumber,
      category: finalCategory
    };

    if (editData) {
      updateTransaction(payload);
    } else {
      addTransaction(payload); // ✅ ID handled in context
    }

    // ✅ Reset form instantly
    setFormData(initialState);
    setCustomCategory("");

    // ✅ Toast + smooth close
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={`side-panel-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className="side-panel" onClick={e => e.stopPropagation()}>
          
          {/* HEADER */}
          <div className="panel-header">
            <div className="title-row">
              {editData 
                ? <Edit size={24} color="var(--accent)" /> 
                : <PlusCircle size={24} color="var(--accent)" />}
              
              <h2>{editData ? "Edit Transaction" : "New Record"}</h2>
            </div>

            <button className="close-btn" onClick={onClose}>
              <X />
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="panel-form">

            <div className="input-group">
              <label>Amount (₹)</label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={e =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="0.00"
              />
            </div>

            <div className="input-group">
              <label>Transaction Type</label>
              <div className="type-toggle">
                <button
                  type="button"
                  className={formData.type === 'income' ? 'active' : ''}
                  onClick={() =>
                    setFormData({ ...formData, type: 'income' })
                  }
                >
                  Income
                </button>

                <button
                  type="button"
                  className={formData.type === 'expense' ? 'active' : ''}
                  onClick={() =>
                    setFormData({ ...formData, type: 'expense' })
                  }
                >
                  Expense
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>Category</label>
              <select
                required
                value={formData.category}
                onChange={e =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="" disabled>-- Select Category --</option>
                <option value="Food">Food & Drinks</option>
                <option value="Salary">Salary/Income</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other (Custom)</option>
              </select>
            </div>

            {formData.category === 'Other' && (
              <div className="input-group animate-in">
                <label>Custom Category</label>
                <input
                  type="text"
                  required
                  value={customCategory}
                  onChange={e => setCustomCategory(e.target.value)}
                  placeholder="e.g. Netflix, Gym..."
                />
              </div>
            )}

            <div className="input-group">
              <label>Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={e =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <button type="submit" className="submit-btn-premium">
              {editData ? "Update Transaction" : "Save Transaction"}
            </button>

          </form>
        </div>
      </div>

      {/* ✅ TOAST */}
      {showToast && (
        <div className="toast-notification success">
          <CheckCircle size={18} />
          <span>
            {editData ? "Updated Successfully!" : "Saved Successfully!"}
          </span>
        </div>
      )}
    </>
  );
}