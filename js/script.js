(function () {
  "use strict";

  // ---- Mobile nav toggle ----
  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("navMobile");

  function closeNav() {
    mobileNav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = '<svg class="icon" width="26" height="26"><use href="#i-menu"/></svg>';
  }

  function openNav() {
    mobileNav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.innerHTML = '<svg class="icon" width="26" height="26"><use href="#i-close"/></svg>';
  }

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.contains("is-open");
      if (isOpen) { closeNav(); } else { openNav(); }
    });

    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  // ---- Reveal-on-scroll: each .reveal container rises as a single unit ----
  var reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && reveals.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---- Contact form: demo-only submit (no backend wired up) ----
  var contactForm = document.getElementById("contactForm");
  var formSuccess = document.getElementById("formSuccess");

  if (contactForm && formSuccess) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      contactForm.classList.add("is-submitted");
      formSuccess.classList.add("is-shown");
      formSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
})();
