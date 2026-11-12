(() => {
  'use strict';

  // One controller per page, even if the asset is loaded again.
  const key = '__drvAnnouncementPoll';
  window[key]?.destroy();

  const selector =
    '.announcement-message[data-announcement-id="text_kbgiYD"]';

  const interval = 30_000;
  let timer = null;
  let controller = null;
  let stopped = false;
  let checkAgain = false;

  function schedule() {
    clearTimeout(timer);

    if (!stopped && !document.hidden) {
      timer = setTimeout(check, interval);
    }
  }

  async function check() {
    clearTimeout(timer);

    if (stopped || document.hidden) return;

    if (controller) {
      checkAgain = true;
      return;
    }

    const current = document.querySelector(selector);
    const section = current?.closest(
      '.shopify-section-announcement-bar-container[id^="shopify-section-"]'
    );

    if (!current || !section) {
      schedule();
      return;
    }

    // Read the real rendered section ID, including section-group IDs.
    const sectionId = section.id.slice('shopify-section-'.length);

    // Preserve host, locale path, query parameters and preview context.
    // Also works through the Shopify CLI's local preview origin.
    const url = new URL(window.location.href);
    url.hash = '';
    url.searchParams.delete('sections');
    url.searchParams.set('section_id', sectionId);

    controller = new AbortController();
    const activeController = controller;
    const timeout = setTimeout(() => activeController.abort(), 15_000);

    try {
      const response = await fetch(url.toString(), {
        credentials: 'same-origin',
        cache: 'no-store',
        signal: activeController.signal
      });

      if (!response.ok) {
        throw new Error(`Section request failed: ${response.status}`);
      }

      const html = await response.text();
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const freshSection = parsed.getElementById(section.id);
      const freshMessage = freshSection?.querySelector(selector);

      // A missing section/message must never clear the existing message.
      if (!freshMessage || stopped || !section.isConnected) return;

      let changed = false;

      // Update matching copies within this section, including slider clones.
      section.querySelectorAll(selector).forEach((message) => {
        if (message.innerHTML !== freshMessage.innerHTML) {
          message.innerHTML = freshMessage.innerHTML;
          changed = true;
        }
      });

      if (changed) {
        // Retain the existing Swiper instance and current slide.
        const slider = section.querySelector(
          '.shopify-section-announcement-bar'
        );
        const swiper = slider?.swiper;

        if (swiper && !swiper.destroyed) {
          swiper.updateAutoHeight(0);
        }

        // Let existing theme layout/offset listeners remeasure.
        window.dispatchEvent(new Event('resize'));
      }
    } catch (error) {
      // Network errors, timeouts and rendering failures leave the DOM intact.
      if (!stopped) {
        console.debug('[DRV announcement] Update skipped:', error);
      }
    } finally {
      clearTimeout(timeout);
      controller = null;

      if (checkAgain && !stopped && !document.hidden) {
        checkAgain = false;
        void check();
      } else {
        checkAgain = false;
        schedule();
      }
    }
  }

  function resume() {
    if (!document.hidden) void check();
  }

  function visibilityChanged() {
    if (document.hidden) {
      clearTimeout(timer);
    } else {
      resume();
    }
  }

  function sectionLoaded(event) {
    if (event.target?.querySelector?.(selector)) resume();
  }

  function destroy() {
    stopped = true;
    clearTimeout(timer);
    controller?.abort();

    document.removeEventListener('visibilitychange', visibilityChanged);
    document.removeEventListener('shopify:section:load', sectionLoaded);
    window.removeEventListener('pageshow', resume);
    window.removeEventListener('online', resume);
  }

  window[key] = { destroy };

  document.addEventListener('visibilitychange', visibilityChanged);
  document.addEventListener('shopify:section:load', sectionLoaded);
  window.addEventListener('pageshow', resume);
  window.addEventListener('online', resume);

  void check();
})();