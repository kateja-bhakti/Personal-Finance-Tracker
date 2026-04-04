document.addEventListener("DOMContentLoaded", () => {

  // ================= ROLE =================
  let currentRole = localStorage.getItem("role") || "User";
  const roleBtn = document.getElementById("roleToggle");

  function updateRoleUI() {
    document.querySelectorAll(".admin-only").forEach(el => {
      el.style.display = currentRole === "Admin" ? "inline-block" : "none";
    });
  }

  roleBtn.textContent = currentRole;
  if (currentRole === "Admin") document.body.classList.add("admin");
  updateRoleUI();

  roleBtn.onclick = () => {
    currentRole = currentRole === "User" ? "Admin" : "User";
    localStorage.setItem("role", currentRole);
    roleBtn.textContent = currentRole;
    document.body.classList.toggle("admin");
    updateRoleUI();
  };

  // ================= MODALS =================
  const addModal = document.getElementById("addTransactionModal");
  const actionModal = document.getElementById("actionModal");

  document.getElementById("addTransactionBtn").onclick = () => {
    addModal.classList.add("show");
  };

  window.closeAddModal = () => addModal.classList.remove("show");
  window.closeActionModal = () => actionModal.classList.remove("show");

  // ================= CATEGORY TOGGLE =================
  const categorySelect = document.getElementById("tCategory");
  const customBox = document.getElementById("customCategoryBox");

  categorySelect.onchange = () => {
    customBox.style.display =
      categorySelect.value === "Other" ? "block" : "none";
  };

  // ================= ADD FORM =================
  document.getElementById("addTransactionForm").onsubmit = (e) => {
    e.preventDefault();

    const date = tDate.value;
    const type = tType.value;
    const amount = parseFloat(tAmount.value);

    const category =
      tCategory.value === "Other"
        ? customCategory.value
        : tCategory.value;

    addTransaction(date, type, amount, category);

    e.target.reset();
    closeAddModal();
  };

  // ================= ADD TRANSACTION =================
  function addTransaction(date, type, amount, category, save = true) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${date}</td>
      <td>${capitalize(category)}</td>
      <td>${type}</td>
      <td class="${type === 'income' ? 'income' : 'expense'}">${amount}</td>
    `;

    tr.onclick = () => openActionModal(tr);
    tr.title = "Click to edit or delete";

    document
      .querySelector("#transactionTable tbody")
      .appendChild(tr);

    if (save) saveTransactions();
    updateCards();
  }

  // ================= STORAGE =================
  function saveTransactions() {
    const rows = document.querySelectorAll(
      "#transactionTable tbody tr"
    );

    const data = [];

    rows.forEach((row) => {
      data.push({
        date: row.children[0].innerText,
        category: row.children[1].innerText,
        type: row.children[2].innerText,
        amount: row.children[3].innerText,
      });
    });

    localStorage.setItem("transactions", JSON.stringify(data));
  }

  function loadTransactions() {
    const data =
      JSON.parse(localStorage.getItem("transactions")) || [];

    data.forEach((t) =>
      addTransaction(t.date, t.type, t.amount, t.category, false)
    );
  }

  // ================= EDIT =================
  let selectedRow = null;

  function openActionModal(row) {
    selectedRow = row;

    editDate.value = row.children[0].innerText;
    editType.value = row.children[2].innerText;
    editCategory.value = row.children[1].innerText;
    editAmount.value = row.children[3].innerText;

    actionModal.classList.add("show");
  }

  document.getElementById("editForm").onsubmit = (e) => {
    e.preventDefault();

    selectedRow.children[0].innerText = editDate.value;
    selectedRow.children[1].innerText = editCategory.value;
    selectedRow.children[2].innerText = editType.value;
    selectedRow.children[3].innerText = editAmount.value;

    saveTransactions();
    updateCards();
    closeActionModal();
  };

  // ================= DELETE =================
  document.getElementById("deleteAction").onclick = () => {
    if (confirm("Delete this transaction?")) {
      selectedRow.remove();
      saveTransactions();
      updateCards();
      closeActionModal();
    }
  };

  // ================= CARDS =================
  function updateCards() {
    let income = 0;
    let expense = 0;

    document
      .querySelectorAll("#transactionTable tbody tr")
      .forEach((row) => {
        const type = row.children[2].innerText;
        const amount = parseFloat(row.children[3].innerText);

        if (type === "income") income += amount;
        else expense += amount;
      });

    document.querySelector(
      ".cards .flip-card:nth-child(2) p"
    ).textContent = `+₹${income}`;

    document.querySelector(
      ".cards .flip-card:nth-child(3) p"
    ).textContent = `-₹${expense}`;

    document.querySelector(
      ".cards .flip-card:nth-child(1) p"
    ).textContent = `₹${income - expense}`;
  }

  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // ================= INIT =================
  loadTransactions();
});