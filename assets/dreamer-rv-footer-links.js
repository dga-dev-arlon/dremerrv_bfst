/*
  Dreamer RV - Footer links accordion
  ------------------------------------------------------------------
  Each column's heading is a plain div with role="button"
  (dreamer-rv-footer-links.liquid) - not a real <button>, since that
  was picking up the theme's own generic button/disclosure styling and
  behaviour. Clicking (or pressing Enter/Space, since a div isn't
  natively keyboard-operable like a button) toggles the column open or
  closed.

  Collapsing is done by animating max-height directly (measured here
  from the list's real scrollHeight) rather than the CSS-only
  grid-template-rows 0fr/1fr trick, which left a sliver of the first
  link visible on every closed column instead of fully hiding it.
*/
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.drv-footer-links__column').forEach(function (column) {
    var trigger = column.querySelector('.drv-footer-links__heading');
    var wrap = column.querySelector('.drv-footer-links__list-wrap');
    var list = column.querySelector('.drv-footer-links__list');
    if (!trigger || !wrap || !list) return;

    function setOpen(isOpen) {
      column.classList.toggle('is-open', isOpen);
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      wrap.style.maxHeight = isOpen ? list.scrollHeight + 'px' : '0px';
    }

    function toggle() {
      setOpen(!column.classList.contains('is-open'));
    }

    trigger.addEventListener('click', toggle);

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggle();
      }
    });

    /* If the window resizes while a column is open (e.g. text reflows
       at a different width), re-measure so it doesn't clip or leave a
       gap. */
    window.addEventListener('resize', function () {
      if (column.classList.contains('is-open')) {
        wrap.style.maxHeight = list.scrollHeight + 'px';
      }
    });
  });
});