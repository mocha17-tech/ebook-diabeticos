/* ===== DULCE BALANCE — Scripts ===== */

document.addEventListener('DOMContentLoaded', function () {
  initReveal();
  initFaq();
  initCountUp();
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
