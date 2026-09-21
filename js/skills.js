/* skills.js — fills each skill bar to its data-level and counts up the % */
(function () {
  "use strict";
  var rows = document.querySelectorAll("[data-skill]");
  if (!rows.length) return;

  function animateRow(row) {
    var level = parseInt(row.getAttribute("data-level"), 10) || 0;
    var fill = row.querySelector(".skill-fill");
    var percentEl = row.querySelector(".skill-percent");

    fill.style.width = level + "%";

    var start = null;
    var duration = 900;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var current = Math.round(progress * level);
      percentEl.textContent = current + "%";
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateRow(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    rows.forEach(function (row) { io.observe(row); });
  } else {
    rows.forEach(animateRow);
  }
})();
