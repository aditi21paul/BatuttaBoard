const loginBtn = document.getElementById("loginBtn");
const menuSelect = document.getElementById("menuSelect");
const dashboard = document.getElementById("dashboard");
const loginPage = document.getElementById("loginPage");
const menuContainer = document.getElementById("menuContainer");

const modal = document.getElementById("createCardModal");
const openBtn = document.getElementById("openCreateCardBtn");
const closeBtn = document.getElementById("closeModalBtn");
const saveBtn = document.getElementById("saveCardBtn");
const cardsContainer = document.getElementById("travelCards");
const filterSource = document.getElementById("filterSource");
const filterDestination = document.getElementById("filterDestination");

let currentUser = "";
let cardsData = [];

// Login handler
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    if (!email) return;
    currentUser = email.split("@")[0];
    window.location.href = "commondashboard.html";
    localStorage.setItem("currentUser", currentUser);
  });
}

// Dashboard handlers
if (menuSelect) {
  currentUser = localStorage.getItem("currentUser") || "";
  menuContainer.style.display = "block";

  menuSelect.addEventListener("change", (e) => {
    if (e.target.value === "logout") {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    } else if (e.target.value === "personal") {
      alert("Personal Dashboard placeholder");
    }
    e.target.value = "";
  });

  if (openBtn) openBtn.addEventListener("click", () => modal.classList.add("active"));
  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  if (modal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });

  function renderCards() {
    cardsContainer.innerHTML = "";
    const srcFilter = filterSource.value;
    const dstFilter = filterDestination.value;

    cardsData.forEach((card, index) => {
      if ((srcFilter && card.src !== srcFilter) || (dstFilter && card.dst !== dstFilter)) return;

      const cardEl = document.createElement("div");
      cardEl.className = "card";
      cardEl.innerHTML = `<strong>${card.src}</strong> → <strong>${card.dst}</strong><br>${card.date} at ${card.time}<br>👤 ${card.user}<br>📞 ${card.contact}<br><em>${card.notes}</em>`;

      if (card.user === currentUser) {
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editCard(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteCard(index);

        cardEl.appendChild(document.createElement("br"));
        cardEl.appendChild(editBtn);
        cardEl.appendChild(deleteBtn);
      }

      cardsContainer.appendChild(cardEl);
    });
  }

  function editCard(index) {
    const card = cardsData[index];
    document.getElementById("source").value = card.src;
    document.getElementById("destination").value = card.dst;
    document.getElementById("date").value = card.date;
    document.getElementById("time").value = card.time;
    document.getElementById("contact").value = card.contact;
    document.getElementById("notes").value = card.notes;

    modal.classList.add("active");

    saveBtn.onclick = () => {
      cardsData[index] = {
        src: document.getElementById("source").value,
        dst: document.getElementById("destination").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        contact: document.getElementById("contact").value,
        notes: document.getElementById("notes").value,
        user: currentUser
      };
      renderCards();
      modal.classList.remove("active");
      resetForm();
      saveBtn.onclick = defaultSaveHandler;
    };
  }

  function deleteCard(index) {
    cardsData.splice(index, 1);
    renderCards();
  }

  function resetForm() {
    ["source", "destination", "date", "time", "contact", "notes"].forEach(id => {
      document.getElementById(id).value = "";
    });
  }

  function defaultSaveHandler() {
    const src = document.getElementById("source").value;
    const dst = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const contact = document.getElementById("contact").value;
    const notes = document.getElementById("notes").value;

    if (!src || !dst || !date || !time || !contact) return;

    const cardObj = { src, dst, date, time, contact, notes, user: currentUser };
    cardsData.push(cardObj);

    if (![...filterSource.options].some(opt => opt.value === src)) {
      const opt = document.createElement("option");
      opt.value = src; opt.textContent = src;
      filterSource.appendChild(opt);
    }
    if (![...filterDestination.options].some(opt => opt.value === dst)) {
      const opt = document.createElement("option");
      opt.value = dst; opt.textContent = dst;
      filterDestination.appendChild(opt);
    }

    renderCards();
    modal.classList.remove("active");
    resetForm();
  }

  saveBtn.onclick = defaultSaveHandler;
  filterSource.addEventListener("change", renderCards);
  filterDestination.addEventListener("change", renderCards);
}
