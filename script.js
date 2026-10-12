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

if (!menuList || !gerichtSelect || !orderForm || !messageBox) {
  console.error("Ein oder mehrere HTML-Elemente fehlen: menuList, gericht, orderForm oder message.");
} else {
  function renderMenu() {
    menuList.innerHTML = "";
    gerichtSelect.innerHTML = '<option value="">Bitte wählen</option>';

    menu.forEach((item) => {
      const card = document.createElement("div");
      card.className = "menu-item";
      card.innerHTML = `
        <strong>${item.name}</strong>
        Preis: ${item.preis.toFixed(2)} €
      `;
      menuList.appendChild(card);

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

    if (!formData.name || !formData.matrikel || !formData.gericht) {
      messageBox.textContent = "Bitte fülle Name, Matrikelnummer und Gericht aus.";
      messageBox.className = "message error";
      return;
    }

    const scriptUrl = "https://script.google.com/macros/s/AKfycbxJQR0nSh39yx8ALzUFX-hcimW1vl-6RT9gFD6HsjBjhlOttylG_v-PXWKA89SNWSIKxw/exec";

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Serverantwort fehlgeschlagen");
      }

      const result = await response.json();

      if (result.status === "success") {
        messageBox.textContent = "✓ Bestellung wurde erfolgreich gespeichert!";
        messageBox.className = "message success";
        orderForm.reset();
      } else {
        throw new Error(result.message || "Unbekannter Fehler");
      }
    } catch (error) {
      messageBox.textContent = "✗ Fehler beim Speichern. Bitte erneut versuchen.";
      messageBox.className = "message error";
      console.error("Bestellung fehlgeschlagen:", error);
    }
  });
}
