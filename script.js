// script.js

// Vérification utilisateur (admin code)
const ADMIN_CODE = "admin123"; // change ce code pour plus de sécurité

function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const storedPassword = localStorage.getItem(`user_${username}`);
  if (storedPassword && storedPassword === password) {
    sessionStorage.setItem("user", username);
    window.location.href = "delivery.html";
  } else {
    alert("Identifiants incorrects.");
  }
}

function register(event) {
  event.preventDefault();
  const code = document.getElementById("adminCode").value;
  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;

  if (code !== ADMIN_CODE) {
    alert("Code administrateur incorrect.");
    return;
  }

  if (localStorage.getItem(`user_${username}`)) {
    alert("Nom d'utilisateur déjà pris.");
  } else {
    localStorage.setItem(`user_${username}`, password);
    alert("Compte créé !");
    window.location.href = "login.html";
  }
}

function saveDelivery(event) {
  event.preventDefault();
  const nom = document.getElementById("nom").value;
  const adresse = document.getElementById("adresse").value;
  const infos = document.getElementById("infos").value;

  const livraison = { nom, adresse, infos };
  sessionStorage.setItem("livraison", JSON.stringify(livraison));
  window.location.href = "catalog.html";
}

let panier = JSON.parse(sessionStorage.getItem("panier") || "[]");

function addToCart(nom, prix) {
  panier.push({ nom, prix });
  sessionStorage.setItem("panier", JSON.stringify(panier));
  alert(`${nom} ajouté au panier.`);
}

function afficherRecap() {
  const panier = JSON.parse(sessionStorage.getItem("panier") || "[]");
  const livraison = JSON.parse(sessionStorage.getItem("livraison") || "{}");
  const recap = document.getElementById("recap");
  const totaux = document.getElementById("totaux");

  if (!recap || !totaux) return;

  recap.innerHTML = `
    <h2>Livraison</h2>
    <p><strong>Nom:</strong> ${livraison.nom}</p>
    <p><strong>Adresse:</strong> ${livraison.adresse}</p>
    <p><strong>Infos:</strong> ${livraison.infos}</p>
    <h2>Produits</h2>
    <ul>
      ${panier.map(p => `<li>${p.nom} - ${p.prix}€</li>`).join("")}
    </ul>
  `;

  const total = panier.reduce((s, p) => s + p.prix, 0);
  totaux.innerHTML = `<h3>Total : ${total}€</h3>`;
}

function envoyerCommande() {
  alert("Commande envoyée !");
  sessionStorage.clear();
  window.location.href = "login.html";
}

window.onload = afficherRecap;
