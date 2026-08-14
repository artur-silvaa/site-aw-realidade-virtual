document.addEventListener("DOMContentLoaded", () => {
  // ============================================================
  // MENU — LINK ATIVO
  // ============================================================

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link-item").forEach((link) => {
    const href = link.getAttribute("href");

    // A página Home nunca recebe a classe active.
    const isActive = href !== "index.html" && href === currentPage;

    link.classList.toggle("active", isActive);
  });

  // ============================================================
  // MENU HAMBÚRGUER RESPONSIVO
  // ============================================================

  document.querySelectorAll(".site-header").forEach((header) => {
    const menuToggle = header.querySelector(".menu-toggle");
    const siteNav = header.querySelector(".site-nav");

    // Não executa caso o header esteja incompleto.
    if (!menuToggle || !siteNav) return;

    const closeMenu = () => {
      siteNav.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
      siteNav.classList.add("is-open");
      menuToggle.classList.add("is-open");
      menuToggle.setAttribute("aria-expanded", "true");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.contains("is-open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Fecha o menu depois do clique em qualquer link.
    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Fecha ao clicar fora do cabeçalho.
    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) {
        closeMenu();
      }
    });

    // Fecha caso a tela volte ao desktop.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  });

  // ============================================================
  // ACCORDION — SOBRE
  // ============================================================

  const aboutTriggers = document.querySelectorAll(".about_accordion_trigger");

  aboutTriggers.forEach((button) => {
    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";

      aboutTriggers.forEach((otherButton) => {
        otherButton.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // ============================================================
  // ACCORDION — FAQ
  // Abre somente uma pergunta por vez
  // ============================================================

  const faqItems = document.querySelectorAll("details.faq_item");

  faqItems.forEach((faqItem) => {
    faqItem.addEventListener("toggle", () => {
      // Se o item foi fechado, não precisa fazer nada.
      if (!faqItem.open) return;

      // Fecha os outros itens quando este for aberto.
      faqItems.forEach((otherItem) => {
        if (otherItem !== faqItem) {
          otherItem.open = false;
        }
      });
    });
  });

  // ============================================================
  // FILTRO DE PROJETOS
  // ============================================================

  const filterButtons = document.querySelectorAll(".projects_filter-button");
  const projectCards = document.querySelectorAll(".projects_card-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("projects_filter-active");
      });

      button.classList.add("projects_filter-active");

      projectCards.forEach((card) => {
        const shouldShow =
          category === "todos" || card.dataset.category === category;

        card.toggleAttribute("hidden", !shouldShow);
      });
    });
  });

  // ============================================================
  // ANIMAÇÕES AO SCROLL
  // ============================================================

  const animatedElements = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window && animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    animatedElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // ============================================================
  // LOGIN — MOSTRAR / OCULTAR SENHA
  // ============================================================

  const passwordToggle = document.querySelector(".login-form_toggle-pw");
  const passwordInput = document.getElementById("senha");

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", () => {
      const icon = passwordToggle.querySelector("i");
      const isPasswordHidden = passwordInput.type === "password";

      passwordInput.type = isPasswordHidden ? "text" : "password";

      if (icon) {
        icon.classList.toggle("fa-eye", !isPasswordHidden);
        icon.classList.toggle("fa-eye-slash", isPasswordHidden);
      }
    });
  }

  // ============================================================
  // LOGIN — ABAS SIGN IN / SIGN UP
  // ============================================================

  const loginTabs = document.querySelectorAll(".login-tabs_btn");

  loginTabs.forEach((button) => {
    button.addEventListener("click", () => {
      loginTabs.forEach((tab) => {
        tab.classList.remove("login-tabs_btn--active");
      });

      button.classList.add("login-tabs_btn--active");
    });
  });
});
