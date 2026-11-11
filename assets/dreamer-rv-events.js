/* Dreamer RV - Events section
   Client-side state filtering for the tab row. No page reload, no
   network request - just shows/hides each .drv-events__item based on
   its data-state attribute versus the clicked tab's data-state.
*/
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.drv-events').forEach(function (section) {
    var tabsWrap = section.querySelector('[data-drv-events-tabs]');
    var list = section.querySelector('[data-drv-events-list]');
    var emptyMessage = section.querySelector('[data-drv-events-empty]');
    if (!tabsWrap || !list) return;

    var tabs = tabsWrap.querySelectorAll('[data-drv-events-tab]');
    var items = list.querySelectorAll('[data-drv-events-item]');

    tabsWrap.addEventListener('click', function (event) {
      var tab = event.target.closest('[data-drv-events-tab]');
      if (!tab) return;

      var state = tab.getAttribute('data-state');

      tabs.forEach(function (t) {
        var isActive = t === tab;
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      var visibleCount = 0;
      items.forEach(function (item) {
        var matches = state === 'all' || item.getAttribute('data-state') === state;
        item.hidden = !matches;
        if (matches) visibleCount += 1;
      });

      if (emptyMessage) {
        emptyMessage.hidden = visibleCount > 0;
      }
    });
  });
});