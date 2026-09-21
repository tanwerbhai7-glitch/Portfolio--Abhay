/* home.js — typing effect for the role line on the profile page */
(function () {
  "use strict";
  var el = document.getElementById("typed-role");
  if (!el) return;

  var phrases = [
    "BCA Student — Artificial Intelligence & Machine Learning",
    "Aspiring Software Developer",
    "Building responsive, interactive web apps"
  ];

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    el.textContent = phrases[0];
    return;
  }

  var cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.innerHTML = "&nbsp;";

  var textNode = document.createElement("span");
  el.appendChild(textNode);
  el.appendChild(cursor);

  var phraseIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    var current = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      textNode.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      textNode.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 55);
  }

  tick();
})();
