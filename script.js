document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".toggle-theme-btn");
    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});


