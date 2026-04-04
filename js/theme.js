document.addEventListener("DOMContentLoaded", () => {

lucide.createIcons();

// ================= FLIP CARDS =================
const flipCards = document.querySelectorAll(".flip-card");

// Automatic flip: cycle through cards one by one every 3s
let autoFlipIndex = 0;

setInterval(() => {
  if (flipCards.length === 0) return;

  // Remove 'active' from all cards first
  flipCards.forEach(card => card.classList.remove("active"));

  // Flip current card
  flipCards[autoFlipIndex].classList.add("active");

  // Move to next card
  autoFlipIndex = (autoFlipIndex + 1) % flipCards.length;
}, 3000);

// Individual flip on click
flipCards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});
// THEME
document.querySelector(".theme-toggle").onclick = () => {
document.body.classList.toggle("light");
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