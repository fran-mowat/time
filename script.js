const themeToggle = document.getElementById("toggle-container");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
})

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
