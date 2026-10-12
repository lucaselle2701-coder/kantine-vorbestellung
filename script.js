const menu = [
  { name: "Veggie Bowl", preis: 4.50 },
  { name: "Curry mit Reis", preis: 5.20 },
  { name: "Schnitzel mit Kartoffeln", preis: 6.00 },
  { name: "Pasta Primavera", preis: 4.80 },
  { name: "Pasta Bolognese", preis: 5.50 }
];

const menuList = document.getElementById("menuList");
const gerichtSelect = document.getElementById("gericht");
const orderForm = document.getElementById("orderForm");
const messageBox = document.getElementById("message");

function renderMenu() {
  menu.forEach((item) => {
    // Menükarte anzeigen
    const card = document.createElement("div");
    card.className = "menu-item";
    card.innerHTML = `
      <strong>${item.name}</strong>
      Preis: ${item.preis.toFixed(2)} €
    `;
    menuList.appendChild(card);

    // Option für Select-Feld hinzufügen
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = `${item.name} (${item.preis.toFixed(2)} €)`;
    gerichtSelect.appendChild(option);
  });
}

renderMenu();

orderForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value.trim(),
    matrikel: document.getElementById("matrikel").value.trim(),
    gericht: document.getElementById("gericht").value,
    zusatz: document.getElementById("zusatz").value.trim(),
    notiz: document.getElementById("notiz").value.trim()
  };

  // Hier eure Apps-Script-Web-App-URL eintragen
  const scriptUrl = "https://script.google.com/macros/s/AKfycbx-ErUUWqoKf7fJcVs6q4EjZBOEkfjZEIJmT103PVNLrLIhAwLE0j1bgSIvgyAsHZl1Gg/exec";

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Serverantwort fehlgeschlagen");
    }

    messageBox.textContent = "Bestellung wurde erfolgreich gespeichert!";
    messageBox.className = "message success";
    orderForm.reset();

  } catch (error) {
    messageBox.textContent = "Fehler beim Speichern. Bitte erneut versuchen.";
    messageBox.className = "message error";
    console.error(error);
  }
});
