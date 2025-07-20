// script.js

// Définis ici les utilisateurs autorisés
const USERS = {
  "kevin": "kevin2025",
  "sarah": "sarah123",
  "amine": "maman45",
  "admin": "motdepasseultrasecret"
};

function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (USERS[username] && USERS[username] === password) {
    sessionStorage.setItem("user", username);
    window.location.href = "delivery.html";
  } else {
    alert("Identifiants incorrects.");
  }
}
