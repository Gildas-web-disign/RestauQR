"use strict";

const plats = [
  {
    id: 1,
    nom: "Poulet braisé",
    categorie: "Plats",
    prix: 3500,
    description: "Poulet grillé accompagné de garnitures.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=80",
    tag: "Populaire"
  },
  {
    id: 2,
    nom: "Riz au poulet",
    categorie: "Plats",
    prix: 2500,
    description: "Riz savoureux accompagné de poulet.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80",
    tag: "Favori"
  },
  {
    id: 3,
    nom: "Poisson grillé",
    categorie: "Plats",
    prix: 4000,
    description: "Poisson grillé servi avec des accompagnements.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80",
    tag: "À découvrir"
  },
  {
    id: 4,
    nom: "Salade fraîche",
    categorie: "Entrées",
    prix: 1500,
    description: "Une sélection de légumes frais et croquants.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80",
    tag: "Frais"
  },
  {
    id: 5,
    nom: "Jus de bissap",
    categorie: "Boissons",
    prix: 500,
    description: "Boisson traditionnelle à base d'hibiscus.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=700&q=80",
    tag: "Local"
  },
  {
    id: 6,
    nom: "Jus de gingembre",
    categorie: "Boissons",
    prix: 500,
    description: "Boisson fraîche au gingembre.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=80",
    tag: "Tonique"
  },
  {
    id: 7,
    nom: "Burger maison",
    categorie: "Plats",
    prix: 2500,
    description: "Burger gourmand avec légumes et frites.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    tag: "Gourmand"
  },
  {
    id: 8,
    nom: "Gâteau au chocolat",
    categorie: "Desserts",
    prix: 1200,
    description: "Un dessert au chocolat pour terminer le repas.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
    tag: "Dessert"
  },
  {
    id: 9,
    nom: "Salade de fruits",
    categorie: "Desserts",
    prix: 1000,
    description: "Des fruits frais coupés et colorés.",
    image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=700&q=80",
    tag: "Frais"
  }
];

let categorieActive = "Tous";
let panier = {};

const formatFCFA = montant =>
  new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";

function afficherPlats() {
  const grille = document.getElementById("foodGrid");
  const recherche = document.getElementById("searchInput").value
    .trim()
    .toLocaleLowerCase("fr");

  const resultats = plats.filter(plat => {
    const bonneCategorie =
      categorieActive === "Tous" || plat.categorie === categorieActive;

    const bonNom =
      plat.nom.toLocaleLowerCase("fr").includes(recherche) ||
      plat.description.toLocaleLowerCase("fr").includes(recherche);

    return bonneCategorie && bonNom;
  });

  if (resultats.length === 0) {
    grille.innerHTML =
      '<p class="empty-message">Aucun plat trouvé. Essayez une autre recherche.</p>';
    return;
  }

  grille.innerHTML = resultats.map(plat => `
    <article class="food-card">
      <div class="food-image">
        <img
          src="${plat.image}"
          alt="${plat.nom}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/700x450/182335/f5b942?text=Photo+du+plat';">
        <span class="food-tag">${plat.tag}</span>
      </div>

      <div class="food-info">
        <h3>${plat.nom}</h3>
        <p class="food-description">${plat.description}</p>

        <div class="food-bottom">
          <span class="food-price">${formatFCFA(plat.prix)}</span>
          <button
            class="add-button"
            onclick="ajouterAuPanier(${plat.id})"
            aria-label="Ajouter ${plat.nom} au panier">+</button>
        </div>
      </div>
    </article>
  `).join("");
}

function ajouterAuPanier(id) {
  const plat = plats.find(p => p.id === id);
  if (!plat) return;

  panier[id] = (panier[id] || 0) + 1;
  actualiserPanier();

  const bouton = document.getElementById("floatingCart");
  bouton.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.12)" },
      { transform: "scale(1)" }
    ],
    { duration: 250 }
  );
}

function modifierQuantite(id, changement) {
  if (!panier[id]) return;

  panier[id] += changement;

  if (panier[id] <= 0) {
    delete panier[id];
  }

  actualiserPanier();
  afficherPanier();
}

function actualiserPanier() {
  const quantite = Object.values(panier).reduce(
    (total, nombre) => total + nombre, 0
  );

  document.getElementById("cartCount").textContent = quantite;
}

function afficherPanier() {
  const conteneur = document.getElementById("cartItems");
  let total = 0;

  const lignes = Object.entries(panier).map(([id, quantite]) => {
    const plat = plats.find(p => p.id === Number(id));
    if (!plat) return "";

    const sousTotal = plat.prix * quantite;
    total += sousTotal;

    return `
      <div class="cart-line">
        <div>
          <strong>${plat.nom}</strong>
          <small>${formatFCFA(plat.prix)} × ${quantite}</small>
        </div>

        <div class="quantity-controls">
          <button onclick="modifierQuantite(${plat.id}, -1)"
            aria-label="Retirer une unité">−</button>
          <span>${quantite}</span>
          <button onclick="modifierQuantite(${plat.id}, 1)"
            aria-label="Ajouter une unité">+</button>
        </div>
      </div>
    `;
  }).filter(Boolean);

  conteneur.innerHTML = lignes.length
    ? lignes.join("")
    : '<p class="empty-message">Votre panier est vide.</p>';

  document.getElementById("cartTotal").textContent = formatFCFA(total);
}

function ouvrirPanier() {
  afficherPanier();
  document.getElementById("cartModal").hidden = false;
  document.body.style.overflow = "hidden";
}

function fermerPanier() {
  document.getElementById("cartModal").hidden = true;
  document.body.style.overflow = "";
}

function ouvrirConnexion() {
  document.getElementById("loginModal").hidden = false;
  document.body.style.overflow = "hidden";
}

function fermerConnexion() {
  document.getElementById("loginModal").hidden = true;
  document.body.style.overflow = "";
}

function confirmerCommande() {
  if (Object.keys(panier).length === 0) {
    alert("Votre panier est vide. Ajoutez d'abord un plat.");
    return;
  }

  alert(
    "Le panier fonctionne en mode démonstration. " +
    "Aucune commande n'a été envoyée au restaurant. " +
    "La connexion à la base de données sera nécessaire pour activer cette fonction."
  );
}

document.querySelectorAll(".category").forEach(bouton => {
  bouton.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(b =>
      b.classList.remove("active")
    );

    bouton.classList.add("active");
    categorieActive = bouton.dataset.category;
    afficherPlats();
  });
});

document.getElementById("searchInput").addEventListener(
  "input",
  afficherPlats
);

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navigation").classList.toggle("open");
});

document.querySelectorAll("#navigation a").forEach(lien => {
  lien.addEventListener("click", () => {
    document.getElementById("navigation").classList.remove("open");
  });
});

document.querySelectorAll(".modal").forEach(modale => {
  modale.addEventListener("click", evenement => {
    if (evenement.target !== modale) return;

    modale.hidden = true;
    document.body.style.overflow = "";
  });
});

document.addEventListener("keydown", evenement => {
  if (evenement.key === "Escape") {
    fermerPanier();
    fermerConnexion();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

afficherPlats();
actualiserPanier();
// ====================================
// RESTAUQR — CONNEXION SUPABASE
// ====================================

const SUPABASE_URL = "https://pdrqbvcxnsnbhuyttrlq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_Dc9SauKA3GBbHcxZhXLftA_rJ-axbdv";

// Vérifier que la bibliothèque Supabase est chargée
if (typeof window.supabase !== "undefined") {
    window.restauqrDB = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

    console.log("RestauQR : client Supabase initialisé.");
} else {
    console.error(
        "RestauQR : bibliothèque Supabase non chargée. Vérifie index.html."
    );
}