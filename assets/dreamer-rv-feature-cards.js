/*
  Dreamer RV — Feature cards slider
  ------------------------------------------------------------------
  Drives the prev/next arrows and progress bar for each
  .drv-feature-cards section's horizontally-scrolling card row.

  Hides the whole nav (progress bar + arrows) whenever a section's
  cards all fit in view and there's nothing to scroll to - e.g. a
  4-card row on a wide enough screen. Without this, the arrows stayed
  visible (and technically clickable) even when the row had only a
  few stray pixels of "scroll" left in it from sub-pixel/gap
  rounding, which isn't a real extra card and just looked like a
  broken/pointless control. Re-checked on resize, since whether a
  given section's cards overflow depends on viewport width and the
  same section can need arrows on mobile while not needing them on
  desktop.
*/
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".drv-feature-cards").forEach(function (section) {
    var row = section.querySelector("[data-drv-fc-row]"),
      prevBtn = section.querySelector("[data-drv-fc-prev]"),
      nextBtn = section.querySelector("[data-drv-fc-next]"),
      progressBar = section.querySelector("[data-drv-fc-progress]"),
      nav = section.querySelector(".drv-feature-cards__nav");
    if (!row || !prevBtn || !nextBtn) return;

    function scrollAmount() {
      var card = row.querySelector(".drv-feature-cards__card");
      if (!card) return row.clientWidth;
      var style = window.getComputedStyle(row),
        gap = parseFloat(style.columnGap || style.gap || 0);
      return card.getBoundingClientRect().width + gap;
    }

    function updateArrowState() {
      var maxScroll = row.scrollWidth - row.clientWidth - 1;
      prevBtn.disabled = row.scrollLeft <= 0;
      nextBtn.disabled = row.scrollLeft >= maxScroll;
    }

    function updateProgress() {
      if (!progressBar) return;
      var maxScroll = row.scrollWidth - row.clientWidth;
      if (maxScroll <= 0) {
        progressBar.style.width = "100%";
        progressBar.style.transform = "translateX(0)";
        return;
      }
      var visibleRatio = Math.min(row.clientWidth / row.scrollWidth, 1),
        progressTrack = progressBar.parentElement,
        trackPx = progressTrack ? progressTrack.clientWidth : row.clientWidth,
        barWidthPx = Math.max(visibleRatio * trackPx, 24),
        scrollRatio = row.scrollLeft / maxScroll,
        travelPx = trackPx - barWidthPx;
      progressBar.style.width = barWidthPx + "px";
      progressBar.style.transform = "translateX(" + scrollRatio * travelPx + "px)";
    }

    /* A few px of "overflow" here is just sub-pixel/gap rounding, not
       a real extra card to scroll to - 16px comfortably absorbs that
       noise while still catching genuine overflow, which in practice
       is at least a full card width (well over 100px). */
    function updateNavVisibility() {
      if (!nav) return;
      var maxScroll = row.scrollWidth - row.clientWidth;
      nav.style.display = maxScroll > 16 ? "" : "none";
    }

    prevBtn.addEventListener("click", function () {
      row.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });
    nextBtn.addEventListener("click", function () {
      row.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });

    function updateAll() {
      updateArrowState();
      updateProgress();
      updateNavVisibility();
    }

    row.addEventListener("scroll", updateAll, { passive: true });
    window.addEventListener("resize", updateAll);
    updateAll();
  });
});