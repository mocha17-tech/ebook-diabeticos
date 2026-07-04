/* ===== DULCE BALANCE — Scripts ===== */

document.addEventListener('DOMContentLoaded', function () {
  initReveal();
  initFaq();
  initCountUp();
  initCountdown();
});

/* === Reveal al hacer scroll === */
function initReveal() {
  const elementos = document.querySelectorAll('.db-reveal');
  if (!elementos.length) return;

  const obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('db-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elementos.forEach(function (el) { obs.observe(el); });
}

/* === FAQ acordeón === */
function initFaq() {
  const items = document.querySelectorAll('.db-faq-item');
  if (!items.length) return;

  items.forEach(function (item) {
    const btn = item.querySelector('.db-faq-item__pregunta');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const estaAbierto = item.classList.contains('db-abierto');
      items.forEach(function (i) { i.classList.remove('db-abierto'); });
      if (!estaAbierto) item.classList.add('db-abierto');
    });
  });
}

/* === Count-up animado para cifras === */
function initCountUp() {
  const nums = document.querySelectorAll('[data-countup]');
  if (!nums.length) return;

  const obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.countup, 10);
        const duracion = 1800;
        const inicio = performance.now();

        function frame(ahora) {
          const progreso = Math.min((ahora - inicio) / duracion, 1);
          const eased = 1 - Math.pow(1 - progreso, 3);
          el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '');
          if (progreso < 1) requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
        obs.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  nums.forEach(function (el) { obs.observe(el); });
}

/* === Countdown evergreen 24hs === */
function initCountdown() {
  var el = document.getElementById('db-countdown');
  if (!el) return;

  var KEY = 'db_countdown_expiry';
  var DURACION = 24 * 60 * 60 * 1000; // 24 horas en ms

  var expiry = parseInt(localStorage.getItem(KEY) || '0', 10);
  var ahora = Date.now();

  if (!expiry || ahora >= expiry) {
    expiry = ahora + DURACION;
    localStorage.setItem(KEY, String(expiry));
  }

  var hh = el.querySelector('[data-cd="hh"]');
  var mm = el.querySelector('[data-cd="mm"]');
  var ss = el.querySelector('[data-cd="ss"]');

  function actualizar() {
    var restante = Math.max(0, expiry - Date.now());

    if (restante === 0) {
      expiry = Date.now() + DURACION;
      localStorage.setItem(KEY, String(expiry));
      restante = DURACION;
    }

    var h = Math.floor(restante / 3600000);
    var m = Math.floor((restante % 3600000) / 60000);
    var s = Math.floor((restante % 60000) / 1000);

    if (hh) hh.textContent = String(h).padStart(2, '0');
    if (mm) mm.textContent = String(m).padStart(2, '0');
    if (ss) ss.textContent = String(s).padStart(2, '0');
  }

  actualizar();
  setInterval(actualizar, 1000);
}
