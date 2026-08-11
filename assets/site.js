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

  /* --- 3. Heron animaatio ------------------------------------------------ */
  /* Pinottu alfavideo: yläpuolisko väri, alapuolisko läpinäkyvyys.
     WebGL yhdistää ne kankaalle. Ks. style.css kohta 22. */

  (function () {
    var kehys = document.querySelector(".hero-figure--anim");
    if (!kehys || reduced) return;

    var kangas = kehys.querySelector(".hero-canvas");
    var video  = kehys.querySelector(".hero-video");
    if (!kangas || !video) return;

    var gl = kangas.getContext("webgl", { premultipliedAlpha: false, alpha: true });
    if (!gl) return;   /* varakuva jää näkyviin */

    function kaanna(tyyppi, lahde) {
      var s = gl.createShader(tyyppi);
      gl.shaderSource(s, lahde);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }

    var vs = kaanna(gl.VERTEX_SHADER,
      "attribute vec2 p;varying vec2 t;" +
      "void main(){t=vec2((p.x+1.0)*0.5,(1.0-p.y)*0.5);" +
      "gl_Position=vec4(p,0.0,1.0);}");

    /* Yläpuolisko = väri, alapuolisko = alfa kirkkautena. */
    var fs = kaanna(gl.FRAGMENT_SHADER,
      "precision mediump float;uniform sampler2D u;varying vec2 t;" +
      "void main(){vec4 c=texture2D(u,vec2(t.x,t.y*0.5));" +
      "float a=texture2D(u,vec2(t.x,0.5+t.y*0.5)).r;" +
      "gl_FragColor=vec4(c.rgb,a);}");

    if (!vs || !fs) return;

    var ohjelma = gl.createProgram();
    gl.attachShader(ohjelma, vs);
    gl.attachShader(ohjelma, fs);
    gl.linkProgram(ohjelma);
    if (!gl.getProgramParameter(ohjelma, gl.LINK_STATUS)) return;
    gl.useProgram(ohjelma);

    var puskuri = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, puskuri);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    var sijainti = gl.getAttribLocation(ohjelma, "p");
    gl.enableVertexAttribArray(sijainti);
    gl.vertexAttribPointer(sijainti, 2, gl.FLOAT, false, 0, 0);

    var tekstuuri = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tekstuuri);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.clearColor(0, 0, 0, 0);

    function piirra() {
      if (video.readyState >= 2) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        if (!kehys.classList.contains("on")) kehys.classList.add("on");
      }
      requestAnimationFrame(piirra);
    }

    video.addEventListener("loadeddata", function () {
      var toisto = video.play();
      if (toisto && toisto.catch) toisto.catch(function () {});
      requestAnimationFrame(piirra);
    });

    if (video.readyState >= 2) video.dispatchEvent(new Event("loadeddata"));
  })();

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
