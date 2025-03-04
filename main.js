document.addEventListener("DOMContentLoaded", function () {
    const joinInputs = document.querySelectorAll(".join_input");
    const joinBtns = document.querySelectorAll(".join_btn");
    const flashMessagesContainer = document.querySelector("#flash-messages-container");
    const flowers = document.querySelectorAll(".flower");
    const header = document.querySelector(".header");
    const burgerMenu = document.querySelector(".burger_menu");
    const menu = document.querySelector(".menu");
    const crossButton = document.querySelector(".cross");

    // Validate email format
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (!flashMessagesContainer) {
        console.error("Flash message container not found!");
        return;
    }

    // Update button state based on email validity
    function updateButtonState(input, button) {
        const isValid = isValidEmail(input.value);
        button.style.color = isValid ? "var(--orange)" : "#DBD3D3";
        button.style.pointerEvents = isValid ? "auto" : "none";
        button.style.opacity = "1";
        button.style.transform = isValid ? "translateX(10px) scale(1.5)" : "translateX(0)";
        button.style.transition = "0.15s";
    }

    // Show flash messages with animation
    function showFlashMessage(message, type) {
        if (!flashMessagesContainer) return;

        const flashMessage = document.createElement("div");
        flashMessage.classList.add("flash_message", type, "show");
        flashMessage.textContent = message;
        flashMessagesContainer.appendChild(flashMessage);

        setTimeout(() => flashMessage.classList.remove("show"), 2000);
        setTimeout(() => flashMessage.remove(), 3000);
    }

    // Handle join-waitlist form submission
    async function handleJoinWaitlist(input, button) {
        const email = input.value.trim();
        if (!isValidEmail(email)) return;

        try {
            const response = await fetch("https://arve.onrender.com/join-waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            showFlashMessage(data.message, response.status === 400 ? "error" : "success");

            if (response.ok) {
                input.value = "";
                updateButtonState(input, button);
            }
        } catch (error) {
            showFlashMessage("Something went wrong!", "error");
        }
    }

    // Attach event listeners for join-waitlist buttons
    joinInputs.forEach((input, index) => {
        const button = joinBtns[index];

        input.addEventListener("input", () => updateButtonState(input, button));
        updateButtonState(input, button);

        button.addEventListener("click", () => handleJoinWaitlist(input, button));
    });

    // Flower hover effects
    flowers.forEach(flower => {
        flower.style.opacity = "1";
        flower.addEventListener("mouseenter", () => {
            flower.style.transform = "scale(1.2)";
            flower.style.transition = "transform 0.3s ease";
        });
        flower.addEventListener("mouseleave", () => {
            flower.style.transform = "scale(1)";
        });
    });

    // Header scroll effect
    window.addEventListener("scroll", function () {
        if (window.scrollY > 0) {
            header.style.cssText = `
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                border: 2px solid #ffffff15;
                border-radius: 150px;
                margin: 20px auto;
                transition: .25s;
                background-image: url('./assets/noise-light.png');
            `;
        } else {
            header.style.cssText = `
                backdrop-filter: none;
                -webkit-backdrop-filter: none;
                transition: .25s;
            `;
        }
    });

    // Burger menu toggle
    burgerMenu?.addEventListener("click", () => menu.classList.add("open"));
    crossButton?.addEventListener("click", () => menu.classList.remove("open"));
});
