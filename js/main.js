/* main.js — behaviour shared by every page */
(function () {
  "use strict";

  /* ---------- theme toggle ---------- */
  var THEME_KEY = "ay-theme";
  var root = document.documentElement;
  var themeBtn = document.querySelector("[data-theme-toggle]");

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeBtn) {
      themeBtn.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      );
      themeBtn.textContent = theme === "light" ? "☾" : "☀";
    }
  }

  var storedTheme = null;
  try { storedTheme = window.localStorage.getItem(THEME_KEY); } catch (e) { /* ignore */ }
  applyTheme(storedTheme || "dark");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try { window.localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- full-screen section menu ---------- */
  var menuBtn = document.querySelector("[data-menu-toggle]");
  var closeBtn = document.querySelector("[data-menu-close]");
  var overlay = document.querySelector("[data-menu-overlay]");
  var menuLinks = document.querySelectorAll("[data-menu-link]");
  var lastFocused = null;

  function isMenuOpen() {
    return overlay && overlay.classList.contains("is-open");
  }

  function openMenu() {
    if (!overlay) return;
    lastFocused = document.activeElement;
    overlay.classList.add("is-open");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var firstLink = overlay.querySelector(".menu-card");
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  if (menuBtn && overlay) {
    menuBtn.addEventListener("click", function () {
      if (isMenuOpen()) closeMenu(); else openMenu();
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isMenuOpen()) closeMenu();
  });

  /* current page's own card just closes the menu; other cards fade the
     overlay out first, then hand off to a normal page navigation */
  function currentFileName() {
    var path = window.location.pathname.split("/").pop();
    return path || "index.html";
  }

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (href === currentFileName()) {
        e.preventDefault();
        closeMenu();
        return;
      }
      e.preventDefault();
      closeMenu();
      window.setTimeout(function () {
        window.location.href = href;
      }, 260);
    });
  });

  /* ---------- scroll reveal (single subtle pass) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- back to top ---------- */
  var backBtn = document.querySelector("[data-back-to-top]");
  if (backBtn) {
    window.addEventListener("scroll", function () {
      backBtn.classList.toggle("show", window.scrollY > 480);
    });
    backBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- time-of-day greeting ---------- */
  var greetEl = document.querySelector("[data-greeting]");
  if (greetEl) {
    var hour = new Date().getHours();
    var greeting = "Hello";
    if (hour < 5) greeting = "Burning the midnight oil";
    else if (hour < 12) greeting = "Good morning";
    else if (hour < 17) greeting = "Good afternoon";
    else if (hour < 21) greeting = "Good evening";
    else greeting = "Good night";
    greetEl.textContent = greeting + ", welcome to my page \u2014";
  }
})();
