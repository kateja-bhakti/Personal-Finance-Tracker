document.addEventListener("DOMContentLoaded", () => {

lucide.createIcons();

// THEME
document.querySelector(".theme-toggle").onclick = () => {
document.body.classList.toggle("light");
};

// ROLE
const roleBtn = document.getElementById("roleToggle");

roleBtn.onclick = () => {
if(roleBtn.textContent === "User"){
roleBtn.textContent = "Admin";
document.body.classList.add("admin");
}else{
roleBtn.textContent = "User";
document.body.classList.remove("admin");
}
};

// FILTER + SEARCH
const search = document.getElementById("searchInput");
const filter = document.getElementById("filterType");
const rows = document.querySelectorAll("#transactionTable tbody tr");

function updateTable(){
rows.forEach(row=>{
const text = row.innerText.toLowerCase();
const type = row.children[2].innerText.toLowerCase();

const matchSearch = text.includes(search.value.toLowerCase());
const matchFilter = filter.value === "all" || type === filter.value;

row.style.display = (matchSearch && matchFilter) ? "" : "none";
});
}

search.addEventListener("input", updateTable);
filter.addEventListener("change", updateTable);

});

// SIDEBAR
function toggleSidebar(){
document.getElementById("sidebar").classList.toggle("collapsed");
}

// MODAL
function openModal(){
document.getElementById("modal").classList.add("show");
}
function closeModal(){
document.getElementById("modal").classList.remove("show");
}