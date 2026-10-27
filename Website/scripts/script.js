document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // LOGIN DROPDOWN
    // =====================================

    const openLogin = document.getElementById("openLogin");
    const loginForm = document.getElementById("loginForm");

    if (openLogin && loginForm) {

        openLogin.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            loginForm.classList.toggle("show");
        });

        loginForm.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        document.addEventListener("click", function () {
            loginForm.classList.remove("show");
        });

    }


    // =====================================
    // CHATBOX
    // =====================================

    const chatToggle = document.getElementById("chatToggle");
    const chatPanel = document.getElementById("chatPanel");
    const chatClose = document.getElementById("chatClose");
    const chatMessage = document.getElementById("chatMessage");
    const wordCount = document.getElementById("wordCount");

    function setChatOpen(isOpen) {

        if (!chatPanel || !chatToggle) return;

        chatPanel.hidden = !isOpen;

        chatToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    }

    if (chatToggle && chatPanel) {

        // Start with the chatbox closed
        setChatOpen(false);

        // Open and close the chatbox
        chatToggle.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            setChatOpen(chatPanel.hidden);
        });

        // Keep clicks inside the chatbox from affecting other handlers
        chatPanel.addEventListener("click", function (event) {
            event.stopPropagation();
        });

    } else {
        console.error(
            "Chatbox error: Could not find #chatToggle or #chatPanel."
        );
    }

    // Close the chatbox
    if (chatClose) {

        chatClose.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            setChatOpen(false);

            if (chatToggle) {
                chatToggle.focus();
            }
        });

    }


    // =====================================
    // CHATBOX WORD COUNTER (50-WORD LIMIT)
    // =====================================

    if (chatMessage && wordCount) {

        function updateWordCount() {

            const words = chatMessage.value
                .trim()
                .split(/\s+/)
                .filter(Boolean);

            const count = words.length;

            wordCount.textContent = count + " / 50 words";

            wordCount.style.color =
                count > 50 ? "#b33" : "#493817";

            chatMessage.setCustomValidity(
                count > 50
                    ? "Please limit your message to 50 words."
                    : ""
            );
        }

        chatMessage.addEventListener("input", updateWordCount);

        // Display the initial word count
        updateWordCount();
    }


    // =====================================
    // HAMBURGER SIDEBAR MENU
    // =====================================

    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const closeSidebar = document.getElementById("close-sidebar");
    const sidebarOverlay = document.getElementById("sidebar-overlay");

    if (menuToggle && sidebar && closeSidebar && sidebarOverlay) {

        // Open sidebar
        function openMenu() {

            sidebar.classList.add("open");
            sidebarOverlay.classList.add("active");

            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

            sidebar.setAttribute("aria-hidden", "false");

            closeSidebar.focus();
        }

        // Close sidebar
        function closeMenu() {

            sidebar.classList.remove("open");
            sidebarOverlay.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            sidebar.setAttribute("aria-hidden", "true");

            menuToggle.focus();
        }

        // Hamburger button opens and closes the sidebar
        menuToggle.addEventListener("click", function (event) {

            event.preventDefault();

            if (sidebar.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        // X button closes the sidebar
        closeSidebar.addEventListener("click", function (event) {

            event.preventDefault();

            closeMenu();

        });

        // Clicking outside the sidebar closes it
        sidebarOverlay.addEventListener("click", closeMenu);

        // Escape key closes the sidebar
        document.addEventListener("keydown", function (event) {

            if (
                event.key === "Escape" &&
                sidebar.classList.contains("open")
            ) {
                closeMenu();
            }

        });

        // Close sidebar when a navigation link is clicked
        sidebar.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", closeMenu);

        });

    } else {

        console.error(
            "Sidebar error: One or more required elements are missing. " +
            "Check #menu-toggle, #sidebar, #close-sidebar, " +
            "and #sidebar-overlay in your HTML."
        );

    }

});