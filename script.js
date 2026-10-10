"use strict";

document.addEventListener("DOMContentLoaded", function () {

  const app = document.getElementById("app");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  // Liste des pages disponibles
  const pages = {
    accueil: "page-accueil",
    menus: "page-menus",
    fonctionnalites: "page-fonctionnalites",
    tarifs: "page-tarifs",
    abonnement: "page-abonnement",
    inscription: "page-inscription",
    connexion: "page-connexion",
    commande: "page-commande",
    contact: "page-contact",
    introuvable: "page-introuvable"
  };

  // Afficher une page sans faire défiler l'écran
  function afficherPage(nom, historique = true) {

    if (!pages[nom]) {
      nom = "introuvable";
    }

    document.querySelectorAll(".page").forEach(function (page) {
      page.hidden = true;
    });

    const pageCible = document.getElementById(pages[nom]);

    if (pageCible) {
      pageCible.hidden = false;
    }

    // Fermer le menu mobile
    if (mainNav) {
      mainNav.classList.remove("open");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }

    // Mettre à jour l'adresse de la page
    if (historique) {
      const url = new URL(window.location.href);
      url.searchParams.set("page", nom);

      window.history.pushState(
        { page: nom },
        "",
        url.pathname + url.search + url.hash
      );
    }

    // Modifier le titre de l'onglet
    document.title =
      "RestauQR — " +
      nom.charAt(0).toUpperCase() +
      nom.slice(1);

    if (app) {
      app.dataset.currentPage = nom;
    }
  }

  // Navigation entre les pages
  document.addEventListener("click", function (event) {

    const lien = event.target.closest("a");

    if (!lien) return;

    const href = lien.getAttribute("href");

    if (!href) return;

    // Ne pas intercepter les liens externes
    if (
      href.startsWith("https://") ||
      href.startsWith("http://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#")
    ) {
      return;
    }

    let url;

    try {
      url = new URL(href, window.location.href);
    } catch (error) {
      return;
    }

    // Vérifier que le lien pointe vers le site actuel
    if (url.origin !== window.location.origin) return;

    // Accepter index.html?page=... ou ?page=...
    const cheminActuel = window.location.pathname.replace(/\/+$/, "");
    const cheminCible = url.pathname.replace(/\/+$/, "");

    const memePage =
      cheminActuel === cheminCible ||
      cheminCible.endsWith("/index.html");

    if (memePage && (url.searchParams.has("page") ||
                     cheminCible.endsWith("/index.html"))) {

      event.preventDefault();

      const nom = url.searchParams.get("page") || "accueil";

      afficherPage(nom, true);
    }
  });

  // Menu mobile
  if (menuToggle && mainNav) {

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", function () {

      const ouvert = mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(ouvert)
      );
    });
  }

  // Sélectionner un plat et ouvrir la page de commande
  document.querySelectorAll(".order-btn").forEach(function (bouton) {

    bouton.addEventListener("click", function () {

      const plat = bouton.dataset.dish || "Plat sélectionné";
      const titre = document.getElementById("selectedDish");

      if (titre) {
        titre.textContent = plat;
      }

      afficherPage("commande", true);
    });
  });

  // Confirmer une commande de démonstration
  const confirmOrder = document.getElementById("confirmOrder");

  if (confirmOrder) {

    confirmOrder.addEventListener("click", function () {

      const nom = document.getElementById("customerName").value.trim();
      const telephone = document.getElementById("customerPhone").value.trim();
      const quantite = Number(document.getElementById("quantity").value);

      const plat = document.getElementById("selectedDish").textContent;
      const message = document.getElementById("orderMessage");

      if (!nom || !telephone || !Number.isInteger(quantite) ||
          quantite < 1 || quantite > 50) {

        message.textContent =
          "Veuillez renseigner votre nom, votre téléphone et une quantité valide.";

        return;
      }

      message.textContent =
        "Démonstration réussie : " +
        quantite + " × " + plat +
        ". Aucune commande réelle n'a été envoyée.";
    });
  }

  // Gestion des demandes d'abonnement RestauQR
let moyenPaiementChoisi = "";

// Sélection du moyen de paiement
document.querySelectorAll(".payment-option").forEach(function (bouton) {
  bouton.addEventListener("click", function () {
    document.querySelectorAll(".payment-option").forEach(function (option) {
      option.classList.remove("selected");
    });

    bouton.classList.add("selected");
    moyenPaiementChoisi = bouton.dataset.payment;

    const message = document.getElementById("paymentMessage");

    if (message) {
      message.textContent =
        "Moyen choisi : " + moyenPaiementChoisi +
        ". Montant : 5 000 FCFA. Clique sur le bouton ci-dessous pour envoyer ta demande.";
    }
  });
});

// Envoyer une demande d'abonnement par WhatsApp
function envoyerDemandeAbonnement() {
  const restaurant = document.getElementById("restaurantPaymentName");
  const responsable = document.getElementById("restaurantPaymentOwner");

  if (!restaurant || !responsable) {
    alert("Les champs du formulaire de paiement sont introuvables.");
    return;
  }

  if (!restaurant.value.trim() || !responsable.value.trim()) {
    alert("Entre le nom du restaurant et celui du responsable.");
    return;
  }

  if (!moyenPaiementChoisi) {
    alert("Choisis d'abord MTN Mobile Money ou Celtiis Money.");
    return;
  }

  const demande = {
    reference: "RQ-" + Date.now(),
    restaurant: restaurant.value.trim(),
    responsable: responsable.value.trim(),
    montant: 5000,
    moyen: moyenPaiementChoisi,
    abonnement: "Mensuel",
    statut: "En attente de vérification",
    date: new Date().toLocaleString("fr-FR")
  };

  const messageWhatsApp =
    "Bonjour, je souhaite souscrire à RestauQR.%0A%0A" +
    "Référence : " + encodeURIComponent(demande.reference) + "%0A" +
    "Restaurant : " + encodeURIComponent(demande.restaurant) + "%0A" +
    "Responsable : " + encodeURIComponent(demande.responsable) + "%0A" +
    "Abonnement : Mensuel%0A" +
    "Montant : 5 000 FCFA%0A" +
    "Paiement : " + encodeURIComponent(demande.moyen) + "%0A" +
    "Statut : En attente de vérification";

  // Remplace ce numéro par ton numéro WhatsApp professionnel,
  // au format international sans le signe +.
  const numeroWhatsApp = "229XXXXXXXX";

  if (numeroWhatsApp === "229XXXXXXXX") {
    alert(
      "La demande est prête, mais le numéro WhatsApp du service " +
      "doit encore être configuré dans script.js."
    );
    return;
  }

  window.open(
    "https://wa.me/" + numeroWhatsApp + "?text=" + messageWhatsApp,
    "_blank"
  );
}
  document.querySelectorAll(".payment-option").forEach(function (bouton) {

    bouton.addEventListener("click", function () {

      document.querySelectorAll(".payment-option").forEach(function (option) {
        option.classList.remove("selected");
      });

      bouton.classList.add("selected");

      const moyen = bouton.dataset.payment;
      const message = document.getElementById("paymentMessage");

      if (message) {
        message.textContent =
          "Moyen choisi : " + moyen + ". " +
          "Le paiement réel nécessite une intégration sécurisée. " +
          "Aucun argent n'est prélevé dans cette démonstration.";
      }
    });
  });

  // Formulaire d'inscription
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

      event.preventDefault();

      if (!signupForm.reportValidity()) return;

      const message = document.getElementById("signupMessage");

      message.textContent =
        "Formulaire valide ! La création de compte réelle nécessite " +
        "un serveur sécurisé. Aucun compte n'a été créé.";
    });
  }

  // Formulaire de connexion
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

      event.preventDefault();

      if (!loginForm.reportValidity()) return;

      const message = document.getElementById("loginMessage");

      message.textContent =
        "La démonstration fonctionne, mais la connexion réelle " +
        "n'est pas encore configurée.";
    });
  }

  // Navigation avec les boutons précédent et suivant du navigateur
  window.addEventListener("popstate", function () {

    const params = new URLSearchParams(window.location.search);

    afficherPage(
      params.get("page") || "accueil",
      false
    );
  });

  // Afficher l'année actuelle dans le pied de page
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Ouvrir la page correspondant à l'adresse actuelle
  const params = new URLSearchParams(window.location.search);

  afficherPage(
    params.get("page") || "accueil",
    false
  );

});