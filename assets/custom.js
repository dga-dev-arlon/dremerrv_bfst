if (typeof html_tag == undefined) {
	let html_tag = document.documentElement
} else {
	html_tag = document.documentElement
}
if (typeof root_styles == undefined) {
	let root_styles = document.querySelector(':root')
} else {
	root_styles = document.querySelector(':root')
}
if (typeof top_id == undefined) {
	let top_id = document.querySelector('.shopify-section-header')
} else {
	top_id = document.querySelector('.shopify-section-header')
}
let nav_top_id = document.querySelector('#nav-top');
if (typeof header_outer == undefined) {
	let header_outer = document.querySelector('#header-outer')
} else {
	header_outer = document.querySelector('#header-outer')
}
if (header_outer) {
	let header_id = header_outer.querySelector('#header');
}
let header_id;
if (header_outer) {
	header_id = header_outer.querySelector('#header') ? header_outer.querySelector('#header') : null;
}
if (typeof header_inner == undefined) {
	let header_inner = document.querySelector('#header-inner')
} else {
	header_inner = document.querySelector('#header-inner')
}
let logo_id = document.querySelector('#logo');
let logo_img;
if (logo_id) {
	logo_img = logo_id.querySelector('img') ? logo_id.querySelector('img') : null;
}
let search_id = document.querySelector('#search');
let nav_outer = document.querySelector('#nav-outer');
let nav_bar_id = document.querySelector('#nav-bar');
let nav_id = document.querySelector('#nav');
if (typeof content_id == undefined) {
	let content_id = document.getElementById('content')
} else {
	content_id = document.getElementById('content')
}

let html_width = html_tag.getBoundingClientRect().width;
let nav_main = nav_bar_id ?? nav_id;

const viewportWidth = window.innerWidth;

const asyncOnce = {
	once: true
};
const asyncPass = {
	passive: true,
	once: true
};



// Returns the current HTML theme if it's in the allowed list.
const getHtmlTheme = (themes = ['xclusive', 'xtra']) => {
	const theme = html_tag.dataset.theme ? html_tag.dataset.theme.toLowerCase() : null;
	return theme && themes.includes(theme) ? theme : null;
};


// Returns a filepath from window.filepaths by key, or falls back to the local path.
function fp(localPath, key) {
	return (window.filepaths && window.filepaths[key]) || localPath;
}

let global_dir;
if (html_tag.getAttribute('dir') === 'rtl') {
	global_dir = ['rtl', false];
} else {
	global_dir = ['ltr', true];
}

function isTouchDevice() {
	return window.matchMedia("(pointer: coarse)").matches;
}

const isMobile = window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

// Stacks cart accelerated checkout buttons on narrow mobile viewports to prevent wallet branding from being compressed.
const acceleratedCheckoutMobile = window.matchMedia('(max-width: 560px)');
const acceleratedCheckoutVerticalClass = 'additional-checkout-buttons--vertical';

function updateAcceleratedCheckoutLayout() {
	const containers = document.querySelectorAll('[data-accelerated-checkout-cart]');

	for (const container of containers) {
		container.classList.toggle(acceleratedCheckoutVerticalClass, acceleratedCheckoutMobile.matches);
	}
}

window.updateAcceleratedCheckoutLayout = updateAcceleratedCheckoutLayout;
updateAcceleratedCheckoutLayout();

if (typeof acceleratedCheckoutMobile.addEventListener === 'function') {
	acceleratedCheckoutMobile.addEventListener('change', updateAcceleratedCheckoutLayout);
} else {
	acceleratedCheckoutMobile.addListener(updateAcceleratedCheckoutLayout);
}

document.addEventListener('shopify:section:load', updateAcceleratedCheckoutLayout);

var listCollectionSliderEvt = new CustomEvent("listCollectionSlider"),
	moduleFeaturedSliderEvt = new CustomEvent("moduleFeaturedSlider"),
	listProductSliderEvt = new CustomEvent("listProductSlider"),
	listUspSliderEvt = new CustomEvent("listUspSlider"),
	listStaticSliderEvt = new CustomEvent("listStaticSlider"),
	searchClassesEvt = new CustomEvent("searchClasses"),
	moduleTabsEvt = new CustomEvent("moduleTabs"),
	formZindexEvt = new CustomEvent("formZindex"),
	ratingsEvt = new CustomEvent("ratings"),
	inputPaddingEvt = new CustomEvent("inputPadding"),
	topEvt = new CustomEvent("top"),
	backgroundEvt = new CustomEvent("background"),
	mediaFlexibleEvt = new CustomEvent("mediaFlexbile");

	function isHasSelectorSupported() {
		try {
			document.createElement('div').querySelector(':has(*)');
			return true;
		} catch {
			return false;
		}
	}
function getSiblings(el) {
	return Array.from(el.parentNode.children).filter(function (sibling) {
		return sibling !== el;
	});
}

function append_url(el, content, className, href, access) {
	const link = createElementWithClass('a', className);
	link.href = href || './';
	if (access === true) {
		link.tabIndex = -1;
		link.setAttribute('aria-hidden', 'true');
		link.setAttribute('focusable', 'false');
	}
	link.innerHTML = content;
	if (el) {
		el.appendChild(link);
	}
}

function new_css(id, href, media) {
	if (document.getElementById(id)) return;
	const link = document.createElement('link');
	media = media || 'screen';

	link.setAttribute('id', id);
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('href', href);
	link.setAttribute('media', media);

	const css = document.querySelectorAll('link[id]');
	if (css.length) {
		css[css.length - 1].after(link);
	} else {
		document.head.appendChild(link);
	}
}

function throttle(callback, delay) {
	let timeoutId;
	return function () {
		if (!timeoutId) {
			timeoutId = setTimeout(() => {
				callback();
				timeoutId = null;
			}, delay);
		}
	};
}

function customDropHeight() {
	if (nav_main) {
		const HH_req = ['.m6fr.wide-transparent', '.m6fr.size-xl', '.m6fr article.size-xl'];
		const hasHH = HH_req.some(selector => document.querySelector(selector));

		if (hasHH) {
			requestAnimationFrame(function () {
				if (header_outer && header_inner) {
					const headerHeight = header_outer.getBoundingClientRect().height + 'px';
					root_styles.style.setProperty('--header_height_static', headerHeight);
				}
				if (nav_top_id) {
					const nav_top_idHeight = nav_top_id.getBoundingClientRect().height + 'px';
					root_styles.style.setProperty('--nav_top_h', nav_top_idHeight);
				}
			});
		}
	}
}

const mediaMax1000 = window.matchMedia('(max-width: 1000px)');
const mediaMin1000 = window.matchMedia('(min-width: 1001px)');


// Schedules the callback to run when the browser is idle (using requestIdleCallback when available, falling back to a short setTimeout).
function runWhenIdle(fn) {
	if ('requestIdleCallback' in window) {
		requestIdleCallback(fn, { timeout: 2000 });
	} else {
		setTimeout(fn, 300);
	}
}


// Calculates and sets '--sticky_offset' for sticky headers, updating on scroll, resize, or user interaction, with throttling.
let stickyOffsetCalculated = false;
let stickyOffsetScheduled = false;
let stickyListenersAdded = false;

const SO_req = ['.m6pr', '[id^="section-"]', '.f8ps', '.f8sr', '.m6cl', '.m6ac'];
const requiredElementsExist = SO_req.some(sel => document.querySelector(sel));

function stickyOffset() {
	if (stickyOffsetScheduled) return;
	stickyOffsetScheduled = true;

	requestAnimationFrame(() => {
		stickyOffsetScheduled = false;

		if (stickyOffsetCalculated || !nav_main || !header_outer || !header_inner) return;
		if (!requiredElementsExist) return;

		const setStickyOffset = () => {
			const h = header_outer.getBoundingClientRect().height;
			root_styles.style.setProperty('--sticky_offset', `${h}px`);
		};

		const setNavMainOffset = () => {
			const h = nav_main.getBoundingClientRect().height;
			root_styles.style.setProperty('--sticky_offset', `${h}px`);
		};

		const updateSticky = () => {
			if (mediaMax1000.matches) {
				setStickyOffset();
			} else if (mediaMin1000.matches) {
				setNavMainOffset();
			}
		};

		if (header_inner.classList.contains('sticky-nav')) {
			html_tag.classList.add('has-sticky-nav');
			updateSticky();

			if (!stickyListenersAdded) {
				mediaMax1000.addEventListener('change', updateSticky);
				mediaMin1000.addEventListener('change', updateSticky);
				stickyListenersAdded = true;
			}
		} else {
			setStickyOffset();
		}

		stickyOffsetCalculated = true;
	});
}

if (!isMobile) {
	window.addEventListener('mousemove', stickyOffset, asyncOnce);
}
document.addEventListener('scroll', stickyOffset, asyncPass);
window.addEventListener('resize', throttle(() => {
	stickyOffsetCalculated = false;
	stickyOffset();
}, 500));


// Calculates and sets the browser scrollbar width as a CSS variable
//const SB_req = [".m6bx.wide", ".m6fr.wide", ".l4ft.fullwidth", ".l4cl.fullwidth", ".shopify-section-breadcrumbs"];
//let scrollbarWidthCalculated = false;
//
//function getScrollbarWidth() {
//	if (scrollbarWidthCalculated) return;
//
//	const htmlWidth = html_tag.getBoundingClientRect().width;
//	const scrollbarWidth = viewportWidth - htmlWidth;
//
//	root_styles.style.setProperty('--scrollbar_width', scrollbarWidth + 'px');
//	scrollbarWidthCalculated = true;
//}
//
//if (mediaMin1000.matches) {
//	if (document.readyState === 'loading') {
//		document.addEventListener('DOMContentLoaded', getScrollbarWidth);
//	} else {
//		getScrollbarWidth();
//	}
//}
//if (Shopify.designMode) {
//	window.addEventListener('resize', () => getScrollbarWidth(true));
//}

if (logo_img) {
	if (logo_img.complete) {
		customDropHeight();
	} else {
		logo_img.addEventListener('load', customDropHeight);
	}
} else {
	customDropHeight();
}

if (header_inner) {
	if (header_inner.classList.contains('mobile-visible-search')) {
		html_tag.classList.add('has-mobile-visible-search');
	}
	if (header_inner.classList.contains('t1nn')) {
		html_tag.classList.add('t1nn');
	}
}

if (content_id && header_inner) {
	const ffa = content_id.children[0];
	let ffc;
	let ffd = false;
	let ffe = false;


	if (ffa) {
		ffc = ffa.children[0];
		if (ffa.classList.contains('shopify-section') && header_inner.hasAttribute('data-transparent')) {
			ffd = true;
		}

		if (ffc && (ffc.classList.contains('m6bx') || ffc.classList.contains('m6fr')) && ffc.classList.contains('wide')) {
			ffe = true;
			ffc.classList.add('im-tr');
		}
		const announcementBar = document.querySelector('.shopify-section-header ~ [class*="shopify-section-announcement-bar"]');
		if (announcementBar) {
			ffd = false;
		}
		if (ffd && ffe && ffc && ffc.classList.contains('wide-transparent')) {
			top_id.classList.add('transparent');
			html_tag.classList.add('has-first-m6fr-wide');
			if (ffc.classList.contains('m6bx')) {
				html_tag.classList.add('has-first-m6bx-wide');
			}
		} else {
			header_inner.classList.remove('transparent');
		}
	}
}

// Initializes a Swiper slider on the given element, wrapping children as slides, setting up navigation, pagination, accessibility roles, and handling optional image overlays.
function create_slider(el, settings, minSlides) {
	const imgOverlays = [];
	let bg = false;
	const children = Array.from(el.children);
	const childrenLength = children.length;

	for (let i = 0; i < childrenLength; i++) {
		const child = children[i];
		if (child.classList.contains('img-overlay')) {
			bg = true;
			imgOverlays.push(child);
			child.remove();
		}
	}

	if (childrenLength > 1) {
		if (el.tagName.toLowerCase() === 'ul') {
			const ul = el;

			requestAnimationFrame(() => {
				ul.setAttribute('role', 'none');
				for (let i = 0; i < childrenLength; i++) {
					const li = children[i];
					li.setAttribute('role', 'none');
					li.classList.add('li');
				}
			});
		}

		minSlides = minSlides || 1;

		if (childrenLength > parseFloat(minSlides)) {
			let paginationClass = (settings && settings.pagination && settings.pagination.el) || ".swiper-pagination";
			paginationClass = paginationClass.replace(/\./g, " ").trim();

			const dots = document.createElement('span');
			dots.className = paginationClass;

			const prev = document.createElement('span');
			prev.classList.add('swiper-button-prev', 'swiper-button-nav');

			const next = document.createElement('span');
			next.classList.add('swiper-button-next', 'swiper-button-nav');

			el.classList.add('s4wi');

			requestAnimationFrame(() => {
				prev.setAttribute('role', 'navigation');
				next.setAttribute('role', 'navigation');
			});

			const slidesFragment = document.createDocumentFragment();
			for (let i = 0; i < childrenLength; i++) {
				const child = children[i];
				const wrapper = document.createElement('div');
				wrapper.classList.add('swiper-slide');
				wrapper.appendChild(child);
				slidesFragment.appendChild(wrapper);
			}

			const swiperOuter = document.createElement('div');
			swiperOuter.className = 'swiper-outer';

			const swiperWrapper = document.createElement('div');
			swiperWrapper.className = 'swiper-wrapper';
			swiperWrapper.appendChild(slidesFragment);

			swiperOuter.appendChild(swiperWrapper);

			const swiperFragment = document.createDocumentFragment();
			swiperFragment.appendChild(swiperOuter);

			// Pagination
			const pagination = document.createElement('div');
			pagination.className = 'swiper-custom-pagination';
			swiperFragment.appendChild(pagination);

			if (settings && settings.pagination) {
				settings.pagination.el = settings.pagination.el || pagination;
				pagination.append(prev, dots, createElementWithClass('span', 'swiper-custom-fraction'), next);
			} else {
				const navFragment = document.createDocumentFragment();
				navFragment.append(prev, next);
				swiperFragment.appendChild(navFragment);
			}

			el.appendChild(swiperFragment);


			// Navigation
			settings.navigation = settings.navigation || {};
			settings.navigation.prevEl = prev;
			settings.navigation.nextEl = next;

			const swiperInstance = new Swiper(swiperOuter, settings);

			requestAnimationFrame(() => {
				const paginationBullets = el.querySelectorAll('.swiper-pagination-bullet');
				for (let i = 0; i < paginationBullets.length; i++) {
					paginationBullets[i].setAttribute('role', 'navigation');
				}
			});

			return swiperInstance;
		}
	}
	if (bg) {
		requestAnimationFrame(() => {
			for (let i = 0; i < imgOverlays.length; i++) {
				const imgOverlay = imgOverlays[i];
				el.appendChild(imgOverlay);
			}
		});
	}

	return null;
}

function randomize(el) {
	el.setAttribute('data-random', Math.floor(Math.random() * 10000) + 1);
}

function clone_with_class(el, cl1, cl2) {
	const cln = el.cloneNode(true);
	cln.classList.add(cl1);
	el.after(cln);
	el.classList.add(cl2);
}

html_tag.classList.add('js');


// ensures Swiper sliders update their auto height on load, resize, and when entering viewport, skipping theme editor mode.  
function updateSliders(el) {
	if (!el.classList.contains('s4wi')) return;

	const sl_el = el.querySelector('.swiper-outer');
	if (!sl_el) return;

	function io(entries) {
		for (const entry of entries) {
			if (entry.isIntersecting && sl_el.swiper) {
				sl_el.swiper.updateAutoHeight();
			}
		}
	}

	new IntersectionObserver(io).observe(el);

	setTimeout(() => {
		if (sl_el.swiper) {
			sl_el.swiper.updateAutoHeight();
		}
	}, 300);
}



// Checks if the logo image exists and adds fallback text if it’s broken, while adjusting header classes based on logo type.
function checkIfImageExists(url, callback) {
	const img = new Image();
	img.onload = () => callback(true);
	img.onerror = () => callback(false);
	img.src = url;
}
// Assign z-indexes to form elements
function assignIndex(elements) {
	Array.from(elements).forEach((el, index) => {
		el.style.zIndex = elements.length - index;
	});
}

//Default.utils.start();
html_tag.classList.add('js');

//Default.utils.email();

//Default.utils.top();

window.addEventListener("top", function (evt) {
	if (logo_id) {
		const logo_text = logo_id.querySelectorAll('span');
		if (logo_id.parentElement.classList.contains('text-center-logo') && !header_inner.classList.contains('hide-btn')) {
			search_id.classList.add('compact');
		}
		if (logo_text.length) {
			header_inner.classList.add('logo-text');
		}
		const imgWithAlt = logo_id.querySelector('img[alt]');

		if (imgWithAlt) {
			const pt = imgWithAlt.parentNode;
			checkIfImageExists(imgWithAlt.src, exists => {
				if (!exists) {
					requestAnimationFrame(() => {
						const span = document.createElement('span');
						span.innerHTML = imgWithAlt.alt;
						pt.appendChild(span);
						pt.classList.add('broken-img');
					});
				}
			});
		}
	}

	const navOverflowDesktop = mediaMin1000;
	const navOverflowCloneMap = new WeakMap();
	let navOverflowInstances = [];
	let calcLogoOffsetScheduled = false;
	const calcLogoOffsetCallbacks = [];

	function isNavOverflowDesktop() {
		return navOverflowDesktop.matches;
	}

	function clearLogoOffset() {
		if (root_styles) {
			root_styles.style.removeProperty('--logo_offset');
		}
	}

	function isCurrentNavOverflowContext(context) {
		const currentTop = document.querySelector('.shopify-section-header');

		return context &&
			context.active &&
			context.topId &&
			context.topId === currentTop &&
			context.topId.isConnected &&
			context.headerId &&
			context.headerId.isConnected &&
			context.headerInner &&
			context.headerInner.isConnected &&
			context.topId.contains(context.headerId) &&
			context.topId.contains(context.headerInner);
	}

	function removeCalcLogoOffsetCallbacks(context) {
		for (let index = calcLogoOffsetCallbacks.length - 1; index >= 0; index--) {
			if (calcLogoOffsetCallbacks[index].context === context) {
				calcLogoOffsetCallbacks.splice(index, 1);
			}
		}
	}

	function calcLogoOffset(context, callback) {
		if (typeof callback === 'function') {
			calcLogoOffsetCallbacks.push({
				context: context,
				callback: callback
			});
		}

		if (calcLogoOffsetScheduled) return;
		calcLogoOffsetScheduled = true;

		requestAnimationFrame(() => {
			const queued = calcLogoOffsetCallbacks.splice(0);
			const results = queued.map(function (entry) {
				const currentContext = entry.context;
				let valid = true;
				let skip = false;

				if (!isCurrentNavOverflowContext(currentContext)) {
					valid = false;
					skip = true;
				} else if (!currentContext.headerInner.classList.contains('text-center-logo')) {
					clearLogoOffset();
				} else if (!currentContext.logoId || !currentContext.logoId.isConnected || !currentContext.topId.contains(currentContext.logoId)) {
					clearLogoOffset();
					valid = false;
				} else {
					const headerRect = currentContext.headerId.getBoundingClientRect();
					const logoRect = currentContext.logoId.getBoundingClientRect();
					const logoOffset = global_dir[1] === false ?
						headerRect.right - logoRect.right :
						logoRect.left - headerRect.left;

					if (root_styles && Number.isFinite(headerRect.width) && headerRect.width > 0 && Number.isFinite(logoOffset) && logoOffset > 0) {
						root_styles.style.setProperty('--logo_offset', logoOffset + 'px');
					} else {
						clearLogoOffset();
						valid = false;
					}
				}

				return {
					callback: entry.callback,
					valid: valid,
					skip: skip
				};
			});

			requestAnimationFrame(() => {
				calcLogoOffsetScheduled = false;

				results.forEach(function (result) {
					if (!result.skip) {
						result.callback(result.valid);
					}
				});

				if (calcLogoOffsetCallbacks.length) {
					calcLogoOffset();
				}
			});
		});
	}

	if (nav_id && nav_id.classList.contains('no-wide')) {
		top_id.classList.add('has-no-wide');
	}

	if (nav_bar_id && nav_bar_id.classList.contains('no-wide')) {
		top_id.classList.add('has-no-wide');
	}

	var navs = document.querySelectorAll('#nav, #nav-bar');

	function checkInv(el, ratio) {
		requestAnimationFrame(() => {
			const el_rect = el.getBoundingClientRect();
			const el_off = global_dir[1] === false ?
				viewportWidth - el_rect.left - el.offsetWidth :
				el_rect.left;
	
			if (el_off > viewportWidth * ratio) {
				el.classList.add('inv');
			} else {
				el.classList.remove('inv');
			}
		});
	}

	function getDirectRegularNavItems(menuList) {
		return Array.from(menuList.children).filter(function (child) {
			return child.tagName === 'LI' &&
				!child.classList.contains('show-all') &&
				!child.classList.contains('close') &&
				!child.classList.contains('overlay-close');
		});
	}

	function getDirectShowAll(menuList) {
		const children = Array.from(menuList.children);

		for (let index = 0; index < children.length; index++) {
			if (children[index].tagName === 'LI' && children[index].classList.contains('show-all')) {
				return children[index];
			}
		}

		return null;
	}

	function setNavItemHidden(el, hidden) {
		const show = navOverflowCloneMap.get(el);
		el.classList.toggle('temp-hidden', hidden);

		if (show) {
			show.classList.toggle('temp-hidden', hidden);
		}
	}

	function commitNavOverflowState(instance, regularItems, hiddenItems, showAll, showAllVisible, useOverflowAlignment) {
		const replaceTextClass = function (original, replacement) {
			if (instance.navMain.classList.contains(original)) {
				instance.navMain.classList.remove(original);
				instance.navMain.classList.add(replacement);
			}
		};

		if (useOverflowAlignment) {
			replaceTextClass('text-center', 'have-text-center');
			replaceTextClass('text-justify', 'have-text-justify');
			replaceTextClass('text-end', 'have-text-end');
		} else {
			replaceTextClass('have-text-center', 'text-center');
			replaceTextClass('have-text-justify', 'text-justify');
			replaceTextClass('have-text-end', 'text-end');
		}

		regularItems.forEach(function (child) {
			setNavItemHidden(child, hiddenItems.indexOf(child) !== -1);
		});

		if (showAll) {
			showAll.style.display = showAllVisible ? '' : 'none';
		}
	}

	// Measures first, validates, then commits one complete desktop overflow state.
	function countNavDistF(instance) {
		if (!isNavOverflowDesktop()) return false;

		const el = instance.menuList;
		const nav = instance.navMain;
		const allChildren = getDirectRegularNavItems(el);
		const showAll = getDirectShowAll(el);

		if (!allChildren.length) return false;

		const children = allChildren.filter(function (child) {
			return child.classList.contains('temp-hidden') || getComputedStyle(child).display !== 'none';
		});

		if (!children.length) return false;

		const navRect = nav.getBoundingClientRect();
		let availableWidth = navRect.width;

		if (instance.headerId && instance.logoId && instance.headerInner && instance.headerInner.classList.contains('text-center-logo')) {
			const headerRect = instance.headerId.getBoundingClientRect();
			const logoRect = instance.logoId.getBoundingClientRect();
			const logoOffset = global_dir[1] === false ?
				headerRect.right - logoRect.right :
				logoRect.left - headerRect.left;

			if (!Number.isFinite(logoOffset) || logoOffset <= 0) return false;

			availableWidth = Math.min(availableWidth, logoOffset - 32);
		}

		if (!Number.isFinite(availableWidth) || availableWidth <= 0) return false;

		function getInlineMargin(styles, logicalProperty, ltrProperty, rtlProperty) {
			let value = parseFloat(styles[logicalProperty]);

			if (isNaN(value)) {
				value = parseFloat(styles[global_dir[1] === false ? rtlProperty : ltrProperty]);
			}

			return isNaN(value) ? 0 : value;
		}

		const listStyles = getComputedStyle(el);
		const listInlineMargins =
			getInlineMargin(listStyles, 'marginInlineStart', 'marginLeft', 'marginRight') +
			getInlineMargin(listStyles, 'marginInlineEnd', 'marginRight', 'marginLeft');
		const listInlinePadding =
			getInlineMargin(listStyles, 'paddingInlineStart', 'paddingLeft', 'paddingRight') +
			getInlineMargin(listStyles, 'paddingInlineEnd', 'paddingRight', 'paddingLeft');
		const listInlineBorders =
			getInlineMargin(listStyles, 'borderInlineStartWidth', 'borderLeftWidth', 'borderRightWidth') +
			getInlineMargin(listStyles, 'borderInlineEndWidth', 'borderRightWidth', 'borderLeftWidth');
		const listWidthAdjustment = listInlineMargins + listInlinePadding + listInlineBorders;
		const columnGap = parseFloat(listStyles.columnGap);
		const itemGap = isNaN(columnGap) ? 0 : Math.max(0, columnGap);
		const navBuffer = 10;
		availableWidth -= navBuffer;

		function getGapWidth(count) {
			return count > 1 ? itemGap * (count - 1) : 0;
		}

		function getOuterWidth(child, hiddenFallback) {
			const styles = getComputedStyle(child);
			const marginStart = getInlineMargin(styles, 'marginInlineStart', 'marginLeft', 'marginRight');
			const marginEnd = getInlineMargin(styles, 'marginInlineEnd', 'marginRight', 'marginLeft');
			let width = child.getBoundingClientRect().width;

			if (width <= 0 && child.firstElementChild) {
				width = child.firstElementChild.getBoundingClientRect().width;
			}

			if (width <= 0 && hiddenFallback) {
				const originalCssText = child.style.cssText;
				child.style.cssText += '; display: block; visibility: hidden; position: absolute; left: -9999px;';
				width = child.getBoundingClientRect().width;
				child.style.cssText = originalCssText;
			}

			return width + marginStart + marginEnd;
		}

		const itemWidths = children.map(function (child) {
			return getOuterWidth(child, true);
		});
		const regularItemsWidth = itemWidths.reduce(function (total, width) {
			return total + width;
		}, 0);
		const showAllWidth = showAll ? getOuterWidth(showAll, true) : 0;
		const firstItemWidth = itemWidths.length ? itemWidths[0] : 0;
		const invalidItemWidth = itemWidths.some(function (width) {
			return !Number.isFinite(width) || width <= 0;
		});

		if (invalidItemWidth) return false;
		if (!Number.isFinite(regularItemsWidth) || regularItemsWidth <= 0) return false;
		if (!Number.isFinite(showAllWidth) || showAllWidth <= 0) return false;
		if (availableWidth <= showAllWidth + navBuffer) return false;

		const initialWidth = regularItemsWidth + getGapWidth(children.length) + listWidthAdjustment;

		if (initialWidth <= availableWidth) {
			commitNavOverflowState(instance, allChildren, [], showAll, false, false);
			return true;
		}

		let remainingItemsWidth = regularItemsWidth;
		let remainingItemsCount = children.length;
		let requiredWidth = remainingItemsWidth + showAllWidth + getGapWidth(remainingItemsCount + (showAll ? 1 : 0)) + listWidthAdjustment;
		const hiddenItems = [];

		// Preserve the first regular item if a transient bad measurement makes the usable area implausibly small.
		for (let index = children.length - 1; index > 0 && requiredWidth > availableWidth; index--) {
			remainingItemsWidth -= itemWidths[index];
			remainingItemsCount--;
			requiredWidth = remainingItemsWidth + showAllWidth + getGapWidth(remainingItemsCount + (showAll ? 1 : 0)) + listWidthAdjustment;
			hiddenItems.push(children[index]);
		}

		if (requiredWidth > availableWidth && availableWidth <= firstItemWidth + showAllWidth + navBuffer) return false;

		commitNavOverflowState(instance, allChildren, hiddenItems, showAll, hiddenItems.length > 0, hiddenItems.length > 0);
		return true;
	}

	function getDirectMenuList(navMain) {
		const children = Array.from(navMain.children);

		for (let index = 0; index < children.length; index++) {
			if (children[index].tagName === 'UL' && children[index].hasAttribute('data-type')) {
				return children[index];
			}
		}

		return null;
	}

	function removeCloneIds(el) {
		if (el.removeAttribute) {
			el.removeAttribute('id');
		}

		Array.from(el.querySelectorAll('[id]')).forEach(function (child) {
			child.removeAttribute('id');
		});
	}

	function cleanupNavOverflowInstances() {
		navOverflowInstances.forEach(function (instance) {
			instance.cleanup();
		});
		navOverflowInstances = [];
	}

	function getNavOverflowContext(sectionRoot) {
		const currentTop = sectionRoot && sectionRoot.classList && sectionRoot.classList.contains('shopify-section-header') ?
			sectionRoot :
			sectionRoot && sectionRoot.querySelector ? sectionRoot.querySelector('.shopify-section-header') : document.querySelector('.shopify-section-header');
		const currentHeaderOuter = currentTop ? currentTop.querySelector('#header-outer') : document.querySelector('#header-outer');
		const currentHeaderId = currentHeaderOuter ? currentHeaderOuter.querySelector('#header') : null;
		const currentHeaderInner = currentTop ? currentTop.querySelector('#header-inner') : document.querySelector('#header-inner');
		const currentLogo = currentTop ? currentTop.querySelector('#logo') : document.querySelector('#logo');

		return {
			topId: currentTop,
			headerOuter: currentHeaderOuter,
			headerId: currentHeaderId,
			headerInner: currentHeaderInner,
			logoId: currentLogo,
			logoImg: currentLogo ? currentLogo.querySelector('img') : null,
			navs: currentTop ? currentTop.querySelectorAll('#nav, #nav-bar') : document.querySelectorAll('#nav, #nav-bar'),
			navOuter: currentTop ? currentTop.querySelector('#nav-outer') : document.querySelector('#nav-outer'),
			navId: currentTop ? currentTop.querySelector('#nav') : document.querySelector('#nav'),
			navBarId: currentTop ? currentTop.querySelector('#nav-bar') : document.querySelector('#nav-bar')
		};
	}

	function createNavOverflowInstance(context, navMain) {
		const menuList = getDirectMenuList(navMain);

		if (!menuList) return null;

		const showAll = getDirectShowAll(menuList);
		const regularNavItems = getDirectRegularNavItems(menuList);

		if (!showAll || !regularNavItems.length) return null;

		if (menuList.xclusiveNavOverflowCleanup) {
			menuList.xclusiveNavOverflowCleanup();
		}

		Array.from(showAll.children).forEach(function (child) {
			if (child.classList.contains('show-all-submenu')) {
				child.parentNode.removeChild(child);
			}
		});

		const all_submenu = createElementWithClass('ul', 'show-all-submenu');
		showAll.appendChild(all_submenu);

		regularNavItems.forEach(function (el, index) {
			const clone_me = el.cloneNode(true);
			removeCloneIds(clone_me);
			el.setAttribute('data-copy', regularNavItems.length - index);
			clone_me.setAttribute('data-copy', regularNavItems.length - index);
			all_submenu.appendChild(clone_me);
			navOverflowCloneMap.set(el, clone_me);
		});

		const instance = {
			active: true,
			topId: context.topId,
			headerOuter: context.headerOuter,
			headerId: context.headerId,
			headerInner: context.headerInner,
			logoId: context.logoId,
			logoImg: context.logoImg,
			navOuter: context.navOuter,
			navMain: navMain,
			menuList: menuList,
			hasValidState: false,
			readyAction: null,
			readyActionDone: false,
			updateNavScheduled: false,
			updateNavCallbacks: [],
			retryCount: 0,
			retryTimer: null,
			initTimeout: null,
			resizeHandler: null,
			fontLoadingDone: null,
			navResizeObserver: null,
			cleanup: function () {}
		};

		function runCallbacks(callbacks) {
			callbacks.forEach(function (queuedCallback) {
				queuedCallback();
			});
		}

		function runReadyAction() {
			if (!instance.active || instance.readyActionDone || typeof instance.readyAction !== 'function') return;

			instance.readyActionDone = true;
			instance.readyAction();
		}

		function scheduleRetry(callbacks) {
			if (!instance.active || instance.hasValidState || instance.retryCount >= 4 || instance.retryTimer) return false;

			callbacks.forEach(function (queuedCallback) {
				instance.updateNavCallbacks.push(queuedCallback);
			});

			instance.retryCount++;
			instance.retryTimer = setTimeout(function () {
				instance.retryTimer = null;
				instance.updateNav();
			}, 100 * instance.retryCount);

			return true;
		}

		instance.updateNav = function (callback) {
			if (!instance.active || !isNavOverflowDesktop()) return;

			if (typeof callback === 'function') {
				instance.updateNavCallbacks.push(callback);
			}

			if (instance.updateNavScheduled) return;
			instance.updateNavScheduled = true;

			calcLogoOffset(instance, function (logoOffsetValid) {
				const callbacks = instance.updateNavCallbacks.splice(0);
				let valid = false;

				instance.updateNavScheduled = false;

				if (!instance.active || !isNavOverflowDesktop()) return;

				if (logoOffsetValid) {
					valid = countNavDistF(instance);
				}

				if (valid) {
					instance.hasValidState = true;
					runReadyAction();
					instance.retryCount = 0;

					if (instance.retryTimer) {
						clearTimeout(instance.retryTimer);
						instance.retryTimer = null;
					}

					runCallbacks(callbacks);
				} else if (instance.hasValidState) {
					runCallbacks(callbacks);
				} else if (!scheduleRetry(callbacks)) {
					instance.updateNavCallbacks = [];
				}
			});
		};

		instance.readyAction = function () {
			if (instance.navOuter) {
				if (instance.topId) {
					instance.topId.classList.add('ready');
				}
				if (instance.headerId) {
					instance.headerId.classList.add('ready');
				}
			} else if (instance.headerOuter) {
				instance.headerOuter.classList.add('ready');
			}
		};

		function logoLoad() {
			instance.updateNav();
		}

		instance.initTimeout = setTimeout(function () {
			if (!instance.active || !isNavOverflowDesktop()) return;

			if (instance.navOuter) {
				if (instance.logoImg) {
					if (instance.logoImg.complete) {
						logoLoad();
					} else {
						instance.logoImg.addEventListener('load', logoLoad);
					}
				} else {
					logoLoad();
				}
			} else {
				instance.updateNav();
			}
		}, 250);

		if (document.fonts && document.fonts.ready) {
			document.fonts.ready.then(function () {
				instance.updateNav();
			});

			if (typeof document.fonts.addEventListener === 'function') {
				instance.fontLoadingDone = function () {
					instance.updateNav();
				};
				document.fonts.addEventListener('loadingdone', instance.fontLoadingDone);
			}
		}

		instance.resizeHandler = throttle(function () {
			if (!isNavOverflowDesktop()) return;

			if (instance.headerOuter) {
				instance.headerOuter.classList.remove('ready');
			}

			instance.updateNav(function () {
				if (instance.headerOuter) {
					instance.headerOuter.classList.add('ready');
				}
			});
		}, 250);

		window.addEventListener('resize', instance.resizeHandler);

		if (typeof ResizeObserver !== 'undefined') {
			const observedElements = [];
			instance.navResizeObserver = new ResizeObserver(function () {
				instance.updateNav();
			});

			function observeNavElement(target) {
				if (target && observedElements.indexOf(target) === -1) {
					instance.navResizeObserver.observe(target);
					observedElements.push(target);
				}
			}

			observeNavElement(instance.headerId);
			observeNavElement(instance.headerInner);
			observeNavElement(instance.logoId);
			observeNavElement(instance.navOuter);
			observeNavElement(instance.navMain);
		}

		instance.cleanup = function () {
			instance.active = false;
			instance.readyAction = null;
			instance.updateNavCallbacks = [];
			removeCalcLogoOffsetCallbacks(instance);
			clearTimeout(instance.initTimeout);

			if (instance.retryTimer) {
				clearTimeout(instance.retryTimer);
				instance.retryTimer = null;
			}

			if (instance.resizeHandler) {
				window.removeEventListener('resize', instance.resizeHandler);
			}

			if (instance.logoImg) {
				instance.logoImg.removeEventListener('load', logoLoad);
			}

			if (document.fonts && instance.fontLoadingDone && typeof document.fonts.removeEventListener === 'function') {
				document.fonts.removeEventListener('loadingdone', instance.fontLoadingDone);
			}

			if (instance.navResizeObserver) {
				instance.navResizeObserver.disconnect();
			}

			if (menuList.xclusiveNavOverflowCleanup === instance.cleanup) {
				menuList.xclusiveNavOverflowCleanup = null;
			}
		};

		menuList.xclusiveNavOverflowCleanup = instance.cleanup;
		return instance;
	}

	function initializeNavOverflow(sectionRoot) {
		cleanupNavOverflowInstances();

		if (!isNavOverflowDesktop()) {
			return;
		}

		const context = getNavOverflowContext(sectionRoot);

		if (!context.topId || !context.headerOuter || !context.navs.length) {
			clearLogoOffset();
			return;
		}

		if (!context.headerInner || !context.headerInner.classList.contains('text-center-logo')) {
			clearLogoOffset();
		}

		if (context.navOuter) {
			context.topId.classList.add('has-nav-outer');
		}

		if (context.navId && context.navId.classList.contains('no-wide')) {
			context.topId.classList.add('has-no-wide');
		}

		if (context.navBarId && context.navBarId.classList.contains('no-wide')) {
			context.topId.classList.add('has-no-wide');
		}

		Array.from(context.navs).forEach(function (navMain) {
			if (navMain.closest('#header-inner') !== null) {
				html_tag.classList.add('has-inside-nav');
			} else {
				html_tag.classList.remove('has-inside-nav');
			}

			const instance = createNavOverflowInstance(context, navMain);

			if (instance) {
				navOverflowInstances.push(instance);
			}
		});
	}

	function handleNavOverflowSectionLoad(evt) {
		if (!isNavOverflowDesktop()) return;
		if (!evt.target || evt.target.querySelector('#header-outer, #header, #nav, #nav-bar')) {
			initializeNavOverflow();
		}
	}

	function handleNavOverflowSectionUnload(evt) {
		let shouldCleanup = false;

		navOverflowInstances.forEach(function (instance) {
			if (evt.target && (evt.target.contains(instance.menuList) || evt.target.contains(instance.navMain))) {
				shouldCleanup = true;
			}
		});

		if (shouldCleanup) {
			cleanupNavOverflowInstances();
			clearLogoOffset();
		}
	}

	function handleNavOverflowBreakpoint(evt) {
		if (evt.matches) {
			initializeNavOverflow();
		}
	}

	if (document.xclusiveNavOverflowGlobalCleanup) {
		document.xclusiveNavOverflowGlobalCleanup();
	}

	document.xclusiveNavOverflowGlobalCleanup = function () {
		cleanupNavOverflowInstances();
		clearLogoOffset();
		document.removeEventListener('shopify:section:load', handleNavOverflowSectionLoad);
		document.removeEventListener('shopify:section:unload', handleNavOverflowSectionUnload);

		if (typeof navOverflowDesktop.removeEventListener === 'function') {
			navOverflowDesktop.removeEventListener('change', handleNavOverflowBreakpoint);
		} else {
			navOverflowDesktop.removeListener(handleNavOverflowBreakpoint);
		}
	};

	document.addEventListener('shopify:section:load', handleNavOverflowSectionLoad);
	document.addEventListener('shopify:section:unload', handleNavOverflowSectionUnload);

	if (typeof navOverflowDesktop.addEventListener === 'function') {
		navOverflowDesktop.addEventListener('change', handleNavOverflowBreakpoint);
	} else {
		navOverflowDesktop.addListener(handleNavOverflowBreakpoint);
	}

	initializeNavOverflow();

if (navs.length) {
	Array.from(navs).forEach(function (nav_main) {
		const nmu = nav_main.querySelector('[data-type]');
		if (nmu !== null) {
			const nmv = nav_main.getElementsByClassName('sub-static');
			if (nmv.length) {
				function executeCheckInv() {
					if (!checkInvExecuted) {
						Array.from(nmv).forEach(function (el) {
							//if (!el.classList.contains('show-all')) {
							checkInv(el, 0.5);
							//}
						});
					}
				}
				let checkInvExecuted = false;

				window.addEventListener('mousemove', function () {
					if (!checkInvExecuted) {
						executeCheckInv();
						checkInvExecuted = true;
					}
				});

				window.addEventListener('resize', throttle(() => {
					checkInvExecuted = false;
					executeCheckInv();
				}, 500));
			}
		}
	});
}

if (search_id && header_inner) {
	// if (!isHasSelectorSupported()) {
	if (search_id.classList.contains('no-bg') && !search_id.classList.contains('bd-b')) {
		top_id.classList.add('no-bd-m');
	}
	if (search_id.classList.contains('no-bg')) {
		top_id.classList.add('no-bd');
	}
	if (search_id.classList.contains('no-pd-t')) {
		top_id.classList.add('no-pd-t');
	}
	// }
	if (!search_id.classList.contains('compact') && header_inner.classList.contains('hide-btn') && header_inner.classList.contains('text-center-logo')) {
		search_id.classList.add('not-compact');
		if (search_id.classList.contains('not-compact')) {
			/*enquire.register('screen and (max-width: 1000px)', function () {
				search_id.classList.add('compact');
			}).register('screen and (min-width: 1001px)', function () {
				search_id.classList.remove('compact');
			});*/
			function updateSearch() {
				if (mediaMax1000.matches) {
					search_id.classList.add('compact');
				} else if (mediaMin1000.matches) {
					search_id.classList.remove('compact');
				}
			}

			updateSearch();

			mediaMax1000.addEventListener('change', updateSearch);
			mediaMin1000.addEventListener('change', updateSearch);
		}
	}
}

// If #nav exists, create a #nav-top for mobile menu
/*if (nav_id && nav_top_id && !nav_id.querySelectorAll('ul.nav-top').length) {
	Array.from(nav_top_id.querySelectorAll('ul[data-type]')).forEach(function (el) {
		var clone_me = el.cloneNode(true);
		clone_me.classList.add('nav-top');
		nav_id.appendChild(clone_me);
	});
}*/

// Detect empty URLs
if (nav_main) {
	Array.from(nav_main.querySelectorAll('a[href="#"]')).forEach(el => {
		const parent = el.parentElement;
		if (parent) {
			parent.classList.add('empty-url');
		}
	});
}

// Toggles accessible mode on/off, updates CSS, and stores preference in a cookie

var a_accessible = document.getElementsByClassName('link-accessible');
function accessibleLink(el) {
	if (html_tag.classList.contains('t1ac')) {
		html_tag.classList.remove('t1ac');
		Cookies.set('accessible', 'no');
	} else {
		new_css('accessible-mode-css', window.filepaths['theme_accessible_css']);
		html_tag.classList.add('t1ac');
		Cookies.set('accessible', 'yes');
	}
	if (nav_id || nav_bar_id) {
		var temp_hidden = nav_main.getElementsByClassName('temp-hidden');
		setTimeout(function () {
			Array.from(temp_hidden).forEach(function (el) {
				el.classList.remove('temp-hidden');
			});
			window.dispatchEvent(new Event('resize'));
		}, 100);
	}
}
if (a_accessible.length) {
	Array.from(a_accessible).forEach(el => {
		const parent = el.parentElement;
		if (parent && !parent.classList.contains('has-link-accessible')) {
			parent.classList.add('has-link-accessible');
		}
	});
	html_tag.addEventListener('click', event => {
		const link = event.target.closest('a.link-accessible');
		if (link) {
			accessibleLink(link);
			event.preventDefault();
		}
	});
	html_tag.addEventListener('keyup', event => {
		if (event.key === ' ' || event.key === 'Enter') {
			const link = event.target.closest('a.link-accessible');
			if (link) {
				accessibleLink(link);
				event.preventDefault();
			}
		}
	});
}

if (Cookies.get('accessible') === 'yes') {
	new_css('accessible-mode-css', window.filepaths['theme_accessible_css']);
	html_tag.classList.add('t1ac');
} else {
	html_tag.classList.remove('t1ac');
	Cookies.remove('accessible');
}

// Searchbox
if (search_id) {
	if (search_id.classList.contains('compact-handle')) {
		html_tag.classList.add('t1sh-mobile', 'search-compact-handle');
	} else {
		html_tag.classList.remove('t1sh-mobile', 'search-compact-handle');
	}
	if (search_id.classList.contains('compact-handle-mobile')) {
		html_tag.classList.add('t1sh-mobile', 'search-compact-handle', 'search-compact-handle-mobile');
	} else {
		html_tag.classList.remove('search-compact-handle-mobile');
	}
	if (search_id.classList.contains('compact')) {
		if (search_id.classList.contains('compact-handle')) {
			html_tag.classList.add('t1sh');
		} else {
			html_tag.classList.remove('t1sh');
		}
		html_tag.classList.add('t1sr');
	} else {
		html_tag.classList.remove('t1sr', 't1sh');
	}
	if (search_id.classList.contains('text-center-sticky')) {
		html_tag.classList.add('search-compact-is-centered');
	} else {
		html_tag.classList.remove('search-compact-is-centered');
	}
}
});
window.dispatchEvent(topEvt);

var breadcrumb_back = document.querySelectorAll('.breadcrumb-back');
if (breadcrumb_back.length) {
	Array.from(breadcrumb_back).forEach(function (el) {
		if (document.referrer.indexOf(window.location.host) !== -1) {
			el.addEventListener('click', function (e) {
				history.go(-1); return false;
			})
		}
		else { el.remove(); }
	})
}

//Default.utils.forms();
var select_tag = document.getElementsByTagName('select');
window.addEventListener("formZindex", function (evt) {
	// :placeholder-like support for <select> element
	Array.from(select_tag).forEach(el => {
		const parentNode = el.parentNode;
		if (parentNode) {
			parentNode.classList.add('has-select');
		}
	
		const closestParagraph = el.closest('p');
		if (closestParagraph) {
			closestParagraph.classList.add('has-select');
		}
	
		el.addEventListener('change', () => {
			if (!el.classList.contains('changed')) {
				el.classList.add('changed');
			}
		});
	});

	let handleFormChildrenCalculated = false;
	let handleFormChildrenScheduled = false;

	function handleFormChildren() {
		if (handleFormChildrenScheduled) return;

		handleFormChildrenScheduled = true;

		requestAnimationFrame(() => {
			if (!handleFormChildrenCalculated) {
				const formChildren = document.querySelectorAll(
					'form > *, fieldset > *, .no-zindex, .no-zindex > *, .has-select, .f8pr > *, .l4ca.compact.in-panel > *, .l4cl.box > li, .f8pr-bulk > *'
				);
				if (formChildren.length) {
					assignIndex(formChildren);
				}
				handleFormChildrenCalculated = true;
			}
			handleFormChildrenScheduled = false;
		});
	}

	if (!isMobile) {
		window.addEventListener('mousemove', handleFormChildren, asyncOnce);
	}
	document.addEventListener('keyup', handleFormChildren, asyncOnce);
	document.addEventListener('touchstart', handleFormChildren, asyncPass);
	document.addEventListener('scroll', handleFormChildren, asyncPass);
	window.addEventListener('resize', throttle(handleFormChildren, 500));
});
runWhenIdle(() => window.dispatchEvent(formZindexEvt));


// Sets CSS custom property --pdi on input elements based on the width of their prefix span for proper padding
const inputPaddingsEvt = new CustomEvent('inputPaddings');
window.addEventListener('inputPaddings', function (event) {
	const inputs = Array.from(document.querySelectorAll('[class*="input-"][class*="fix"]'));

	for (const el of inputs) {
		const prefix = el.querySelector('span:first-child');
		if (!prefix) continue;

		const sibling = prefix.nextElementSibling;
		if (!sibling) continue;

		sibling.style.setProperty('--pdi', prefix.offsetWidth + 'px');
	}
});
runWhenIdle(() => window.dispatchEvent(inputPaddingsEvt));


window.check_limit_event = function() {
	var check_limit = document.querySelectorAll('.check[data-limit]');
	if (check_limit.length) {
		Array.from(check_limit).forEach(function (el) {
			if (!el.classList.contains('check-limit-initialized')) {
				el.classList.add('check-limit-initialized');
				var tag_limit = 'a',
						limit,
						trigger,
						nextAll = false,
						lastDesc;
				if (el.tagName.toLowerCase() === 'ul' || el.tagName.toLowerCase() === 'ol') {
					tag_limit = 'li';
				}
				limit = createElementWithClass(tag_limit, 'limit');
				trigger = el.children[el.dataset.limit - 1];

				if (trigger !== undefined) {
					nextAll = [].filter.call(trigger.parentNode.children, function (htmlElement) {
						return (htmlElement.previousElementSibling === trigger) ? nextAll = true : nextAll;
					});
					nextAll.forEach(function (em) {
						if (!em.classList.contains('hidden')) {
							em.classList.add('hidden-check');
						}
					});
					limit.innerText = '+' + Math.abs(el.querySelectorAll('li:not(.hidden, .tip-cont)').length - el.dataset.limit);
					if (tag_limit = 'li') {
						//limit.innerHTML = '<a href="./">' + limit.innerHTML + '</a>';
						const a = document.createElement('a');
						a.href = './';
						while (limit.firstChild) {
							a.appendChild(limit.firstChild);
						}
						limit.appendChild(a);
					}
					el.append(limit);
					lastDesc = el.querySelector('li.hidden');
					if (lastDesc) {
						el.appendChild(lastDesc);
					}
					Array.from(el.querySelectorAll('a.limit, .limit a')).forEach(function (em) {
						em.addEventListener('click', function (e) {
							el.classList.add('limit-clicked');
							e.preventDefault();
						});
					});
				}
			}
		});
	}
};
check_limit_event();

//Default.utils.footer();
// Change the position of background element (just for security)
window.addEventListener("background", function(evt) {
	// Change the position of background element (just for security)
	if (document.querySelector('#background.done')) {
		document.querySelector('#background.done').remove();
	}
	const background_id = document.getElementById('background');
	if (background_id && !background_id.classList.contains('static') && (background_id.parentNode.id === 'content' || background_id.parentNode.classList.contains('shopify-section'))) {
		document.getElementById('root').appendChild(background_id);
		background_id.classList.add('done');
	}
});
window.dispatchEvent(backgroundEvt);

//Default.utils.tabs();
// Create tabs
window.addEventListener("moduleTabs", function(evt) {
	if (typeof semanticTabs === 'function') {
		const tabs_holder = document.querySelectorAll('#content, .m6pn');
	
		for (const container of tabs_holder) {
			const module_tabs = container.getElementsByClassName('m6tb');
	
			for (const tab of module_tabs) {
				if (!tab.classList.contains('tabs-initialized')) {
					semanticTabs(tab);
					tab.classList.add('tabs-initialized');
				}
			}
		}
	}
});
runWhenIdle(() => window.dispatchEvent(moduleTabsEvt));

//Default.utils.swipers();
window.addEventListener("moduleFeaturedSlider", function(event) {
	const module_featured = document.querySelectorAll('.m6fr:not(.s4wi)');
	if (module_featured.length) {
		Array.from(module_featured).forEach(function (el) {
			var pagination_type = 'bullets',
					autoplay_int = false,
					total_sl = el.children.length,
					featuredSlider;
			if (!isHasSelectorSupported()) {
				for (const em of el.querySelectorAll('figure')) {
					if (em.getElementsByTagName('picture').length > 1) {
						em.classList.add('has-pics');
					}
				}
			}
			if (el.classList.contains('slider-fraction')) {
				pagination_type = 'fraction';
			}
			if (el.getAttribute('data-autoplay')) {
				autoplay_int = {
					delay: parseFloat(el.getAttribute('data-autoplay')),
					pauseOnMouseEnter: true
				};
			}
			randomize(el);
			const randomId = el.getAttribute('data-random');
			featuredSlider = create_slider(el, {
				direction: 'horizontal',
				loop: true,
				autoHeight: true,
				resizeObserver: true,
				autoplay: autoplay_int,
				threshold: 50,
				pagination: {
					el: '.swiper-pagination-' + randomId,
					clickable: true,
					type: pagination_type,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + (index + 1) + "<span class='prg'></span></span>";
					},
					renderFraction: function (currentClass, totalClass) {
						return '<span class="' + currentClass + '"></span>' +
								' <span class="slash">/</span> ' +
								'<span class="' + totalClass + '"></span>';
					}
				},
				on: {
					afterInit: function (swiper) {
						updateSwiper(swiper);
					},
					slideChangeTransitionStart: function (swiper) {
						updateSwiper(swiper);
						Array.from(el.querySelectorAll('.swiper-slide > article.aside')).forEach(function (em) {
							em.parentNode.classList.add('has-aside');
						});
						var active_content = swiper.el.querySelectorAll('.swiper-slide[data-swiper-slide-index="' + swiper.realIndex + '"] > article')[0];
						if (typeof active_content !== 'undefined') {
							console.log(active_content);
							el.setAttribute('data-active-content', active_content.getAttribute('class'));
						}
						if (swiper.realIndex > 0) {
							el.classList.add('changed');
						} else {
							el.classList.remove('changed');
						}
						if (swiper.realIndex + 1 === total_sl) {
							el.classList.add('last-slide-active');
						} else {
							el.classList.remove('last-slide-active');
						}
					},
					resize: function (swiper) {
						if (typeof Shopify !== 'undefined' && Shopify.designMode) {
							Array.from(featuredSlider.slides).forEach(function () {
								featuredSlider.slideNext(0);
							});
						}
						setTimeout(function () {
							featuredSlider.updateAutoHeight();
						}, 500);

					}
				}

			});
			function updateSwiper(swiper) {
				Array.from(el.querySelectorAll('.swiper-slide > article.aside')).forEach(em => {
					em.parentNode.classList.add('has-aside');
				});
				/*const active_content = swiper.el.querySelector('.swiper-slide[data-swiper-slide-index="' + swiper.realIndex + '"] > article');
				if (typeof active_content !== 'undefined') {
					console.log(active_content.getAttribute('data-color-palette'));
					el.setAttribute('data-active-content', active_content.getAttribute('data-color-palette'));
				}*/
				const active_content = swiper.el.querySelector('.swiper-slide-active > article');
				if (active_content) {
					el.setAttribute('data-active-content', active_content.getAttribute('class') || '');
				}
				if (swiper.realIndex > 0) {
					el.classList.add('changed');
				} else {
					el.classList.remove('changed');
				}
				if (swiper.realIndex + 1 === total_sl) {
					el.classList.add('last-slide-active');
				} else {
					el.classList.remove('last-slide-active');
				}
			}
			if (featuredSlider !== null) {
				if (el.getAttribute('data-autoplay') && !el.classList.contains('no-controls')) {
					append_url(el, 'Play/Pause', 'play-pause');
					el.querySelector('.play-pause').addEventListener('click', function (e) {
						if (el.classList.contains('paused')) {
							el.classList.remove('paused');
							featuredSlider.autoplay.start();
						} else {
							el.classList.add('paused');
							featuredSlider.autoplay.stop();
						}
						e.preventDefault();
					});
					el.addEventListener('mouseleave', function () {
						if (!el.classList.contains('paused')) {
							featuredSlider.autoplay.start();
						}
					});
				}
				window.addEventListener('resize', throttle(function () {
					html_tag.classList.add('resized');
				}, 200), true);
				setTimeout(function () {
					featuredSlider.updateAutoHeight();
				}, 500);
			}
			if (el.classList.contains('s4wi')) {
				setTimeout(function () {
					if (typeof updateSlidersEvt != 'undefined') {
						window.dispatchEvent(updateSlidersEvt);
					}
				}, 300);
			}
		});
	}
});
window.dispatchEvent(moduleFeaturedSliderEvt);


// TO BE DROPPED: .shopify-section-announcement-bar - initializes the announcement bar slider if multiple items exist, handling autoplay and removing unnecessary close buttons
const announcementSliderEvt = new CustomEvent('announcementSlider');
window.addEventListener('announcementSlider', function (event) {
	let top_bar = document.querySelector('.shopify-section-announcement-bar:not(.s4wi)');
	if (!top_bar) return;

	const top_bar_children = Array.from(top_bar.children).filter(
		el => !el.classList.contains('close') && !el.classList.contains('overlay-close')
	);

	if (top_bar_children.length <= 1 || top_bar.classList.contains('m6kn') || top_bar.closest('.m6kn')) return;

	for (const el of top_bar.querySelectorAll('.close, .overlay-close')) {
		el.remove();
	}

	const dataAutoplay = parseFloat(top_bar.getAttribute('data-autoplay'));
	const autoplay_top_int = !isNaN(dataAutoplay) ? {
		delay: dataAutoplay,
		pauseOnMouseEnter: true,
		disableOnInteraction: false
	} : false;

	if (top_bar.querySelector('.no-nav')) top_bar.classList.add('no-nav');

	create_slider(top_bar, {
		direction: 'horizontal',
		loop: true,
		autoHeight: true,
		//spaceBetween: viewportWidth * 0.5,
		autoplay: autoplay_top_int,
		pagination: false
	});
});
window.dispatchEvent(announcementSliderEvt);


// .l4ts - Initializes testimonial sliders with responsive settings, autoplay, and pagination based on list classes and data attributes.
const listTestimonialsSliderEvt = new CustomEvent('listTestimonialsSlider')
window.addEventListener('listTestimonialsSlider', function (event) {
	const list_testimonials = document.querySelectorAll('.l4ts:not(.s4wi)');
	if (!list_testimonials.length) return;
	
	list_testimonials.forEach(el => {
		let ln = [1, 2, 3];
		if (el.classList.contains('wide') || el.classList.contains('width-100')) ln = [1, 1, 1];
		if (el.classList.contains('width-50')) ln = [1, 2, 2];

		const pagination_type = el.classList.contains('slider-fraction') ? 'fraction' : 'bullets';

		let autoplay_int = false;
		if (el.getAttribute('data-autoplay')) {
			autoplay_int = {
				delay: parseFloat(el.getAttribute('data-autoplay')),
				pauseOnMouseEnter: true,
				disableOnInteraction: false
			};
		}

		randomize(el);
		const total_sl = el.children.length;

		const options = {
			direction: 'horizontal',
			loop: true,
			autoHeight: true,
			spaceBetween: 16,
			slidesPerView: ln,
			slidesPerGroup: ln,
			autoplay: autoplay_int,
			loopAddBlankSlides: false,
			pagination: {
				el: '.swiper-pagination-' + el.getAttribute('data-random'),
				clickable: true,
				type: pagination_type,
				renderFraction: (currentClass, totalClass) => `<span class="${currentClass}"></span> <span class="slash">/</span> <span class="${totalClass}"></span>`
			},
			on: {
				slideChangeTransitionStart: function (swiper) {
					swiper.el.parentNode.classList.toggle('changed', swiper.realIndex > 0);
					swiper.el.parentNode.classList.toggle('last-slide-active', swiper.realIndex + 1 === total_sl);
					//if (swiper.realIndex > 0) { swiper.el.parentNode.classList.add('changed'); } else { swiper.el.parentNode.classList.remove('changed'); }
					//if (swiper.realIndex + 1 === total_sl) { swiper.el.parentNode.classList.add('last-slide-active'); } else { swiper.el.parentNode.classList.remove('last-slide-active'); }
				}
			},
			breakpoints: {
				0: {
					slidesPerView: ln[0],
					slidesPerGroup: ln[0]
				},
				760: {
					slidesPerView: ln[1],
					slidesPerGroup: ln[1]
				},
				1000: {
					slidesPerView: ln[2],
					slidesPerGroup: ln[2]
				}
			}
		};
		if (el.classList.contains('slider') && el.children.length > ln[2]) {
			create_slider(el, options);
		}
		if (el.classList.contains('slider-mobile') && el.children.length > ln[0]) {
			//clone_with_class(el, 'mobile-only', 'mobile-hide');
			const nextSibling = el.nextElementSibling;
			if (nextSibling && nextSibling.matches('.l4ts.mobile-only')) {
				if (nextSibling.hasAttribute('id')) {
					nextSibling.removeAttribute('id');
				}
				create_slider(el.nextElementSibling, options);
			}
		}
	});
});
window.dispatchEvent(listTestimonialsSliderEvt);


window.addEventListener("listStaticSlider", function(event) {
	const list_static = document.querySelectorAll('.l4st:not(.static, .s4wi)');
	if (list_static.length) {
		Array.from(list_static).forEach(function (el) {
			//if (!el.classList.contains('static')) {
			//var pagination_type = 'bullets',
			/*if (el.classList.contains('slider-fraction')) {
                pagination_type = 'fraction';
            }*/
			const total_sl = el.children.length;
			const pagination_type = el.classList.contains('slider-fraction') ? 'fraction' : 'bullets';

			let autoplay_int = false;
			const autoAttr = el.getAttribute('data-autoplay');
			if (autoAttr) {
				autoplay_int = {
					delay: parseFloat(autoAttr),
					pauseOnMouseEnter: true,
					disableOnInteraction: false
				};
			}
			randomize(el);
			const randomId = el.getAttribute('data-random');
			clone_with_class(el, 'mobile-only', 'mobile-hide');

			const nextEl = el.nextElementSibling;
			if (nextEl && nextEl.classList.contains('mobile-only')) {
				if (nextEl.hasAttribute('id')) {
					nextEl.removeAttribute('id');
				}
				create_slider(nextEl, {
					direction: 'horizontal',
					loop: true,
					autoHeight: true,
					spaceBetween: 16,
					autoplay: autoplay_int,
					pagination: {
						el: `.swiper-pagination-${randomId}`,
						clickable: true,
						type: pagination_type,
						renderFraction: function (currentClass, totalClass) {
							return '<span class="' + currentClass + '"></span>' +
								' <span class="slash">/</span> ' +
								'<span class="' + totalClass + '"></span>';
						}
					},
					on: {
						slideChangeTransitionStart: function (swiper) {
							const parent = swiper.el.parentNode;
							parent.classList.toggle('changed', swiper.realIndex > 0);
							parent.classList.toggle('last-slide-active', swiper.realIndex + 1 === total_sl);
							/*if (swiper.realIndex > 0) {
                                swiper.el.parentNode.classList.add('changed');
                            } else {
                                swiper.el.parentNode.classList.remove('changed');
                            }
                            if (swiper.realIndex + 1 === total_sl) {
                                swiper.el.parentNode.classList.add('last-slide-active');
                            } else {
                                swiper.el.parentNode.classList.remove('last-slide-active');
                            }*/
						}
					}
				});
			}
			/*if (el.classList.contains('slider')) {
                randomize(el);
            }*/
		});
	}
});
window.dispatchEvent(listStaticSliderEvt);

window.addEventListener("listUspSlider", function(event) {
	const list_usp = document.querySelectorAll('.l4us:not(.s4wi)');
	if (list_usp.length) {
		Array.from(list_usp).forEach(function (el) {
			if (!el.classList.contains('static')) {
				let autoplay_int = false;
				let autowidth_int = 1;
				let space_between;

				if (el.classList.contains('no-arrows')) {
					space_between = 16;
				} else {
					space_between = 44;
				}

				if (el.hasAttribute('data-autoplay')) {
					autoplay_int = {
						delay: parseFloat(el.getAttribute('data-autoplay')),
						pauseOnMouseEnter: true,
						disableOnInteraction: false
					};
				}
				if (el.querySelectorAll('li').length === 1) {
					el.classList.remove('slider', 'slider-single');
				}
				if (el.closest('#nav-top') !== null && el.classList.contains('slider')) {
					el.classList.add('slider-in-header');
					if (!el.classList.contains('slider-single')) {
						autowidth_int = 'auto';
					}
				}
				const options = {
					direction: 'horizontal',
					loop: true,
					pagination: false,
					autoplay: autoplay_int,
					slidesPerView: autowidth_int,
					autoHeight: true,
					//spaceBetween: 10,
					spaceBetween: space_between,
					breakpoints: {
						0: {
							slidesPerView: 1
						},
						760: {
							slidesPerView: autowidth_int
						},
						1000: {
							spaceBetween: space_between
						},
						1100: {
							spaceBetween: 20
						}
					}
				};
				if (!el.classList.contains('mobile-static')) {
					if (el.classList.contains('slider')) {
						create_slider(el, options);
					} else if (el.childNodes.length > 1) {
						clone_with_class(el, 'l4us-mobile', 'mobile-hide');
						const nextEl = el.nextElementSibling;
						if (nextEl.classList.contains('l4us-mobile')) {
							nextEl.classList.remove('slider', 'slider-in-header');
							if (nextEl.hasAttribute('id')) {
								nextEl.removeAttribute('id');
							}
							create_slider(nextEl, options);
						}
					}
				}
			}
		});
	}
});
window.dispatchEvent(listUspSliderEvt);

// Marks certain elements inside popups as "in-popup" to apply specific styling or behavior
document.querySelectorAll('.popup-a .l4cl, .popup-a .l4ft').forEach(el => {
	if (!el.classList.contains('in-popup')) {
		el.classList.add('in-popup');
	}
});

list_collection_slider = document.querySelectorAll('.l4cl.slider:not(.in-popup, .s4wi), .l4ft.slider:not(.in-popup, .s4wi)');

const list_collection = document.getElementsByClassName('l4cl');
if (list_collection.length) {
	requestAnimationFrame(() => {
		for (const el of list_collection) {
			if (el.clientHeight < el.scrollHeight) {
				el.classList.add('is-scrollable');
			}
		}
	});
	Array.from(list_collection).forEach(el => {
		if (!isHasSelectorSupported()) {
			el.querySelectorAll('.small a').forEach(a => a.classList.add('has-link'));
			Array.from(el.querySelectorAll('div.box')).forEach(em => {
				const closestLi = em.closest('li');
				if (closestLi) {
					closestLi.classList.add('has-div-box');
				}
			});

			const l4mlElements = el.querySelectorAll('[class*="l4ml"]');
			Array.from(l4mlElements).forEach(em => {
				const closestLi = em.closest('li');
				if (closestLi) {
					closestLi.classList.add('has-l4ml');
				}
			});

			const pictureElements = el.querySelectorAll('picture ~ picture');
			Array.from(pictureElements).forEach(em => {
				const closestLi = em.closest('li');
				if (closestLi) {
					closestLi.classList.add('has-picture-picture');
				}
			});
		}
	});
}

window.addEventListener('listCollectionSlider', () => {
	const list_collection_slider = document.querySelectorAll('.l4cl.slider:not(.s4wi), .l4ft.slider:not(.s4wi)');
	if (!list_collection_slider.length) return;

	for (const el of list_collection_slider) {
		if (el.closest('.popup-a')) {
			el.classList.add('in-popup');
			continue;
		}

		const closestTabs = el.closest('.m6tb');
		const hasFigure = !!el.querySelector('figure:not(:last-child)');
		const classes = el.classList;
		const computed = getComputedStyle(el);
		const dist_a_value = computed.getPropertyValue('--dist_a').trim();
		const rowValue = computed.getPropertyValue('--row').trim();
		const row = rowValue ? parseFloat(rowValue) : NaN;
		
		let spacing = 16;
		if (dist_a_value && dist_a_value !== 'px') {
			const dist_a = parseFloat(dist_a_value);
			if (!isNaN(dist_a)) spacing = dist_a;
		}

		let loopMe = classes.contains('slider-loop');
		let autoHeight = !(classes.contains('static-height') && !classes.contains('align-stretch'));
		let allowTouch = classes.contains('static-height') || classes.contains('align-center') || classes.contains('align-stretch');
		let allowTouch_760 = !classes.contains('mobile-compact');
		let autoPlayMe = false;
		let autoPlaySpeed = 300;

		if (!hasFigure) el.classList.add('no-img');

		if (classes.contains('autoplay')) {
			autoPlayMe = {
				delay: 0
			};
			loopMe = true;
			autoPlaySpeed = el.children.length * 1000;
		}

		let items = [5, 5, 3];
		if (classes.contains('text-justify') || classes.contains('auto-width')) {
			items = ['auto', 'auto', 'auto'];
			autoHeight = false;
		} else {
			const rowItemsMap = {
				12: [12, 6, 4],
				11: [11, 6, 4],
				10: [10, 6, 4],
				9: [9, 6, 4],
				8: [8, 6, 4],
				7: [7, 6, 4],
				6: [6, 5, 3],
				5: [5, 5, 3],
				4: [4, 4, 3],
				3: [3, 3, 3],
				2: [2, 2, 2]
			};

			if (!Number.isNaN(row) && rowItemsMap[row]) {
				items = rowItemsMap[row];
			} else {
				const itemsMap = {
					'in-col': [4, 4, 3],
					'w8': [12, 6, 4],
					'w9': [11, 6, 4],
					'w10': [10, 6, 4],
					'w11': [9, 6, 4],
					'w12': [8, 6, 4],
					'w14': [7, 6, 4],
					'w16': [6, 5, 3],
					'w20': [5, 5, 3],
					'w25': [4, 4, 3],
					'w33': [3, 3, 3],
					'w50': [2, 2, 2]
				};

				for (const cls in itemsMap) {
					if (classes.contains(cls)) {
						items = itemsMap[cls];
						break;
					}
				}
			}
		}

		const handleInit = (swiper) => {
			if (!hasFigure) return;
			const fig = el.querySelector('.swiper-slide-active figure');
			if (fig && fig.offsetHeight > 0) {
				el.style.setProperty('--fih', fig.offsetHeight + 'px');
			} else {
				el.style.removeProperty('--fih');
			}
		};
		const throttledHandleInit = throttle(handleInit, 100);

		randomize(el);
		const randomId = el.getAttribute('data-random');

		create_slider(el, {
			direction: 'horizontal',
			loop: loopMe,
			autoHeight,
			slidesPerView: items[0],
			focusableElements: 'input',
			spaceBetween: spacing,
			touchStartPreventDefault: false,
			lazy: {
				loadPrevNext: true
			},
			pagination: {
				el: `.swiper-pagination-${randomId}`,
				clickable: true
			},
			autoplay: autoPlayMe,
			speed: autoPlaySpeed,
			breakpoints: {
				0: {
					simulateTouch: false,
					allowTouchMove: false
				},
				760: {
					slidesPerView: items[2],
					simulateTouch: allowTouch_760,
					allowTouchMove: allowTouch_760
				},
				1000: {
					slidesPerView: items[1],
					simulateTouch: allowTouch,
					allowTouchMove: allowTouch
				},
				1100: {
					slidesPerView: items[0],
					simulateTouch: allowTouch,
					allowTouchMove: allowTouch
				}
			},
			on: {
				afterInit(swiper) {
					if (closestTabs) setTimeout(handleInit, 100);
					if (typeof lazyVideoEvt !== 'undefined') window.dispatchEvent(lazyVideoEvt);
					handleInit();
				},
				resize: throttledHandleInit,
				transitionStart(swiper) {
					swiper.el.classList.add('transition');
				},
				transitionEnd(swiper) {
					swiper.el.classList.remove('transition');
					handleInit();
				}
			}
		});

		el.querySelectorAll('.has-text, .cols').forEach(em => {
			const p = em.parentElement;
			if (em.classList.contains('has-text')) p.classList.add('has-text');
			if (em.classList.contains('cols')) p.classList.add('has-cols');
		});

		if (hasFigure && closestTabs && closestTabs.children.length) {
			closestTabs.querySelectorAll('a').forEach(link =>
				link.addEventListener('click', () => setTimeout(handleInit, 100))
			);
		}

		if (hasFigure) {
			const subLi = el.closest('li.sub');
			if (subLi) subLi.addEventListener('mouseenter', () => setTimeout(handleInit, 100));
		}

		el.querySelectorAll('.swiper-wrapper[id], .swiper-button-nav[aria-controls]').forEach(node => {
			node.removeAttribute('id');
			node.removeAttribute('aria-controls');
		});
	}
});
window.dispatchEvent(listCollectionSliderEvt);

window.addEventListener("listProductSlider", function(event) {
	const list_product_slider = document.querySelectorAll('.l4pr:not(.s4wi, .l4pr-initialized)');
	if (list_product_slider.length) {
		Array.from(list_product_slider).forEach(function (el) {
			el.classList.add('l4pr-initialized');
			html_tag.classList.add('t1pr');
			var hasStickyNote = false;
			var stickyNote = [];
			if (el.classList.contains('static')) {
				var clone_me = el.cloneNode(true);
				clone_me.classList.remove('static');
				clone_me.classList.add('desktop-hide');
				el.classList.add('desktop-only');
				el.after(clone_me);

				el = el.nextElementSibling;
			}
			var mainSliderElement = el,
					children = mainSliderElement.children,
					qttChildren = children.length,
					total_sl = el.children.length,
					mainSlider,
					slides,
					initial_slide = 0;

			const stickyNotes = mainSliderElement.querySelectorAll('li.sticky');
			if (stickyNotes.length) {
				hasStickyNote = true;
				stickyNote = Array.from(stickyNotes);
				stickyNotes.forEach(child => child.remove());
			}

			const firstModel = mainSliderElement.querySelectorAll('a > .model-3d:first-child model-viewer[poster]');
			Array.from(firstModel).forEach(em => {
				const staticPosterWrapper = document.createElement('picture');
				const posterSrc = em.getAttribute('poster');

				const staticPoster = document.createElement('img');
				staticPoster.setAttribute('src', posterSrc);
				staticPoster.setAttribute('data-src', posterSrc);
				staticPosterWrapper.prepend(staticPoster);

				staticPosterWrapper.classList.add('just-poster');

				const altAttribute = em.getAttribute('alt');
				if (altAttribute) {
					staticPoster.setAttribute('alt', altAttribute);
				}

				const closestLink = em.closest('a');
				if (closestLink) {
					closestLink.prepend(staticPosterWrapper);
				}
			});

			if (!el.classList.contains('thumbs-static') && !el.classList.contains('thumbs-slider')) {
				const fifthChild = children[4];

				if (fifthChild) {
					fifthChild.classList.add('more');
					append_url(fifthChild, '+' + (qttChildren - 5), 'more');
				}
			}

			const featuredMediaPosition = el.getAttribute('data-featured_media_position');
			if (featuredMediaPosition) {
				initial_slide = parseFloat(featuredMediaPosition) - 1;
			}

			// clone all slides before swiper uses them and change the DOM - used to create custom pagination
			slides = mainSliderElement.cloneNode(true).children;
			Array.from(el.getElementsByClassName('m6bx')).forEach(em => {
				em.classList.add('m6bx-inside');
				el.firstElementChild.appendChild(em);
				em.parentElement.removeChild(em);
			});
			randomize(el);
			const randomId = el.getAttribute('data-random');
			function setNavigationHeight(swiper) {
				const h = `${swiper.height}px`;
				swiper.navigation.prevEl.style.height = h;
				swiper.navigation.nextEl.style.height = h;
			}
			mainSlider = create_slider(mainSliderElement, {
				direction: 'horizontal',
				loop: false,
				autoHeight: true,
				preloadImages: false,
				initialSlide: initial_slide,
				pagination: {
					el: '.swiper-pagination-' + randomId,
					clickable: true,
					renderBullet: function (index, className) {
						var finalSpan = document.createElement("a"),
								img_type,
								add_class,
								img,
								divFlex,
								moreLink,
								icon,
								span,
								a_thumb,
								a_thumb_img,
								a_thumb_pic,
								a_thumb_pic_class;
						finalSpan.classList.add(className);
						if (slides[index].hasAttribute('class')) {
							add_class = slides[index].getAttribute('class');

							const orientationClasses = ['portrait', 'landscape', 'square', 'stripe'];

							orientationClasses.forEach(orientation => {
								if (add_class.includes(orientation)) {
									finalSpan.classList.add(`orientation-${orientation}`);
								}
							});
							if (add_class.includes('auto')) {
								finalSpan.classList.add('auto');
								finalSpan.classList.remove('landscape', 'portrait');
							}
						}
						if (slides[index].querySelector("picture")) {
							img_type = 'picture';
						} else {
							img_type = 'img';
						}
						img = slides[index].querySelector(img_type);
						if (img !== null) {
							const a_thumb = img.closest('a[data-gallery-thumb]');
							const a_thumb_img = document.createElement('img');
							const a_thumb_pic = document.createElement('picture');

							if (a_thumb) {
								const thumbSrc = a_thumb.getAttribute('data-gallery-thumb');
								a_thumb_img.setAttribute('src', thumbSrc);
								a_thumb_img.setAttribute('loading', 'lazy');

								const a_thumb_pic_class = a_thumb.querySelector('picture[class]');
								if (a_thumb_pic_class) {
									const classValue = a_thumb_pic_class.getAttribute('class');
									const classes = classValue.split(' ');
									classes.forEach(className => {
										if (className) {
											a_thumb_pic.classList.add(className);
										}
									});
								}

								a_thumb_img.setAttribute('alt', 'Thumbnail');
								a_thumb_pic.appendChild(a_thumb_img);
								finalSpan.appendChild(a_thumb_pic);
							} else if (img) {
								finalSpan.appendChild(img);
							}
						}

						divFlex = document.createElement("span");

						moreLink = slides[index].querySelector("a.more");
						if (moreLink && ((qttChildren - 1) - index) > 0) {
							span = document.createElement("span");
							span.innerText = '+' + ((qttChildren - 1) - index).toString();

							divFlex.appendChild(span);
							finalSpan.classList.add('has-more');
							if (slides[index].querySelectorAll('a[data-fancybox]')) {
								Array.from(slides[index].querySelectorAll('a[data-fancybox]')).forEach(function (em) {
									finalSpan.setAttribute('href', em.getAttribute('href'));
								});
							}
						}

						icon = slides[index].querySelector("i[class^=icon-]");
						if (icon) {
							divFlex.appendChild(icon);
						}

						finalSpan.appendChild(divFlex);

						return finalSpan.outerHTML;
					}
				},
				navigation: {
					nextEl: '[data-random="' + el.getAttribute('data-random') + '"] .swiper-button-next',
					prevEl: '[data-random="' + el.getAttribute('data-random') + '"] .swiper-button-prev'
				},
				on: {
					// "this" keyword within event handler always points to Swiper instance (from documentation https://swiperjs.com/swiper-api#events)
					activeIndexChange: function () {
						var activeIndex = this.activeIndex;
						Array.from(this.el.parentNode.getElementsByClassName('custom-progressbar-inner')).forEach(function (el) {
							el.style.width = 100 * (activeIndex + 1) / qttChildren + '%';
						});
					},
					afterInit: function (swiper) {
						// create progress bar
						const progress_bar = createElementWithClass('div', 'custom-progressbar');
						//progress_bar.innerHTML = '<div class="custom-progressbar-inner" style="width:' + 100 / qttChildren + '%;"></div>';

						const progress_bar_inner = document.createElement('div');
						progress_bar_inner.className = 'custom-progressbar-inner';
						progress_bar_inner.style.width = (100 / qttChildren) + '%';

						progress_bar.appendChild(progress_bar_inner);

						swiper.el.appendChild(progress_bar);

						Array.from(swiper.el.querySelectorAll('.s1lb, .label')).forEach(em => {
							swiper.el.parentNode.appendChild(em);
						});
						Array.from(swiper.el.getElementsByClassName('m6bx-inside')).forEach(em => {
							swiper.el.appendChild(em);
						});

						let custom_fraction;
						if (el.classList.contains('no-thumbs-mobile') || el.classList.contains('slider-fraction')) {
							custom_fraction = swiper.el.parentNode.querySelector('.swiper-custom-fraction');
							//custom_fraction.innerHTML = '<span class="swiper-pagination-current">1</span> <span class="slash">/</span> <span class="total-el">' + swiper.slides.length + '</span>';
							const current = document.createElement('span');
							current.className = 'swiper-pagination-current';
							current.textContent = '1';

							const slash = document.createElement('span');
							slash.className = 'slash';
							slash.textContent = '/';

							const total = document.createElement('span');
							total.className = 'total-el';
							total.textContent = swiper.slides.length;

							custom_fraction.append(
								current,
								document.createTextNode(' '),
								slash,
								document.createTextNode(' '),
								total
							);
						}

						setTimeout(function () {
							setNavigationHeight(swiper);
						}, 300);
					},
					slideChangeTransitionEnd: function (swiper) {
						setTimeout(function () {
							setNavigationHeight(swiper);
						}, 300);
					},
					slideChangeTransitionStart: function (swiper) {
						setTimeout(function () {
							if (el.classList.contains('no-thumbs-mobile') || el.classList.contains('slider-fraction')) {
								var custom_fraction = swiper.el.parentNode.getElementsByClassName('swiper-pagination-current')[0];
								custom_fraction.innerHTML = swiper.realIndex + 1;
								if (swiper.realIndex > 0) {
									swiper.el.classList.add('changed');
								} else {
									swiper.el.classList.remove('changed');
								}
							}
							if (swiper.realIndex + 1 === total_sl) {
								swiper.el.classList.add('last-slide-active');
							} else {
								swiper.el.classList.remove('last-slide-active');
							}
						}, 300);
					},
					resize: function (swiper) {
						setNavigationHeight(swiper);
					}
				}
			});

			if (hasStickyNote = true) {
				stickyNote.forEach(function (imgOverlay) {
					const swiperOuter = el.querySelector('.swiper-outer');
					if (swiperOuter !== null) {
						swiperOuter.appendChild(imgOverlay);
					} else {
						el.appendChild(imgOverlay);
					}
				});
			}

			if (el.classList.contains('thumbs-slider')) {
				const randomIdSelector = '[data-random="' + randomId + '"]';
				const bulletsSelector = `${randomIdSelector} .swiper-pagination-bullets`;
				const customBullets = el.querySelector(bulletsSelector);

				clone_with_class(customBullets, 'cloned', 'hidden');

				const clonedBullets = el.querySelector(`${bulletsSelector}.cloned`);

				Array.from(clonedBullets.children).forEach((bullet, index) => {
					bullet.setAttribute('data-l4pr-index', index);
				});

				create_slider(clonedBullets, {
					direction: 'horizontal',
					loop: false,
					autoHeight: false,
					slidesPerView: 'auto',
					navigation: {
						nextEl: `${bulletsSelector} .swiper-button-next`,
						prevEl: `${bulletsSelector} .swiper-button-prev`
					}
				});
			}

			/*const data_update_product_slider = document.querySelectorAll('[data-l4pr-index]');
      if (data_update_product_slider.length) {
        Array.from(data_update_product_slider).forEach(el => {
          const isOption = el.tagName.toLowerCase() === 'option';
          const clickHandler = e => {
            const index = parseInt(el.getAttribute('data-l4pr-index'));
            mainSlider.slideTo(index);

            if (el.tagName.toLowerCase() === 'a' && el.classList.contains('swiper-pagination-bullet')) {
              const slide = el.closest('.swiper-slide');
              const siblings = Array.from(getSiblings(slide));

              siblings.forEach(em => {
              em.firstElementChild.classList.remove('swiper-pagination-bullet-active');
              });

              el.classList.add('swiper-pagination-bullet-active');
              e.preventDefault();
            }
          };

          if (isOption) {
            const em = el.parentNode;
            em.addEventListener('change', () => {
              const dx = em.options[em.selectedIndex].getAttribute('data-l4pr-index');
              if (dx !== null) {
                mainSlider.slideTo(dx);
              }
            });
          } else {
            el.addEventListener('click', clickHandler);
          }
        });
      }*/
		});
	}
});
window.dispatchEvent(listProductSliderEvt);

//Default.utils.ratings();
window.addEventListener("ratings", function(evt) {
	const ratingElements = document.querySelectorAll('[data-val][data-of]:not(.rating-initialized)');

	if (ratingElements.length) {
		for (const el of ratingElements) {
			el.classList.add('rating-initialized');
			const fragment = document.createDocumentFragment();
			const reviewsElem = createElementWithClass('span', 'rating-label');
			const reviews = el.innerHTML;
			const rating = el.dataset.val;
			const total = el.dataset.of;
	
			const isNotS1ld = !(el.classList.contains('s1ld') || el.classList.contains('s1br'));
	
			if (isNotS1ld) {
				fragment.appendChild(createRatingsHtmlElement(rating, total));
				reviewsElem.innerHTML = reviews;
			} else {
				reviewsElem.innerHTML = `<span class="bar" style="width: ${rating / total * 100}%;"></span>`;
			}
	
			fragment.appendChild(reviewsElem);
			el.textContent = '';
			el.appendChild(fragment);
		}
	}
});
window.dispatchEvent(ratingsEvt);

const alignMiddleElements = document.getElementsByClassName('align-middle');
const alignCenterElements = document.getElementsByClassName('align-center');

function checkAndAddClass(elements, className) {
	if (elements.length) {
		Array.from(elements).forEach(el => {
			const parent = el.parentNode;
			const grandparent = parent.parentNode;

			const isCenterElement = (
					(el.previousElementSibling === null && el.nextElementSibling === null && parent.id === 'content') ||
					(el.previousElementSibling === null && el.nextElementSibling === null && parent.previousElementSibling === null && parent.nextElementSibling === null && grandparent.id === 'content')
			);

			if (isCenterElement) {
				document.getElementById('content').classList.add(className);
			}
		});
	}
}

//Default.utils.background();
checkAndAddClass(alignMiddleElements, 'align-center');
checkAndAddClass(alignCenterElements, 'align-center-static');

if (!isHasSelectorSupported()) {
	const list_featured_content_box = document.querySelectorAll('.l4ft .content.box');
	if (list_featured_content_box.length) {
		Array.from(list_featured_content_box).forEach(el => {
			const closestLi = el.closest('li');
			if (closestLi) {
				closestLi.classList.add('has-content-box');
			}
		});
	}
}

//Default.utils.mobile();
if (isMobile) {
	html_tag.classList.add('mobile');
} else {
	html_tag.classList.add('no-mobile');
}


window.addEventListener("mediaFlexbile", function(evt) {
	const media_flexible = document.getElementsByClassName('media-flexible');
	if (media_flexible.length) {
		Array.from(media_flexible).forEach(function (el) {
			if ((!el.parentElement.classList.contains('flexible-stack') && (el.classList.contains('slider-mobile') || el.parentElement.classList.contains('mobile-static'))) && (!el.classList.contains('media-flexible-initialized'))) {
				var cloned_mobile, link, emc, pt = el.parentElement,
						tag = document.createElement('div'),
						fl = pt.querySelectorAll('.media-flexible:not(.mobile-hide-media-flexible) > *:not(.mobile-hide-media-flexible)');
				if (!el.parentElement.getElementsByClassName('media-flexible-mobile').length) {
					tag.classList.add('media-flexible-mobile');
					el.after(tag);
					el.classList.add('mobile-hide');
					const cloned_mobile = pt.querySelector('.media-flexible-mobile');
					Array.from(fl).forEach(function (em) {
						emc = em.cloneNode(true);
						cloned_mobile.appendChild(emc);
					});

					if (cloned_mobile.classList.contains('media-flexible-mobile')) {
						cloned_mobile.classList.remove('media-flexible', 'mobile-hide');
						if (cloned_mobile.hasAttribute('id')) {
							cloned_mobile.removeAttribute('id');
						}

						Array.from(cloned_mobile.children).forEach(function (el) {
							if (el.classList.contains('mobile-hide')) {
								el.remove();
							}
						});
						randomize(cloned_mobile);
						const randomId = cloned_mobile.getAttribute('data-random');
						if (!cloned_mobile.classList.contains('s4wi')) {
							create_slider(cloned_mobile, {
								direction: 'horizontal',
								loop: true,
								autoHeight: true,
								pagination: {
									el: '.swiper-pagination-' + randomId,
									clickable: true,
									type: 'bullets',
									renderBullet: function (index, className) {
										return '<span class="' + className + '">' + (index + 1) + "<span class='prg'></span></span>";
									}
								},
								on: {
									slideChangeTransitionStart: function (swiper) {
										var active_content = swiper.el.querySelectorAll('.swiper-slide[data-swiper-slide-index="' + swiper.realIndex + '"] > *')[0];
										if (typeof active_content !== 'undefined') {
											el.closest('.m6fr').setAttribute('data-active-content', active_content.getAttribute('data-color-palette'));
										}
									}
								}
							});
						}
					}
				}
				el.classList.add('media-flexible-initialized');
			}
		});
	}
});
window.dispatchEvent(mediaFlexibleEvt);


// Initializes a column layout on the service page by wrapping the main content and certain sibling sections into a structured div.article wrapper for consistent styling and width.
const createColsEvt = new CustomEvent('createCols');
window.addEventListener('createCols', function () {
	const servicePageElement = document.querySelector('[id$="page-service-info-blocks"]');
	if (!servicePageElement) return;

	if (
		servicePageElement.parentElement &&
		servicePageElement.parentElement.classList.contains('w64') &&
		servicePageElement.parentElement.parentElement &&
		servicePageElement.parentElement.parentElement.classList.contains('cols')
	) {
		return;
	}

	const parent = servicePageElement.parentElement;

	if (parent.classList.contains('cols')) {
		const article = parent.querySelector('article.w64.t55');
		if (article) article.replaceWith(...article.childNodes);
		parent.replaceWith(...parent.childNodes);
	}

	const wrapper = document.createElement('div');
	wrapper.classList.add('cols', 'section-width-boxed');

	const wrapperInner = document.createElement('article');
	wrapperInner.classList.add('w64', 't55');
	wrapper.appendChild(wrapperInner);

	const possibleSiblings = [
		'shopify-section-page-service-menu',
		'shopify-section-faq',
		'shopify-section-contact-form',
		'shopify-section-google-maps'
	];

	let anySiblingFound = false;

	const finalizeWrapper = () => {
		if (!anySiblingFound) return;

		const children = Array.from(wrapperInner.childNodes).reverse();
		for (const child of children) {
			wrapperInner.appendChild(child);
		}

		servicePageElement.parentNode.insertBefore(wrapper, servicePageElement);
		wrapper.appendChild(servicePageElement);
	};

	const findSibling = () => {
		const prevSibling = servicePageElement.previousElementSibling;

		if (!prevSibling) {
			finalizeWrapper();
			return;
		}

		let correctSiblingFound = false;

		for (const cls of possibleSiblings) {
			if (prevSibling.classList.contains(cls)) {
				correctSiblingFound = true;
				anySiblingFound = true;
				prevSibling.classList.add('w64', 't55');
				wrapperInner.appendChild(prevSibling);
				break;
			}
		}

		if (correctSiblingFound) {
			findSibling();
			return;
		}

		finalizeWrapper();
	};

	findSibling();
});

window.dispatchEvent(createColsEvt);


// var data_update_generic_slider = document.querySelectorAll('[data-slide-to]');
//
// if (data_update_generic_slider.length) {
// 	Array.from(data_update_generic_slider).forEach(function (el) {
// 		if (el.tagName.toLowerCase() === 'option') {
// 			var em = el.parentNode;
// 			em.addEventListener('change', function () {
// 				var dx = em[em.selectedIndex].getAttribute('data-slide-to'),
// 					findSwiper;
// 				if (el.closest('li') !== null && dx !== null) {
// 					findSwiper = el.closest('li').querySelectorAll('.s4wi')[0];
// 					if (findSwiper !== undefined) {
// 						findSwiper.children[0].swiper.slideTo(dx);
// 					}
// 				}
// 			});
// 		}
// 	});
// }

/*!*/
window.addEventListener("createCols", function(event) {
	var servicePageElement = document.querySelector('[id$="page-service-info-blocks"]');
	if (servicePageElement != null) {
		if (servicePageElement.parentElement.classList.contains('cols')) {
			var parent = servicePageElement.parentElement;
			var article = servicePageElement.parentElement.querySelector('article.w64.t55');
			if (article) { article.replaceWith(...article.childNodes); }
			parent.replaceWith(...parent.childNodes);
		}

		var anySiblingFound = false;
		var wrapper = document.createElement('div');
		wrapper.classList.add('cols');
		var wrapperInner = document.createElement('article');
		wrapperInner.classList.add('w64','t55');
		wrapper.appendChild(wrapperInner);
		var possibleSiblings = ['shopify-section-page-service-menu', 'shopify-section-faq', 'shopify-section-contact-form', 'shopify-section-google-maps'];

		var findSibling = function() {
			var prevSibling = servicePageElement.previousSibling;
			if (prevSibling) {
				var correctSiblingFound = false;
				for (var i = 0; i < possibleSiblings.length; i++) {
					if (prevSibling.classList.contains(possibleSiblings[i])) {
						correctSiblingFound = true;
						anySiblingFound = true;
						prevSibling.classList.add('w64','t55')
						wrapperInner.appendChild(prevSibling);
					}
				}
				if (correctSiblingFound) {
					findSibling();
				} else {
					for (var i = 1; i < wrapperInner.childNodes.length; i++){
						wrapperInner.insertBefore(wrapperInner.childNodes[i], wrapperInner.firstChild);
					}
					if (anySiblingFound) {
						servicePageElement.parentNode.insertBefore(wrapper, servicePageElement);
						wrapper.appendChild(servicePageElement);
					}
				}
			}
		}
		findSibling();
	}
});
window.dispatchEvent(createColsEvt);

window.addEventListener("showAlert", function(event) {
	var messageText = event.detail.message,
			messageType = event.detail.type,
			messageHeader = event.detail.header ? event.detail.header : false,
			messageOrigin = event.detail.origin ? 'message-' + event.detail.origin : false,
			messageColor = '';
	switch(messageType) {
		case "success":
			messageColor = 'lime';
			if (!messageHeader) { messageHeader = window.translations.general_alerts_success_text; }
			break;
		case "info":
			messageColor = 'pine';
			if (!messageHeader) { messageHeader = window.translations.general_alerts_info_text; }
			break;
		case "error":
			messageColor = 'rose';
			if (!messageHeader) { messageHeader = window.translations.general_alerts_error_text; }
			break;
		default:
			messageColor = 'lime';
			if (!messageHeader) { messageHeader = ''; }
	}
	var message = '<li class="overlay-'+ messageColor +' '+ messageOrigin +'"><i aria-hidden="true" class="icon-'+ messageType +'"></i><p class="strong">'+ messageHeader +'</p><p>'+ messageText +'</p><a href="./" class="close">Close</a></li>';
	var list_alerts = document.querySelector('.l4al:not(.inline):not(.l4al-trustbadge)');

	if (list_alerts === null) {
		list_alerts = document.createElement("ul");
		list_alerts.classList.add('l4al', 'fixed');
		document.getElementById('root').appendChild(list_alerts);
	}
	if ((messageOrigin && list_alerts.getElementsByClassName(messageOrigin).length == 0) || !messageOrigin) { // Prevent double messages (multiple of the same forms are being triggered when posted in shopfiy)
		list_alerts.innerHTML += message;
	}
	if (typeof alertsEvt != 'undefined') { window.dispatchEvent(alertsEvt); }
}, false);

function scrollToTargetAdjusted(el) {
	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	}
	el.scrollIntoView({
		block: 'center'
	});
}
let loadMoreItemClicked = localStorage.getItem('loadMoreItemClicked');
if (loadMoreItemClicked != null) {
	let el = document.querySelector('#collection > li > figure > a[href="'+ loadMoreItemClicked +'"], .m6cl .results > div a[href="'+ loadMoreItemClicked +'"], .m6cl .results > .l4ne a[href="'+ loadMoreItemClicked +'"]'),
			url = window.location.href;
	if (el && !url.includes(loadMoreItemClicked)) {
		scrollToTargetAdjusted(el);
		localStorage.removeItem('loadMoreItemClicked');
	} else if (!url.includes(loadMoreItemClicked)) {
		localStorage.removeItem('loadMoreItemClicked');
	}
}


// video.lazy - lazily loads videos by swapping data-src -> src for <source> elements and calling load() when the video enters the viewport (via IntersectionObserver).
function loadLazyVideo(video) {
	const sources = video.querySelectorAll('source[data-src]');
	for (let i = 0; i < sources.length; i++) {
		const source = sources[i];
		source.src = source.getAttribute('data-src');
		source.removeAttribute('data-src');
	}

	video.load();
	video.classList.remove('lazy');

	const p = video.play();
	if (p && typeof p.catch === 'function') p.catch(function () {});
}

function defer(fn) {
	const run = function () {
		setTimeout(fn, 500);
	};

	if ('requestIdleCallback' in window) {
		requestIdleCallback(run, {
			timeout: 1200
		});
		return;
	}

	requestAnimationFrame(run);
}

function isInViewport(video) {
	const rect = video.getBoundingClientRect();
	const vh = window.innerHeight || document.documentElement.clientHeight;
	const vw = window.innerWidth || document.documentElement.clientWidth;

	return rect.bottom > 0 && rect.right > 0 && rect.top < vh && rect.left < vw;
}

var lazyVideoEvt = new CustomEvent('lazyVideo');
window.addEventListener('lazyVideo', function () {
	const lazyVideos = Array.from(document.querySelectorAll('video.lazy'));
	if (!lazyVideos.length) return;

	if (!('IntersectionObserver' in window)) {
		for (let i = 0; i < lazyVideos.length; i++) {
			const video = lazyVideos[i];
			if (isInViewport(video)) {
				defer(function () {
					loadLazyVideo(video);
				});
			}
		}
		return;
	}

	const lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
		for (let i = 0; i < entries.length; i++) {
			const entry = entries[i];
			if (!entry.isIntersecting) continue;

			const video = entry.target;

			if (isInViewport(video)) {
				defer(function () {
					loadLazyVideo(video);
				});
			} else {
				loadLazyVideo(video);
			}

			observer.unobserve(video);
		}
	}, {
		rootMargin: '300px 0px'
	});

	for (let i = 0; i < lazyVideos.length; i++) {
		lazyVideoObserver.observe(lazyVideos[i]);
	}
});
window.dispatchEvent(lazyVideoEvt);


// Animations .t1an
function loadRes(u, c, i) {
	const loaded = html_tag.classList.contains(i);

	if (loaded) {
		if (typeof c === 'function') c();
		return true;
	}
	const s = document.createElement('script');
	s.src = u;
	s.async = true;
	if (typeof c === 'function') {
		s.onload = c;
	}
	s.onerror = () => console.warn(`Script failed: ${u}`);
	document.body.appendChild(s);

	html_tag.classList.add(i);
}


// Loads async CSS and JS resources on first user interaction, including hover-fix on hybrid devices that falsely report no hover
const outline_js = fp('js/plugin-outline.js', 'plugin_outline_js');
const css_async = fp('styles/async.css', 'async_css');
const css_menu = fp('styles/async-menu.css', 'async_menu_css');
const css_hovers = fp('styles/async-hovers.css', 'async_hovers_css');
const css_hovers_hack = fp('styles/async-hovers-hack.css', 'async_hovers_hack_css');
const isFakeNoHover = navigator.maxTouchPoints > 0 && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(hover: hover)').matches;

let asyncCSSLoaded = false;

function asyncCSS() {
	if (asyncCSSLoaded) return;

	new_css('async-css', css_async);
	new_css('hovers-css', css_hovers);

	if (isFakeNoHover) {
		new_css('hovers-hack-css', css_hovers_hack);
	}

	new_css('menu-css', css_menu);
	loadRes(outline_js, () => {}, 'outline-loaded');

	asyncCSSLoaded = true;

	const skip_id = document.getElementById('skip');
	if (skip_id && nav_bar_id) {
		const link = skip_id.querySelector('a[href="#nav"]');
		if (link) {
			link.setAttribute('href', '#nav-bar');
		}
	}
}

if (isFakeNoHover) {
	asyncCSS();
} 
window.addEventListener('mousemove', asyncCSS, asyncOnce);
document.addEventListener('keyup', asyncCSS, asyncOnce);
document.addEventListener('touchstart', asyncCSS, asyncPass);
document.addEventListener('pointerdown', asyncCSS, asyncPass);
document.addEventListener('scroll', asyncCSS, asyncPass);


// Adds and removes a .touch-moving class on the <html> element to indicate when the user is actively touching or scrolling on a touchscreen device.
let touchMoving = false;
let lastScrollY = 0;
let scrollCheckTimeout;

window.addEventListener('touchstart', () => {
	clearTimeout(scrollCheckTimeout);
	touchMoving = true;
	html_tag.classList.add('touch-moving');
});

window.addEventListener('touchend', () => {
	const checkScrollEnd = () => {
		const currentY = window.scrollY;
		if (Math.abs(currentY - lastScrollY) < 2) {
			touchMoving = false;
			html_tag.classList.remove('touch-moving');
		} else {
			lastScrollY = currentY;
			scrollCheckTimeout = setTimeout(checkScrollEnd, 100);
		}
	};
	lastScrollY = window.scrollY;
	scrollCheckTimeout = setTimeout(checkScrollEnd, 100);
});


// Loads less crucial JavaScript and exposes a deterministic readiness contract for integrations that need it earlier.
const custom_async_js = fp('js/custom-async.js', 'custom_async_js');
let customAsyncRuntimePromise = null;
const customAsyncRuntimeTimeout = 15000;

function isCustomAsyncRuntimeReady() {
	return !!(window.ajaxCart && typeof window.ajaxCart.init === 'function' && typeof window.ajaxCart.open === 'function' && typeof window.ajaxCart.refresh === 'function');
}

function getNormalizedScriptUrl(url) {
	try {
		const parsedUrl = new URL(url, document.baseURI);
		return {
			href: parsedUrl.href,
			withoutQuery: parsedUrl.origin + parsedUrl.pathname
		};
	} catch (error) {
		const stringUrl = String(url || '');
		return {
			href: stringUrl,
			withoutQuery: stringUrl.split('?')[0]
		};
	}
}

function findCustomAsyncScript() {
	const expectedUrl = getNormalizedScriptUrl(custom_async_js);
	const scripts = document.scripts;

	for (let i = 0; i < scripts.length; i++) {
		const script = scripts[i];
		const scriptUrl = getNormalizedScriptUrl(script.src);

		if (
			script.dataset.xclusiveCustomAsync === 'true' ||
			scriptUrl.href === expectedUrl.href ||
			scriptUrl.withoutQuery === expectedUrl.withoutQuery
		) {
			return script;
		}
	}

	return null;
}

function setCustomAsyncRuntimeState(script, state) {
	script.dataset.xclusiveRuntimeState = state;

	if (state === 'loaded') {
		html_tag.classList.remove('custom-async-loading');
		html_tag.classList.add('custom-async-loaded');
	} else if (state === 'failed' || state === 'invalid') {
		html_tag.classList.remove('custom-async-loading', 'custom-async-loaded');
	}
}

function monitorCustomAsyncScript(script) {
	if (script.dataset.xclusiveRuntimeMonitor === 'true') return;

	script.dataset.xclusiveRuntimeMonitor = 'true';
	script.addEventListener('load', function () {
		setCustomAsyncRuntimeState(
			script,
			isCustomAsyncRuntimeReady() ? 'loaded' : 'invalid'
		);
	}, { once: true });
	script.addEventListener('error', function () {
		setCustomAsyncRuntimeState(script, 'failed');
	}, { once: true });
}

function ensureCustomAsyncRuntime() {
	if (isCustomAsyncRuntimeReady()) {
		html_tag.classList.add('custom-async-loaded');
		return Promise.resolve(window.ajaxCart);
	}

	if (customAsyncRuntimePromise) return customAsyncRuntimePromise;

	customAsyncRuntimePromise = new Promise(function (resolve, reject) {
		let script = findCustomAsyncScript();
		let shouldAppendScript = false;
		let settled = false;
		let timeoutId = null;

		if (
			script &&
			script.dataset.xclusiveRuntimeState === 'failed'
		) {
			script.remove();
			script = null;
		}

		if (script && script.dataset.xclusiveRuntimeState === 'invalid') {
			reject(new Error('custom-async.js executed without exposing the expected Xclusive cart runtime.'));
			return;
		}

		if (!script) {
			script = document.createElement('script');
			script.src = custom_async_js;
			script.async = true;
			script.dataset.xclusiveCustomAsync = 'true';
			shouldAppendScript = true;
		}

		monitorCustomAsyncScript(script);

		const cleanup = () => {
			clearTimeout(timeoutId);
			script.removeEventListener('load', handleLoad);
			script.removeEventListener('error', handleError);
		};

		const fail = (error, state) => {
			if (settled) return;
			settled = true;
			cleanup();
			if (state) setCustomAsyncRuntimeState(script, state);
			html_tag.classList.remove('custom-async-loading');
			reject(error);
		};

		const handleLoad = () => {
			if (settled) return;

			if (!isCustomAsyncRuntimeReady()) {
				fail(
					new Error('custom-async.js loaded without exposing the expected Xclusive cart runtime.'),
					'invalid'
				);
				return;
			}

			settled = true;
			cleanup();
			setCustomAsyncRuntimeState(script, 'loaded');
			resolve(window.ajaxCart);
		};

		const handleError = () => {
			fail(new Error(`Script failed: ${custom_async_js}`), 'failed');
		};

		if (script.dataset.xclusiveRuntimeState === 'loaded') {
			setTimeout(handleLoad, 0);
			return;
		}

		if (!script.dataset.xclusiveRuntimeState) {
			script.dataset.xclusiveRuntimeState = 'loading';
		}
		html_tag.classList.add('custom-async-loading');
		script.addEventListener('load', handleLoad, { once: true });
		script.addEventListener('error', handleError, { once: true });
		timeoutId = setTimeout(() => {
			fail(new Error(`Script timed out: ${custom_async_js}`));
		}, customAsyncRuntimeTimeout);

		if (shouldAppendScript) {
			document.body.appendChild(script);
		} else {
			setTimeout(() => {
				if (isCustomAsyncRuntimeReady()) handleLoad();
			}, 0);
		}
	}).catch(error => {
		customAsyncRuntimePromise = null;
		throw error;
	});

	return customAsyncRuntimePromise;
}

window.XclusiveTheme = window.XclusiveTheme || {};
window.XclusiveTheme.ensureCustomAsyncRuntime = ensureCustomAsyncRuntime;

runWhenIdle(() => {
	ensureCustomAsyncRuntime().catch(error => {
		console.warn('custom-async runtime failed to load', error);
	});
});


// Variable to be used later
let module_collection = document.getElementsByClassName('m6cl');