// ====================
// UTILISATEURS PRÉDÉFINIS
// ====================
const USERS = {
  "kevin": "kevin2025",
  "sarah": "sarah123",
  "amine": "maman45",
  "admin": "motdepasseultrasecret"
};

// ====================
// CONNEXION
// ====================
function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (USERS[username] && USERS[username] === password) {
    sessionStorage.setItem("user", username);
    window.location.href = "delivery.html";
  } else {
    alert("Identifiants incorrects.");
  }
}

// ====================
// SAUVEGARDE INFOS LIVRAISON
// ====================
function saveDelivery(event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const adresse = document.getElementById("adresse").value.trim();
  const infos = document.getElementById("infos").value.trim();

  if (!nom || !adresse) {
    alert("Veuillez remplir les champs obligatoires.");
    return;
  }

  sessionStorage.setItem("livraison_nom", nom);
  sessionStorage.setItem("livraison_adresse", adresse);
  sessionStorage.setItem("livraison_infos", infos);

  // Redirection vers le catalogue
  window.location.href = "catalog.html";
}

// ====================
// AJOUT AU PANIER
// ====================
let panier = JSON.parse(sessionStorage.getItem("panier")) || [];

function addToCart(nom, prix) {
  panier.push({ nom, prix });
  sessionStorage.setItem("panier", JSON.stringify(panier));
  alert(`Ajouté au panier : ${nom} (${prix}€)`);
}

// ====================
// AFFICHAGE RÉCAPITULATIF
// ====================
function afficherRecapitulatif() {
  const recap = document.getElementById("recap");
  const totaux = document.getElementById("totaux");
  const panier = JSON.parse(sessionStorage.getItem("panier")) || [];

  if (panier.length === 0) {
    recap.innerHTML = "<p>Votre panier est vide.</p>";
    totaux.innerHTML = "";
    return;
  }

  let total = 0;
  recap.innerHTML = panier.map(item => {
    total += item.prix;
    return `<p>${item.nom} - ${item.prix}€</p>`;
  }).join("");

  totaux.innerHTML = `<h3>Total : ${total}€</h3>`;
}

// ====================
// ENVOYER COMMANDE
// ====================
function envoyerCommande() {
  const nom = sessionStorage.getItem("livraison_nom") || "Inconnu";
  const adresse = sessionStorage.getItem("livraison_adresse") || "Non précisée";
  const infos = sessionStorage.getItem("livraison_infos") || "Aucune";

  const panier = JSON.parse(sessionStorage.getItem("panier")) || [];

  const recap = `Commande de ${nom}\nAdresse : ${adresse}\nInfos : ${infos}\n\nArticles :\n${panier.map(p => `- ${p.nom} : ${p.prix}€`).join('\n')}`;

  alert("Commande envoyée ! Voici le résumé :\n\n" + recap);

  // Nettoyage
  sessionStorage.clear();
  window.location.href = "login.html";
}
