export function initializeCommon() {
    document.addEventListener("DOMContentLoaded", () => {
        const hamButton = document.querySelector("#menu");
        const navigation = document.querySelector("nav");

        // Nav menu


        hamButton.addEventListener("click", () => {
            navigation.classList.toggle("open");
            hamButton.classList.toggle("open");
        });

        // Footer
        document.getElementById("currentyear").textContent =
            new Date().getFullYear();
        document.getElementById(
            "lastModified"
        ).textContent = `Last Modified: ${document.lastModified}`;
    });
    document.addEventListener("DOMContentLoaded", () => {
        const bodyId = document.body.id;
        const navLinks = document.querySelectorAll("nav .nav-a");



        navLinks.forEach((link) => {
            if (
                link.getAttribute("href").includes(bodyId.replace("-page", ""))
            ) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });
}
