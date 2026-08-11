/* ==========================================================================
   Will·e – will-e.app

   ┌────────────────────────────────────────────────────────────────────┐
   │  JULKAISUPÄIVÄNÄ: liitä App Store -osoite alle ja tallenna.        │
   │  Se on ainoa muutos. Napit vaihtuvat "Tulossa App Storeen"         │
   │  -tilasta oikeiksi latauslinkeiksi molemmilla kielillä.            │
   └────────────────────────────────────────────────────────────────────┘
   ========================================================================== */

var APP_STORE_URL = "";   // esim. "https://apps.apple.com/app/id0000000000"

(function () {
  "use strict";

  /* --- 1. App Store -nappien tila --------------------------------------- */

  var buttons = document.querySelectorAll("[data-appstore]");
  var isLive = typeof APP_STORE_URL === "string" && APP_STORE_URL.length > 0;

  Array.prototype.forEach.call(buttons, function (btn) {
    var label = btn.querySelector(".btn-label") || btn;

    if (isLive) {
      btn.href = APP_STORE_URL;
      btn.classList.remove("is-pending");
      btn.removeAttribute("aria-disabled");
      btn.rel = "noopener";
      label.textContent = btn.getAttribute("data-live") || label.textContent;
    } else {
      // Odotustilassa nappi ei vie mihinkään — myöskään näppäimistöllä.
      btn.addEventListener("click", function (e) { e.preventDefault(); });
    }
  });

  // Odotustilan huomautus piiloon heti kun appi on julkaistu.
  if (isLive) {
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-pending-note]"),
      function (el) { el.hidden = true; }
    );
  }

  /* --- 2. Sisääntulo vieritettäessä ------------------------------------- */

  var targets = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add("in");
    });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* --- 3. Heron video ---------------------------------------------------- */
  /* Toisto käynnistetään koodista, ei autoplay-attribuutilla. Näin
     liikkeen vähennys voidaan oikeasti kunnioittaa: silloin video jää
     paikalleen ja kävijä näkee pelkän poster-kuvan. */

  var video = document.querySelector(".hero-video");
  if (video && !reduced) {
    var toisto = video.play();
    if (toisto && toisto.catch) { toisto.catch(function () {}); }
  }

  /* --- 4. Kielivalinnan muistaminen -------------------------------------- */
  /* Kun kävijä klikkaa FI tai EN, valinta talletetaan ja juurisivun
     automaattinen kieliohjaus noudattaa sitä jatkossa. Kirjoitus on
     synkroninen, joten se ehtii tallentua ennen siirtymää. */

  Array.prototype.forEach.call(
    document.querySelectorAll(".lang a[hreflang]"),
    function (a) {
      a.addEventListener("click", function () {
        try { localStorage.setItem("wille-kieli", a.getAttribute("hreflang")); }
        catch (e) {}
      });
    }
  );

  /* --- 5. Vuosiluku alatunnisteeseen ------------------------------------ */

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
