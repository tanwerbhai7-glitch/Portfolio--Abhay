/* contact.js — client-side validation, mailto handoff, copy-to-clipboard */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  var status = document.querySelector("[data-form-status]");
  var DEST_EMAIL = "tanwerbhai7@gmail.com";

  function setError(field, message) {
    var el = document.querySelector('[data-error-for="' + field + '"]');
    if (el) el.textContent = message || "";
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var valid = true;

      setError("name", "");
      setError("email", "");
      setError("message", "");

      if (!name) { setError("name", "Please enter your name."); valid = false; }
      if (!email) { setError("email", "Please enter your email."); valid = false; }
      else if (!isValidEmail(email)) { setError("email", "That email address doesn't look right."); valid = false; }
      if (!message) { setError("message", "Add a short message."); valid = false; }

      if (!valid) {
        status.textContent = "";
        return;
      }

      var subject = "Portfolio contact from " + name;
      var body = message + "\n\n— " + name + " (" + email + ")";
      var mailto =
        "mailto:" + DEST_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;
      status.textContent = "Opening your email app…";
    });
  }

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy");
      var reset = function () { btn.textContent = "⧉"; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(function () {
          btn.textContent = "✓";
          setTimeout(reset, 1400);
        });
      }
    });
  });
})();
