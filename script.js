document.addEventListener("DOMContentLoaded", () => {
    // --- 1. MATRIX RAIN EFFECT ---
    const canvas = document.getElementById("matrixCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const chars = "NAKAMON0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const charArray = chars.split("");
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        for (let i = 0; i < columns; i++) drops[i] = 1;

        function drawMatrix() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#19a01d";
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text =
                    charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (
                    drops[i] * fontSize > canvas.height &&
                    Math.random() > 0.975
                )
                    drops[i] = 0;
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 33);
    }

    // --- 2. LOADER & SHOW CONTENT ---
    const loader = document.getElementById("loader");
    const hiddenElements = document.querySelectorAll(".hidden-content");

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
                hiddenElements.forEach((el, index) => {
                    setTimeout(
                        () => el.classList.add("show-content"),
                        index * 200
                    );
                });
            }, 500);
        }, 2500);
    }

    // --- 3. MODAL LOGIC ---
    const modalExp = document.getElementById("modal-exp");
    const modalContact = document.getElementById("modal-contact");
    const modalBoxExp = document.getElementById("modal-box-exp");
    const modalBoxContact = document.getElementById("modal-box-contact");

    const btnHome = document.getElementById("btn-home");
    const btnExp = document.getElementById("btn-exp");
    const btnContact = document.getElementById("btn-contact");

    const closeBtns = document.querySelectorAll(".close-btn");
    let isAnimating = false;

    function openModal(modal, modalBox, activeBtn) {
        if (isAnimating) return;
        closeAllModals(true);

        modal.style.display = "flex";
        setTimeout(() => {
            modal.style.opacity = "1";
        }, 10);
        modalBox.classList.remove("closing");

        activeBtn.classList.add("active");
        btnHome.classList.remove("active");
    }

    function closeAllModals(forceClose = false) {
        if (isAnimating && !forceClose) return;

        const activeModals = [modalExp, modalContact];
        const activeBoxes = [modalBoxExp, modalBoxContact];

        activeModals.forEach((modal, index) => {
            if (modal.style.display === "flex") {
                if (forceClose) {
                    modal.style.display = "none";
                    modal.style.opacity = "0";
                    activeBoxes[index].classList.remove("closing");
                } else {
                    isAnimating = true;
                    activeBoxes[index].classList.add("closing");
                    modal.style.opacity = "0";
                    setTimeout(() => {
                        modal.style.display = "none";
                        activeBoxes[index].classList.remove("closing");
                        isAnimating = false;
                    }, 500);
                }
            }
        });

        btnExp.classList.remove("active");
        btnContact.classList.remove("active");
        btnHome.classList.add("active");
    }

    btnHome.addEventListener("click", (e) => {
        e.preventDefault();
        closeAllModals();
    });

    btnExp.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(modalExp, modalBoxExp, btnExp);
    });

    btnContact.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(modalContact, modalBoxContact, btnContact);
    });

    closeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            closeAllModals();
        });
    });

    window.addEventListener("click", (e) => {
        if (e.target == modalExp || e.target == modalContact) {
            closeAllModals();
        }
    });
});
