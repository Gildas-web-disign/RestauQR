"use strict";

/*
 * RESTAUQR
 *
 * Version front-end de démonstration.
 *
 * IMPORTANT :
 * - Aucun paiement réel n'est encaissé par ce fichier.
 * - Aucune information bancaire privée n'est enregistrée ici.
 * - L'authentification réelle nécessite un backend.
 * - Les commandes réelles nécessitent un backend ou un service connecté.
 * - Les paiements doivent être confirmés côté serveur.
 */

const RESTAUQR = {
    subscriptionPrice: 5000,
    currency: "FCFA"
};


/* =========================================
   1. DONNÉES DES 20 PLATS
========================================= */

const dishes = [
    {
        id: 1,
        name: "Pizza maison",
        category: "pizza",
        price: 3500,
        description: "Une pizza généreuse avec une garniture savoureuse.",
        image: "photo-1565299624946-b28f40a0ae38"
    },
    {
        id: 2,
        name: "Burger gourmet",
        category: "burgers",
        price: 2500,
        description: "Un burger généreux pour une pause gourmande.",
        image: "photo-1568901346375-23c9450c58cd"
    },
    {
        id: 3,
        name: "Salade fraîche",
        category: "plats",
        price: 2000,
        description: "Un mélange de légumes frais et colorés.",
        image: "photo-1540189549336-e6e99c3679fe"
    },
    {
        id: 4,
        name: "Pâtes italiennes",
        category: "plats",
        price: 3000,
        description: "Des pâtes accompagnées d'une sauce gourmande.",
        image: "photo-1473093295043-cdd812d0e601"
    },
    {
        id: 5,
        name: "Poulet grillé",
        category: "plats",
        price: 4000,
        description: "Un plat de poulet grillé à servir avec son accompagnement.",
        image: "photo-1532550907401-a500c9a57435"
    },
    {
        id: 6,
        name: "Bol équilibré",
        category: "plats",
        price: 2500,
        description: "Un assortiment coloré pour un repas complet.",
        image: "photo-1512621776951-a57141f2eefd"
    },
    {
        id: 7,
        name: "Soupe maison",
        category: "plats",
        price: 1800,
        description: "Une soupe réconfortante et pleine de saveurs.",
        image: "photo-1547592180-85f173990554"
    },
    {
        id: 8,
        name: "Burger classique",
        category: "burgers",
        price: 2000,
        description: "Un classique gourmand pour les petites faims.",
        image: "photo-1551782450-a2132b4ba21d"
    },
    {
        id: 9,
        name: "Pizza végétarienne",
        category: "pizza",
        price: 3000,
        description: "Une pizza garnie de légumes colorés.",
        image: "photo-1513104890138-7c749659a591"
    },
    {
        id: 10,
        name: "Pâtes crémeuses",
        category: "plats",
        price: 3200,
        description: "Une recette de pâtes à la texture onctueuse.",
        image: "photo-1551183053-bf91a1d81141"
    },
    {
        id: 11,
        name: "Dessert gourmand",
        category: "desserts",
        price: 1500,
        description: "Une douceur pour terminer le repas.",
        image: "photo-1563805042-7684c019e1cb"
    },
    {
        id: 12,
        name: "Gâteau maison",
        category: "desserts",
        price: 1800,
        description: "Une part de gâteau pour les amateurs de douceurs.",
        image: "photo-1578985545062-69928b1d9587"
    },
    {
        id: 13,
        name: "Crème glacée",
        category: "desserts",
        price: 1200,
        description: "Une pause fraîche et sucrée.",
        image: "photo-1497034825429-c343d7c6a68f"
    },
    {
        id: 14,
        name: "Assiette gourmande",
        category: "plats",
        price: 3500,
        description: "Une assiette généreuse à personnaliser.",
        image: "photo-1547592180-85f173990554"
    },
    {
        id: 15,
        name: "Pizza spéciale",
        category: "pizza",
        price: 4500,
        description: "Une pizza généreuse pour les grandes faims.",
        image: "photo-1579751626657-72bc17010498"
    },
    {
        id: 16,
        name: "Cheeseburger",
        category: "burgers",
        price: 2800,
        description: "Un burger accompagné d'une tranche de fromage.",
        image: "photo-1571091718767-18b5b1457add"
    },
    {
        id: 17,
        name: "Jus de fruits",
        category: "boissons",
        price: 1000,
        description: "Une boisson fruitée à servir bien fraîche.",
        image: "photo-1534353473418-4cfa6c56fd38"
    },
    {
        id: 18,
        name: "Smoothie fruité",
        category: "boissons",
        price: 1500,
        description: "Un mélange de fruits pour une pause rafraîchissante.",
        image: "photo-1505252585461-04db1eb84625"
    },
    {
        id: 19,
        name: "Boisson fraîche",
        category: "boissons",
        price: 800,
        description: "Une boisson à déguster pendant le repas.",
        image: "photo-1513558161293-cdaf765edfd7"
    },
    {
        id: 20,
        name: "Dessert aux fruits",
        category: "desserts",
        price: 1600,
        description: "Une composition fruitée pour terminer en douceur.",
        image: "photo-1488477181946-6428a0291777"
    }
];


/* =========================================
   2. OUTILS GÉNÉRAUX
========================================= */

const $ = (selector, root = document) => root.querySelector(selector);

const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}

function formatPrice(price) {
    return Number(price).toLocaleString("fr-FR") + " FCFA";
}

function getImageURL(imageId, width = 800) {
    return (
        "https://images.unsplash.com/" +
        imageId +
        "?auto=format&fit=crop&w=" +
        width +
        "&q=80"
    );
}

function showToast(message) {
    const toast = $("#toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

function refreshIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}


/* =========================================
   3. NAVIGATION ENTRE LES PAGES
========================================= */

const validPages = [
    "accueil",
    "menu",
    "fonctionnalites",
    "tarifs",
    "abonnement",
    "connexion",
    "contact"
];

function getPageFromURL() {
    const params = new URLSearchParams(window.location.search);
    const requestedPage = params.get("page") || "accueil";

    return validPages.includes(requestedPage)
        ? requestedPage
        : "accueil";
}

function navigateTo(page) {
    if (!validPages.includes(page)) {
        page = "accueil";
    }

    const url = new URL(window.location.href);

    if (page === "accueil") {
        url.searchParams.delete("page");
    } else {
        url.searchParams.set("page", page);
    }

    history.pushState({ page }, "", url);

    renderPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPage(page = getPageFromURL()) {
    $$(".page").forEach(section => {
        section.classList.remove("active");
    });

    const target = $("#page-" + page);

    if (target) {
        target.classList.add("active");
    } else {
        $("#page-accueil")?.classList.add("active");
        page = "accueil";
    }

    $$("[data-nav]").forEach(link => {
        const active = link.dataset.nav === page;

        link.classList.toggle("active", active);

        if (active) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    closeMobileMenu();
    refreshIcons();
}

function closeMobileMenu() {
    $("#navigation")?.classList.remove("open");

    $("#menuToggle")?.setAttribute("aria-expanded", "false");
}


/* =========================================
   4. MENU MOBILE
========================================= */

function initializeMobileMenu() {
    const toggle = $("#menuToggle");
    const navigation = $("#navigation");

    if (!toggle || !navigation) return;

    toggle.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.addEventListener("click", event => {
        const link = event.target.closest("a");

        if (link) {
            closeMobileMenu();
        }
    });
}


/* =========================================
   5. AFFICHAGE DES 20 PLATS
========================================= */

let currentFilter = "tous";
let currentSearch = "";
let selectedDish = null;

function categoryLabel(category) {
    const labels = {
        plats: "Plats",
        pizza: "Pizza",
        burgers: "Burger",
        desserts: "Dessert",
        boissons: "Boisson"
    };

    return labels[category] || "Plat";
}

function renderDishes() {
    const grid = $("#dishGrid");

    if (!grid) return;

    const filteredDishes = dishes.filter(dish => {
        const matchesCategory =
            currentFilter === "tous" ||
            dish.category === currentFilter;

        const searchableText = (
            dish.name + " " + dish.description + " " + dish.category
        ).toLowerCase();

        const matchesSearch = searchableText.includes(
            currentSearch.toLowerCase()
        );

        return matchesCategory && matchesSearch;
    });

    if (filteredDishes.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h3>Aucun plat trouvé</h3>
                <p>Essaie un autre mot ou une autre catégorie.</p>
            </div>
        `;

        return;
    }

    grid.innerHTML = filteredDishes.map(dish => `
        <article class="dish-card">

            <div class="dish-image-wrap">
                <img
                    class="dish-image smart-image"
                    src="${getImageURL(dish.image, 700)}"
                    alt="${escapeHTML(dish.name)}"
                    loading="lazy"
                    data-dish-image="${dish.id}">

                <span class="dish-category">
                    ${escapeHTML(categoryLabel(dish.category))}
                </span>
            </div>

            <div class="dish-content">
                <h3>${escapeHTML(dish.name)}</h3>

                <p>${escapeHTML(dish.description)}</p>

                <div class="dish-footer">
                    <span class="dish-price">
                        ${formatPrice(dish.price)}
                    </span>

                    <button
                        class="dish-open"
                        type="button"
                        data-open-dish="${dish.id}"
                        aria-label="Voir ${escapeHTML(dish.name)}">

                        <i data-lucide="arrow-up-right"></i>
                    </button>
                </div>
            </div>

        </article>
    `).join("");

    refreshIcons();
}

function initializeFilters() {
    const filterList = $("#filterList");

    if (filterList) {
        filterList.addEventListener("click", event => {
            const button = event.target.closest("[data-filter]");

            if (!button) return;

            currentFilter = button.dataset.filter;

            $$(".filter-btn", filterList).forEach(filterButton => {
                filterButton.classList.toggle(
                    "active",
                    filterButton === button
                );
            });

            renderDishes();
        });
    }

    const search = $("#dishSearch");

    if (search) {
        search.addEventListener("input", () => {
            currentSearch = search.value.trim();
            renderDishes();
        });
    }
}


/* =========================================
   6. FENÊTRE DÉTAILLÉE D'UN PLAT
========================================= */

function openDish(dishId) {
    const dish = dishes.find(item => item.id === Number(dishId));

    if (!dish) return;

    selectedDish = dish;

    const modal = $("#dishModal");

    $("#modalDishName").textContent = dish.name;
    $("#modalDishDescription").textContent = dish.description;
    $("#modalDishPrice").textContent = formatPrice(dish.price);

    const image = $("#modalDishImage");

    image.src = getImageURL(dish.image, 1000);
    image.alt = dish.name;

    $("#orderStatus").textContent = "";
    $("#orderStatus").className = "form-message";

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    refreshIcons();
}

function closeDishModal() {
    const modal = $("#dishModal");

    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
}

function initializeDishModal() {
    document.addEventListener("click", event => {
        const button = event.target.closest("[data-open-dish]");

        if (button) {
            openDish(button.dataset.openDish);
        }

        if (event.target.closest("[data-close-modal]")) {
            closeDishModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeDishModal();
        }
    });

    $("#demoOrderButton")?.addEventListener("click", () => {
        const status = $("#orderStatus");

        if (!selectedDish || !status) return;

        status.className = "form-message success";

        status.textContent =
            "Démonstration uniquement : aucune commande n'a été transmise " +
            "au restaurant. Un système de commande réel devra être connecté.";

        showToast("Démonstration de commande");
    });
}


/* =========================================
   7. IMAGES DE SECOURS
========================================= */

function initializeImageFallbacks() {
    document.addEventListener("error", event => {
        const image = event.target;

        if (!(image instanceof HTMLImageElement)) return;
        if (!image.classList.contains("smart-image")) return;

        /*
         * Si une image distante ne charge pas, on affiche
         * un fond neutre plutôt qu'une icône cassée.
         */
        image.style.visibility = "hidden";

        if (image.parentElement) {
            image.parentElement.style.background =
                "linear-gradient(135deg, #edf0f4, #f9ead1)";
        }
    }, true);
}


/* =========================================
   8. FORMULAIRE D'ABONNEMENT
========================================= */

function initializeSubscriptionForm() {
    const form = $("#subscriptionForm");

    if (!form) return;

    form.addEventListener("submit", event => {
        event.preventDefault();

        const status = $("#subscriptionMessage");

        const restaurantName = $("#restaurantName").value.trim();
        const ownerName = $("#ownerName").value.trim();
        const ownerEmail = $("#ownerEmail").value.trim();
        const ownerPhone = $("#ownerPhone").value.trim();

        const paymentMethod = $(
            'input[name="paymentMethod"]:checked'
        )?.value;

        if (
            !restaurantName ||
            !ownerName ||
            !ownerEmail ||
            !ownerPhone ||
            !paymentMethod
        ) {
            status.className = "form-message error";

            status.textContent =
                "Vérifie tous les champs et sélectionne un moyen de paiement.";

            return;
        }

        const paymentNames = {
            mtn: "MTN Mobile Money",
            celtiis: "Celtiis Cash",
            card: "Carte bancaire ou virtuelle"
        };

        /*
         * Aucun numéro privé n'est utilisé ici.
         * Aucune donnée bancaire n'est demandée.
         * Aucune transaction réelle n'est créée.
         *
         * Cette étape doit être remplacée par un appel
         * à un backend sécurisé relié au prestataire.
         */

        status.className = "form-message success";

        status.textContent =
            "Formulaire validé pour " + restaurantName + ". " +
            "Moyen choisi : " + paymentNames[paymentMethod] + ". " +
            "Le paiement réel n'est pas encore activé. " +
            "Le prestataire de paiement doit être connecté avant tout encaissement.";

        showToast("Formulaire d'abonnement validé");
    });
}


/* =========================================
   9. FORMULAIRE DE CONNEXION
========================================= */

function initializeLoginForm() {
    const form = $("#loginForm");

    if (!form) return;

    form.addEventListener("submit", event => {
        event.preventDefault();

        const status = $("#loginMessage");

        status.className = "form-message error";

        status.textContent =
            "La connexion n'est pas encore activée. " +
            "Un système d'authentification sécurisé côté serveur est nécessaire.";

        /*
         * Ne jamais stocker les mots de passe dans localStorage.
         * Ne jamais considérer ce formulaire comme une authentification.
         */
    });
}


/* =========================================
   10. FORMULAIRE DE CONTACT
========================================= */

function initializeContactForm() {
    const form = $("#contactForm");

    if (!form) return;

    form.addEventListener("submit", event => {
        event.preventDefault();

        const name = $("#contactName").value.trim();
        const email = $("#contactEmail").value.trim();
        const subject = $("#contactSubject").value;
        const message = $("#contactMessage").value.trim();

        const status = $("#contactStatus");

        if (!name || !email || !subject || !message) {
            status.className = "form-message error";

            status.textContent =
                "Complète tous les champs avant de continuer.";

            return;
        }

        /*
         * Aucun message n'est envoyé sur Internet ici.
         * Un backend ou un service de formulaire sera nécessaire.
         */

        status.className = "form-message success";

        status.textContent =
            "Ta demande a été préparée dans cette démonstration, mais " +
            "elle n'a pas été envoyée. Un service d'envoi devra être connecté.";

        showToast("Formulaire de contact vérifié");
    });
}


/* =========================================
   11. INITIALISATION
========================================= */

function initializeRestauQR() {
    $("#currentYear").textContent = new Date().getFullYear();

    initializeMobileMenu();

    initializeFilters();
    renderDishes();

    initializeDishModal();
    initializeImageFallbacks();

    initializeSubscriptionForm();
    initializeLoginForm();
    initializeContactForm();

    renderPage(getPageFromURL());

    refreshIcons();
}

document.addEventListener("DOMContentLoaded", initializeRestauQR);

window.addEventListener("popstate", () => {
    renderPage(getPageFromURL());
    window.scrollTo({ top: 0, behavior: "smooth" });
});