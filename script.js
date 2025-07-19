// Gestion des utilisateurs stockés dans localStorage
const utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || {};

// LOGIN
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value;
    if (utilisateurs[u] && utilisateurs[u] === p) {
      sessionStorage.setItem("utilisateur", u);
      window.location.href = "delivery.html";
    } else {
      alert("Identifiants incorrects");
    }
  });
}

// REGISTER
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const newUser = document.getElementById("newUsername").value.trim();
    const newPass = document.getElementById("newPassword").value;
    if (utilisateurs[newUser]) {
      alert("Ce nom d'utilisateur existe déjà.");
      return;
    }
    utilisateurs[newUser] = newPass;
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
    alert("Utilisateur créé !");
    window.location.href = "login.html";
  });
}

// DELIVERY FORM
if (document.getElementById("deliveryForm")) {
  document.getElementById("deliveryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    sessionStorage.setItem("contact", document.getElementById("contactName").value.trim());
    sessionStorage.setItem("phone", document.getElementById("phoneNumber").value.trim());
    sessionStorage.setItem("date", document.getElementById("deliveryDate").value);
    sessionStorage.setItem("comments", document.getElementById("comments").value.trim());
    window.location.href = "catalog.html";
  });
}

// PRODUITS (Catalogue)
const produits = [
  {
    nom: "Chocolat Noir",
    prix: 5,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=160&q=80"
  },
  {
    nom: "Jus d'Orange",
    prix: 3,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=160&q=80"
  },
  {
    nom: "Café Moulu",
    prix: 7,
    image: "https://media.discordapp.net/attachments/1009082381862445128/1393295230257598545/image.png?auto=format&fit=crop&w=160&q=80"
  },
  {
    nom: "Thé Vert",
    prix: 4,
    image: "https://media.discordapp.net/attachments/1009082381862445128/1393295230257598545/image.png?auto=format&fit=crop&w=160&q=80"
  },
  {
    nom: "Eau Minérale",
    prix: 2,
    image: "https://media.discordapp.net/attachments/1009082381862445128/1393295230257598545/image.png?auto=format&fit=crop&w=160&q=80"
  },
  {
    nom: "Biscuit Fourré",
    prix: 6,
