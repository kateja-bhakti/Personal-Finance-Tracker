import React, { useState, useContext, useEffect } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { X, CheckCircle, PlusCircle, Edit, Tag, IndianRupee, Calendar } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, editData }) {
  const { addTransaction, updateTransaction, role } = useContext(FinanceContext);
  const [showToast, setShowToast] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [categories, setCategories] = useState(["Food", "Salary", "Travel", "Shopping", "Other"]);
  
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    date: today, amount: '', category: '', type: 'expense'
  });

  useEffect(() => {
    if (editData) {
      const isStandard = ["Food", "Salary", "Travel", "Shopping"].includes(editData.category);
      setFormData(isStandard ? editData : { ...editData, category: 'Other' });
      setCustomCategory(isStandard ? "" : editData.category);
    } else {
      setFormData({ date: today, amount: '', category: '', type: 'expense' });
      setCustomCategory("");
    }
  }, [editData, isOpen, today]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalCat = formData.category === 'Other' ? customCategory : formData.category;
    
    // ✅ Capitalize first letter logic
    finalCat = finalCat.trim().charAt(0).toUpperCase() + finalCat.trim().slice(1).toLowerCase();

    // ✅ Add to dropdown if it's new
    if (!categories.includes(finalCat)) {
      setCategories(prev => [...prev.filter(c => c !== "Other"), finalCat, "Other"]);
    }

    const payload = { ...formData, amount: Number(formData.amount), category: finalCat };
    editData ? updateTransaction(payload) : addTransaction(payload);

    setShowToast(true);
    setTimeout(() => { setShowToast(false); onClose(); }, 1000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={`side-panel-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className={`side-panel role-${role}`} onClick={e => e.stopPropagation()}>
          <div className="panel-header">
            <div className="title-group">
              {editData ? <Edit size={18}/> : <PlusCircle size={18}/>}
              <h2>{editData ? "Update Record" : "New Entry"}</h2>
            </div>
            <button className="close-icon-btn" onClick={onClose}><X size={20}/></button>
          </div>

          <form onSubmit={handleSubmit} className="panel-form">
            <div className="input-group">
              <label><IndianRupee size={12}/> Amount</label>
              <input type="number" required value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
            </div>

            <div className="input-group">
              <label>Flow Type</label>
              <div className="type-toggle-premium">
                <button type="button" className={formData.type === 'income' ? 'active-inc' : ''} onClick={() => setFormData({...formData, type: 'income'})}>Income</button>
                <button type="button" className={formData.type === 'expense' ? 'active-exp' : ''} onClick={() => setFormData({...formData, type: 'expense'})}>Expense</button>
              </div>
            </div>

            <div className="input-group">
              <label><Tag size={12}/> Category</label>
              <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="" disabled>Select Category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {formData.category === 'Other' && (
              <div className="input-group animate-slide-up">
                <label>New Category Name</label>
                <input type="text" required value={customCategory} onChange={e => setCustomCategory(e.target.value)} />
              </div>
            )}

            <div className="input-group">
              <label><Calendar size={12}/> Date</label>
              <input type="date" max={today} required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>

            <button type="submit" className="submit-btn-premium">Save Transaction</button>
          </form>
        </div>
      </div>
      {showToast && <div className="toast-notification">Success: Ledger Updated</div>}
    </>
  );
}