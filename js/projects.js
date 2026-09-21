/* projects.js — simple modal for "Read more" on a project card */
(function () {
  "use strict";
  var backdrop = document.querySelector("[data-modal-backdrop]");
  var openBtns = document.querySelectorAll("[data-open-modal]");
  var closeBtn = document.querySelector("[data-close-modal]");
  if (!backdrop) return;

  function openModal() {
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }
  function closeModal() {
    backdrop.hidden = true;
    document.body.style.overflow = "";
  }

  openBtns.forEach(function (btn) {
    btn.addEventListener("click", openModal);
  });
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", function (e) {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !backdrop.hidden) closeModal();
  });
})();
