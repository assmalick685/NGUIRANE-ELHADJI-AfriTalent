// DARK / LIGHT MODE
const themeBtn = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

themeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme","dark");
    } else {
        localStorage.setItem("theme","light");
    }
});

// NAVBAR AU SCROLL
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// RETOUR EN HAUT
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function() {

    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// COMPTEURS ANIMES
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let value = 0;

            const Interval = setInterval(function () {

                value += Math.ceil(target / 100);

                if (value >= target) {
                    value = target;
                    clearInterval(Interval);
                }

                counter.textContent = "+" + value.toLocaleString();

            },20);

            counterObserver.unobserve(counter);
        }
    });
});

counters.forEach(function (counter) {
    counterObserver.observe(counter);
});

// FADE-IN DES SECTIONS
const sections = document.querySelectorAll(".fade-section");
const sectionObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");
        }
    });
});

sections.forEach(function (section) {
    sectionObserver.observe(section);
});

// FILTRAGE DES FREELANCES
const categorie = document.getElementById("categorie");

if (categorie) {

    const cartes = document.querySelectorAll(".card[data-categorie]");

    categorie.addEventListener("change", function () {

        const choix = categorie.value;

        cartes.forEach(function (carte) {

            if (choix === "toutes" || carte.dataset.categorie === choix) {
                carte.style.display = "block";
            } else {
                carte.style.display = "none";
            }
        });
    });
}

// VALIDATION FORMULAIRE
const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const nom = document.getElementById("nom");
        const prenom = document.getElementById("prenom");
        const email = document.getElementById("email");
        const sujet = document.getElementById("sujet");
        const message = document.getElementById("message");

        let valide = true;

        function erreur(champ, texte) {
            champ.nextElementSibling.textContent = texte;
            champ.nextElementSibling.style.color = "red";
            valide = false;
        }

        function effacer(champ) {
            champ.nextElementSibling.textContent = "";
        }

        effacer(nom);
        effacer(prenom);
        effacer(email);
        effacer(sujet);
        effacer(message);

        if (nom.value.trim() === "") {
            erreur(nom, "Le nom est obligatoire.");
        }

        if (prenom.value.trim() === "") {
            erreur(prenom, "Le prénom est obligatoire.");
        }

        const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!regex.test(email.value.trim())) {
            erreur(email, "Adresse e-mail invalide.");
        }

        if (sujet.value === "") {
            erreur(sujet, "Veuillez saisir un sujet.");
        }

        if (message.value.trim().length < 20) {
            erreur(message, "Le message doit contenir au moins 20 caractères.");
        }

        const success = document.getElementById("successMessage");

        if (valide) {

            success.textContent = "Message envoyé avec succès !";
            success.style.color = "green";

            form.reset();

        } else {

            success.textContent = "";
        }
    });
}
