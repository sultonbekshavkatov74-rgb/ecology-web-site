
document.addEventListener("DOMContentLoaded", () => {
    // ========================================
    // 1. MOBILE MENU
    // ========================================

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {
        function closeMenu() {
            mobileMenu.classList.add("hidden");

            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Open navigation menu");

            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }

        function toggleMenu() {
            const isOpening = mobileMenu.classList.contains("hidden");

            mobileMenu.classList.toggle("hidden");

            menuBtn.setAttribute("aria-expanded", String(isOpening));
            menuBtn.setAttribute(
                "aria-label",
                isOpening ? "Close navigation menu" : "Open navigation menu"
            );

            menuBtn.innerHTML = isOpening
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        }

        menuBtn.addEventListener("click", toggleMenu);

        // Close menu after clicking a navigation link
        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close menu when switching to desktop layout
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        });
    }

    // ========================================
    // 2. ANIMATED IMPACT COUNTERS
    // ========================================

    const counters = document.querySelectorAll(".counter");
    const impactSection = document.getElementById("projects");

    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;

        countersStarted = true;

        counters.forEach((counter) => {
            const target = Number(counter.dataset.target);

            if (!Number.isFinite(target) || target < 0) {
                counter.textContent = "0";
                return;
            }

            const duration = 1800;
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Smooth easing effect
                const easedProgress = 1 - Math.pow(1 - progress, 3);

                const currentValue = Math.floor(
                    target * easedProgress
                );

                counter.textContent = currentValue.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }

            requestAnimationFrame(updateCount);
        });
    }

    if (impactSection && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        startCounters();
                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.3
            }
        );

        observer.observe(impactSection);
    } else if (impactSection) {
        // Fallback for browsers without IntersectionObserver
        startCounters();
    }

    // ========================================
    // 3. NAVBAR SCROLL SHADOW
    // ========================================

    const navbar = document.getElementById("navbar");

    function updateNavbar() {
        if (!navbar) return;

        navbar.classList.toggle(
            "shadow-md",
            window.scrollY > 50
        );
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();

    // ========================================
    // 4. CURRENT YEAR IN FOOTER
    // ========================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ========================================
    // 5. CLOSE MOBILE MENU WITH ESCAPE
    // ========================================

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            mobileMenu &&
            !mobileMenu.classList.contains("hidden")
        ) {
            mobileMenu.classList.add("hidden");

            if (menuBtn) {
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Open navigation menu");
                menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                menuBtn.focus();
            }
        }
    });

    console.log("🌱 GreenTomorrow successfully loaded!");
});
