

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    const loader = document.querySelector(".loader");

    if (preloader) {
        preloader.style.transform = "translateY(-100%)";
        preloader.style.transition = "0.8s ease";
    }

    if (loader) {
        loader.style.opacity = "0";
        loader.style.transition = "0.5s ease";
    }

    setTimeout(() => {
        if (preloader) preloader.style.display = "none";
    }, 900);
});



const header = document.querySelector("header");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {
        header.classList.add("padding");
    } else {
        header.classList.remove("padding");
    }

    lastScrollY = window.scrollY;
});



const menuIcon = document.querySelector(".menu-icon");
const mobileNav = document.querySelector(".mobile_nav");

if (menuIcon && mobileNav) {

    menuIcon.addEventListener("click", () => {
        menuIcon.classList.toggle("menu-active");
        mobileNav.classList.toggle("menu-active");
    });
}




document.querySelectorAll(".mobile_nav ul li a").forEach(link => {
    link.addEventListener("click", () => {

        if (menuIcon) menuIcon.classList.remove("menu-active");
        if (mobileNav) mobileNav.classList.remove("menu-active");

    });
});



const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(
    ".desktop_nav ul li a, .mobile_nav ul li a"
);

const observerOptions = {
    root: null,
    threshold: 0.4
};

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const id = entry.target.getAttribute("id");

            navLinks.forEach(link => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });

}, observerOptions);

sections.forEach(section => {
    if (section.id) sectionObserver.observe(section);
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


/* =========================
   AOS INIT
========================= */

if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        offset: 120
    });
}




const skillCards = document.querySelectorAll(".skill-card");

if (skillCards.length > 0) {

    const skillObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                const bar = entry.target.querySelector(".bar span");

                if (bar) {
                    const width = bar.getAttribute("data-width");

                    setTimeout(() => {
                        bar.style.width = width;
                    }, 250);
                }
            }
        });

    }, {
        threshold: 0.25
    });

    skillCards.forEach(card => skillObserver.observe(card));
}




window.addEventListener("scroll", () => {}, { passive: true });


const projectCards = document.querySelectorAll(".project-card");

if (projectCards.length > 0) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }

        });

    }, {
        threshold: 0.2
    });

    projectCards.forEach(card => observer.observe(card));
}
const eduItems = document.querySelectorAll(".edu-item");

const eduObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.2
});

eduItems.forEach(item => eduObserver.observe(item));
const typewriters = document.querySelectorAll(".typewriter");

const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            typeText(entry.target);
            typeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

typewriters.forEach(el => typeObserver.observe(el));

function typeText(el) {

    const text = el.getAttribute("data-text");
    let index = 0;

    function type() {

        if (index < text.length) {
            el.textContent += text.charAt(index);
            index++;
            setTimeout(type, 15); // speed control
        }
    }

    type();
}