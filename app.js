const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("itemList");

let items = JSON.parse(localStorage.getItem("items")) || [];

// Render all items
function renderItems() {
  list.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No items yet. Add your first item above.";
    empty.style.textAlign = "center";
    empty.style.background = "transparent";
    empty.style.color = "#777";
    list.appendChild(empty);
    return;
  }

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.marginLeft = "10px";
    delBtn.style.background = "#ff4d4d";
    delBtn.style.color = "white";
    delBtn.style.border = "none";
    delBtn.style.borderRadius = "4px";
    delBtn.style.cursor = "pointer";

    delBtn.onclick = () => {
      items.splice(index, 1);
      updateStorage();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });

  updateCounter();
}

// Update localStorage + re-render
function updateStorage() {
  localStorage.setItem("items", JSON.stringify(items));
  renderItems();
}

// Add item
addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;

  items.push(value);
  input.value = "";

  updateStorage();
});

// Optional: Enter key support
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// Optional counter
function updateCounter() {
  let counter = document.getElementById("counter");

  if (!counter) {
    counter = document.createElement("p");
    counter.id = "counter";
    counter.style.marginTop = "10px";
    counter.style.color = "#555";
    document.querySelector(".container").appendChild(counter);
  }

  counter.textContent = `Total items: ${items.length}`;
}

// Initial render
renderItems();
