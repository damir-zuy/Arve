document.addEventListener("DOMContentLoaded", function () {
    initJoinWaitlist();
    initFlowersHover();
    initHeaderScroll();
    initBurgerMenu();
});

// Initialize join waitlist functionality
function initJoinWaitlist() {
    const joinInputs = document.querySelectorAll(".join_input");
    const joinBtns = document.querySelectorAll(".join_btn");

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function updateButtonState(input, button) {
        if (isValidEmail(input.value)) {
            button.style.color = "var(--orange)";
            button.style.pointerEvents = "auto";
            button.style.opacity = "1";
            button.style.scale = "1.5";
            button.style.transform = "translateX(10px)";
            button.style.transition = "0.15s";
        } else {
            button.style.color = "#DBD3D3";
            button.style.pointerEvents = "none";
            button.style.opacity = "1";
            button.style.transform = "translateX(0)";
            button.style.scale = "1"; // Fixed invalid value
        }
    }

    joinInputs.forEach((joinInput, index) => {
        const joinBtn = joinBtns[index];

        joinInput.addEventListener("input", () => updateButtonState(joinInput, joinBtn));
        updateButtonState(joinInput, joinBtn);

        joinBtn.addEventListener("click", async () => {
            const email = joinInput.value.trim();
            if (!isValidEmail(email)) return;

            joinBtn.disabled = true; // Prevent multiple submissions

            try {
                const response = await fetch("/api/join-waitlist", { // Fixed endpoint for Netlify proxy
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();
                if (response.status === 400) {
                    showFlashMessage(data.message, "error");
                } else {
                    showFlashMessage(data.message, "success");
                    joinInput.value = "";
                    updateButtonState(joinInput, joinBtn);
                }
            } catch (error) {
                showFlashMessage("Something went wrong!", "error");
            }

            joinBtn.disabled = false; // Re-enable button
        });
    });
}

// Show flash message with animation
function showFlashMessage(message, type) {
    const flashMessagesContainer = ensureFlashMessageContainer();

    const flashMessage = document.createElement("div");
    flashMessage.classList.add("flash_message", type, "show");
    flashMessage.textContent = message;

    flashMessagesContainer.appendChild(flashMessage);

    setTimeout(() => {
        flashMessage.classList.remove("show");
        flashMessagesContainer.removeChild(flashMessage);
    }, 3000);
}

// Ensure flash message container exists
function ensureFlashMessageContainer() {
    let container = document.querySelector("#flash-messages-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "flash-messages-container";
        document.body.appendChild(container);
    }
    return container;
}

// Initialize flower hover effect
function initFlowersHover() {
    const flowers = document.querySelectorAll(".flower");

    flowers.forEach(flower => {
        flower.style.opacity = "1";

        flower.addEventListener("mouseenter", function () {
            flower.style.transform = "scale(1.2)";
            flower.style.transition = "transform 0.3s ease";
        });

        flower.addEventListener("mouseleave", function () {
            flower.style.transform = "scale(1)";
        });
    });
}

// Initialize header scroll effect
function initHeaderScroll() {
    const header = document.querySelector(".header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 0) {
            header.style = `
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                border: 2px solid #ffffff15;
                border-radius: 150px;
                margin: 20px auto;
                transition: .25s;
                background-image: url('./assets/noise-light.png');
            `;
        } else {
            header.style = "backdrop-filter: none; -webkit-backdrop-filter: none; transition: .25s;";
        }
    });
}

// Initialize burger menu toggle
function initBurgerMenu() {
    const burgerMenu = document.querySelector(".burger_menu");
    const menu = document.querySelector(".menu");
    const crossButton = document.querySelector(".cross");

    burgerMenu.addEventListener("click", function () {
        menu.classList.add("open");
    });

    crossButton.addEventListener("click", function () {
        menu.classList.remove("open");
    });
}
