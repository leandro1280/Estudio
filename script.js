/* script.js */
(() => {
    'use strict';
  
    document.addEventListener('DOMContentLoaded', () => {
      // -----------------------------
      // Bootstrap ScrollSpy
      // -----------------------------
      const scrollSpy = bootstrap.ScrollSpy.getOrCreateInstance(document.body, {
        target: '.navbar',
        offset: 80
      });
  
      // Refrescar ScrollSpy después de que carguen las imágenes (evita cálculos erróneos)
      window.addEventListener('load', () => {
        try { scrollSpy.refresh(); } catch (_) {}
      });
  
      // -----------------------------
      // Colapso del menú en mobile al hacer click en un enlace
      // -----------------------------
      const navbarCollapseEl = document.getElementById('navbarNav');
      const bsCollapse = navbarCollapseEl
        ? bootstrap.Collapse.getOrCreateInstance(navbarCollapseEl, { toggle: false })
        : null;
  
      document.querySelectorAll('.navbar a.nav-link, .navbar .btn').forEach(a => {
        a.addEventListener('click', () => {
          if (!bsCollapse) return;
          // Si el menú está abierto (en mobile), lo cerramos
          if (navbarCollapseEl.classList.contains('show')) {
            bsCollapse.hide();
          }
        });
      });
  
      // -----------------------------
      // Utilidad: obtener número de WhatsApp desde el botón flotante
      // (para no hardcodear el número en varios lugares)
      // -----------------------------
      function extractWhatsAppNumber() {
        const waBtn = document.querySelector('.whatsapp-btn');
        if (!waBtn) return null;
  
        try {
          const href = new URL(waBtn.getAttribute('href'), window.location.href);
          // href.pathname suele ser: /5491112345678  (en https://wa.me/5491112345678)
          const path = href.pathname.replace(/^\//, '');
          const digits = path.replace(/\D/g, '');
          return digits.length >= 8 ? digits : null;
        } catch {
          return null;
        }
      }
  
      const WA_NUMBER = extractWhatsAppNumber() || '5491112345678'; // fallback
  
      // -----------------------------
      // Formulario -> abrir WhatsApp con mensaje
      // -----------------------------
      const form = document.getElementById('contactForm');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
  
          // Validación nativa HTML5
          if (!form.checkValidity()) {
            form.reportValidity();
            return;
          }
  
          const nombre   = (document.getElementById('nombre')?.value || '').trim();
          const email    = (document.getElementById('email')?.value || '').trim();
          const telefono = (document.getElementById('telefono')?.value || '').trim();
          const asuntoEl = document.getElementById('asunto');
          const asunto   = (asuntoEl?.value || '').trim();
          const asuntoTxt = asuntoEl?.selectedOptions?.[0]?.text?.trim() || asunto || 'Consulta';
          const mensaje  = (document.getElementById('mensaje')?.value || '').trim();
  
          // Construimos texto legible (con saltos de línea)
          const lines = [
            `Hola, soy ${nombre}.`,
            `Asunto: ${asuntoTxt}.`,
            `Mensaje: ${mensaje}`
          ];
  
          if (email)    lines.push(`Email: ${email}`);
          if (telefono) lines.push(`Tel: ${telefono}`);
  
          const text = lines.join('\n');
  
          // URL de WhatsApp
          const waURL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  
          // Intentamos abrir en nueva pestaña; si el navegador lo bloquea, redirigimos en la misma
          const opened = window.open(waURL, '_blank', 'noopener');
          if (!opened) {
            window.location.href = waURL;
          }
        });
      }
  
      // -----------------------------
      // Enlaces internos con ancla: mejora sutil de UX
      // (CSS ya tiene scroll-behavior: smooth; esto sólo asegura foco accesible)
      // -----------------------------
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (ev) => {
          const hash = link.getAttribute('href');
          if (!hash || hash === '#') return; // dejamos pasar
          const target = document.querySelector(hash);
          if (!target) return;
          // Evitamos interferir con el comportamiento por defecto de los navegadores
          // sólo añadimos foco cuando termina el scroll
          setTimeout(() => {
            try { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); } catch (_) {}
          }, 300);
        });
      });
    });

    // Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
  // Smooth scrolling para enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              // Altura del navbar para calcular el desplazamiento correcto
              const navHeight = document.querySelector('.navbar').offsetHeight || 76;
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
              
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Colapso del menú en mobile al hacer click en un enlace
  const navbarCollapseEl = document.getElementById('navbarNav');
  const bsCollapse = new bootstrap.Collapse(navbarCollapseEl, {
      toggle: false
  });

  document.querySelectorAll('#navbarNav .nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
          if (navbarCollapseEl.classList.contains('show')) {
              bsCollapse.hide();
          }
      });
  });

});
  })();
  