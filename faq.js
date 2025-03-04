document.addEventListener("DOMContentLoaded", function () {
    const joinInputs = document.querySelectorAll(".join_input");
    const joinBtns = document.querySelectorAll(".join_btn");
    const flashMessagesContainer = document.querySelector("#flash-messages-container");
    const flowers = document.querySelectorAll(".flower");
    const header = document.querySelector(".header");
    const burgerMenu = document.querySelector(".burger_menu");
    const menu = document.querySelector(".menu");
    const crossButton = document.querySelector(".cross");

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (!flashMessagesContainer) {
        console.error("Flash message container not found!");
        return;
    }

    function updateButtonState(input, button) {
        const isValid = isValidEmail(input.value);
        button.style.color = isValid ? "var(--orange)" : "#DBD3D3";
        button.style.pointerEvents = isValid ? "auto" : "none";
        button.style.opacity = "1";
        button.style.transform = isValid ? "translateX(10px) scale(1.5)" : "translateX(0)";
        button.style.transition = "0.15s";
    }

    function showFlashMessage(message, type) {
        const flashMessage = document.createElement("div");
        flashMessage.classList.add("flash_message", type, "show");
        flashMessage.textContent = message;
        flashMessagesContainer.appendChild(flashMessage);

        setTimeout(() => flashMessage.classList.remove("show"), 2000);
        setTimeout(() => flashMessage.remove(), 3000);
    }

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

    joinInputs.forEach((input, index) => {
        const button = joinBtns[index];
        input.addEventListener("input", () => updateButtonState(input, button));
        updateButtonState(input, button);
        button.addEventListener("click", () => handleJoinWaitlist(input, button));
    });

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
                background-color: #d5ed9f4f;`;
        } else {
            header.style.cssText = `
                backdrop-filter: none;
                -webkit-backdrop-filter: none;
                transition: .25s;`;
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    burgerMenu?.addEventListener("click", () => menu.classList.add("open"));
    crossButton?.addEventListener("click", () => menu.classList.remove("open"));
});
