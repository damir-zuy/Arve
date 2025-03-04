document.addEventListener("DOMContentLoaded", function () {
    const joinInputs = document.querySelectorAll(".join_input");
    const joinBtns = document.querySelectorAll(".join_btn");
    const flashMessagesContainer = document.querySelector("#flash-messages-container");

    // Check if email is valid
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (!flashMessagesContainer) {
        console.error("Flash message container not found!");
        return;
    }
    // Update button state based on email validity
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
            button.style.scale = "none";
        }
    }

    // Loop through each input and button
    joinInputs.forEach((joinInput, index) => {
        const joinBtn = joinBtns[index]; // Get the corresponding button for each input

        // Update button state based on input value
        joinInput.addEventListener("input", () => updateButtonState(joinInput, joinBtn));
        updateButtonState(joinInput, joinBtn); // Initial state
        // Handle form submission for each input/button
        joinBtn.addEventListener("click", async () => {
            const email = joinInput.value;
            if (!isValidEmail(email)) return;

            try {
                const response = await fetch('https://arve.onrender.com/api/join-waitlist', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                })

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
        });
    });

// Show flash message with bouncy animation
function showFlashMessage(message, type) {
    // Make sure the container exists before trying to append the message
    const flashMessagesContainer = document.querySelector("#flash-messages-container");
    if (!flashMessagesContainer) {
        console.error("Flash message container not found!");
        return;
    }

    // Create new flash message element
    const flashMessage = document.createElement("div");
    flashMessage.classList.add("flash_message", type, "show");
    flashMessage.textContent = message;

    // Append the flash message to the container
    flashMessagesContainer.appendChild(flashMessage);

    // Ensure the message is fully hidden after 3 seconds to finish the animation
    setTimeout(() => {
        flashMessagesContainer.removeChild(flashMessage); // Remove the element from the DOM
    }, 3000);

    // Remove the flash message after animation completes (3 seconds)
    setTimeout(() => {
        flashMessage.classList.remove("show"); // Remove "show" class to hide it
    }, 2000);
}

});




// Flower hover effects
document.addEventListener("DOMContentLoaded", function () {
    const flowers = document.querySelectorAll(".flower");

    flowers.forEach(flower => {
        flower.style.opacity = "1";

        // Add hover effect
        flower.addEventListener("mouseenter", function () {
            flower.style.transform = "scale(1.2)";
            flower.style.transition = "transform 0.3s ease"; // Smooth scaling
        });

        flower.addEventListener("mouseleave", function () {
            flower.style.transform = "scale(1)";
        });
    });
});

// Header scroll effect
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header"); // Use .header since your div has this class

    window.addEventListener("scroll", function () {
        if (window.scrollY > 0) {
            header.style = "backdrop-filter: blur(8px);-webkit-backdrop-filter: blur(8px); border: 2px solid #ffffff15; border-radius:150px;margin: 20px auto; transition: .25s; background-image: url('./assets/noise-light.png');";
        } else {
            header.style = "backdrop-filter: none; -webkit-backdrop-filter: none; transition: .25s;"; // Fix: "none" is invalid
        }
    });
});

// Additional waitlist form submission (optional, if needed)
document.addEventListener('DOMContentLoaded', () => {
    const joinBtn = document.querySelector('.join_btn');
    const emailInput = document.querySelector('.join_input');

    joinBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();

        if (!email) {
            console.log('Please enter a valid email.');
            return;
        }
        
        try {
            const response = await fetch('https://arve.onrender.com/api/join-waitlist', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                })

            const result = await response.json();
            console.log(result.message);
            emailInput.value = ''; // Clear input after submission
        } catch (error) {
            console.log('Error submitting email.');
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const burgerMenu = document.querySelector(".burger_menu");
    const menu = document.querySelector(".menu");
    const crossButton = document.querySelector(".cross");

    burgerMenu.addEventListener("click", function () {
        menu.classList.add("open");
    });

    crossButton.addEventListener("click", function () {
        menu.classList.remove("open");
    });
});
