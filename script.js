const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || {};

// Connexion
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const u = username.value;
    const p = password.value;
    if (utilisateurs[u] && utilisateurs[u] === p) {
      sessionStorage.setItem("utilisateur", u);
      window.location.href = "delivery.html";
    } else {
      alert("Identifiants incorrects");
    }
  });
}

// Enregistrement
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    utilisateurs[newUsername.value] = newPassword.value;
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
    alert("Utilisateur créé !");
    window.location.href = "login.html";
  });
}

// Livraison
if (document.getElementById("deliveryForm")) {
  document.getElementById("deliveryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    sessionStorage.setItem("contact", contactName.value);
    sessionStorage.setItem("phone", phoneNumber.value);
    sessionStorage.setItem("date", deliveryDate.value);
    window.location.href = "catalog.html";
  });
}

// Catalogue
const produits = [
  { nom: "Pommes", prix: 1.2, image: "https://via.placeholder.com/100" },
  { nom: "Bananes", prix: 1.0, image: "https://via.placeholder.com/100" },
  { nom: "Poires", prix: 1.5, image: "https://via.placeholder.com/100" },
];

if (document.getElementById("catalog")) {
  const container = document.getElementById("catalog");
  produits.forEach((p, i) => {
    container.innerHTML += `
      <div>
        <img src="${p.image}" alt="${p.nom}" />
        <p>${p.nom} - ${p.prix.toFixed(2)} €</p>
        <input type="number" id="qte${i}" min="0" value="0" />
      </div>
      <hr />
    `;
  });
}

function validerCommande() {
  const commande = produits.map((p, i) => {
    return {
      nom: p.nom,
      prix: p.prix,
      quantite: parseInt(document.getElementById(`qte${i}`).value)
    };
  });
  sessionStorage.setItem("commande", JSON.stringify(commande));
  window.location.href = "summary.html";
}

// Résumé
if (document.getElementById("recap")) {
  const commande = JSON.parse(sessionStorage.getItem("commande"));
  let total = 0;
  recap.innerHTML = `<p><strong>Contact :</strong> ${sessionStorage.getItem("contact")}</p>
    <p><strong>Téléphone :</strong> ${sessionStorage.getItem("phone")}</p>
    <p><strong>Date :</strong> ${sessionStorage.getItem("date")}</p><hr />`;
  commande.forEach(item => {
    if (item.quantite > 0) {
      const prixLigne = item.prix * item.quantite;
      total += prixLigne;
      recap.innerHTML += `<p>${item.nom} x ${item.quantite} = ${prixLigne.toFixed(2)} €</p>`;
    }
  });
  recap.innerHTML += `<hr /><h3>Total : ${total.toFixed(2)} €</h3>`;
}
