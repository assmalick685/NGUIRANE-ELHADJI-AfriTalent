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

                counter.textContent = value.toLocaleString();

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

