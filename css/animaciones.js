/*
     * ── JAVASCRIPT: LÓGICA DE ACTIVACIÓN ──────────────────────
     *
     * Objetivo: animar los items de la lista UNO POR UNO
     * cuando el usuario hace scroll y la lista entra en pantalla.
     *
     * Herramienta: IntersectionObserver
     *   → Vigila si un elemento entra al viewport (área visible).
     *   → Más eficiente que escuchar el evento "scroll" directo.
     */
 
    /* PASO 1 — Crear el Observer
       threshold: 0.1 → se activa cuando el 10% de la lista
       ya es visible en pantalla (no hay que hacer scroll
       hasta el final del elemento para que dispare).        */
const ioStagger = new IntersectionObserver((entries) => {
 
    entries.forEach((entry) => {
 
        /* PASO 2 — Verificar si el elemento está entrando
           (no saliendo) del viewport.                       */
    if (entry.isIntersecting) {
 
          /* PASO 3 — Seleccionar todos los items dentro
             del contenedor observado.                       */
        const items = entry.target.querySelectorAll(
        '.stagger-item, .reveal-stagger'
        );
 
          /* PASO 4 — Añadir .visible a cada item con delay escalonado.
             
             El truco del stagger está en: i * 100
               - Item 0 → aparece a los   0ms (inmediato)
               - Item 1 → aparece a los 100ms
               - Item 2 → aparece a los 200ms
               - Item 3 → aparece a los 300ms
             
             El CSS transiciona automáticamente al detectar
             la clase .visible: opacity 0→1 y translateX→0  */
        items.forEach((item, i) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, i * 100); /* ← cambia 100 para hacer el stagger más lento o rápido */
        });
 
          /* PASO 5 — Dejar de observar el elemento.
             La animación solo debe ocurrir UNA vez.
             Sin esto, volvería a animarse cada vez que
             el usuario hace scroll hacia arriba y abajo.   */
        ioStagger.unobserve(entry.target);
    }
    });
 
}, { threshold: 0.1 });
 
    /* PASO 6 — Registrar qué elementos deben ser observados.
       Aquí buscamos la lista por su clase .stagger-list
       y le decimos al Observer que la vigile.              */
document.querySelectorAll('.stagger-list').forEach((el) => {
    ioStagger.observe(el);
});

/*text area*/
const textarea = document.querySelector('textarea');

textarea.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
});