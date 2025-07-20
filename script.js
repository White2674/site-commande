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
  const telephone = document.getElementById("telephone").value.trim();
  const dateHeure = document.getElementById("dateHeure").value;
  const commentaire = document.getElementById("commentaire").value.trim();

  if (!nom || !telephone || !dateHeure) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  sessionStorage.setItem("livraison_nom", nom);
  sessionStorage.setItem("livraison_telephone", telephone);
  sessionStorage.setItem("livraison_dateHeure", dateHeure);
  sessionStorage.setItem("livraison_commentaire", commentaire);

  window.location.href = "catalog.html";
}

// ====================
// PANIER
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

  const nom = sessionStorage.getItem("livraison_nom") || "Non renseigné";
  const telephone = sessionStorage.getItem("livraison_telephone") || "Non renseigné";
  const dateHeure = sessionStorage.getItem("livraison_dateHeure") || "Non renseignée";
  const commentaire = sessionStorage.getItem("livraison_commentaire") || "Aucun";

  recap.innerHTML = `
    <h2>Livraison :</h2>
    <p><strong>Nom & Prénom :</strong> ${nom}</p>
    <p><strong>Téléphone :</strong> ${telephone}</p>
    <p><strong>Date & Heure :</strong> ${dateHeure}</p>
    <p><strong>Commentaire :</strong> ${commentaire}</p>
    <hr>
    <h2>Panier :</h2>
  `;

  if (panier.length === 0) {
    recap.innerHTML += "<p>Votre panier est vide.</p>";
    totaux.innerHTML = "";
    return;
  }

  let total = 0;
  recap.innerHTML += panier.map(item => {
    total += item.prix;
    return `<p>${item.nom} - ${item.prix}€</p>`;
  }).join("");

  totaux.innerHTML = `<h3>Total : ${total}€</h3>`;
}

// ====================
// VALIDER COMMANDE
// ====================
function envoyerCommande() {
  const nom = sessionStorage.getItem("livraison_nom") || "Inconnu";
  const telephone = sessionStorage.getItem("livraison_telephone") || "-";
  const dateHeure = sessionStorage.getItem("livraison_dateHeure") || "-";
  const commentaire = sessionStorage.getItem("livraison_commentaire") || "-";
  const panier = JSON.parse(sessionStorage.getItem("panier")) || [];

  const recap = `
Commande pour : ${nom}
Téléphone : ${telephone}
Date & Heure : ${dateHeure}
Commentaire : ${commentaire}

Articles :
${panier.map(p => `- ${p.nom} : ${p.prix}€`).join('\n')}
`;

  alert("Commande envoyée !\n\n" + recap);

  sessionStorage.clear();
  window.location.href = "login.html";
}
