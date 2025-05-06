const themeToggle = document.getElementById("toggle-container");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark-mode");
    } else {
        localStorage.setItem("theme", "");
    }
});

const currentTheme = localStorage.getItem("theme");
if (currentTheme){
    document.body.classList.add("dark-mode");
}

const menuToggle = document.getElementById("menu-container");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("close-menu");
const menuOptions = document.querySelectorAll(".location-link");

menuToggle.addEventListener("click", () => {
    menu.style.display = "block";
});

closeMenu.addEventListener("click", () => {
    menu.style.display = "none";
});

menuOptions.forEach((button) => {
    button.addEventListener("click", () => {
        let location = button.getAttribute("data-location"); 
        window.location.href = `${location}.html`;
    });
});
