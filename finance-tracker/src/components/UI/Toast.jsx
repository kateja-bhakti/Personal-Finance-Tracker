import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Toast({ message, type = "success" }) {
  if (!message) return null; // ✅ important fix

  return (
    <div className={`toast-notification ${type} animate-slide-in`}>
      {type === "success"
        ? <CheckCircle size={18} />
        : <AlertCircle size={18} />}
      <span>{message}</span>
    </div>
  );
}