/* Dreamer RV – desktop mega menu (image cards)
   - Moves each panel to <body> (the header pill has overflow:hidden, which
     would clip it) and positions it under the pill.
   - Opens on hover (with a small delay), keyboard focus, or first tap on
     touch screens. Esc closes. Tab order flows Shop -> cards -> next menu item.
   - Panel content comes from the "Mega menu" section in the Header group.
   - Theme editor: selecting the section or a card opens the panel. */
(function () {
  'use strict';

  var DESKTOP = window.matchMedia('(min-width: 1001px)');
  var OPEN_DELAY = 80;
  var CLOSE_DELAY = 220;
  var GAP = 8;
  var menus = [];

  function headerEl() {
    return document.querySelector('#header-outer') || document.querySelector('.shopify-section-header');
  }

  function focusables(root) {
    return Array.prototype.slice.call(
      root.querySelectorAll('a[href]:not([tabindex="-1"]), button:not([disabled])')
    );
  }

  function position(panel) {
    var h = headerEl();
    if (!h) return;
    var r = h.getBoundingClientRect();
    panel.style.setProperty('--drv-mega-top', Math.round(r.bottom + GAP) + 'px');
    panel.style.setProperty('--drv-mega-left', Math.round(r.left) + 'px');
    panel.style.setProperty('--drv-mega-width', Math.round(r.width) + 'px');
  }

  function findTrigger(title) {
    var key = (title || '').trim().toLowerCase();
    if (!key) return null;
    var links = document.querySelectorAll('#nav-bar ul[data-type="horizontal-nav"] > li > a');
    for (var i = 0; i < links.length; i++) {
      if (links[i].textContent.trim().toLowerCase() === key) return links[i];
    }
    return null;
  }

  function Menu(panel) {
    this.panel = panel;
    this.trigger = findTrigger(panel.getAttribute('data-menu-item'));
    this.item = this.trigger ? this.trigger.parentElement : null;
    this.timer = null;
    this.isOpen = false;
    if (!this.trigger) return;

    // Hide the theme's own dropdown for this item (if it has child links)
    this.item.classList.add('drv-mega-item');
    this.trigger.classList.add('drv-mega-trigger');
    this.trigger.setAttribute('aria-haspopup', 'true');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.setAttribute('aria-controls', panel.id);

    document.body.appendChild(this.panel);
    this.bind();
  }

  Menu.prototype.open = function () {
    if (!DESKTOP.matches || this.isOpen) return;
    menus.forEach(function (m) { if (m !== this) m.close(); }, this);
    position(this.panel);
    this.panel.hidden = false;
    // next frame so the transition runs
    var panel = this.panel;
    requestAnimationFrame(function () { panel.classList.add('is-open'); });
    this.trigger.setAttribute('aria-expanded', 'true');
    this.item.classList.add('drv-mega-open');
    this.isOpen = true;
  };

  Menu.prototype.close = function () {
    clearTimeout(this.timer);
    if (!this.isOpen) return;
    this.panel.classList.remove('is-open');
    this.panel.hidden = true;
    this.trigger.setAttribute('aria-expanded', 'false');
    this.item.classList.remove('drv-mega-open');
    this.isOpen = false;
  };

  Menu.prototype.later = function (fn, delay) {
    var self = this;
    clearTimeout(this.timer);
    this.timer = setTimeout(function () { fn.call(self); }, delay);
  };

  Menu.prototype.nextNavLink = function () {
    var li = this.item.nextElementSibling;
    while (li) {
      var a = li.querySelector('a[href]');
      if (a && a.offsetParent !== null) return a;
      li = li.nextElementSibling;
    }
    return null;
  };

  Menu.prototype.bind = function () {
    var self = this;
    var lastPointer = 'mouse';

    // Hover (mouse only) – trigger and panel share one open/close timer
    [this.item, this.panel].forEach(function (el) {
      el.addEventListener('pointerenter', function (e) {
        if (e.pointerType !== 'mouse') return;
        self.later(self.open, self.isOpen ? 0 : OPEN_DELAY);
      });
      el.addEventListener('pointerleave', function (e) {
        if (e.pointerType !== 'mouse') return;
        self.later(self.close, CLOSE_DELAY);
      });
    });

    // Touch / pen: first tap opens, second tap follows the link
    this.trigger.addEventListener('pointerdown', function (e) { lastPointer = e.pointerType; });
    this.trigger.addEventListener('click', function (e) {
      if (!DESKTOP.matches) return;
      if (lastPointer !== 'mouse' && !self.isOpen) {
        e.preventDefault();
        self.open();
      }
      lastPointer = 'mouse';
    });

    // Keyboard
    this.trigger.addEventListener('focus', function () {
      if (self.skipFocusOpen) { self.skipFocusOpen = false; return; }
      self.open();
    });
    this.trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey && self.isOpen)) {
        var first = focusables(self.panel)[0];
        if (first) {
          e.preventDefault();
          self.open();
          first.focus();
        }
      } else if (e.key === 'Tab' && e.shiftKey) {
        self.close();
      } else if (e.key === 'Escape') {
        self.close();
      }
    });

    this.panel.addEventListener('keydown', function (e) {
      var items = focusables(self.panel);
      if (e.key === 'Escape') {
        e.preventDefault();
        self.close();
        self.skipFocusOpen = true;
        self.trigger.focus();
      } else if (e.key === 'Tab') {
        var i = items.indexOf(document.activeElement);
        if (e.shiftKey && i === 0) {
          e.preventDefault();
          self.trigger.focus();
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault();
          self.close();
          var next = self.nextNavLink();
          if (next) next.focus();
        }
      }
    });

    this.panel.addEventListener('focusout', function (e) {
      var to = e.relatedTarget;
      if (to && !self.panel.contains(to) && to !== self.trigger) self.close();
    });
  };

  function init() {
    // Header re-rendered in the theme editor: rebuild menus whose trigger is gone
    menus = menus.filter(function (m) {
      if (document.contains(m.trigger)) return true;
      m.close();
      var fresh = m.panel.cloneNode(true); // drops old listeners
      fresh.__drvMega = false;
      m.panel.parentNode && m.panel.parentNode.replaceChild(fresh, m.panel);
      return false;
    });

    document.querySelectorAll('[data-drv-mega-panel]').forEach(function (panel) {
      if (panel.__drvMega) return;
      // Section re-rendered: remove the older copy of this panel
      menus = menus.filter(function (m) {
        if (m.panel !== panel && m.panel.id === panel.id) {
          m.close();
          if (m.panel.parentNode) m.panel.parentNode.removeChild(m.panel);
          return false;
        }
        return true;
      });
      panel.__drvMega = true;
      var m = new Menu(panel);
      if (m.trigger) menus.push(m);
    });
  }

  function closeAll() { menus.forEach(function (m) { m.close(); }); }

  function reposition() {
    menus.forEach(function (m) { if (m.isOpen) position(m.panel); });
  }

  var ticking = false;
  function onScrollResize() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; reposition(); });
  }

  document.addEventListener('click', function (e) {
    if (!menus.some(function (m) { return m.item.contains(e.target) || m.panel.contains(e.target); })) {
      closeAll();
    }
  });
  window.addEventListener('scroll', onScrollResize, { passive: true });
  window.addEventListener('resize', onScrollResize);
  DESKTOP.addEventListener && DESKTOP.addEventListener('change', closeAll);

  // Theme editor support
  document.addEventListener('shopify:section:load', function () { init(); });
  document.addEventListener('shopify:section:unload', function (e) {
    menus = menus.filter(function (m) {
      if (e.target.contains(m.panel) || m.panel.id === 'drv-mega-' + e.detail.sectionId) {
        m.close();
        if (m.panel.parentNode) m.panel.parentNode.removeChild(m.panel);
        return false;
      }
      return true;
    });
  });
  document.addEventListener('shopify:section:select', function (e) {
    menus.forEach(function (m) { if (m.panel.id === 'drv-mega-' + e.detail.sectionId) m.open(); });
  });
  document.addEventListener('shopify:section:deselect', function (e) {
    menus.forEach(function (m) { if (m.panel.id === 'drv-mega-' + e.detail.sectionId) m.close(); });
  });
  document.addEventListener('shopify:block:select', function (e) {
    var card = e.target.closest && e.target.closest('.drv-mega__card');
    if (!card) return;
    init();
    menus.forEach(function (m) { if (m.panel.contains(card)) m.open(); });
  });
  document.addEventListener('shopify:block:deselect', function (e) {
    if (e.target.closest && e.target.closest('.drv-mega__card')) closeAll();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); });
  } else {
    init();
  }
})();
