(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // ScrollSpy
    const scrollSpy = bootstrap.ScrollSpy.getOrCreateInstance(document.body, {
      target: '.navbar',
      offset: 80
    });
    window.addEventListener('load', () => {
      try { scrollSpy.refresh(); } catch (_) {}
    });

    // Cerrar menú móvil al hacer click en un enlace
    const navbarCollapseEl = document.getElementById('navbarNav');
    const bsCollapse = navbarCollapseEl
      ? bootstrap.Collapse.getOrCreateInstance(navbarCollapseEl, { toggle: false })
      : null;

    document.querySelectorAll('#navbarNav .nav-link, .navbar .btn').forEach(link => {
      link.addEventListener('click', () => {
        if (bsCollapse && navbarCollapseEl.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });

    // Accesibilidad: foco tras scroll a ancla (sin cambiar el smooth nativo del CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const hash = anchor.getAttribute('href');
        if (!hash || hash === '#') return;
        const target = document.querySelector(hash);
        if (!target) return;
        setTimeout(() => {
          try { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); } catch (_) {}
        }, 300);
      });
    });
  });
})();
