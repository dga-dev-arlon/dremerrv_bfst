const mediaMax760 = window.matchMedia('(max-width: 760px)');
const mediaMin760 = window.matchMedia('(min-width: 761px)');
const mediaTablet = window.matchMedia('(min-width: 761px) and (max-width: 1000px)');

let footer_id = document.querySelector('.shopify-section-footer');
let nav_user_id = document.getElementById('nav-user');
let root_id = document.getElementById('root');
let totop_id = document.getElementById('totop');
let all_list_drop = document.querySelectorAll('.l4dr');
var search_input,
	navEvt = new CustomEvent("nav"),
	navtopEvt = new CustomEvent("navTop"),
	stickyNavEvt = new CustomEvent("stickyNav"),
	searchEvt = new CustomEvent("search"),
	moduleProductBackgroundEvt = new CustomEvent("moduleProductBackground"),
	fancyboxEvt = new CustomEvent("fancybox"),
	productVariantsEvt = new CustomEvent("productVariants"),
	productcardVariantsEvt = new CustomEvent("productcardVariants"),
	stickyAddToCartEvt = new CustomEvent("stickyAddToCart"),
	sellingplansEvt = new CustomEvent("sellingplans"),
	pickupAvailabilityEvt = new CustomEvent("pickupAvailability"),
	productBuybarBtnEvt = new CustomEvent("productBuybarBtn"),
	recommendedProductsEvt = new CustomEvent("recommendedProducts"),
	recentlyViewedProductsEvt = new CustomEvent("recentlyViewedProducts"),
	modulePanelEvt = new CustomEvent("modulePanel"),
	modulePanelAnchorEvt = new CustomEvent("modulePanelAnchor"),
	accordeonEvt = new CustomEvent("accordeon"),
	alertsEvt = new CustomEvent("alerts"),
	ratingsEvt = new CustomEvent("ratings"),
	mainProductSlideToEvt = new CustomEvent("mainProductSlideTo"),
	moduleFeaturedSlideToEvt = new CustomEvent("moduleFeaturedSlideTo"),
	listCollectionSliderUpdateEvt = new CustomEvent("listCollectionSliderUpdate"),
	showHideDataElementEvt = new CustomEvent("showHideDataElement"),
	listDropEvt = new CustomEvent("listDrop"),
	masonryEvt = new CustomEvent("masonry"),
	countdownEvt = new CustomEvent("countdown"),
	localizationFormEvt = new CustomEvent("localizationForm"),
	tooltipEvt = new CustomEvent("tooltip"),
	updateSlidersEvt = new CustomEvent("updateSliders"),
	popupsEvt = new CustomEvent("popups"),
	announcementEvt = new CustomEvent("announcement"),
	dataChangeEvt = new CustomEvent("dataChange"),
	removeSDCcssEvt = new CustomEvent("removeSDCcss"),
	schemeTooltipEvt = new CustomEvent("schemeTooltip"),
	listScrollableEvt = new CustomEvent("listScrollable"),
	imageCompareEvt = new CustomEvent("imageCompare"),
	inputDateEvt = new CustomEvent("inputDate"),
	listCartEvt = new CustomEvent("listCart"),
	heightLimitEvt = new CustomEvent("heightLimit"),
	hotspotsEvt = new CustomEvent("hotspots"),
	bindInputEvt = new CustomEvent("bindInput"),
	muteVideoEvt = new CustomEvent("muteVideo"),
	shopTheLookDrawerEvt = new CustomEvent("shopTheLookDrawer"),
	productBlockPopupEvt = new CustomEvent("productBlockPopup"),
	sizechartPopupEvt = new CustomEvent("sizechartPopup"),
	navScrollEvt = new CustomEvent("navScroll");

const viewportHeight = window.innerHeight;
const navBottom = nav_main ? nav_main.getBoundingClientRect().bottom : 0;

if (search_id) {
	search_input = search_id.getElementsByTagName('input');
}

const js_selects = fp('js/plugin-selects.js', 'plugin_selects_js');


/*! Helper Functions -------------------------------------------------- */
function close_dropdown(element) {
	html_tag.classList.remove('user-form-active');
	if (element.classList.contains('toggle') && !element.classList.contains('mtoggle')) {
		element.classList.remove('toggle');
		element.setAttribute('aria-expanded', false);
		return true;
	}
	return false;
}


// Checks if the current page is NOT a fully initialized Shopify store.
const isNotShopify = () => window.Shopify === undefined || Object.keys(window.Shopify).length < 3;


/**
 * Close dropdown element
 * @param {HTMLElement} element Parent element that receives the aria-expanded attribute
 */
function toggle_dropdowns_simple(el) {
	if (el.classList.contains('toggle')) {
		el.classList.remove('toggle');
		//el.parentElement.setAttribute('aria-expanded', false);
	} else {
		el.classList.add('toggle');
		//el.parentElement.setAttribute('aria-expanded', true);
	}
}

function removeM2A() {
	html_tag.classList.remove('m2a');
	setTimeout(() => {
		html_tag.classList.remove('m2a-delay');
	}, 400);
}

function close_mobile_nav() {
	html_tag.classList.remove('nav-hover');
	removeM2A();
	Array.from(document.querySelectorAll('a[aria-controls="nav"]')).forEach(function (el) {
		el.setAttribute('aria-expanded', false);
	});
	/*enquire.register('screen and (max-width: 1000px)', function () {
		Array.from(document.getElementById('nav').querySelectorAll('a')).forEach(function (el) {
			el.setAttribute('tabindex', -1);
		});
	});*/
	function updateTabIndex() {
		if (mediaMax1000.matches) {
			Array.from(document.getElementById('nav').querySelectorAll('a')).forEach(function (el) {
				el.setAttribute('tabindex', '-1');
			});
		}
	}

	updateTabIndex();
	mediaMax1000.addEventListener('change', updateTabIndex);
}

function remove_active_submenus(elements) {
	for (const el of elements) {
		const parent = el.parentElement;
		if (parent && parent.classList.contains('toggle')) {
			parent.classList.remove('toggle');
			if (parent.getAttribute('aria-expanded') !== 'false') {
				parent.setAttribute('aria-expanded', 'false');
			}
		}
	}
}

function clear_mobile_nav() {
	if (nav_top_id) {
		remove_active_submenus(nav_top_id.querySelectorAll('a.toggle'));
	}
	if (nav_user_id) {
		remove_active_submenus(nav_user_id.querySelectorAll('a.toggle'));
	}
	if (nav_bar_id) {
		remove_active_submenus(nav_bar_id.querySelectorAll('a.toggle'));
	}
	if (nav_id) {
		setTimeout(function () {
			Array.from(nav_id.querySelectorAll('a.toggle')).forEach(el => {
				if (el.parentElement.classList.contains('toggle')) {
					el.parentElement.classList.remove('toggle');
				}
			});
			if (nav_id.hasAttribute('data-type')) {
				nav_id.removeAttribute('data-type');
			}
			Array.from(nav_id.querySelectorAll('li.mtoggle')).forEach(function (el) {
				el.classList.remove('mtoggle');
			});
			Array.from(nav_id.querySelectorAll('ul.ul-toggle')).forEach(function (el) {
				el.classList.remove('ul-toggle');
			});
			Array.from(nav_id.getElementsByClassName('header-before')).forEach(function (el) {
				el.classList.remove('data-title-active');
			});
		}, 400);
	}
}


// Toggles dropdown menus, managing classes, ARIA attributes, and layout states depending on click context.
function toggle_dropdowns(el, selector) {
	asyncCSS();
	html_tag.classList.remove('user-form-active');

	const parent = el.parentElement;

	function closeAll() {
		if (selector) {
			document.querySelectorAll(selector + ' li.toggle').forEach(item => {
				item.classList.remove('toggle');
				item.setAttribute('aria-expanded', false);
			});
		}
	}

	if (parent.classList.contains('toggle')) {
		parent.classList.remove('toggle');
		parent.setAttribute('aria-expanded', false);
		if (parent.classList.contains('has-form')) {
			html_tag.classList.remove('user-form-active');
		}
		closeAll();
	} else {
		closeAll();
		if (parent.classList.contains('has-form') &&
			!parent.classList.contains('currency') &&
			!parent.classList.contains('lang')) {
			setTimeout(() => html_tag.classList.add('user-form-active'), 0);
		}
		const ul = el.closest('ul');
		if (ul) {
			ul.querySelectorAll('li').forEach(li => li.classList.remove('toggle'));
		}
		parent.classList.add('toggle');
		parent.setAttribute('aria-expanded', true);
		parent.focus();
	}
	const horUL = el.closest('[data-type="horizontal-nav"]');
	if (horUL && nav_bar_id) {
		if (nav_bar_id.querySelectorAll('[data-type="horizontal-nav"] > li.sub.toggle').length) {
			html_tag.classList.add('nav-hover');
		} else {
			html_tag.classList.remove('nav-hover');
		}
	}
}


/**
 * @04
 * This function is super big and it's doing a lot of stuffs! If you start moving around to specific functions some pieces of that code, you'll end up with a smaller function and it will be easier to do future changes
 */

// #nav-top
window.addEventListener("navTop", function(evt) {
	if (nav_top_id) {
		// Handle #nav-top submenus
		Array.from(nav_top_id.querySelectorAll('a.toggle')).forEach(function (el) {

			function click_handler(el) {
				close_mobile_nav();
				if (nav_id) {
					remove_active_submenus(nav_id.querySelectorAll('a.toggle'));
				}
				if (nav_user_id) {
					remove_active_submenus(nav_user_id.querySelectorAll('a.toggle'));
				}
				toggle_dropdowns(el);
			}
			el.addEventListener('click', function (e) {
				click_handler(el);
				e.preventDefault();
			});
			el.addEventListener('keyup', function (e) {
				if (e.key === ' ') {
					click_handler(el);
					e.preventDefault();
				}
			});
			if (!isMobile) {
				const nextSibling = el.nextElementSibling;
				if (nextSibling) {
					nextSibling.addEventListener('mouseleave', function () {
						close_dropdown(el.parentElement);
					});
				}
			}
		});
	}
});
window.dispatchEvent(navtopEvt);

// If #nav & .shopify-section-footer exists, create a contact module for mobile menu
var footerIntoNavExecuted = false;

function footerIntoNav() {
	if (!footerIntoNavExecuted && footer_id && nav_id) {
		const f_m6cn = footer_id.getElementsByClassName('m6cn');
		const f_l4sc = footer_id.getElementsByClassName('l4sc');
		function appendIfAbsent(className, sourceElements) {
			if (!nav_id.getElementsByClassName(className).length && sourceElements.length) {
				nav_id.appendChild(sourceElements[0].cloneNode(true));
			}
		}
		appendIfAbsent('m6cn', f_m6cn);
		appendIfAbsent('l4sc', f_l4sc);

		Array.from(nav_user_id.querySelectorAll('ul[data-type="user-nav"] > li:not(.cart, .lang, .currency) img:not(.desktop-only)')).forEach(function (el) {
			const cloneMe = el.parentNode.cloneNode(true);
			cloneMe.classList.add('has-img');
			cloneMe.classList.remove('mobile-hide');
			nav_id.appendChild(cloneMe);
		});

		footerIntoNavExecuted = true;
	}
}

// Run mobile lang/currency dropdown when related lang/currency icon in the footer is clicked
document.addEventListener('click', function (event) {
	if (event.target.matches('.shopify-section-footer li.lang a[aria-controls="nav"], .shopify-section-footer li.currency a[aria-controls="nav"], .shopify-section-footer li.lang a[aria-controls="nav"] *, .shopify-section-footer li.currency a[aria-controls="nav"] *')) {
		const targetLi = event.target.closest('li');
		if (targetLi && (targetLi.classList.contains('lang') || targetLi.classList.contains('currency'))) {
			const category = targetLi.classList.contains('lang') ? 'lang' : 'currency';
			const nv_cl = nav_id.querySelector(`.${category} > a.toggle:not(.toggle-back)`);
			if (nv_cl) {
				nv_cl.click();
				setTimeout(() => nv_cl.focus(), 100);
			}
		}
		event.preventDefault();
	}
});

// If #nav exists, create a #nav-user for mobile menu
var userNavIntoNavExecuted = false;

function userNavIntoNav() {
	if (!userNavIntoNavExecuted) {
		if (nav_id) {
			// Detect if category images are in use
			/*const ni = document.querySelectorAll('#nav > ul:first-child > li > a > img, #nav-bar > ul:first-child > li > a > img, #nav > ul:first-child > li > a > .img, #nav-bar > ul:first-child > li > a > .img');
			if (ni.length) {
				Array.from(ni).forEach(function (el) {
					var cl = 'category-img';
					el.closest('[id^="nav"]').classList.add(cl);
					el.closest('ul').classList.add(cl);
				});
			}*/

			const nb = document.createElement('a');
			nb.classList.add('close', 'close-nav');
			nb.innerHTML += 'Close';
			nb.setAttribute('href', './');
			nav_id.appendChild(nb);

			// #nav submenu
			if (nav_id.hasAttribute('aria-label')) {
				const nf = createElementWithClass('div', 'header');
				nf.innerHTML = nav_id.getAttribute('aria-label');
				nav_id.prepend(nf);
			}

			const ng = document.createElement('div');
			ng.classList.add('header-before', 'header');
			nav_id.prepend(ng);

			// Create a back link for mobile menu
			const processedElements = [];
			Array.from(document.querySelectorAll('#nav > ul > li > a.toggle')).forEach(function (el) {
				const clone_me = el.cloneNode(true);
				clone_me.classList.add('toggle-back');
				el.parentElement.prepend(clone_me);
				if (!processedElements.includes(el)) {
					const clone_me = el.cloneNode(true);
					clone_me.classList.add('toggle-back');
					el.parentElement.prepend(clone_me);
					processedElements.push(el);
				}
			});

			const ndContainer = nav_id.querySelector('ul[data-type]');

			if (ndContainer) {
				var nd = ndContainer.children;

				// Create nested desktop nav
				const na = document.createElement('ul');
				na.classList.add('inner', 'ul-inner');
				nav_id.appendChild(na);

				Array.from(nd).forEach(function (el) {
					const clone = el.cloneNode(true);
					clone.classList.remove('sub-static');
					na.appendChild(clone);
				});

				na.addEventListener('mouseleave', function () {
					nav_id.classList.remove('ul-hover');
				});
			}
			if (nav_bar_id) {
				const nav_bar_li = [];
				const nav_id_btn = document.querySelectorAll('#header > .link-btn a, #header-inner > .link-btn a');
				Array.from(document.querySelectorAll('#nav-bar > ul > li')).forEach((el) => {
					const clone_me = el.cloneNode(true);
					clone_me.classList.add('nav-bar-element');
					nav_bar_li.push(clone_me);
				});
				if (nav_id_btn.length) {
					const nav_id_ul = document.querySelector('#nav > ul');
					const nav_id_sub_cont = document.createElement('li');
					nav_id_sub_cont.classList.add('nav-bar-element', 'nav-bar-element-main');
					if (document.querySelector('#nav-bar > ul > li:not(.show-all)') === null) {
						nav_id_sub_cont.classList.add('is-empty');
					}
					nav_id_sub_cont.innerHTML = '<a href="./" class="toggle-wide"><span>' + nav_id_btn[0].textContent + '</span> <span class="hidden">alle</span></a> <ul></ul>';
					if (nav_id_btn[0].classList.contains('mobile-hide')) {
						nav_id_sub_cont.classList.add('mobile-hide');
					}
					if (nav_id_btn[0].classList.contains('mobile-text-uppercase')) {
						nav_id_sub_cont.classList.add('mobile-text-uppercase');
					}
					const ariaLabel = nav_bar_id.getAttribute('aria-label');
					if (ariaLabel) {
						nav_id_sub_cont.querySelector('span.hidden').innerHTML = ariaLabel;
					}
					nav_id_ul.prepend(nav_id_sub_cont);
					nav_bar_li.forEach(function (el) {
						nav_id_ul.appendChild(el);
					});
				}
			}
			Array.from(document.querySelectorAll('#nav > ul > li > a.toggle')).forEach(function (el) {
				const clone_me = el.cloneNode(true);
				clone_me.classList.add('toggle-back');
				el.parentElement.prepend(clone_me);
			});
		}

		if (nav_user_id && nav_id) {
			const userNavElement = nav_user_id.querySelector('ul[data-type]');

			if (userNavElement) {
				const clonedUserNav = userNavElement.cloneNode(true);
				clonedUserNav.classList.add('nav-user');

				const removeElements = clonedUserNav.querySelectorAll('.currency, .lang');
				removeElements.forEach(element => element.remove());

				nav_id.appendChild(clonedUserNav);
			}

			const nav_user_form = nav_id.querySelector('.user-login');
			if (nav_user_form) {
				nav_user_form.remove();
			}
		}
		// If #nav exists, create a #nav-top for mobile menu
		if (nav_id && nav_top_id && !nav_id.querySelectorAll('ul.nav-top').length) {
			const navTopElement = nav_top_id.querySelector('ul[data-type]');

			if (navTopElement) {
				const cloneMe = navTopElement.cloneNode(true);
				cloneMe.classList.add('nav-top');
				nav_id.appendChild(cloneMe);
				cloneMe.querySelectorAll('.localization-form a').forEach(function (el) {
					el.classList.remove('listening');
				});
				window.dispatchEvent(localizationFormEvt);
			}
		}
		userNavIntoNavExecuted = true;
	}
}

// moved to custom-async.js (.m2a)
let customMegaRAF = 0;

function customMegaHeight() {
	customMegaRAF = 0;

	root_styles.style.setProperty('--mega_nav_mah', `${viewportHeight - navBottom}px`);
}

function customMega() {
	if (!nav_main || mediaMax1000.matches) return;

	if (!customMegaRAF) {
		customMegaRAF = requestAnimationFrame(customMegaHeight);
	}
}

// #nav-bar
const neq = document.querySelectorAll('a[aria-controls="nav"]');
let mediaListenerAttached = false;

function nav_burger() {
	html_tag.classList.add('has-nav');

	const toggleLinks = nav_id.querySelectorAll('a.toggle');
	for (const a of toggleLinks) a.parentElement && a.parentElement.classList.remove('toggle');

	if (nav_top_id) remove_active_submenus(nav_top_id.querySelectorAll('a.toggle'));
	if (nav_user_id) remove_active_submenus(nav_user_id.querySelectorAll('a.toggle'));
	if (nav_bar_id) remove_active_submenus(nav_bar_id.querySelectorAll('a.toggle'));

	html_tag.classList.remove('nav-hover');

	if (footer_id) {
		const checkLangCurrency = (footerSelector, topSelector, className) => {
			const footerElement = footer_id.querySelector(footerSelector);
			const topElement = top_id.querySelector(topSelector);
			if (!footerElement && topElement) {
				html_tag.classList.add(className);
			}
		};

		checkLangCurrency('li.lang', 'li.lang.mobile-nav-only', 'no-footer-lang');
		checkLangCurrency('li.currency', 'li.currency.mobile-nav-only', 'no-footer-curr');
	}

	if (html_tag.classList.contains('m2a')) {
		close_mobile_nav();
		return;
	}
	requestAnimationFrame(() => {
		html_tag.classList.add('m2a', 'm2a-delay');
		html_tag.classList.remove('search-compact-active', 'search-full', 'tr_hh', 'search-full-mode', 'user-form-active');
		if (search_id) search_id.classList.remove('full', 'has-text');

		for (const el of neq) el.setAttribute('aria-expanded', true);

		if (!mediaListenerAttached) {
			const links = nav_id.querySelectorAll('a');
			const updateTabIndex = () => {
				if (mediaMax1000.matches) {
					links.forEach(a => a.removeAttribute('tabindex'));
				}
			};
			mediaMax1000.addEventListener('change', updateTabIndex, {
				passive: true
			});
			mediaListenerAttached = true;
			updateTabIndex();
		}
	});
	requestAnimationFrame(() => {
		const nestedF = () => {
			customMega();
			userNavIntoNav();
			footerIntoNav();
		};

		if ('requestIdleCallback' in window) {
			requestIdleCallback(nestedF);
		} else {
			setTimeout(nestedF, 0);
		}

		const firstFocusable = nav_id.querySelector('li:not(.nav-bar-element) > a:not(.toggle)') || nav_id.querySelectorAll('a').item(1);
		if (firstFocusable && typeof firstFocusable.focus === 'function') {
			firstFocusable.focus();
		}

		new_css('menu-css', css_menu);
	});
}

function navSubHover(el) {
	var nav_id = document.getElementById('nav');
	if (el.classList.contains('sub') || el.classList.contains('show-all')) {
		html_tag.classList.add('nav-hover');
	} else {
		html_tag.classList.remove('nav-hover');
	}
	const d = el.dataset.index;
	const p = el.closest('ul');
	if (el.classList.contains('sub')) {
		var ulInner = nav_id.querySelector('.ul-inner');
		if (ulInner && ulInner.children.length > 0) {
			Array.from(ulInner.children).forEach(function (el) {
				el.classList.remove('hover');
				el.setAttribute('aria-expanded', false);
				if (el.matches('[data-index="' + d + '"]')) {
					el.classList.add('hover');
					/*if (el.querySelectorAll('ul ul a:not(.toggle)')[0] !== undefined) {
						setTimeout(function () {
							el.querySelectorAll('ul ul a:not(.toggle)')[0].focus();
						}, 100);
					}*/
					el.setAttribute('aria-expanded', true);
				}
			});
		}
		Array.from(p.children).forEach(function (el) {
			el.parentElement.parentElement.classList.add('ul-hover');
			el.classList.remove('hover');
			el.setAttribute('aria-expanded', false);
		});
		el.classList.add('hover');
		Array.from(el.children).forEach(function (em) {
			if (em.tagName.toLowerCase() === 'ul') {
				p.parentElement.setAttribute('data-items', em.children.length);
				if (em.parentElement.classList.contains('sub-classic') && em.children.length > 5) {
					p.parentElement.setAttribute('data-items', 1);
				}
			}
		});
		el.setAttribute('aria-expanded', true);
	} else {
		Array.from(p.children).forEach(function (el) {
			el.removeAttribute('aria-expanded', false);
		});
	}
}

window.addEventListener("nav", function (evt) {
	var s,
		t;

	if (nav_id && !isMobile) {
		nav_id.addEventListener('mouseover', function () {
			new_css('menu-css', css_menu);
		});
	}
	if (top_id) {
		Array.from(top_id.querySelectorAll('a.toggle')).forEach(function (el) {
			el.addEventListener('click', function () {
				new_css('menu-css', css_menu);
			});
		});
		if (!isMobile) {
			top_id.addEventListener('mouseover', function () {
				new_css('menu-css', css_menu);
			});
		}
	}
	if (nav_bar_id || nav_id) {
		html_tag.classList.remove('t1mn');
		html_tag.classList.remove('t1nn');
	} else {
		html_tag.classList.add('t1mn');
		html_tag.classList.add('t1nn');
	}

	if (nav_bar_id) {
		append_url(nav_bar_id.children[0], 'Close', 'close');
		nav_bar_id.querySelectorAll('a.toggle').forEach(el => {
			el.parentElement.classList.add('sub');

			const click_handler = el => {
				close_mobile_nav();
				if (nav_id) remove_active_submenus(nav_id.querySelectorAll('a.toggle'));
				if (nav_top_id) remove_active_submenus(nav_top_id.querySelectorAll('a.toggle'));
				if (nav_user_id) remove_active_submenus(nav_user_id.querySelectorAll('a.toggle'));
				toggle_dropdowns(el);
			};

  			['click', 'touchstart'].forEach(evt => {
				el.addEventListener(evt, e => {
					click_handler(el);
					e.preventDefault();
				});
			});

			el.addEventListener('keyup', e => {
				if (e.key === ' ') {
					click_handler(el);
					e.preventDefault();
				}
			});
		});

		if (!isMobile) {
			Array.from(document.querySelectorAll('#nav-bar > ul > li')).forEach((el) => {
				el.addEventListener('mouseover', function () {
					removeM2A();
				});
			});
		}

		const nav_id_btn = document.querySelectorAll('#header > .link-btn a, #header-inner > .link-btn a');
		if (nav_id_btn.length) {
			html_tag.classList.remove('t1nb');
		} else {
			html_tag.classList.add('t1nb');
		}

		// handle mouseovers
		if (!isMobile && nav_bar_id.children[0] !== undefined) {
			Array.from(nav_bar_id.children[0].children).forEach(function (el) {
				el.addEventListener('mouseover', function (e) {
					if (el.classList.contains('sub') || el.classList.contains('show-all')) {
						html_tag.classList.add('nav-hover');
					} else {
						html_tag.classList.remove('nav-hover');
					}
				});
				el.addEventListener('mouseleave', function (e) {
					html_tag.classList.remove('nav-hover');
				});
			});
		}
	}

	if (nav_id) {
		Array.from(document.querySelectorAll('#nav > ul > li > a.toggle')).forEach(function (el) {
			if (!el.parentNode.querySelectorAll('li > ul:first-child').length) {
				el.parentElement.classList.add('sub-classic');
			}
		});

		// Handle #nav submenus for mobile
		for (const el of nav_id.querySelectorAll('a.toggle')) {
			const parent = el.parentElement;

			if (!parent.classList.contains('sub')) {
				parent.classList.add('sub');
			}
		}

		const ndContainer = nav_id.querySelector('ul[data-type]');

		if (ndContainer) {
			var nd = ndContainer.children;

			Array.from(nd).forEach(function (el, index) {
				el.setAttribute('data-index', nd.length - index);
			});

			// #nav hover
			Array.from(nd).forEach(function (el) {
				if (!isMobile) {
					el.addEventListener('mouseover', function (e) {
						navSubHover(el);
						e.preventDefault();
					});
					el.addEventListener('mouseleave', function (e) {
						html_tag.classList.remove('nav-hover');
					});
				}
				Array.from(el.querySelectorAll('a.toggle:not(.toggle-back)')).forEach(function (em) {
					em.addEventListener('click', function (e) {
						navSubHover(el);
					});
				});
			});
			if (!isMobile) {
				Array.from(nd).forEach(function (el) {
					el.addEventListener('mouseover', function (e) {
						if (el.classList.contains('sub') || el.classList.contains('show-all')) {
							html_tag.classList.add('nav-hover');
						} else {
							html_tag.classList.remove('nav-hover');
						}
					});
					el.addEventListener('mouseleave', function (e) {
						html_tag.classList.remove('nav-hover');
					});
				});
			}
		}

		// #nav burger
		if (!html_tag.classList.contains('t1nn')) {
			html_tag.classList.remove('t1nn');
		}
	}
	if (neq) {
		const getDist = function (el, e) {
			const linkBtn = el.closest('.link-btn');
			if (linkBtn) {
				const container = linkBtn.offsetParent;
				if (container && container.id === 'header') {
					const l1 = linkBtn.getBoundingClientRect();
					const l2 = container.getBoundingClientRect();
					const dl = l1.left - l2.left;
					const dr = l2.right - l1.right;
					root_styles.style.setProperty('--nav_l', dl + 'px');
					root_styles.style.setProperty('--nav_r', dr + 'px');
				}
			}
		};
		for (const el of neq) {
			el.addEventListener('click', e => {
				nav_burger();
				getDist(el, e);
				e.preventDefault();
			});

			el.addEventListener('keyup', e => {
				if (e.key === ' ') {
					nav_burger();
					getDist(el, e);
					e.preventDefault();
				}
			});
		}
	}

	if ((!nav_id && !nav_bar_id) && !html_tag.classList.contains('t1nn')) {
		html_tag.classList.add('t1nn');
	}

	if (nav_id) {
		function navHandlerX(el) {
			clear_mobile_nav();
			close_mobile_nav();
		}

		function navHandlerWide(el) {
			html_tag.classList.toggle('nav-more-active');
		}

		function navHandler(el) {
			var parentElement = el.parentElement;
			var mobileHeader = nav_id.querySelector('.header-before');
			var parentList = el.closest('ul');
			if (nav_top_id) {
				remove_active_submenus(nav_top_id.querySelectorAll('a.toggle'));
			}
			if (nav_bar_id) {
				remove_active_submenus(nav_bar_id.querySelectorAll('a.toggle'));
			}
			if (nav_user_id) {
				remove_active_submenus(nav_user_id.querySelectorAll('a.toggle'));
			}
			if (parentElement.classList.contains('toggle')) {
				parentElement.classList.remove('toggle', 'mtoggle');
				parentList.classList.remove('ul-toggle');
				/*if (nav_id.hasAttribute('data-type')) {
        nav_id.removeAttribute('data-type');
      }*/
				if (parentElement.hasAttribute('data-title')) {
					mobileHeader.classList.remove('data-title-active');
				}
			} else {
				Array.from(parentList.children).forEach(function (el) {
					el.classList.remove('toggle');
				});
				parentElement.classList.add('toggle', 'mtoggle');
				parentList.classList.add('ul-toggle');
				nav_id.setAttribute('data-type', el.closest('[data-type]').getAttribute('data-type'));
				if (parentElement.hasAttribute('data-title')) {
					mobileHeader.innerHTML = parentElement.getAttribute('data-title');
					mobileHeader.classList.add('data-title-active');
				}
			}
			if (nav_id.querySelectorAll('.ul-toggle:not(.nav-user)').length === 0) {
				nav_id.removeAttribute('data-type');
			}
			if (nav_id.querySelectorAll('[data-type="main-nav"] > li.sub.toggle').length) {
				html_tag.classList.add('nav-hover');
			} else {
				html_tag.classList.remove('nav-hover');
			}
		}
		nav_id.addEventListener('click', function (event) {
			if (event.target.matches('a.toggle, a.toggle *')) {
				navHandler(event.target.closest('a.toggle'));
				event.preventDefault();
			}
			if (event.target.matches('a.toggle-wide, a.toggle-wide *')) {
				navHandlerWide(event.target.closest('a.toggle'));
				event.preventDefault();
			}
			if (event.target.matches('.check label, .check label *')) {
				const checkbox = event.target.closest('.check.inside').querySelector('input');
				if (checkbox) {
					const checked = checkbox.checked;
					checkbox.checked = !checked;
				}
			}
			if (event.target.matches('a.close-nav')) {
				navHandlerX(event.target);
				event.preventDefault();
			}
		});
		nav_id.addEventListener('keyup', function (event) {
			if (event.key === ' ') {
				if (event.target.matches('a.toggle, a.toggle *')) {
					navHandler(event.target.closest('a.toggle'));
				}
				if (event.target.matches('a.toggle-wide, a.toggle-wide *')) {
					navHandlerWide(event.target.closest('a.toggle'));
				}
				if (event.target.matches('a.close-nav')) {
					navHandlerX(event.target);
				}
				event.preventDefault();
			}
		});
	}

	// .sub-static
	if (top_id && !isMobile) {
		const sub_static = top_id.querySelectorAll('.sub-static li > ul:not(:first-child):not(:last-child)');
		for (const el of sub_static) {
			el.parentElement.addEventListener('mouseenter', function () {
				if (el.parentElement.parentElement.clientHeight < (el.clientHeight + el.parentElement.offsetTop - Math.abs(el.offsetTop))) {
					el.classList.add('rounded-b2r');
				}
			});
		}
	}

	function linkSmallPopup(em) {
		requestAnimationFrame(() => {
			const inner = em.querySelector('.inner');
			const innerText = em.querySelector('.inner-text');

			if (!inner || !innerText) return;

			const innerW = inner.getBoundingClientRect().width;
			const textW = innerText.getBoundingClientRect().width;

			if (textW - innerW > 4) {
				em.classList.add('longer');
			} else {
				em.classList.remove('longer');
			}
		});
	}

	if (top_id) {
		function createLinkedPopup(em, innerText, dataIndex) {
			if (!document.querySelector('.popup-a[data-title="' + dataIndex + '"]')) {
				const linkedPopup = document.createElement('div');
				linkedPopup.classList.add('popup-a', 'w360');
				linkedPopup.setAttribute('data-title', dataIndex);
				linkedPopup.innerHTML = `<p>${innerText}</p>`;
				root_id.appendChild(linkedPopup);
			}
		}

		const list_usp_header = top_id.getElementsByClassName('l4us');
		if (list_usp_header.length) {
			Array.from(list_usp_header).forEach(function (el, in1) {
				Array.from(el.querySelectorAll('li')).forEach(function (em, in2) {
					const innerText = em.innerHTML;

					const dataIndex = 'usp-' + in1 + in2;

					em.innerHTML = '<span class="outer"><span class="inner">' + innerText + '</span> <a href="./" class="linked" data-popup="' + dataIndex + '">' + translations.readmore_text + '</a> <span class="inner-text">' + innerText + '</span></span>';
					Array.from(el.querySelectorAll('.inner-text a')).forEach(function (en) {
						en.setAttribute('tabindex', '-1');
					});
					if (isHasSelectorSupported()) {
						if (em.querySelector('img') || em.querySelector('svg')) {
							em.classList.add('has-img');
							el.classList.add('has-img');
						}
					}
					em.classList.add('rendered');

					requestAnimationFrame(() => {
						linkSmallPopup(em);
					});
					window.addEventListener('resize', throttle(() => {
						linkSmallPopup(em);
					}, 500));

					if (el.classList.contains('slider-single') && el.classList.contains('s4wi')) {
						const isSwiper = el.getElementsByClassName('swiper-outer')[0].swiper;
						if (isSwiper !== undefined) {
							append_url(em.querySelectorAll('.outer')[0], 'Next', 'next-item');
							Array.from(el.getElementsByClassName('next-item')).forEach(function (eo) {
								eo.addEventListener('click', function (e) {
									isSwiper.slideNext();
									e.preventDefault();
								});
							});
						}
					}
					if (!isMobile) {
						el.addEventListener('mouseover', function () {
							createLinkedPopup(em, innerText, dataIndex);
						});
					}
					document.addEventListener('keyup', function () {
						createLinkedPopup(em, innerText, dataIndex);
					});
					document.addEventListener('touchstart', function () {
						createLinkedPopup(em, innerText, dataIndex);
					});
				});
			});
		}
	}


	// #nav-user
	if (nav_user_id) {
		// Create a close links for form dropdown (login)
		Array.from(nav_user_id.querySelectorAll('li > form')).forEach(function (el) {
			el.parentNode.classList.add('has-form');
			el.closest('#nav-user').classList.add('has-form');
			append_url(el, 'Toggle', 'toggle');
			append_url(el.parentElement, 'Toggle', 'toggle');
		});

		// Handle #nav-user submenus
		Array.from(nav_user_id.querySelectorAll('a.toggle')).forEach(function (el) {
			function click_handler(el) {
				close_mobile_nav();
				if (nav_id) {
					remove_active_submenus(nav_id.querySelectorAll('a.toggle'));
				}
				if (nav_top_id) {
					remove_active_submenus(nav_top_id.querySelectorAll('a.toggle'));
				}
				if (nav_bar_id) {
					remove_active_submenus(nav_bar_id.querySelectorAll('a.toggle'));
				}
				toggle_dropdowns(el);
			}
			el.addEventListener('click', function (e) {
				click_handler(el);
				e.preventDefault();
			});
			el.addEventListener('keyup', function (e) {
				if (e.key === ' ') {
					click_handler(el);
					e.preventDefault();
				}
			});
			if (!isMobile) {
				const nextElementSibling = el.nextElementSibling;
				if (nextElementSibling && nextElementSibling.tagName.toLowerCase() !== 'form') {
					nextElementSibling.addEventListener('mouseleave', function () {
						close_dropdown(el.parentElement);
					});
				}
			}
		});
	}

});
window.dispatchEvent(navEvt);

window.transparentHeaderAsync = function() {
	let content_id = document.getElementById('content');
	if (content_id && header_inner) {
		var ffa = content_id.children[0],
				ffc,
				ffd = false,
				ffe = false;
		if (ffa !== undefined) {
			ffc = ffa.children[0];
			if (ffa.classList.contains('shopify-section') && header_inner.hasAttribute('data-transparent')) {
				ffd = true;
			}
			if ((ffc !== undefined && ffc.classList.contains('m6bx') && ffc.classList.contains('wide')) || (ffc !== undefined && ffc.classList.contains('m6fr') && ffc.classList.contains('wide'))) {
				ffe = true;
				ffc.classList.add('im-tr');
			}
			if (document.querySelectorAll('.shopify-section-header ~ [class*="shopify-section-announcement-bar"]').length) {
				ffd = false;
			}
			if (ffd === true && ffe === true && ffc.classList.contains('wide-transparent')) {
				top_id.classList.add('transparent');
				html_tag.classList.add('has-first-m6fr-wide');
				if (ffc.classList.contains('m6bx')) {
					html_tag.classList.add('has-first-m6bx-wide');
				}
				if (ffc.classList.contains('flexible-section')) {
					html_tag.classList.add('has-first-flexbile-wide');
				} else {
					html_tag.classList.remove('has-first-flexbile-wide');
				}
				ffc.classList.add('is-first-m6fr-wide');
				var firstSlide =  ffa.querySelectorAll('.swiper-slide-active article').length > 0 ? ffa.querySelectorAll('.swiper-slide-active article')[0] : ffa.querySelectorAll('article')[0];
				var palette = firstSlide.getAttribute('data-color-palette') || ffa.querySelectorAll('.m6fr')[0].getAttribute('data-active-content-desktop');
				if (palette != null ) {
					setTimeout(function(){
						root_styles.style.setProperty('--transparent_header_fg', 'var(--' + palette.replace('_gradient', '') + '_fg)');
						root_styles.style.setProperty('--transparent_header_bg', 'var(--' + palette + '_bg)');
						root_styles.style.setProperty('--transparent_header_btn_bg', 'var(--' + palette.replace('_gradient', '') + '_btn_bg)');
						root_styles.style.setProperty('--transparent_header_btn_fg', 'var(--' + palette.replace('_gradient', '') + '_btn_fg)');
						if (palette.includes('white') || palette.includes('light')) {
							root_styles.style.setProperty('--transparent_header_bd', 'var(--header_border_color_light)');
						} else {
							root_styles.style.setProperty('--transparent_header_bd', 'var(--header_border_color_dark)');
						}

					}, 0);
				}
			} else {
				header_inner.classList.remove('transparent');
				html_tag.classList.remove('has-first-m6fr-wide', 'has-first-m6bx-wide');
			}
		}
	}
}
transparentHeaderAsync();

// Observes footer visibility to add toggle links to headers and handles their click to toggle dropdowns.
if (footer_id) {
	let isFooterIo = false;

	function footerIo(entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting && !isFooterIo) {
				Array.from(footer_id.querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach(el => {
					append_url(el, 'Close', 'header-toggle');
				});
				isFooterIo = true;
				observer.unobserve(entry.target);
			}
		});
	}

	const observer = new IntersectionObserver(footerIo);
	observer.observe(footer_id);

	footer_id.addEventListener('click', function (event) {
		if (event.target.matches('a.header-toggle')) {
			const closestHeader = event.target.closest('h1, h2, h3, h4, h5, h6');
			if (closestHeader) {
				toggle_dropdowns_simple(closestHeader.parentElement);
				event.preventDefault();
			}
		}
	});
}

// Mobile nav to be keyboard accessible only on mobile devices
if (nav_id) {
	/*enquire.register('screen and (max-width: 1000px)', function () {
		Array.from(nav_id.querySelectorAll('a')).forEach(function (el) {
			el.setAttribute('tabindex', -1);
		});
	}).register('screen and (min-width: 1001px)', function () {
		Array.from(nav_id.querySelectorAll('a')).forEach(function (el) {
			el.removeAttribute('tabindex');
		});
	});*/
	function navTabSet() {
		const links = nav_id.querySelectorAll('a');
		if (mediaMax1000.matches) {
			for (const el of links) {
				if (el.tabIndex !== -1) {
					el.setAttribute('tabindex', '-1');
				}
			}
		} else {
			for (const el of links) {
				if (el.hasAttribute('tabindex')) {
					el.removeAttribute('tabindex');
				}
			}
		}
	}

	navTabSet();
	mediaMax1000.addEventListener('change', navTabSet);
}


// Closes mobile nav and clears search on Escape key, removing active submenu states from various navigation elements.
document.addEventListener('keydown', function (evt) {
	evt = evt || window.event;
	if (evt.key === 'Escape' || evt.key === 'Esc') {
		close_mobile_nav();
		clearCompactSearch();
		if (nav_id) {
			remove_active_submenus(nav_id.querySelectorAll('a.toggle'));
		}
		if (nav_top_id) {
			remove_active_submenus(nav_top_id.querySelectorAll('a.toggle'));
		}
		if (nav_user_id) {
			remove_active_submenus(nav_user_id.querySelectorAll('a.toggle'));
		}
		if (nav_bar_id) {
			remove_active_submenus(nav_bar_id.querySelectorAll('a.toggle'));
		}
		if (all_list_drop.length > 0) {
			Array.from(all_list_drop).forEach(function (element) {
				//all_list_drop.forEach(element => {
				remove_active_submenus(element.querySelectorAll('a.toggle'));
			});
		}
	}
});

// Add Toggleable functionality to all ".l4dr" elements
window.addEventListener("listDrop", function(evt) {
	var all_list_drop = document.querySelectorAll('.l4dr');
	Array.from(all_list_drop).forEach(function (element) {
		Array.from(element.querySelectorAll('a.toggle')).forEach(function (el) {
			function click_handler(el) {
				toggle_dropdowns(el, '.l4dr');
				new_css('menu-css', css_menu);
			}
			el.addEventListener('click', function (e) {
				click_handler(el);
				e.preventDefault();
			});
			el.addEventListener('keyup', function (e) {
				if (e.key === ' ') {
					click_handler(el);
					e.preventDefault();
				}
			});
			if (!isMobile) {
				el.nextElementSibling.addEventListener('mouseleave', function () {
					close_dropdown(el.parentElement);
				});
			}
		});
	});
});
window.dispatchEvent(listDropEvt);


document.onclick = function (evt) {
	evt = evt || window.event;
	var clicked_element = evt.target;
	var all_aria_expanded = document.querySelectorAll('[aria-expanded="true"]'),
			el_aria_expanded,
			closest_link;
	// if there's no dropdown open, do nothing
	if (all_aria_expanded.length === 0) {
		return
	}

	// loop through all opened dropdowns and check if click was inside/outside of it to determine if keeps opened or not
	// it will keeps opened only if click in an inside element that's not a children of a clickable link
	for (el_aria_expanded of all_aria_expanded) {
		if (el_aria_expanded === clicked_element) {
			continue;
		}
		// .contains() will check if clicked_element belongs to el_aria_expanded
		// and if belongs to, don't do anything (leave dropdown opened)
		if (el_aria_expanded.contains(clicked_element)) {
			// close dropdown when clicked in any of the links <a> present in dropdown
			closest_link = clicked_element.closest("a:not(.toggle, .show)");
			if (closest_link && closest_link.contains(clicked_element)) {
				close_dropdown(el_aria_expanded);
			}
			continue;
		}

		close_dropdown(el_aria_expanded);
	}
};


/////////////////////////////////////

function aria_hide(el) {
	if (el) {
		el.setAttribute('aria-hidden', 'true');
		el.setAttribute('focusable', 'false');
	}
}

function aria_show(el) {
	if (el) {
		el.setAttribute('aria-hidden', 'false');
		el.setAttribute('focusable', 'true');
	}
}

// check if string ends with any of array suffixes
function endsWithAny(suffixes, string) {
	for (let suffix of suffixes) {
		if (string.endsWith(suffix))
			return true;
	}
	return false;
}


// Form validation
const validation_css = fp('styles/async-validation.css', 'async_validation_css');
const validation_js = fp('js/plugin-validator.js', 'plugin_validator_js');
	
function validate_me(el) {
	el.querySelectorAll('p:not(.s1pr, .r6rt), ul, span.input-amount').forEach(em => {
		if (!em.classList.contains('form-group') && !em.classList.contains('l4us')) {
			if (!em.querySelector('.invalid-feedback')) {
				em.appendChild(createElementWithClass('span', 'invalid-feedback'));
			}
			em.classList.add('form-group');

			em.querySelectorAll('.invalid-feedback').forEach(en => {
				if (en.previousElementSibling) {
					en.previousElementSibling.classList.add('last-child');
				}
			});

			em.querySelectorAll('span[class*="size-"] + .invalid-feedback').forEach(en => {
				en.previousElementSibling.before(en);
			});
		}
	});
	loadRes(validation_js, function () {
		if (typeof Validator === 'function') {
			el.noValidate = true;
			const validationPlugin = new Validator(el, {
				autoScroll: false,
				showValid: true
			});

			if (!validationPlugin.hasError()) {
				validationPlugin.setSubmitEnabled();
			}
		}
		new_css('form-validation-css', validation_css);
	}, 'validator-loaded');
}

function validator_run(el) {
	const requiredElements = el.querySelectorAll('[required]');
	const submitButtons = el.querySelectorAll('button[type="submit"]');

	const hasEmptyRequired = Array.from(requiredElements).some(en => {
		const tag = en.tagName.toLowerCase();
		return (tag === 'input' || tag === 'textarea') && !en.value.trim();
	});

	for (const btn of submitButtons) {
		btn.disabled = hasEmptyRequired;
	}

	el.querySelectorAll('input, select, textarea, button').forEach(input => {
		['focus', 'change'].forEach(evt =>
			input.addEventListener(evt, () => validate_me(el))
		);
	});
	if (!isMobile) {
		el.addEventListener('mouseenter', () => validate_me(el));
	}
	if (el.querySelector('footer.hidden')) {
		el.addEventListener('submit', e => {
			el.classList.add('submitted');
			e.preventDefault();
		});
	}
}

const formValidateEvt = new CustomEvent('formValidate')
window.addEventListener('formValidate', function (evt) {
	const form_validate = document.querySelectorAll('.f8vl');
	const nav_entry = performance.getEntriesByType('navigation')[0];
	const nav_type = nav_entry ? nav_entry.type : performance.navigation.type;

	if (nav_type !== 'back_forward' && form_validate.length) {
		form_validate.forEach(form => validator_run(form));
	}
});
window.dispatchEvent(formValidateEvt);


// Replaces obfuscated email text when the element enters the viewport.
const aEmailEls = document.querySelectorAll('.email');
const aEmailObs = new IntersectionObserver((entries, obs) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const el = entry.target;
			const tag = el.tagName.toLowerCase();

			if (tag !== 'input' && tag !== 'div') {
				const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
				if (textNode) {
					textNode.textContent = textNode.textContent.replace('//', '@').replace(/\//g, '.');
				}

				if (tag === 'a') {
					el.setAttribute('href', 'mailto:' + (textNode ? textNode.textContent.trim() : el.innerText.trim()));
				}
			}

			obs.unobserve(el);
		}
	});
});
aEmailEls.forEach(el => aEmailObs.observe(el));


var changeInputsRequired = function(addAttribute, container) {
	Array.from(container.querySelectorAll('input, textarea')).forEach(function (el) {
		if (!addAttribute) {
			el.checked = false;
			el.setAttribute('disabled', 'disabled');
			if (el.getAttribute('data-required') != undefined) {
				el.removeAttribute('required');
			}
		} else {
			el.removeAttribute('disabled');
			if (el.getAttribute('data-required') != undefined) {
				el.setAttribute('required', 'required');
			}
		}
	});
};

// Show/hide/toggle [data-element]
function data_show_me(el) {
	el.addEventListener('click', function (e) {
		Array.from(document.querySelectorAll('[data-element]')).forEach(function (el) {
			el.classList.add('hidden');
		});
		Array.from(document.querySelectorAll('[data-element="' + el.getAttribute('data-enable') + '"]')).forEach(function (el) {
			el.classList.remove('hidden');
		});
		if (el.tagName.toLowerCase() === 'a') {
			e.preventDefault();
		}
	});
}

function data_hide_me(el) {
	el.addEventListener('click', function (e) {
		Array.from(document.querySelectorAll('[data-element="' + el.getAttribute('data-disable') + '"]')).forEach(function (el) {
			el.classList.add('hidden');
		});
		if (el.tagName.toLowerCase() === 'a') {
			e.preventDefault();
		}
	});
}

function data_togg_me(el) {
	el.addEventListener('click', function (e) {
		const parent = el.parentElement;
		Array.from(document.querySelectorAll('[data-element="' + el.getAttribute('data-toggle') + '"]')).forEach(function (el) {
			if (el.classList.contains('hidden')) {
				el.classList.remove('hidden');
			} else {
				el.classList.add('hidden');
			}
			if (el.closest('.l4cl.box') !== null) {
				lastVis(el.closest('.l4cl.box'));
			}
		});
		if (el.tagName.toLowerCase() === 'a') {
			if (parent.classList.contains('link-toggle-clicked')) {
				parent.classList.remove('link-toggle-clicked');
			} else {
				parent.classList.add('link-toggle-clicked');
			}
			e.preventDefault();
		}
	});
}
// Show/hide/toggle [data-element]
window.addEventListener("showHideDataElement", function (evt) {
	var data_show = document.querySelectorAll('a[data-enable]:not(.data-enable-listening), input[data-enable]:not(.data-enable-listening), button[data-enable]:not(.data-enable-listening)'),
			data_hide = document.querySelectorAll('a[data-disable]:not(.data-disable-listening), input[data-disable]:not(.data-disable-listening), button[data-disable]:not(.data-disable-listening)'),
			data_toggle = document.querySelectorAll('a[data-toggle]:not(.data-toggle-listening), input[data-toggle]:not(.data-toggle-listening), button[data-toggle]:not(.data-toggle-listening)');
	if (data_show.length || data_hide.length || data_toggle.length) {
		Array.from(data_show).forEach(function (el) {
			el.classList.add('data-enable-listening');
			data_show_me(el);
		});
		Array.from(data_hide).forEach(function (el) {
			el.classList.add('data-disable-listening');
			data_hide_me(el);
		});
		Array.from(data_toggle).forEach(function (el) {
			el.classList.add('data-toggle-listening');
			data_togg_me(el);
		});
	}
});
window.dispatchEvent(showHideDataElementEvt);

// Toggle input type
const a_show = document.querySelectorAll('a.show');
if (a_show.length) {
	// renamed i to index. Below you do a for-loop and use the same variable name i. This can be really confusing
	// and, as you assign in the for loop the i variable, this i from the function(el, i) is never used - could be removed from code
	Array.from(a_show).forEach(function (el) {
		var c = el.children,
				d = el.parentElement.nextElementSibling,
				i,
				all;
		el.parentElement.classList.add('has-show');
		d.addEventListener('keyup', function (e) {
			if (d.value === '') {
				el.parentElement.classList.remove('not-empty');
			} else {
				el.parentElement.classList.add('not-empty');
			}
		});
		el.addEventListener('click', function (e) {
			el.classList.toggle('show-toggle');
			for (i = 0, all = c.length; i < all; i = i + 1) {
				c[i].classList.toggle('hidden');
			}
			if (d.getAttribute('type') === 'password') {
				d.setAttribute('type', 'text');
			} else {
				d.setAttribute('type', 'password');
			}
			e.preventDefault();
		});
	});
}


// .input-amount - initializes and manages numeric input components with increment/decrement buttons, syncing linked inputs, enforcing min/max limits, and handling updates via custom events.
function amountRun(el) {
	el.classList.add('semantic-input-initialized');

	const frag = document.createDocumentFragment();
	const semAm = document.createElement('span');
	semAm.className = 'semantic-amount';

	while (el.firstChild) {
		semAm.appendChild(el.firstChild);
	}
	frag.appendChild(semAm);
	el.appendChild(frag);

	el.querySelectorAll('.semantic-amount').forEach((child) => {
		const inp = child.querySelector('input');
		if (!inp) return;

		const inc = document.createElement('a');
		const dec = document.createElement('a');
		inc.className = 'incr';
		dec.className = 'decr';
		inc.setAttribute('role', 'button');
		dec.setAttribute('role', 'button');
		inc.setAttribute('aria-label', 'Increase by 1');
		dec.setAttribute('aria-label', 'Decrease by 1');

		child.appendChild(inc);
		child.appendChild(dec);

		const value = parseFloat(inp.value) || 0;
		const min = parseFloat(inp.getAttribute('min')) || 0;
		const max = parseFloat(inp.getAttribute('max')) || Infinity;

		if (value <= min || value <= 1) dec.classList.add('disabled');
		if (value >= max) inc.classList.add('disabled');
	});

	const parent = el.parentNode;
	if (parent && parent.classList.contains('submit')) {
		const hasM = parent.querySelector('.size-m');
		const hasL = parent.querySelector('.size-l');
		if (hasM) el.classList.add('size-m');
		if (hasL) el.classList.add('size-l');
	}
}

function amountClick(elements) {
	Array.from(elements).forEach((el) => {
		if (el.classList.contains('input-amount-listening')) return;
		el.classList.add('input-amount-listening');

		const input = el.querySelector('input');
		const decr = el.querySelector('.decr');
		const incr = el.querySelector('.incr');
		const step = parseFloat(input.getAttribute('step')) || 1;
		const min = parseFloat(input.getAttribute('min')) || 1;
		const max = parseFloat(input.getAttribute('max')) || Infinity;

		const linkedInputSelector = input.getAttribute('data-link');
		const linkedInput = linkedInputSelector ? document.querySelector(linkedInputSelector) : null;

		let _updating = false;

		const updateValue = (newValue) => {
			if (_updating) return;
			_updating = true;

			newValue = Math.max(min, Math.min(max, newValue));
			input.value = newValue;
			if (linkedInput) linkedInput.value = newValue;

			decr.classList.toggle('disabled', newValue <= min);
			incr.classList.toggle('disabled', newValue >= max);

			input.dispatchEvent(new Event('change'));

			_updating = false;
		};

		decr.addEventListener('click', (e) => {
			if (!decr.classList.contains('disabled')) updateValue(parseFloat(input.value) - step);
			e.preventDefault();
		});

		incr.addEventListener('click', (e) => {
			if (!incr.classList.contains('disabled')) updateValue(parseFloat(input.value) + step);
			e.preventDefault();
		});

		input.addEventListener('change', () => {
			let val = parseFloat(input.value);
			if (isNaN(val)) val = min;
			updateValue(val);
		});

		updateValue(parseFloat(input.value) || min);
	});
}

const semanticInputEvt = new CustomEvent('semanticInput');
const changeEvent = new Event('change');

function createProductSelectChangeEvent(source, bubbles = true) {
	const event = new Event('change', { bubbles: bubbles });
	event.xclusiveStandardProductSelectSource = source || null;
	return event;
}

function beginStandardProductSelect(source, targetSource, overrides) {
	if (!window.XclusiveTheme || typeof window.XclusiveTheme.beginStandardProductSelect !== 'function') {
		return null;
	}

	try {
		return window.XclusiveTheme.beginStandardProductSelect(source, targetSource, overrides);
	} catch (error) {
		console.warn('Standard storefront product select setup failed', error);
		return null;
	}
}

function beginStandardCartMutation(type, target, payload) {
	if (
		!window.XclusiveTheme ||
		typeof window.XclusiveTheme.beginStandardCartMutation !== 'function'
	) {
		return null;
	}

	try {
		return window.XclusiveTheme.beginStandardCartMutation(type, target, payload);
	} catch (error) {
		console.warn('Standard storefront cart event setup failed', error);
		return null;
	}
}

function getStandardCartContext(target, defaultContext = 'cart') {
	if (target && target.closest && target.closest('.m6pn')) return 'dialog';
	return defaultContext;
}

function getStandardCartEventTarget(source, container) {
	if (source && source.isConnected) {
		return source.closest('form, .product-card, .m6pr, #sticky-add-to-cart, #cart, .form-cart') || source;
	}

	if (container && container.isConnected) return container;

	return document.getElementById('cart') || document.querySelector('.form-cart') || document;
}

function createStandardCartError(response, fallbackMessage) {
	const message = response && (response.description || response.message) ?
		(response.description || response.message) :
		(fallbackMessage || 'Cart mutation failed');

	return new Error(typeof message === 'string' ? message : JSON.stringify(message));
}

function createProductVariantAbortError() {
	if (typeof DOMException === 'function') {
		return new DOMException('Superseded product variant request', 'AbortError');
	}

	const error = new Error('Superseded product variant request');
	error.name = 'AbortError';
	return error;
}

window.addEventListener('semanticInput', function (evt) {
	const input_amount = document.querySelectorAll('.input-amount:not(.semantic-input-initialized, .in-popup)');
	if (!input_amount.length) return;

	input_amount.forEach(el => {
		el.classList.add('semantic-input-initialized');

		const inPopup = el.closest('[class^="popup-inset"]:not(html)');
		if (inPopup) {
			el.classList.add('in-popup');
			return;
		}

		amountRun(el);
	});
	const activeInputs = document.querySelectorAll('.input-amount:not(.in-popup, .input-amount-listening)');
	if (activeInputs.length) {
		amountClick(activeInputs);
	}
});
window.dispatchEvent(semanticInputEvt);


// Togglable input
window.addEventListener("accordeon", function (evt) {
	const input_show = document.querySelectorAll('.input-show > label');
	if (input_show.length) {
		Array.from(input_show).forEach(function (el) {
			append_url(el, 'Toggle', 'toggle');
			el.querySelector('a.toggle').addEventListener('click', function (e) {
				el.parentElement.classList.toggle('toggle');
				setTimeout(function () {
					el.parentElement.querySelector('input, textarea').focus();
				}, 0);
				e.preventDefault();
			});
		});
	}
});
window.dispatchEvent(accordeonEvt);

// .l4ne.featured - clones the first list item of featured news and places it in a new mobile-only container while hiding the original on mobile.
/*const list_news = document.querySelectorAll('.l4ne.featured');
list_news.forEach(list => {
	const firstLi = list.querySelector('li:first-child');
	if (!firstLi) return;

	const cloneMe = firstLi.cloneNode(true);
	const cloneCont = document.createElement('ul');
	cloneCont.className = 'mobile-only l4ne l4ne-figure-before';

	const firstLiParent = firstLi.closest('li');
	if (firstLiParent) firstLiParent.classList.add('mobile-hide');
	
	const frag = document.createDocumentFragment();
	frag.appendChild(cloneCont);
	cloneCont.appendChild(cloneMe);

	list.parentNode.insertBefore(frag, list);
});*/

// Update text based on title (product page)
function dataChange(el, en, eo = '.inner') {
	Array.from(document.querySelectorAll(en)).forEach(function (em) {
		Array.from(em.querySelectorAll(eo)).forEach(function (en) {
			en.innerHTML = el;
		});
	});
}
window.addEventListener("dataChange", function (evt) {
	var data_change = document.querySelectorAll('a[data-change][title]:not(.listening-data-change), input[data-change][title]:not(.listening-data-change)'),
			data_change_to = document.querySelectorAll('[class^="data-change-to"]:not(.listening-data-change)');

	if (data_change_to.length) {
		Array.from(data_change_to).forEach(function (el) {
			var oldCont = createElementWithClass('span', 'hidden');
			oldCont.innerHTML = el.innerHTML;
			const newCont = document.createElement('span');
			newCont.classList.add('inner');

			while (el.firstChild) {
				newCont.appendChild(el.firstChild);
			}

			el.appendChild(newCont);
			el.appendChild(oldCont);
			el.classList.add('listening-data-change');
		});
	}
	if (data_change.length) {
		Array.from(data_change).forEach(function (el) {
			el.classList.add('listening-data-change');
			el.addEventListener('click', function (e) {
				dataChange(el.getAttribute('title'), el.getAttribute('data-change'), ['.inner', '.hidden']);
				if (el.tagName.toLowerCase() === 'a') {
					e.preventDefault();
				}
			});
			if (!isMobile) {
				if (el.tagName.toLowerCase() === 'input' && el.nextElementSibling.tagName.toLowerCase() === 'label') {
					el.nextElementSibling.addEventListener('mouseenter', function (e) {
						dataChange(el.getAttribute('title'), el.getAttribute('data-change'));
					});
					el.nextElementSibling.addEventListener('mouseleave', function (e) {
						dataChange(document.querySelectorAll(el.getAttribute('data-change') + ' .hidden')[0].innerText, el.getAttribute('data-change'));
					});
				}
			}
		});
	}
});
window.dispatchEvent(dataChangeEvt);

// Self-embedded YouTube/Vimeo
const videoLinks = document.querySelectorAll('a[data-youtube], a[data-vimeo]');
if (videoLinks.length) {
	videoLinks.forEach(el => {
		el.addEventListener('click', e => {
			e.preventDefault();
			if (el.querySelector('iframe')) return;

			const iframe = document.createElement('iframe');
			iframe.classList.add('iframe-playing');
			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
			iframe.setAttribute('allowfullscreen', '');

			let src = '';

			if (el.hasAttribute('data-youtube')) {
				src = 'https://www.youtube.com/embed/' + el.getAttribute('data-youtube') + '?autoplay=1&rel=0';
			} else if (el.hasAttribute('data-vimeo')) {
				src = 'https://player.vimeo.com/video/' + el.getAttribute('data-vimeo') + '?autoplay=1';
			}

			if (src) {
				iframe.setAttribute('src', src);
				el.appendChild(iframe);
			}
		});
	});
}

// play/mute video
window.addEventListener("muteVideo", function (evt) {
	const a_video = document.querySelectorAll('a video, a ~ video, a ~ picture video');
	if (a_video.length) {
		a_video.forEach(el => {
			const muteLink = document.createElement('span');
			muteLink.classList.add('link-mute');

			const anchor = document.createElement('a');
			anchor.href = './';
			anchor.textContent = 'Mute';

			muteLink.appendChild(anchor);

			const pictureEl = el.closest('picture');
			if (pictureEl) {
				const linkPicEl = pictureEl.closest('a');
				if (linkPicEl) {
					linkPicEl.insertAdjacentElement('afterend', muteLink);
				} else {
					pictureEl.insertAdjacentElement('afterend', muteLink);
				}
			}
			muteLink.querySelector('a').addEventListener('click', function (e) {
				e.preventDefault();
				muteLink.classList.toggle('muted');
				el.muted = muteLink.classList.contains('muted');
			});
			const figureEl = el.closest('figure');
			const linkEl = el.closest('a');
			let av;
			if (figureEl !== null) {
				av = figureEl.querySelector('.link-overlay:not([data-banner-overlay])');
			}
			if (linkEl !== null) {
				av = linkEl;
			}
			if (av) {
				av.addEventListener('click', function (e) {
					if (av.classList.contains('video-clicked')) {
						av.classList.remove('video-clicked');
						el.pause();
					} else {
						av.classList.add('video-clicked');
						el.play();
					}
					//el.setAttribute('controls', true);
					e.preventDefault();
				});
			}
		});
	}
});
window.dispatchEvent(muteVideoEvt);

window.addEventListener("bindInput", function (evt) {
	var data_bind_input = document.querySelectorAll('input[data-bind], textarea[data-bind]');
	if (data_bind_input.length) {
		Array.from(data_bind_input).forEach(function (el) {
			el.addEventListener('change', function (e) {
				var binded = document.querySelectorAll('input[id="' + el.getAttribute('data-bind') + '"], textarea[id="' + el.getAttribute('data-bind') + '"]'),
						check_cont;
				Array.from(binded).forEach(function (em) {
					if (em.tagName === 'INPUT') {
						check_cont = em.closest('.check');
						em.checked = el.checked;
						if (check_cont !== null && el.checked === true) {
							check_cont.getElementsByClassName('invalid-feedback')[0].innerHTML = '';
						}
					} else if (em.tagName === 'TEXTAREA') {
						em.value = el.value;
						// em.setAttribute('xname', em.getAttribute('name'));
						em.removeAttribute('name');
					}
				});
			});
		});
	}
});
window.dispatchEvent(bindInputEvt);

// f8ps extra space & display (product page)
const form_product_sticky = document.querySelector('.f8ps');
const form_product = document.getElementsByClassName('f8pr');
// const headerHeight = top_id.offsetHeight;
if (form_product_sticky) {
	if (!form_product_sticky.classList.contains('align-top')) {
		html_tag.classList.add('has-f8ps');
	} else {
		html_tag.classList.add('has-f8ps-top');
	}
	html_tag.classList.add('product-not-scrolled');
	aria_hide(form_product_sticky);

	//root_styles.style.setProperty('--shopify_section_header_height', headerHeight + 'px');

	Array.from(form_product_sticky.querySelectorAll('a, input, button, select, textarea, [role="button"]')).forEach(function (childEl) {
		childEl.setAttribute('tabindex', -1);
	});
}


// f8pr - sticky compact form

function clearStickyForm() {
	Array.from(form_product).forEach((el) => {
		if (el.closest('.m6pr') !== null) {
			html_tag.classList.remove('product-scrolled');
			html_tag.classList.add('product-not-scrolled');
			if (form_product_sticky) {
				aria_hide(form_product_sticky);
			}
		}
	});
}

if (form_product.length) {
	function handleResizeAndScroll() {
		new_css('css-product-scrolled', window.filepaths['async_product_scrolled_css']);
	}

	function assignStyles() {
		if (form_product_sticky) {
			root_styles.style.setProperty('--f8ps_h', form_product_sticky.clientHeight + 'px');
		}
	}

	if (form_product_sticky) {
		window.addEventListener('resize', throttle(() => {
			handleResizeAndScroll();
			assignStyles();
		}, 500));
		window.addEventListener('scroll', function () {
			handleResizeAndScroll();
		});
	}

	let ho_h = false;
	window.addEventListener('scroll', function () {
		if (!ho_h) {
			root_styles.style.setProperty('--header_outer_height', header_outer.offsetHeight + 'px');
		}
		ho_h = true;
	});

	Array.from(form_product).forEach((el) => {
		if (el.closest('.m6pr') !== null) {
			function io(entries) {
				entries.map((entry) => {
					const boundingRect = entry.boundingClientRect;
					handleResizeAndScroll();
					if (entry.isIntersecting) {
						//console.log('Element - on screen.');
						html_tag.classList.remove('product-scrolled');
						html_tag.classList.add('product-not-scrolled');
						if (form_product_sticky) {
							aria_hide(form_product_sticky);
						}
					} else {
						if (boundingRect.top < 0) {
							//console.log('Element - above screen.');
							html_tag.classList.add('product-scrolled', 'f8ps-css');
							html_tag.classList.remove('product-not-scrolled');
							if (form_product_sticky) {
								aria_show(form_product_sticky);
							}
							assignStyles();
							requestAnimationFrame(function () {
								assignStyles();
							});
						}
						/*if (boundingRect.bottom >= window.innerHeight) {
              console.log('Element - below screen.');
            }*/
					}
				});
			}

			new IntersectionObserver(io).observe(el);
		}
	});
}

function wrap(el, wrapper, className) {
	el.parentNode.insertBefore(wrapper, el);
	if (className) {
		wrapper.classList.add(className);
	}
	wrapper.appendChild(el);
}

function isSideCartUpsellSelect(el) {
	return el.closest('.product-recommendations.cart-upsell[data-template="side-cart"]') !== null;
}

// Converts native <select> elements into a custom searchable dropdown UI, and wires click/scroll/slider behaviors.
function selectRun(el) {
	if (el.classList.contains('select-init') || isSideCartUpsellSelect(el)) return;

	const evt = new Event('change');
	const searchPlaceholder = el.getAttribute('data-search-placeholder') || '';
	el.setAttribute('tabindex', -1);

	if (el.querySelector('option[selected]:not([disabled], .disabled, [data-class="disabled"])')) {
		el.parentNode.classList.add('done');
	}

	if (isMobile) return;

	wrap(el, document.createElement('span'), 'select-wrapper');
	randomize(el);

	const selector = `#${el.id}[data-random="${el.dataset.random}"]`;

	const bvsel = new BVSelect({
		selector,
		searchbox: true,
		search_placeholder: searchPlaceholder,
		search_autofocus: true,
		offset: false
	});

	const links = el.nextSibling.querySelectorAll('.bv_ul_inner a');

	links.forEach((em) => {
		em.addEventListener('click', () => {
			const optionItem = em.closest('li');
			if (optionItem && (optionItem.classList.contains('bv_disabled') || optionItem.classList.contains('disabled'))) {
				return;
			}

			el.dispatchEvent(createProductSelectChangeEvent(em));
			const group = em.closest('.form-group');
			if (group) group.classList.remove('is-invalid');

			if (em.parentNode.classList.contains('has-scroll')) {
				const target = document.querySelector(em.getAttribute('href'));
				if (target) target.scrollIntoView();
			}

			const slideTo = em.getAttribute('data-slide-to');
			if (slideTo !== null) {
				const li = em.closest('li');
				if (li) {
					const swiperHolder = li.querySelector('.s4wi');
					if (swiperHolder && swiperHolder.children && swiperHolder.children[0] && swiperHolder.children[0].swiper) {
						swiperHolder.children[0].swiper.slideTo(slideTo);
					}
				}
			}
		});
	});

	const bvAtual = el.parentNode.getElementsByClassName('bv_atual');

	const css_selects = fp('styles/async-select.css', 'async_select_css');
	const applyCss = () => new_css('css-select', css_selects);

	for (const em of bvAtual) {
		em.addEventListener('click', applyCss, {
			once: true
		});
		em.addEventListener('focus', applyCss, {
			once: true
		});
	}

	el.classList.add('select-init');
}

const semanticSelectEvt = new CustomEvent('semanticSelect');
window.addEventListener('semanticSelect', function () {
	const selectTags = Array.from(document.querySelectorAll('select[id]:not(.semantic-select-initialized):not(.js-hidden)')).filter(function (el) {
		return !isSideCartUpsellSelect(el);
	});
	if (!selectTags.length || isMobile) return;

	loadRes(js_selects, function () {
		for (const el of selectTags) {

			el.classList.add('semantic-select-initialized');

			const closestPopup = el.closest('[class^="popup-"]:not(html):not(.rendered)');
			const isInsideBoxOuter = el.closest('.box-outer') !== null;

			if ((closestPopup === null || isInsideBoxOuter) && el.querySelector('option')) {
				selectRun(el);
			}
		}
	}, 'selects-loaded');
});
window.dispatchEvent(semanticSelectEvt);


window.addEventListener("moduleProductBackground", function (evt) {
const module_product = document.querySelector('.m6pr'); 
module_collection = document.getElementsByClassName('m6cl');
if (module_product || (module_collection && module_collection.classList && module_collection.classList.contains('sticky'))) {
	html_tag.classList.add('t1pr');

	if (module_product) {
		/*enquire.register('screen and (max-width: 760px)', function () {
			const module_product_bg = document.querySelector('.m6pr[style*="--m6pr_bg:"]');
			if (module_product_bg) {
				const module_product_bg_l4pr = module_product_bg.querySelector('.l4pr-container');
				if (module_product_bg_l4pr) {
					module_product_bg.style.setProperty('--bg_dist', 0 - module_product_bg_l4pr.getBoundingClientRect().top + 'px');
				}
			}
		});*/
		function updateBgDist() {
			if (mediaMax760.matches) {
				requestAnimationFrame(() => {
					const module_product_bg = document.querySelector('.m6pr[style*="--m6pr_bg:"]');
					if (!module_product_bg) return;

					const module_product_bg_l4pr = module_product_bg.querySelector('.l4pr-container');
					if (!module_product_bg_l4pr) return;

					const offset = -module_product_bg_l4pr.getBoundingClientRect().top;
					module_product_bg.style.setProperty('--bg_dist', `${offset}px`);
				});
			}
		}

		updateBgDist();
		mediaMax760.addEventListener('change', updateBgDist);
	}

}
});
window.dispatchEvent(moduleProductBackgroundEvt);

// sidebar sliding from the edge (product page, cart)
var module_panel = document.getElementsByClassName('m6pn');

function setTabindex(el, value) {
	for (const childEl of el.querySelectorAll('a, input, button, select, textarea, [role="button"]')) {
		if (value === null) {
			childEl.removeAttribute('tabindex');
		} else {
			childEl.setAttribute('tabindex', value);
		}
	}
}

function negTabIn(el) {
	setTabindex(el, -1);
}

function posTabIn(el) {
	setTabindex(el, '');
}

function hidePanels() {
	html_tag.classList.remove('m6pn-open', 'm6cp-open', 'f8fl-open');
	Array.from(module_panel).forEach(function (el) {
		// negTabIn(el);
		el.classList.remove('toggle');
		el.setAttribute('aria-hidden', true);
		Array.from(el.querySelectorAll('a, input, button, select, textarea, [role="button"]')).forEach(function (el) {
			el.setAttribute('tabindex', -1);
		});
	});
	const m6pn_clicked = document.querySelector('.m6pn-clicked');
	if (m6pn_clicked) {
		setTimeout(() => {
			if (whatInput.ask() === 'keyboard') {
				m6pn_clicked.focus();
			}
			document.querySelectorAll('a[data-panel]').forEach(el => el.classList.remove('m6pn-clicked'));
		}, 100);
	}
}

//to check when element gets position sticky
function getStickyFooters() {
	var sticky_in_panel = document.querySelectorAll('.sticky-in-panel:not(.sticky-panel-initialized)');
	if (sticky_in_panel.length) {
		Array.from(sticky_in_panel).forEach(function (eo) {
			eo.classList.add('sticky-panel-initialized');
			if (eo.classList.contains('sticky-in-panel') && !eo.classList.contains('is-sticky')) {
				if (!eo.getElementsByClassName('offset-dist').length) {
					var trickDiv = createElementWithClass('div', 'offset-dist');
					eo.prepend(trickDiv);
				}
				const observer = new IntersectionObserver(
						([e]) => e.target.parentElement.classList.toggle('is-sticky', e.intersectionRatio < 1), {
							threshold: [1, 0]
						}
				);
				observer.observe(eo.getElementsByClassName('offset-dist')[0]);
			}
		});
	}
}

function openPanel(id) {
	const linked = document.querySelectorAll(`.m6pn[id="${id}"]`);
	const a_source = document.querySelectorAll(`a[data-panel="${id}"]`);

	overlayClose();
	asyncCSS();

	html_tag.classList.add('has-panels', 'm6pn-open');

	document.querySelectorAll('a[data-panel]').forEach(em => em.classList.remove('m6pn-clicked'));
	a_source.forEach(em => em.classList.add('m6pn-clicked'));
	Array.from(module_panel).forEach(function (el) {
		el.setAttribute('aria-hidden', true);
		if (!el.querySelector('.m6pn-close:not(.strong)')) {
			append_url(el, 'Close', 'm6pn-close');
		}
		el.classList.remove('toggle');
		setTimeout(function () {
			negTabIn(el);
		}, 500);
		el.querySelectorAll('.l4pr.aside-pager').forEach(em => em.classList.remove('aside-pager'));
	});
	linked.forEach(el => {
		el.classList.add('toggle');
		el.setAttribute('aria-hidden', false);
		posTabIn(el);

		if (window.XclusiveTheme && typeof window.XclusiveTheme.activateStandardViewEvents === 'function') {
			window.XclusiveTheme.activateStandardViewEvents(el);
		}

		setTimeout(function () {
			el.querySelector('a, input, button, select, textarea, [role="button"]').focus();
			el.querySelectorAll('[style*="--fih:"]').forEach(slider => {
				const firstFig = slider.querySelector('.swiper-slide-active figure');
				if (firstFig) {
					if (firstFig.clientHeight === 0) {
						slider.style.removeProperty('--fih');
					} else {
						slider.style.setProperty('--fih', firstFig.offsetHeight + 'px');
					}
				}
			});
		}, 100);
	});
	if (document.getElementsByClassName('f8fl').length) {
		new_css('css-filters', window.filepaths['async_filters_css']);
		new_css('css-search', window.filepaths['async_search_css']);
	}
	getStickyFooters();
	new_css('css-panels', window.filepaths['async_panels_css']);
	if (linked[0].classList.contains('m6pr-compact')) {
		new_css('product-css', window.filepaths['async_product_css']);
	}
	if (linked[0].hasAttribute('data-delay')) {
		setTimeout(function () {
			hidePanels();
		}, parseFloat(linked[0].getAttribute('data-delay')));
	}

}

const a_module_panel = document.querySelectorAll('a[data-panel]');
if (module_panel.length) {
	document.addEventListener('click', function (event) {
		if (event.target.matches('a.m6pn-close, a.m6pn-close *')) {
			hidePanels();
			event.preventDefault();
		}
	});
	document.addEventListener('keyup', function (event) {
		if (event.key === ' ') {
			if (event.target.matches('a.m6pn-close, a.m6pn-close *')) {
				hidePanels();
				event.preventDefault();
			}
		}
	});
	document.onkeydown = function (evt) {
		evt = evt || window.event;
		if (evt.key === 'Escape') {
			hidePanels();
		}
	};
	a_module_panel.forEach(el => {
		const id = el.dataset.panel;
		if (!id) return;

		const linked = document.querySelector(`.m6pn[id="${id}"]`);
		if (linked) {
			el.setAttribute('aria-haspopup', 'true');
			el.setAttribute('aria-controls', id);
		}
	});
	window.dispatchEvent(modulePanelEvt);
}

function handlePanelEvents(e) {
	const el = e.target;
	const panelElement = el.closest('a[data-panel]') || el;
	const panelId = panelElement.dataset.panel;
	if ((el && el.matches('a[data-panel]')) || panelElement) {
		if (e.type === 'click' || (e.type === 'keyup' && e.key === ' ')) {
			const linked = document.querySelectorAll('.m6pn[id="' + panelId + '"]');
			if (linked.length) {
				if (panelId == 'cart') {
					if (general.enable_cart_drawer) {
						ajaxCart.load();
					} else {
						ajaxCart.load(false, true, false, true);
					}
				} else {
					openPanel(panelId);
				}
				e.preventDefault();
			}
			if (el.matches && el.matches('a[data-panel]') && e.type === 'click' && !el.href.includes('#')) {
				e.preventDefault();
			}
		}
	}
}

document.addEventListener('click', handlePanelEvents);
document.addEventListener('keyup', handlePanelEvents);

window.addEventListener("imageCompare", function (evt) {
	// Initializes image comparison sliders for elements with two images, handling orientation, starting position, and optional labels
	const image_compare = document.getElementsByClassName('img-compare');
	if (image_compare.length) {
		loadRes(window.filepaths['plugin_compare_js'], function () {
			new_css('compare-css', window.filepaths['async_compare_css']);
			Array.from(image_compare).forEach(function (el) {
				var a, b,
					opt_vertical = false,
					opt_start = 50,
					opt_labels = false,
					opt_labels_bef = 'Before',
					opt_labels_aft = 'After';

				if (el.querySelectorAll('img').length === 2) {
					if (el.classList.contains('vertical')) {
						opt_vertical = true;
					} else {
						if (global_dir[1] === false) {
							a = el.children[0],
								b = a.cloneNode(true);
							el.appendChild(b);
							el.removeChild(a);
						}
					}
					if (el.getAttribute('data-start') !== null) {
						if (global_dir[1] === false) {
							opt_start = 100 - parseFloat(el.getAttribute('data-start'));
						} else {
							opt_start = parseFloat(el.getAttribute('data-start'));
						}
					}
					if (el.getAttribute('data-label-before') === '') {
						el.classList.add('no-label-before');
					}
					if (el.getAttribute('data-label-after') === '') {
						el.classList.add('no-label-after');
					}
					if (el.getAttribute('data-label-before') !== null || el.getAttribute('data-label-after') !== null) {
						opt_labels = true;
						if (el.getAttribute('data-label-before') !== null) {
							opt_labels_bef = el.getAttribute('data-label-before');
						} else {
							el.classList.add('no-label-before');
						}
						if (el.getAttribute('data-label-after') !== null) {
							opt_labels_aft = el.getAttribute('data-label-after');
						} else {
							el.classList.add('no-label-after');
						}
					}
					if (el.children.length === 2) {
						new ImageCompare(el, {
							verticalMode: opt_vertical,
							startingPoint: opt_start,
							showLabels: opt_labels,
							labelOptions: {
								before: opt_labels_bef,
								after: opt_labels_aft
							}
						}).mount();
					}
				}
			}, 'compare-loaded');
		});
	}
});
window.dispatchEvent(imageCompareEvt);

window.addEventListener("inputDate", function (evt) {
	// Replaces native date inputs with a custom datepicker for non-mobile devices, loading language support and applying formatting options
	var input_date = document.querySelectorAll('input[type="date"]:not(.datepicker-initialized)'),
		global_lang = general.language;
	if (input_date.length && !isMobile) {
		var datepicker_path,
			datepicker_langs = ['ar', 'az', 'bg', 'bm', 'bn', 'br', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fo', 'fr', 'gl', 'he', 'hi', 'hr', 'hu', 'hy', 'id', 'is', 'it', 'ja', 'ka', 'kk', 'km', 'ko', 'lt', 'lv', 'me', 'mk', 'mn', 'mr', 'ms', 'nl', 'no', 'oc', 'pl', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'sq', 'sr', 'sv', 'sw', 'ta', 'tg', 'th', 'tk', 'tr', 'uk', 'uz', 'vi'],
			datepicker_options = {
				orientation: 'bottom',
				format: 'yyyy-mm-dd',
				todayHighlight: true,
				language: global_lang
			};
		new_css('datepicker-css', window.filepaths['async_datepicker_css']);
		if (datepicker_langs.includes(global_lang)) {
			if (window.Shopify === undefined) {
				datepicker_path = 'js/datepicker-lang/datepicker-lang-' + global_lang + '.js';
			} else {
				datepicker_path = datepicker_path_global;
			}
			loadRes(window.filepaths['plugin_datepicker_js'], function () {
				loadRes(datepicker_path, function () {
					Array.from(input_date).forEach(function (el) {
						var minDate = null,
							maxDate = null;
						if (el.getAttribute('data-min-date') == 'today') {
							minDate = new Date();
						}
						if (el.getAttribute('data-max-days') != null) {
							maxDate = new Date();
							maxDate.setDate(maxDate.getDate() + parseInt(el.getAttribute('data-max-days')));
						}
						datepicker_options['minDate'] = minDate;
						datepicker_options['maxDate'] = maxDate;
						el.classList.add('datepicker-initialized');
						el.setAttribute('type', 'text');
						new Datepicker(el, datepicker_options);
					}, 'datepicker-loaded');
				}, 'datepicker-lang-loaded');
			});
		} else {
			loadRes(window.filepaths['plugin_datepicker_js'], function () {
				Array.from(input_date).forEach(function (el) {
					var minDate = null,
						maxDate = null;
					if (el.getAttribute('data-min-date') == 'today') {
						minDate = new Date();
					}
					if (el.getAttribute('data-max-days') != null) {
						maxDate = new Date();
						maxDate.setDate(maxDate.getDate() + parseInt(el.getAttribute('data-max-days')));
					}
					datepicker_options['minDate'] = minDate;
					datepicker_options['maxDate'] = maxDate;
					el.classList.add('datepicker-initialized');
					el.setAttribute('type', 'text');
					new Datepicker(el, datepicker_options);
				}, 'datepicker-loaded');
			});
		}
	}
});
window.dispatchEvent(inputDateEvt);

window.addEventListener("listCart", function (evt) {
	const list_cart = document.getElementsByClassName('l4ca');
	const list_mult = document.getElementsByClassName('l4ml');
	if (list_cart.length) {
		var removeHidden = function () {
			if (document.querySelector('#cart .empty.hidden') && document.querySelector('#cart .l4ca > li') === null) {
				document.querySelector('#cart .empty').classList.remove('hidden');
			}
			if (document.querySelector('.cart-empty.hidden') && document.querySelector('.form-cart .l4ca > li') === null) {
				document.querySelector('.cart-empty').classList.remove('hidden');
				document.querySelector('.cart-empty ~ *').classList.add('hidden');
			}
		};
	}

	function cart_remove(el) {
		const hide_delay = el.hasAttribute('data-delay') ? parseFloat(el.getAttribute('data-delay')) : 1000 * 1000;
		for (const em of el.querySelectorAll('a .icon-trash, a .icon-x-circle')) {
			const link = em.closest('a');
			if (link && !link.classList.contains('remove')) {
				link.classList.add('remove');
			}
		}
		if (el.classList.contains('in-panel')) {
			Array.from(el.children).forEach(em => {
				if (em.querySelector('select')) {
					em.classList.add('has-select');
				}
			});
		}
		Array.from(el.querySelectorAll('a.remove')).forEach(function (em) {
			const par = em.closest('li');
			let timeout;
			if (par) {
				par.addEventListener('removing', function (e) {
					asyncCSS();
					if (!par.classList.contains('removing')) {
						par.classList.add('removing');
						timeout = setTimeout(function () {
							if (par.classList.contains('removing')) {
								par.classList.add('removing2');
								setTimeout(function () {
									const ul = par.closest('ul');
									if (!ul) return;
									const ul_li = Array.from(ul.children);
									const ul_li_class = ul_li.filter(li =>
										Array.from(li.classList).every(className => !className.startsWith('has-l4'))
									);
									if (ul_li_class.length < 2) {
										ul.classList.add('is-empty');
									}
									const parNext = par.nextElementSibling;
									if (parNext && Array.from(parNext.classList).some(className => className.startsWith('has-l4'))) {
										parNext.remove();
									}
									par.remove();
									// const ul_li_first = ul_li.find(li =>
									//     Array.from(li.classList).every(className => !className.startsWith('has-l4'))
									// );
									// if (ul_li_first) {
									//   ul_li_first.classList.add('first-child');
									// }
								}, 400);
							}
						}, hide_delay);
					} else {
						par.classList.remove('removing');
						removeHidden();
						clearTimeout(timeout);
					}
					e.preventDefault();
				});
			}
		});
	}
	if (list_cart.length) {
		Array.from(list_cart).forEach(function (el) {
			cart_remove(el);
		});
	}
	const list_cart_inner_link = document.querySelectorAll('.show-l4ca:not(.toggle-l4ca-initialized)');
	for (const el of list_cart_inner_link) {
		el.addEventListener('click', function (e) {
			const li = el.closest('li');
			if (li) {
				li.classList.toggle('toggle-l4ca');
			}
			e.preventDefault();
		});
	}
	if (list_mult.length) {
		Array.from(list_mult).forEach(function (el) {
			if (el.closest('.l4ca') === null) {
				cart_remove(el);
			}
		});
	}
});
window.dispatchEvent(listCartEvt);

// Searchbox
function removeTextSearch() {
	html_tag.classList.remove('search-full', 'user-form-active');
	html_tag.classList.add('search-cleared');
	search_id.classList.remove('has-text', 'not-empty');
	search_input[0].value = '';
	search_input[0].focus();
	if (!search_input[0] === document.activeElement) {
		setTimeout(function () {
			search_input[0].focus();
		}, 250);
	}
}

function overlayClose(n) {
	html_tag.classList.remove('search-compact-active', 'search-full', 'search-full-mode', 'user-form-active', 'nav-hover', 'f8fl-open');
	removeM2A();
	if (search_id) {
		search_id.classList.remove('full', 'has-text', 'not-empty');
	}
	if (search_input) {
		search_input[0].value = '';
	}

	if (nav_id) {
		clear_mobile_nav();
	}
	if (nav_top_id) {
		remove_active_submenus(nav_top_id.querySelectorAll('a.toggle'));
	}
	if (nav_bar_id) {
		remove_active_submenus(nav_bar_id.querySelectorAll('a.toggle'));
	}
	if (nav_user_id) {
		remove_active_submenus(nav_user_id.querySelectorAll('a.toggle'));
	}
	if (!n && module_panel.length) {
		hidePanels();
	}
}

function clearCompactSearch() {
	html_tag.classList.remove('search-compact-active', 'search-full', 'search-full-mode', 'user-form-active');
	search_id.classList.remove('full', 'has-text', 'not-empty');
	negTabIn(search_id.querySelector('fieldset'));
	search_input[0].value = '';
}

window.addEventListener("search", function (evt) {
	if (search_id) {
		let searchLinksAppended = false;

		function appendSearchLinks() {
			if (!searchLinksAppended) {
				append_url(search_id, 'Toggle', 'toggle');
				append_url(search_id, 'Toggle', 'toggle');

				const formP = search_id.querySelector('form > p, fieldset > p');
				append_url(formP, 'Clear', 'clear-toggle');
				append_url(formP, 'Clear', 'search-back');

				const searchBack = search_id.querySelector('.search-back');
				if (searchBack) {
					searchBack.setAttribute('aria-controls', 'search');
					searchBack.setAttribute('href', '#' + search_id.getAttribute('id'));
				}

				searchLinksAppended = true;
			}
		}

		if (!isMobile) {
			search_id.addEventListener('mousemove', appendSearchLinks);
		}

		search_id.addEventListener('keyup', appendSearchLinks);
		search_id.addEventListener('touchstart', appendSearchLinks, {
			passive: true
		});
		search_id.addEventListener('scroll', appendSearchLinks);

		if (search_id.classList.contains('compact')) {
			var search_compact_cont = document.createElement('span'),
				v_cm; //,
			if (nav_user_id) {
				if (nav_user_id.querySelectorAll('li.search.mobile-only').length) {
					v_cm = false;
				}
			}
			search_compact_cont.classList.add('search-compact-cont');
			append_url(search_compact_cont, 'Close', 'search-compact-toggle', '#search');
			search_compact_cont.getElementsByClassName('search-compact-toggle')[0].setAttribute('aria-controls', 'search');
			if (v_cm === false) {
				search_compact_cont.classList.add('mobile-hide');
				html_tag.classList.add('t1srn');
			}
			if (search_id.classList.contains('blur')) {
				html_tag.classList.add('search-blur');
			}
		}
		if (search_id.classList.contains('compact') && !search_id.classList.contains('compact-desktop') && !search_id.classList.contains('compact-mobile')) {
			negTabIn(search_id.querySelector('fieldset'));
		} else if (search_id.classList.contains('compact-mobile')) {
			/*enquire.register('screen and (max-width: 760px)', function () {
				negTabIn(search_id.querySelector('fieldset'));
			});*/
			function negTabIn1() {
				if (mediaMax760.matches) {
					negTabIn(search_id.querySelector('fieldset'));
				}
			}

			negTabIn1();
			mediaMax760.addEventListener('change', negTabIn1);
		} else if (search_id.classList.contains('compact-desktop')) {
			html_tag.classList.add('compact-desktop');
			/*enquire.register('screen and (min-width: 761px)', function () {
				negTabIn(search_id.querySelector('fieldset'));
			});*/
			function negTabIn2() {
				if (mediaMin760.matches) {
					negTabIn(search_id.querySelector('fieldset'));
				}
			}

			negTabIn2();
			mediaMin760.addEventListener('change', negTabIn2);
		}
		if (search_id.classList.contains('no-overlay')) {
			html_tag.classList.add('no-search-overlay');
		}
		search_id.addEventListener('click', function (e) {
			const target = e.target;
			if (target.matches('a.clear-toggle')) {
				removeTextSearch();
				e.preventDefault();
			}
			if (target.matches('a.toggle')) {
				clearCompactSearch();
				search_id.classList.remove('full', 'has-text', 'not-empty');
				html_tag.classList.remove('search-focus', 'search-full', 'search-full-mode', 'user-form-active');
				e.preventDefault();
			}
		});
		search_id.addEventListener('submit', function (e) {
			search_id.classList.add('processing');
		});
		var livesearchEl = document.getElementById('livesearch'),
			livesearch_placeholders = livesearchEl.querySelector('.search-placeholders');
		Array.from(search_input).forEach(function (el) {
			el.addEventListener('keyup', function () {
				removeM2A();
				if (el.value.length === 0 && !livesearch_placeholders) {
					html_tag.classList.remove('search-full', 'search-full-mode', 'user-form-active');
					search_id.classList.remove('full', 'has-text', 'not-empty', 'processing');
				} else {
					html_tag.classList.add('search-full', 'search-full-mode');
					search_id.classList.add('full', 'has-text', 'not-empty');
					if (!search_id.classList.contains('no-autocomplete')) {
						search_id.classList.add('processing');
						setTimeout(function () {
							liveSearch(el, livesearch_placeholders);
						}, 300);
					}
				}
			});
			el.addEventListener('focus', function () {
				html_tag.classList.add('search-focus');
				html_tag.classList.remove('nav-hover');
				if (nav_id) {
					remove_active_submenus(nav_id.querySelectorAll('a.toggle'));
				}
				if (nav_top_id) {
					remove_active_submenus(nav_top_id.querySelectorAll('a.toggle'));
				}
				if (nav_user_id) {
					remove_active_submenus(nav_user_id.querySelectorAll('a.toggle'));
				}
				if (nav_bar_id) {
					remove_active_submenus(nav_bar_id.querySelectorAll('a.toggle'));
				}

				new_css('css-search', window.filepaths['async_search_css']);

				if (livesearch_placeholders) {
					livesearchEl.innerHTML = '';
					livesearchEl.appendChild(livesearch_placeholders);
					html_tag.classList.add('search-full', 'search-full-mode');
					search_id.classList.add('full', 'has-text');
				}
			});
		});
		Array.from(top_id.querySelectorAll('[aria-controls="search"]')).forEach(el => {
			el.setAttribute('href', '#' + search_id.getAttribute('id'));
		});
		/*if (!isMobile) {
			search_id.addEventListener('mouseover', () => new_css('css-search',  window.filepaths['async_search_css']));
		}*/
		top_id.addEventListener('click', function (e) {
			const target = e.target;
			if (target.matches('[aria-controls="search"]')) {
				compactSearch();
				appendSearchLinks();
				e.preventDefault();
			}
		});
		if (!isMobile) {
			top_id.addEventListener('mouseover', function (e) {
				new_css('css-search', window.filepaths['async_search_css']);
			});
			Array.from(top_id.querySelectorAll('[aria-controls="cart"]')).forEach(el => {
				el.addEventListener('mouseover', () => html_tag.classList.add('cart-hover'));
				el.addEventListener('mouseout', () => html_tag.classList.remove('cart-hover'));
			});
		}

		// Hide #search when clicked outside;
		/*enquire.register('screen and (min-width: 761px)', function () {
            document.addEventListener('click', function (event) {
                if (!(event.target.getAttribute('aria-controls') === 'search' || (event.target.closest('a[aria-controls]') !== null && event.target.closest('a[aria-controls]').getAttribute('aria-controls') === 'search') || event.target.closest('#search') !== null || event.target.closest('.user-login') !== null)) {
                    clearCompactSearch();
                }
            });
        });*/
		function hideSearch(event) {
			if (!(event.target.getAttribute('aria-controls') === 'search' || (event.target.closest('a[aria-controls]') !== null && event.target.closest('a[aria-controls]').getAttribute('aria-controls') === 'search') || event.target.closest('#search') !== null || event.target.closest('.user-login') !== null)) {
				clearCompactSearch();
			}
		}

		function setupListener(e) {
			if (e.matches) {
				document.addEventListener('click', hideSearch);
			} else {
				document.removeEventListener('click', hideSearch);
			}
		}

		mediaMin760.addEventListener('change', setupListener);
		setupListener(mediaMin760);

		function compactSearch() {
			if (html_tag.classList.contains('search-compact-active')) {
				clearCompactSearch();
			} else {
				new_css('css-search', window.filepaths['async_search_css']);
				if (search_id.classList.contains('wide') && search_id.classList.contains('text-center-sticky')) {
					html_tag.classList.add('has-search-wide');
				}
				if (search_id.classList.contains('m-pos-up')) {
					html_tag.classList.add('m-pos-up');
				}
				html_tag.classList.add('search-compact-active');
				html_tag.classList.remove('user-form-active', 'nav-hover', 'search-full-mode', 'f8fl-open');
				removeM2A();
				search_id.classList.remove('full', 'has-text', 'not-empty');
				search_input[0].value = '';
				search_input[0].focus();
				if (!search_input[0] === document.activeElement) {
					setTimeout(function () {
						search_input[0].focus();
					}, 250);
				}
				posTabIn(search_id.querySelector('fieldset'));
			}
		}

	}
});
window.dispatchEvent(searchEvt);

// Newsletter pop-up
var newsletter_popup = document.querySelector('.popup-a[data-title="newsletter-popup"]');

function runTooltips(el, in1) {
	if (!el.classList.contains('ready')) {
		const innerText = el.innerHTML;

		const parentHeading = el.closest('p, h1, h2, h3, h4, h5, h6');
		if (parentHeading) {
			parentHeading.classList.add('s1tt-cont');
		}

		if (!(el.getAttribute('data-panel') || el.getAttribute('data-popup'))) {
			const dataIndexValue = el.getAttribute('data-tooltip-id') || ('tip-' + in1);
			// el.setAttribute('data-index', dataIndexValue);

			if (el.tagName.toLowerCase() === 'a') {
				el.setAttribute('data-popup', dataIndexValue);
			} else {
				append_url(el, 'Popup', 's1tt-popup');
				el.querySelector('.s1tt-popup').setAttribute('data-popup', dataIndexValue);
			}

			if (!document.querySelector('.popup-a[data-title="' + dataIndexValue + '"]')) {
				const linkedPopup = document.createElement('div');
				linkedPopup.classList.add('popup-a', 'w360');
				linkedPopup.setAttribute('data-title', dataIndexValue);
				const hasBlockContent = /<(div|ul|ol|table|h[1-6]|section|article|blockquote)/i.test(innerText);
				const popupContent = document.createElement(hasBlockContent ? 'div' : 'p');
				popupContent.innerHTML = innerText;

				linkedPopup.appendChild(popupContent);
				root_id.appendChild(linkedPopup);
			}
		}
		const iconClass = el.getAttribute('data-icon') || 'icon-info';
		const icon = createElementWithClass('i', iconClass);
		icon.setAttribute('aria-hidden', 'true');
		el.appendChild(icon);
		el.classList.add('ready');
	}
}

window.addEventListener("schemeTooltip", function (evt) {
	// Create tooltips
	var scheme_tooltip = document.querySelectorAll('.s1tt:not(.ready)');
	scheme_tooltip.forEach((el, in1) => runTooltips(el, in1));
});
window.dispatchEvent(schemeTooltipEvt);

// Popups async (move the loaded function at the top of scripts-async + delete the below if buggy)
var loadPopup = function (id, c) {
	loadRes(window.filepaths['plugin_popups_js'], function () {
		const popup_css = fp('styles/async-popups.css', 'async_popups_css');
		new_css('css-popups', popup_css);

		var allPopups = document.querySelectorAll('[class^="popup-"]:not(html):not(.ready, .initialized-popup)'),
			i_amount;
		if (allPopups.length > 0) {
			allPopups.semanticPopup();
		}
		openPopup(id);
		Array.from(document.getElementById(id).querySelectorAll('[tabindex="-1"]')).forEach(function (el) {
			el.removeAttribute('tabindex');
		});
		Array.from(allPopups).forEach(function (el) {
			if (!el.classList.contains('rendered')) {
				Array.from(el.getElementsByClassName('m6tb')).forEach(function (em) {
					if (typeof semanticTabs === 'function' && !el.classList.contains('tabs-initialized')) {
						semanticTabs(em);
					}
					em.classList.add('tabs-initialized');
				});

				Array.from(el.querySelectorAll('.f8vl')).forEach(em => validator_run(em));

				Array.from(el.querySelectorAll('a[data-enable], input[data-enable], button[data-enable]')).forEach(em => data_show_me(em));
				Array.from(el.querySelectorAll('a[data-disable], input[data-disable], button[data-disable]')).forEach(em => data_hide_me(em));
				Array.from(el.querySelectorAll('a[data-toggle], input[data-toggle], button[data-toggle]')).forEach(em => data_togg_me(em));

				Array.from(el.querySelectorAll('.s1tt')).forEach((el, in1) => runTooltips(el, in1));

				var select_tag = el.getElementsByTagName('select');
				if (select_tag.length && !isMobile) {
					loadRes(js_selects, function () {
						Array.from(el.getElementsByTagName('select')).forEach(function (el) {
							const hasOptionAttribute = el.querySelector('option') !== null;
							if (hasOptionAttribute) {
								selectRun(el);
							}
							selectRun(el);
						});
					}, 'selects-loaded');
				}
				const form_children = el.querySelectorAll('form > *, fieldset > *, .no-zindex, .no-zindex > *, .has-select, .f8pr > *, .l4ca.compact.in-panel > *, .l4cl.box > li, .f8pr-bulk > *, .f8pr-upsell > *');
				if (form_children.length) {
					assignIndex(form_children);
				}
				i_amount = el.getElementsByClassName('input-amount');
				if (i_amount.length) {
					Array.from(el.getElementsByClassName('input-amount')).forEach(function (el) {
						amountRun(el);
					});
					amountClick(i_amount);
				}
			}
		});
		if (newsletter_popup) {
			Array.from(newsletter_popup.querySelectorAll('a.close')).forEach(function (el) {
				el.addEventListener("click", function (event) {
					Cookies.set('has-newsletter', 'no', {
						sameSite: 'none',
						secure: true
					});
				});
			});
			newsletter_popup.querySelector('form').addEventListener("submit", function (event) {
				Cookies.set('has-newsletter', 'no', {
					sameSite: 'none',
					secure: true
				});
			});
		}
		if (document.getElementById(id).classList.contains('popup-blocker')) {
			html_tag.classList.add('page-blocked');
			Array.from(document.querySelectorAll('.popup-blocker a.close')).forEach(function (el) {
				var popup_delay_not_blocker = document.querySelectorAll('[data-popup-delay][data-title]:not(.popup-blocker)');
				el.addEventListener('click', function (e) {
					Cookies.set('age', 'old', {
						sameSite: 'none',
						secure: true
					});
					html_tag.classList.remove('page-blocked');
					if (popup_delay_not_blocker.length) {
						delayHandler(popup_delay_not_blocker[0]);
					}
				});
			});
		}
		if (!html_tag.classList.contains(id + '-loaded') && typeof c === 'function') {
			c();
			return true;
		}
		if (!html_tag.classList.contains(id + '-loaded')) {
			html_tag.classList.add(id + '-loaded');
		}
		return true;
	}, 'popup-loaded');
};

var allApopups = document.querySelectorAll('a[data-popup], form[data-popup]'),
	formPopups = document.querySelectorAll('form[data-popup]'),
	newsletter_popup_testmode = general.newsletter_popup_testmode;

function popupFocus(im) {
	setTimeout(function () {
		if (document.querySelectorAll('[data-title="' + im + '"]')[0].querySelectorAll('a, input, button, select, textarea, [role="button"]')[0] != undefined) {
			document.querySelectorAll('[data-title="' + im + '"]')[0].querySelector('a, input, button, select, textarea, [role="button"]').focus();
		}
	}, 100);
}

function delayHandler(el) {
	var proceed = false;
	if (el.getAttribute('data-title') === 'newsletter-popup') {
		if (Cookies.get('has-newsletter') != 'no' || newsletter_popup_testmode) {
			proceed = true;
		}
	} else {
		proceed = true;
	}
	if (proceed) {
		if (parseFloat(el.getAttribute('data-popup-delay')) === 0) {
			loadPopup(el.getAttribute('data-title'));
			popupFocus(el.getAttribute('data-title'));
		} else {
			setTimeout(function () {
				loadPopup(el.getAttribute('data-title'));
				popupFocus(el.getAttribute('data-title'));
			}, el.getAttribute('data-popup-delay'));
		}
	}
}
window.addEventListener("popups", function (evt) {
	allApopups = document.querySelectorAll('a[data-popup]:not(.initialized-popup), form[data-popup]'),
		formPopups = document.querySelectorAll('form[data-popup]');
	for (var i = 0; i < allApopups.length; i++) {
		allApopups[i].classList.add('initialized-popup');
		allApopups[i].addEventListener('click', function (event) {
			event.preventDefault();
			hidePanels();
			loadPopup(this.getAttribute('data-popup'), function () {
				setTimeout(function () {
					linkMore();
				}, 300);
				window.dispatchEvent(productVariantsEvt);
				window.dispatchEvent(formValidateEvt);
				ajaxCart.init();
				quickShop.init();
			});
			popupFocus(this.getAttribute('data-popup'));
		});
		Array.from(formPopups).forEach(function (el) {
			if (!el.classList.contains('f8vl')) {
				el.addEventListener('submit', function (event) {
					event.preventDefault();
					loadPopup(this.getAttribute('data-popup'));
					popupFocus(this.getAttribute('data-popup'));
				});
			}
		});
	}
	const popup_delay = document.querySelectorAll('[data-popup-delay][data-title]');
	if (popup_delay.length) {
		Array.from(popup_delay).forEach(function (el) {
			if (el.classList.contains('popup-blocker')) {
				if (Cookies.get('age') === undefined || age_verify_popup_testmode) {
					delayHandler(el);
				} else if (document.querySelectorAll('[data-popup-delay][data-title]:not(.popup-blocker)')[0]) {
					delayHandler(document.querySelectorAll('[data-popup-delay][data-title]:not(.popup-blocker)')[0]);
				}
			} else {
				if (!document.getElementsByClassName('popup-blocker').length) {
					delayHandler(el);
				}
			}
		});
	}
});
window.dispatchEvent(popupsEvt);

window.addEventListener("listScrollable", function (evt) {
	// .l4cl
	var list_collection = document.getElementsByClassName('l4cl');
	if (list_collection.length) {
		Array.from(list_collection).forEach(function (el) {
			var data_li = el.querySelectorAll('li');

			if (el.classList.contains('box')) {
				lastVis(el);
			}

			if (el.parentNode.tagName.toLowerCase() === 'li') {
				el.parentNode.classList.add('has-l4cl', 'has-ul-class');
			}

			if (data_li.length) {
				Array.from(data_li).forEach(function (em) {
					var data_img = em.querySelectorAll('.check.color li[data-img]'),
						any_img = em.querySelectorAll('img:not(.color-variant-img)'),
						first_img = any_img[0],
						second_img = first_img;

					if (em.querySelectorAll('picture ~ picture').length && em.classList.contains('second-img-hover')) {
						if (em.classList.contains('second-img-first')) {
							first_img = em.querySelectorAll('picture ~ picture img')[0];
							second_img = em.querySelectorAll('picture img')[0];
						} else {
							first_img = em.querySelectorAll('picture img')[0];
							second_img = em.querySelectorAll('picture ~ picture img')[0];
						}
					}
					if (data_img.length && first_img !== undefined) {
						var productCard = em.closest('.product-card');
						// Check if variant picker is present
						if (productCard.querySelector('.variant-picker')) {
							// console.log('variant picker present');
							Array.from(data_img).forEach(function (en) {
								en.addEventListener('click', function () {
									Array.from(any_img).forEach(function (eo) {
										eo.setAttribute('src', en.getAttribute('data-img'));
										if (eo.hasAttribute('srcset')) {
											eo.removeAttribute('srcset');
										}
									});
								});
							});
						} else {
							if (first_img !== undefined) {
								em.addEventListener('mouseover', function () {
									Array.from(em.querySelectorAll('picture img')).forEach(function (eo) {
										if (!eo.hasAttribute('data-src-initial')) {
											eo.setAttribute('data-src-initial', eo.getAttribute('src'));
										}
										if (!eo.hasAttribute('data-srcset-initial') && eo.hasAttribute('srcset')) {
											eo.setAttribute('data-srcset-initial', eo.getAttribute('srcset'));
										}
									});
								});
								em.addEventListener('mouseleave', function () {
									Array.from(em.querySelectorAll('picture img')).forEach(function (eo) {
										eo.setAttribute('src', eo.getAttribute('data-src-initial'));
										if (eo.hasAttribute('data-srcset-initial')) {
											eo.setAttribute('srcset', eo.getAttribute('data-srcset-initial'));
										}
									});
								});
							}
							Array.from(data_img).forEach(function (en) {
								en.addEventListener('mouseover', function () {
									Array.from(any_img).forEach(function (eo) {
										eo.setAttribute('src', en.getAttribute('data-img'));
										if (eo.hasAttribute('srcset')) {
											eo.removeAttribute('srcset');
										}
										if (en.hasAttribute('data-srcset-initial')) {
											eo.setAttribute('srcset', en.getAttribute('data-srcset-initial'));
										} else {
											eo.removeAttribute('srcset');
										}
									});
								});
							});
						}
					}
				});
			}

			// Prepend big image before the list on mobile (index)
			Array.from(el.querySelectorAll('li:first-child figure.overlay')).forEach(function (el) {
				var clone_me = el.cloneNode(true);
				clone_me.classList.add('mobile-only', 'l4cl-figure-before');
				el.closest('li').classList.add('mobile-hide');
				el.closest('.l4cl').before(clone_me);
			});

			// Slider in popup (product)
			if (el.classList.contains('in-popup') && el.classList.contains('slider')) {
				if (el.children.length > 3) {
					el.classList.add('im-sliding');
				}
			}
			Array.from(el.querySelectorAll('picture.slider')).forEach(function (em) {
				var closestFig = em.closest('figure'),
					closestLi = em.closest('li'),
					let_touch_d = false,
					let_touch_m = false,
					has_bg = false,
					lbOverlays = [];
				if (el.classList.contains('mobile-scroll')) {
					let_touch_m = true;
				}
				if (!el.classList.contains('slider')) {
					let_touch_d = true;
				}
				if (closestFig !== null && closestLi !== null) {
					function initializeSlider() {
						if (!closestFig.classList.contains('slider-ready')) {
							randomize(closestFig);
							if (em.getElementsByClassName('s1lb').length) {
								Array.from(em.getElementsByClassName('s1lb')).forEach(function (child) {
									has_bg = true;
									lbOverlays.push(child);
									child.remove();
								});
							}
							create_slider(em, {
								direction: 'horizontal',
								allowTouchMove: false,
								loop: false,
								autoHeight: true,
								slidesPerView: 1,
								spaceBetween: 1,
								lazy: {
									loadPrevNext: true
								},
								breakpoints: {
									0: {
										allowTouchMove: let_touch_m
									},
									760: {
										allowTouchMove: let_touch_d
									}
								}
							});
						}
						if (has_bg = true) {
							lbOverlays.forEach(function (imgOverlay) {
								em.appendChild(imgOverlay);
							});
						}
						closestFig.classList.add('slider-ready');
					}
					if (!isMobile) {
						closestLi.addEventListener('mouseenter', function () {
							initializeSlider();
						});
					} else {
						function io(entries) {
							entries.map((entry) => {
								if (entry.isIntersecting) {
									initializeSlider();
								}
							});
						}
						new IntersectionObserver(io).observe(closestLi);
					}
				}
			});
			Array.from(el.querySelectorAll('figure select')).forEach(function (em) {
				var closestFig = em.closest('figure'),
					closestLi = em.closest('li'),
					closestForm = em.closest('form');
				if (closestFig !== null && closestLi !== null && closestForm !== null) {
					closestLi.addEventListener('mouseenter', function () {
						closestLi.style.setProperty('--dh', closestFig.offsetHeight - closestForm.offsetHeight + 'px');
					});
					window.addEventListener('resize', throttle(() => {
						closestLi.style.setProperty('--dh', closestFig.offsetHeight - closestForm.offsetHeight + 'px');
					}, 500));
				}
			});
		});
	}
});
window.dispatchEvent(listScrollableEvt);

function lastVis(cont) {
	var other_li = cont.children,
		last_visible = Array.from(cont.querySelectorAll('li:not(.hidden, .has-link-more)')).pop();
	Array.from(other_li).forEach(function (el) {
		el.classList.remove('last-visible');
	});
	if (last_visible !== undefined) {
		last_visible.classList.add('last-visible');
	}
}

// More link
function detectLong(el, em) {
	if (el.clientHeight < el.scrollHeight) {
		em.classList.add('long');
	} else {
		em.classList.remove('long');
	}
}

function handleInfoAndList(el) {
	const inInfo = el.closest('.info');
	if (!inInfo) return;

	const inL4clHr = inInfo.closest('.l4cl.list');
	if (!inL4clHr) return;

	const inner_p = inInfo.children[0];
	const hiddenParagraphs = inInfo.querySelectorAll('p.hidden, p:not(.link-more) .hidden');
	inInfo.classList.toggle('long', hiddenParagraphs.length > 0);

	if (hiddenParagraphs.length === 0) {
		detectLong(inner_p, inInfo);
		window.addEventListener('resize', throttle(() => {
			detectLong(inner_p, inInfo);
		}, 500));
	}
}

// More link
function linkMore() {
	const a_more = document.querySelectorAll('a.link-more:not(.link-more-initialized, .in-popup), .popup-a.shown a.link-more:not(.link-more-initialized)');

	if (a_more.length) {
		for (const el of a_more) {
			el.classList.add('link-more-initialized');
			if (el.tagName.toLowerCase() === 'a') {
				const parent = el.parentElement;
				const parents = parent.parentElement;
				const other_links = Array.from(parents.querySelectorAll('a.link-more'));
				const limit = parseFloat(el.getAttribute('data-limit')) || 5; // Use default if not specified

				const inCheck = el.closest('.check');
				if (inCheck) {
					const hiddenElements = Array.from(inCheck.querySelectorAll(`li:nth-child(n+${limit + 1})`));
					for (const em of hiddenElements) {
						if (!em.classList.contains('link-more') && !em.classList.contains('hidden')) {
							em.classList.add('hidden');
						}
					}
				}

				handleInfoAndList(el);

				if (parent) {
					parent.classList.add('has-link-more');
				}

				const closestBox = el.closest('.l4cl.box');
				if (closestBox) lastVis(closestBox);

				other_links.forEach((link, index) => link.setAttribute('data-no', other_links.length - index));


				const hrefAttribute = el.getAttribute('href');
				if (!hrefAttribute || hrefAttribute === '#' || hrefAttribute === './') {
					el.addEventListener('click', handleLinkClick);
				}
			}
		}
	}

	function handleLinkClick(e) {
		const currentTarget = e.currentTarget;
		if (!currentTarget) return;

		const parentLevel1 = currentTarget.parentElement;
		if (!parentLevel1) return;

		const parent = parentLevel1.parentElement;
		if (!parent) return;

		const hiddenElements = parent.querySelectorAll('.hidden, .was-hidden');

		hiddenElements.forEach(em => {
			em.classList.toggle('hidden');
			em.classList.toggle('was-hidden');
		});

		parent.classList.toggle('link-more-clicked');

		const box = currentTarget.closest('.l4cl.box');
		if (box) lastVis(box);

		e.preventDefault();
	}
}
linkMore();


let isCustomStickyNavExecuted = false;
let scheduledStickyNav = false;

function customStickyNav() {
	if (mediaMax1000.matches) {
		return;
	}
	if (scheduledStickyNav || isCustomStickyNavExecuted) return;

	scheduledStickyNav = true;

	requestAnimationFrame(() => {
		if (!nav_main) {
			scheduledStickyNav = false;
			return;
		}
		const navHeight = nav_main.clientHeight;
		const navOffset = nav_main.offsetTop;
		const useOuter = !!nav_main.closest('#nav-outer');


		const parts = [
			`--drop_nav_mah:${useOuter ? (viewportHeight - navHeight) : (viewportHeight - navHeight - navBottom)}px`,
			`--drop_nav_mah_fixed:${viewportHeight - navHeight - navOffset}px`,
			`--mega_nav_mah_fixed:${viewportHeight - navOffset}px`,
			`--sticky_nav_mah:${viewportHeight - navHeight}px`
		];

		root_styles.style.cssText += `;${parts.join(';')};`;


		isCustomStickyNavExecuted = true;
		scheduledStickyNav = false;
	});
}

if (!isMobile) {
	window.addEventListener('mousemove', () => {
		customStickyNav();
	}, asyncOnce);
}
document.addEventListener('scroll', () => {
	customStickyNav();
}, asyncPass);

window.addEventListener('resize', throttle(() => {
	isCustomStickyNavExecuted = false;
	customStickyNav();
}, 500));


// sticky header
// [Violation] Forced reflow while executing JavaScript
window.addEventListener("stickyNav", function (evt) {
	if (top_id) {

		if (document.querySelector('#nav-top:not(.no-js)')) {
			html_tag.classList.remove('t1nt');
		} else {
			html_tag.classList.add('t1nt');
		}

		if (nav_id) {
			if (nav_id.classList.contains('sticky-menu')) {
				html_tag.classList.add('t1sn');
			} else {
				html_tag.classList.remove('t1sn');
			}
		}

		let sa = 0;
		let le = top_id;
		let n_el;

		if (nav_bar_id) {
			if (nav_bar_id.closest('#header-inner') !== null) {
				if (nav_id) {
					n_el = nav_id;
				} else {
					n_el = header_id;
				}
			} else {
				n_el = nav_bar_id;
			}
		} else {
			n_el = nav_id;
		}
		if (html_tag.classList.contains('t1sn') || n_el && n_el.classList.contains('sticky') || header_inner && header_inner.classList.contains('sticky-nav')) {
			html_tag.classList.add('t1sn');
			le = n_el;
			sa = 0;
		} else {
			le = top_id;
		}

		let distanceSpacerCreated = false;

		function createDistanceSpacer() {
			if (!distanceSpacerCreated) {
				const distance_spacer = document.createElement('div');
				distance_spacer.setAttribute('id', 'distance-spacer');

				distance_spacer.style.height = le.offsetHeight + 'px';

				le.after(distance_spacer);

				distanceSpacerCreated = true;
			}
		}

		if (!isMobile) {
			window.addEventListener('mousemove', createDistanceSpacer, asyncOnce);
		}

		document.addEventListener('keyup', createDistanceSpacer, asyncOnce);
		document.addEventListener('touchstart', createDistanceSpacer, asyncPass);
		document.addEventListener('scroll', createDistanceSpacer, asyncPass);

		if (mediaMax1000.matches) {
			createDistanceSpacer();
		}

		window.addEventListener('resize', throttle(() => {
			const distance_spacer = document.getElementById('distance-spacer');
			if (distance_spacer) {
				distance_spacer.style.height = le.offsetHeight + 'px';
			}
		}, 500));

		function io(entries) {
			entries.map((entry) => {
				if (entry.isIntersecting) {
					le.classList.remove('fixed');
				} else {
					le.classList.add('fixed');
					customStickyNav();
					if (le.id === 'nav' || le.id === 'nav-bar') {
						function runOverlayClose() {
							if (mediaMin1000.matches) {
								overlayClose(true);
							}
						}
						runOverlayClose();
						mediaMin1000.addEventListener('change', runOverlayClose);
					}
					new_css('menu-css', css_menu);
				}
			});
		}

		const distance_counter = document.createElement('div');
		distance_counter.setAttribute('id', 'distance-counter');

		let updateDistanceCounterCalculated = false;
		let updateDistanceCounterRAF = 0;
		let topOffset = 0;

		function updateDistanceCounterHeight() {
			updateDistanceCounterRAF = 0;
			if (updateDistanceCounterCalculated) return;

			const hasTop = nav_top_id !== null;
			const isAlt = html_tag.classList.contains('t1nt');
			const isSn = html_tag.classList.contains('t1sn');


			if (hasTop && (hasTop || isAlt)) {
				topOffset = nav_top_id.offsetHeight;
			}

			if (!isSn) {
				distance_counter.style.top = topOffset + 'px';
			}

			updateDistanceCounterCalculated = true;
		}

		function updateDistanceCounterPosition() {
			if (!updateDistanceCounterCalculated && !updateDistanceCounterRAF) {
				updateDistanceCounterRAF = requestAnimationFrame(updateDistanceCounterHeight);
			}
		}

		if (html_tag.classList.contains('t1sn')) {
			header_id.append(distance_counter);
		} else {
			root_id.append(distance_counter);
		}

		if (!isMobile) {
			window.addEventListener('mousemove', updateDistanceCounterPosition, asyncOnce);
		}
		document.addEventListener('keyup', updateDistanceCounterPosition, asyncOnce);
		document.addEventListener('touchstart', updateDistanceCounterPosition, asyncPass);
		document.addEventListener('scroll', updateDistanceCounterPosition, asyncPass);

		if (header_inner.classList.contains('no-sticky')) {
			header_id.classList.add('no-sticky');
			html_tag.classList.add('no-sticky');
		} else {
			header_id.classList.remove('no-sticky');
			html_tag.classList.remove('no-sticky');
		}
		if (header_inner.classList.contains('mobile-visible-search')) {
			top_id.classList.add('has-mobile-visible-search');
		}
		if (header_inner.classList.contains('hide-btn-mobile')) {
			top_id.classList.add('hide-btn-mobile');
		}
		if (header_inner.classList.contains('tr_h') && !isMobile) {
			top_id.classList.add('tr_h');
			header_outer.addEventListener('mouseenter', function (e) {
				html_tag.classList.add('tr_hh');
			});
			header_outer.addEventListener('mouseleave', function (e) {
				if (!html_tag.classList.contains('search-full') && !html_tag.classList.contains('search-compact-active')) {
					html_tag.classList.remove('tr_hh');
				}
			});
		}
		if (header_id.classList.contains('no-sticky')) {
			html_tag.classList.add('t1ns');
		}

		if (header_id && !header_id.classList.contains('no-sticky')) {
			new IntersectionObserver(io, {
				root: null,
				rootMargin: '0px',
				threshold: 0.9
			}).observe(distance_counter);
		} else {
			html_tag.classList.add('t1st');
		}
	}

	// Closeable top bar
	let top_bar = document.getElementsByClassName('shopify-section-announcement-bar')[0];
	if (top_bar) {
		append_url(top_bar, 'Close', 'close');
		top_bar.querySelector('a.close').addEventListener('click', function (e) {
			top_bar.parentNode.removeChild(top_bar);
			if (typeof Shopify !== 'undefined' && Shopify.designMode) {} else {
				Cookies.set('notice', 'closed');
			}
			e.preventDefault();
		});
		if (Cookies.get('notice', {
				sameSite: 'none',
				secure: true
			}) === 'closed') {
			if (top_bar.parentNode !== null) {
				top_bar.parentNode.removeChild(top_bar);
			}
		} else {
			new_css('announcement-css', window.filepaths['async_announcement_css']);
			html_tag.classList.add('show-notice');
		}
	}

	function addOverlayClose(element) {
		if (element) {
			append_url(element, 'Close', 'overlay-close');
		}
	}
	// addOverlayClose(top_bar);

	if (top_id) {
		let overlaysAppended = false;

		function appendOverlays() {
			if (overlaysAppended) return;

			requestAnimationFrame(() => {
				addOverlayClose(top_bar);
				addOverlayClose(root_id);
				addOverlayClose(top_id);
				addOverlayClose(nav_id);
				addOverlayClose(nav_bar_id);
				addOverlayClose(header_outer);
				addOverlayClose(nav_top_id);
				addOverlayClose(header_id);
				append_url(root_id, 'Close', 'overlay-close-clipping');

				overlaysAppended = true;
			});
		}

		if (!isMobile) {
			window.addEventListener('mousemove', appendOverlays, asyncOnce);
		}
		document.addEventListener('keyup', appendOverlays, asyncOnce);
		document.addEventListener('touchstart', appendOverlays, asyncPass);
		document.addEventListener('scroll', appendOverlays, asyncPass);

		for (const el of document.querySelectorAll('a.overlay-close')) {
			el.addEventListener('click', e => e.preventDefault());
		}
		document.addEventListener('click', function (event) {
			if (event.target.matches('a.overlay-close, a.overlay-close-clipping')) {
				overlayClose();
				event.preventDefault();
			}
		});
	}
});
window.dispatchEvent(stickyNavEvt);

// Initializes custom noUiSlider range inputs: sets up single/multi sliders with tooltips, keeps them in sync with min/max input fields, and clones step markers for visual guidance.  
const rangeSliderEvt = new CustomEvent("rangeSlider")
window.addEventListener("rangeSlider", function (evt) {
	const input_range = document.getElementsByClassName('input-range');
	if (input_range.length) {
		const input_range_steps = document.getElementsByClassName('input-range-steps');
		loadRes(window.filepaths['plugin_sliders_js'], function () {
			new_css('form-sliders-css', window.filepaths['async_ui_sliders_css']);
			Array.from(input_range).forEach(el => {
				const rangeInner = createElementWithClass('div', 'range-inner');
				el.appendChild(rangeInner);

				const dataMin = el.querySelector('input[min]');
				const dataMax = el.querySelector('input[max]');
				const dataEl = el.querySelector('input');
				const evt = new Event('change');
				let optConnect = true;
				let optStart = [parseFloat(dataMin.value), parseFloat(dataMax.value)];
				let isTooltip = false;

				if (el.classList.contains('single')) {
					optConnect = 'lower';
					optStart = parseFloat(dataEl.value);
				}

				if (el.classList.contains('tip')) {
					isTooltip = true;
				}

				if (!el.classList.contains('slider-is-here')) {
					noUiSlider.create(rangeInner, {
						start: optStart,
						connect: optConnect,
						step: 1,
						direction: global_dir[0],
						range: {
							'min': [parseFloat(dataMin.getAttribute('min'))],
							'max': [parseFloat(dataMax.getAttribute('max'))]
						},
						tooltips: isTooltip,
						format: {
							to: value => Math.round(value),
							from: value => Math.round(value)
						}
					});

					rangeInner.noUiSlider.on('update', (values, handle) => {
						const target = handle ? dataMax : dataMin;
						target.value = parseFloat(values[handle]).toFixed();
					});

					rangeInner.noUiSlider.on('change', (handle) => {
						const target = handle ? dataMax : dataMin;
						target.dispatchEvent(evt);
					});

					rangeInner.querySelectorAll('[role="slider"]').forEach(em => {
						em.setAttribute('aria-label', 'slider');
					});

					el.querySelectorAll('input').forEach(input => {
						input.addEventListener('blur', () => {
							const value = input.value.trim();
							if (value !== '') {
								const numValue = parseFloat(value);
								if (input.hasAttribute('min')) {
									rangeInner.noUiSlider.set([numValue, null]);
								} else if (input.hasAttribute('max')) {
									rangeInner.noUiSlider.set([null, numValue]);
								}
							}
						});
					});
				}

				el.classList.add('slider-is-here');
			});

			if (input_range_steps.length) {
				Array.from(input_range_steps).forEach(function (el) {
					Array.from(el.children).forEach(child => {
						const wrapper = document.createElement('span');
						wrapper.className = 'inner';

						while (child.firstChild) {
							wrapper.appendChild(child.firstChild);
						}

						child.appendChild(wrapper);
					});
					const prevEl = el.previousElementSibling;
					if (prevEl && prevEl.classList.contains('input-range')) {
						const cloneMe = el.cloneNode(true);
						cloneMe.removeAttribute('class');
						cloneMe.classList.add('range-cloned');

						const noUiBase = prevEl.querySelector('.noUi-base');
						if (noUiBase) {
							noUiBase.appendChild(cloneMe);
						}
					}
				});
			}
		}, 'sliders-loaded');
	}
});
window.dispatchEvent(rangeSliderEvt);

function removeClassByPrefix(node, prefix) {
	var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
	node.className = node.className.replace(regx, '');
	return node;
}


// Countdown timer
window.addEventListener("countdown", function(evt) {
	// Initializes countdown timers on '.countdown' elements with localized labels, hides original content, and removes the element or container when time expires.  
	const countdown_tag = document.querySelectorAll('.countdown:not(.countdown-initialized)');
	var countdown_container = document.getElementsByClassName('f8pr-shipping-timer');
	if (countdown_container.length) {
		Array.from(countdown_container).forEach(function (el) {
			if (el.children.length == 0) {
				el.remove();
			}
		});
	}
	if (countdown_tag.length) {
		loadRes(window.filepaths['plugin_countdown_js'], function () {
			Array.from(countdown_tag).forEach(function (el) {
				el.classList.add('countdown-initialized');
				var container = el.closest('li, article'),
						now = new Date(),
						nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()),
						show_until = new Date(el.getAttribute('data-show-until')),
						show_from = new Date(el.getAttribute('data-show-from')),
						show_days = el.getAttribute('data-show-days'),
						word_day,
						word_days,
						word_hour,
						word_hours,
						word_min,
						word_mins,
						word_sec,
						word_secs;

				var ended = function() {
					if (container.querySelector('.countdown-ended-show') !== null) {
						el.remove();
						container.querySelector('.countdown-ended-hide').remove();
						container.querySelector('.countdown-ended-show').classList.remove('hidden');
					} else {
						container.remove();
					}
				}
				if (show_from > now || now > show_until || !show_days.includes(nowUTC.getDay())) {
					ended();
					return;
				}

				//el.innerHTML = '<span class="hidden">' + el.innerHTML + '</span>';
				const wrapper = document.createElement('span');
				wrapper.className = 'hidden';

				while (el.firstChild) {
					wrapper.appendChild(el.firstChild);
				}

				el.appendChild(wrapper);

				if (el.getAttribute('data-day') !== null) {
					word_day = el.getAttribute('data-day');
				} else {
					word_day = 'day';
				}
				if (el.getAttribute('data-days') !== null) {
					word_days = el.getAttribute('data-days');
				} else {
					word_days = 'days';
				}
				if (el.getAttribute('data-hour') !== null) {
					word_hour = el.getAttribute('data-hour');
				} else {
					word_hour = 'hour';
				}
				if (el.getAttribute('data-hours') !== null) {
					word_hours = el.getAttribute('data-hours');
				} else {
					word_hours = 'hours';
				}
				if (el.getAttribute('data-minute') !== null) {
					word_min = el.getAttribute('data-minute');
				} else {
					word_min = 'minute';
				}
				if (el.getAttribute('data-minutes') !== null) {
					word_mins = el.getAttribute('data-minutes');
				} else {
					word_mins = 'minutes';
				}
				if (el.getAttribute('data-second') !== null) {
					word_sec = el.getAttribute('data-second');
				} else {
					word_sec = 'second';
				}
				if (el.getAttribute('data-seconds') !== null) {
					word_secs = el.getAttribute('data-seconds');
				} else {
					word_secs = 'seconds';
				}

				function renderMe() {
					if (!el.classList.contains('done')) {
						simplyCountdown(el, {
							year: show_until.getFullYear(),
							month: show_until.getMonth() + 1,
							day: show_until.getDate(),
							hours: show_until.getHours(),
							minutes: show_until.getMinutes(),
							seconds: show_until.getSeconds(),
							enableUtc: false,
							zeroPad: true,
							onEnd: function() {
								ended();
							},
							words: {
								days: {
									singular: word_day,
									plural: word_days
								},
								hours: {
									singular: word_hour,
									plural: word_hours
								},
								minutes: {
									singular: word_min,
									plural: word_mins
								},
								seconds: {
									singular: word_sec,
									plural: word_secs
								}
							}
						});
						el.classList.add('done');
						container.classList.add('done');
					}

				}
				renderMe();
			});
		}, 'countdown-loaded');
	}
});
window.dispatchEvent(countdownEvt);


// Handles animated count-up values with symbol detection (e.g., +, %, currencies).
const list_count = document.querySelectorAll('.l4cu');
const list_count_js = fp('js/plugin-countup.js', 'plugin_countup_js');

if (list_count.length) {
	function renderListCount(em) {

		const specialMap = {
			'+': 'has-plus',
			'!': 'has-exc',
			'$': 'has-usd',
			'€': 'has-eur',
			'£': 'has-gbp',
			'¥': 'has-jpy',
			'₹': 'has-inr',
			'%': 'has-per',
			'★': 'has-str'
		};

		em.querySelectorAll('span.clone').forEach((el) => {
			let original = el.innerHTML;

			for (const char in specialMap) {
				if (original.includes(char)) {
					original = original.replaceAll(char, '');
					el.classList.add(specialMap[char]);
				}
			}

			if (/[+!$€£¥₹%★]$/.test(el.innerHTML)) {
				el.classList.add('after');
			}

			el.innerHTML = original;

			const decimals = original.includes('.') ? original.split('.')[1].length : 0;

			const value = parseFloat(el.getAttribute('data-val').replace(/[^\d.-]/g, ''));

			if (typeof CountUp === 'function') {
				const count = new CountUp(el, value, {
					decimalPlaces: decimals,
					duration: 3
				});
				if (!count.error) count.start();
			}
		});
	}

	loadRes(list_count_js, function () {
		list_count.forEach(em => {
			em.querySelectorAll('span:first-child').forEach(el => {
				const cloneMe = el.cloneNode(true);
				const str = el.innerHTML;

				const wrapper = document.createElement('span');
				wrapper.className = 'main';

				while (el.firstChild) {
					wrapper.appendChild(el.firstChild);
				}
				el.appendChild(wrapper);

				cloneMe.classList.add('clone');
				cloneMe.setAttribute('data-val', str);
				el.appendChild(cloneMe);
				el.classList.add('cont');
			});

			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						renderListCount(em);
						observer.disconnect();
					}
				});
			});

			observer.observe(em);
		});
	}, 'countup-loaded');
}



window.addEventListener("updateSliders", function(evt) {
	var list_collection_slider = document.querySelectorAll('.l4cl.slider:not(.in-popup)');
	if (list_collection_slider.length) {
		Array.from(list_collection_slider).forEach(function (em) {
			updateSliders(em);
		});
	}
	var module_featured = document.querySelectorAll('.m6fr');
	if (module_featured.length) {
		Array.from(module_featured).forEach(function (em) {
			updateSliders(em);
		});
	}
});
window.dispatchEvent(updateSlidersEvt);

// Manages alert lists by hiding/closing items with fade-out animation and marking container when all alerts are hidden.  
window.addEventListener("alerts", function(evt) {
	var list_alerts = document.querySelectorAll('.l4al:not(.inline):not(.l4al-trustbadge)');
	function countUs(element) {
		if (element.children.length === element.querySelectorAll('li.hidden').length) {
			element.classList.add('all-hidden');
		} else {
			element.classList.remove('all-hidden');
		}
	}
	if (list_alerts.length) {
		Array.from(list_alerts).forEach(function (em) {
			countUs(em);
			Array.from(em.querySelectorAll('a.close')).forEach(function (el) {
				asyncCSS();
				el.addEventListener('click', function (e) {
					el.closest('li').classList.add('fade-me-out');
					setTimeout(function () {
						el.closest('li').classList.add('hidden');
					}, 400);
					e.preventDefault();
				});
			});
			Array.from(em.querySelectorAll('li')).forEach(function (es) {
				if (em.parentNode.id === 'root') {
					var dl = 5000;
					asyncCSS();
					setTimeout(function () {
						es.classList.add('fade-me-out');
					}, dl);
					setTimeout(function () {
						es.classList.add('hidden');
						countUs(em);
					}, dl + 400);
				}
			});
		});
	}
});
window.dispatchEvent(alertsEvt);

// Handles print actions by injecting print CSS on click of .link-print or Ctrl/Cmd+P before triggering window.print.  
const link_print = document.querySelectorAll('.link-print');
if (link_print.length) {
	link_print.forEach(el => {
		el.addEventListener('click', function (e) {
			e.preventDefault();
			new_css('css-print', window.filepaths['async_print_css'], 'print');
			setTimeout(() => window.print(), 400);
		});
	});
}
document.addEventListener('keydown', function (event) {
	if ((event.ctrlKey || event.metaKey) && (event.key === 'p' || event.keyCode === 80)) {
		new_css('css-print', window.filepaths['async_print_css'], 'print');
	}
});

// Copies text from data-copy attribute to clipboard and shows a temporary clicked state on the link.  
const link_copy = document.querySelectorAll('a[data-copy]');
if (link_copy.length) {
	const copyToClipboardAsync = str => {
		if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
			return navigator.clipboard.writeText(str);
		}
		return Promise.reject('The Clipboard API is not available.');
	};
	Array.from(link_copy).forEach(function (el) {
		el.addEventListener('click', function (e) {
			el.classList.add('clicked');
			copyToClipboardAsync(el.dataset.copy);
			setTimeout(function () {
				el.classList.remove('clicked');
			}, 2000);
			e.preventDefault();
		});
	});
}

// Transforms .scheme-tip elements into toggleable tooltips with open/close links and initializes interaction.  
window.addEventListener("tooltip", function (evt) {
	const scheme_tip = document.getElementsByClassName('scheme-tip');
	Array.from(scheme_tip).forEach(function (el) {
		el.innerHTML = '<a class="tip-toggle" href="./"></a> <span class="tip"><span class="tip-inner">' + el.innerHTML + '</span> <a class="tip-toggle" href="./">Close</a></span>';
		const tipToggle = el.querySelector('a.tip-toggle');
		if (tipToggle) {
			tipToggle.addEventListener('click', function (e) {
				el.classList.toggle('toggle');
				e.preventDefault();
			});
		}
		el.classList.add('ready');
	});
});
window.dispatchEvent(tooltipEvt);

window.addEventListener("fancybox", function (evt) {
	// has-more toggles fancybox
	const swipper_bullets = document.querySelectorAll('a.swiper-pagination-bullet');
	Array.from(swipper_bullets).forEach(function (el, index) {
		el.addEventListener('click', function (e) {
			if (el.classList.contains('has-more')) {
				var data_fancybox = document.querySelectorAll('[data-fancybox]');
				data_fancybox[index].click();
			}
			return true;
		});
	});

	// Fancybox
	function createFancyboxAndShowItem(itemIndex, fancyName) {
		// Enable/disable swipe support for fancybox based on the type of the displayed item
		function toogleTouchSupportOnItem(item, fancybox) {
			var touchStateForItem = true;
			if (item.type !== "image") {
				touchStateForItem = false;
			}

			if (fancybox.Carousel.Panzoom.options.touch !== touchStateForItem) {
				fancybox.Carousel.Panzoom.options.touch = touchStateForItem;
				fancybox.Carousel.updatePanzoom();
			}
		}
		var showItems = [],
			all_items = document.querySelectorAll(`[data-fancybox="${fancyName}"]`),
			item,
			fbox;

		all_items.forEach(item => {
			var src_type = null,
				hrefItem = item.getAttribute('href'),
				thumbImg = null, //item.querySelector('img').getAttribute('data-src'),
				caption = item.getAttribute('data-caption'),
				alt = item.getAttribute('data-alt'),
				title = item.getAttribute('data-title');

			const imgElement = item.querySelector('img');
			if (imgElement) {
				thumbImg = imgElement.getAttribute('data-src');
			}
			if (endsWithAny(['jpg', 'jpeg', '.gif', '.png', '.webp'], hrefItem)) {
				src_type = 'image';
			}
			if (hrefItem.indexOf('youtube.com/watch') !== -1 || hrefItem.indexOf('vimeo.com/') !== -1) {
				src_type = 'video';
			}
			if (endsWithAny(['mp4', 'webm', 'ogg'], hrefItem)) {
				src_type = 'html5video';
			}
			// check if item was already added to showItems array to avoid duplication
			if (!showItems.find(_item => _item.src === hrefItem)) {
				showItems.push({
					src: hrefItem,
					type: src_type,
					preload: false,
					animated: false,
					caption: caption,
					thumb: thumbImg,
					baseClass: 'myCustomClass'
				});
			}
		});
		fbox = new Fancybox(showItems, {
			startIndex: itemIndex || 0,
			Carousel: {
				Panzoom: {
					touch: true
				}
			},
			Html: {
				video: {
					autoplay: false
				}
			},
			slug: 'gallery',
			hash: true,
			on: {
				ready: function (_fancybox) {
					toogleTouchSupportOnItem(_fancybox.items[_fancybox.Carousel.page], _fancybox);
					// show thumbs
					_fancybox.plugins.Thumbs.toggle();
					if (_fancybox.plugins.Thumbs.state == 'hidden') {
						_fancybox.plugins.Thumbs.show();
					}
				},
				done: function (_fancybox, carousel, slide) {
					// check if there's model-viewer
					var slides = _fancybox.$container.querySelectorAll('div.fancybox__thumbs div.carousel__slide'),
						all_items = document.querySelectorAll('[data-fancybox]'),
						getClass = _fancybox.$container.querySelectorAll('.fancybox__slide.is-selected')[0];
					if (slides.length < all_items.length) {
						return;
					}
					var ar_buttons = _fancybox.$container.querySelectorAll('div.fancybox__carousel model-viewer + [data-shopify-xr]');
					if (ar_buttons.length) {
						ar_buttons.forEach(function (el, index) {
							el.style.bottom = _fancybox.$container.querySelectorAll('div.fancybox__thumbs')[0].offsetHeight + 23 + "px";
						});
					}
					all_items.forEach(function (el, index) {
						if (el.querySelectorAll('model-viewer').length > 0) {
							slides[index].classList.add("has-cube");
						}
					});
					if (getClass !== undefined) {
						_fancybox.$container.setAttribute('data-class', getClass.getAttribute('class'));
						if (getClass.querySelector('video')) {
							getClass.querySelector('video').play();
						}
					}
				},
				"Carousel.change": function (_fancybox, carousel, slide) {
					var getClass;
					var iframe = _fancybox.$container.getElementsByTagName("iframe");
					Array.from(iframe).forEach(function (el) {
						var url = el.getAttribute('src');
						el.setAttribute('src', '');
						el.setAttribute('src', url);
					});
					setTimeout(function () {
						getClass = _fancybox.$container.querySelectorAll('.fancybox__slide.is-selected')[0];
						if (getClass !== undefined) {
							_fancybox.$container.setAttribute('data-class', getClass.getAttribute('class'));
							if (getClass.querySelector('video')) {
								getClass.querySelector('video').play();
							}
						}
					}, 100);
					toogleTouchSupportOnItem(_fancybox.items[carousel.page], _fancybox);

				}
			}
		});
	}
	var data_fancybox = document.querySelectorAll('[data-fancybox]:not(.fancybox-initialized)');
	if (data_fancybox.length) {
		Array.from(data_fancybox).forEach(function (el, index) {
			el.classList.add('fancybox-initialized');
			const hrefItem = el.getAttribute('href');

			if (hrefItem.includes('youtube.com/watch') || hrefItem.includes('vimeo.com/')) {
				el.setAttribute('data-type', 'video');
			}
			if (endsWithAny(['mp4', 'webm', 'ogg'], hrefItem)) {
				el.setAttribute('data-type', 'html5video');
			}
			el.addEventListener('click', function (e) {
				const fancybox_name = el.getAttribute('data-fancybox');
				if (fancybox_name) {
					const list = document.querySelectorAll('[data-fancybox="' + el.getAttribute('data-fancybox') + '"]');
					let itemIndex = Array.from(list).indexOf(el);

					const zoom = el.getAttribute('data-zoom');
					if (zoom === 'false') {
						html_tag.classList.add('fb-no-zoom');
					}

					Array.from(document.querySelectorAll('[data-fancybox="' + el.getAttribute('data-fancybox') + '"] model-viewer')).forEach(function (el) {
						el.addEventListener('click', function (e) {
							e.preventDefault();
							e.stopPropagation();
							e.cancelBubble = true;
							return false;
						});
					});
					loadRes(window.filepaths['plugin_fancybox_js'], function () {
						new_css('css-fancybox', window.filepaths['async_fancybox_css']);
						createFancyboxAndShowItem(itemIndex, fancybox_name);
					}, 'fancybox-loaded');
				}
				e.preventDefault();
			});
		});
		document.addEventListener('click', function (event) {
			if (event.target.closest('.carousel__button.fancybox__button--close')) {
				html_tag.classList.remove('fb-no-zoom');
				//Fancybox.close();
			}
		});
	}
});
window.dispatchEvent(fancyboxEvt);


var nextUntil = function (elem, selector, filter) {
	var siblings = [];
	elem = elem.nextElementSibling;
	while (elem) {
		if (elem.matches(selector)) {
			break;
		}
		if (filter && !elem.matches(filter)) {
			elem = elem.nextElementSibling;
			continue;
		}
		siblings.push(elem);
		elem = elem.nextElementSibling;
	}
	return siblings;
};

const table_drop = document.getElementsByClassName('table-drop');
if (table_drop.length) {
	Array.from(table_drop).forEach(function (el) {
		Array.from(el.querySelectorAll('tr:not(.sub)')).forEach(et => {
			et.classList.add('not-sub');
		});

		Array.from(el.querySelectorAll('a.toggle')).forEach(em => {
			em.addEventListener('click', function (e) {
				const nextRows = nextUntil(em.closest('tr'), '.not-sub');
				em.classList.toggle('active');

				Array.from(nextRows).forEach(en => {
					en.classList.toggle('hidden');
					en.classList.toggle('active');
				});
				e.preventDefault();
			});
		});
	});
}

// Moves section ID into a span for accurate scroll anchoring.
const anchorEl = document.querySelectorAll('[id^="section-"]');
if (anchorEl.length) {
	anchorEl.forEach(el => {
		if (el.classList.contains('has-anchor')) return;

		const span = document.createElement('span');
		span.className = 'anchor';
		span.id = el.id;

		el.classList.add('has-anchor');
		el.removeAttribute('id');
		el.appendChild(span);
	});
}

function checkHeight(el) {
	requestAnimationFrame(() => {
		if (!el.closest('.link-more-clicked')) {
			el.classList.toggle('high', el.scrollHeight > el.clientHeight);
		}
	});
}
window.addEventListener("heightLimit", function (evt) {
	var module_limit = document.querySelectorAll('.m6lm:not(.m6lm-initialized)');
	if (module_limit.length) {
		Array.from(module_limit).forEach(function (el) {
			checkHeight(el);

			window.addEventListener('resize', throttle(() => {
				checkHeight(el);
			}, 500));

			const m6tbParent = el.closest('.m6tb');

			if (m6tbParent !== null) {
				Array.from(m6tbParent.querySelectorAll('.tabs-header')).forEach(function (en) {
					en.addEventListener('click', function (e) {
						checkHeight(el);
					});
				});
			}
		});
	}
});
window.dispatchEvent(heightLimitEvt);

window.addEventListener("hotspots", function (evt) {
	var list_hotspots = document.querySelectorAll('.l4hs:not(.l4hs-initialized)');
	if (list_hotspots.length) {
		new_css('css-hotspots', window.filepaths['async_hotspots_css']);
		Array.from(list_hotspots).forEach(function (el) {
			el.classList.add('l4hs-initialized');
			const figure = el.closest('figure');
			if (figure) {
				figure.classList.add('has-l4hs');
			}
			var hotspot_panels = el.getElementsByClassName('m6pn');
			if (hotspot_panels.length) {
				Array.from(hotspot_panels).forEach(function (el) {
					document.querySelector('#root').appendChild(el);
				})

			}

			let closest;
			const list_hs_legend = document.getElementsByClassName('l4hs-l');
			if (list_hs_legend.length) {
				closest = el.closest('article, .m6as, .m6ac, .m6fr, [class*="shopify-section"]');
			}

			Array.from(el.getElementsByClassName('toggle')).forEach(function (en) {
				if (en.tagName.toLowerCase() === 'a') {
					en.addEventListener('click', function (e) {
						const pt = en.parentNode;
						const pt_leg = closest ? closest.querySelector('.l4hs-l') : null;
						let pt_index;
						let pt_lg_ind;
						if (pt_leg) {
							pt_index = Array.from(pt.parentNode.children).indexOf(pt) + 1;
							pt_lg_ind = pt_leg.querySelector('li:nth-child(' + pt_index + ')');
						}
						new_css('css-hotspots', window.filepaths['async_hotspots_css']);
						if (!en.hasAttribute('data-panel') && !en.hasAttribute('data-popup')) {
							if (pt.classList.contains('toggle')) {
								pt.classList.remove('toggle');
								if (pt_leg) {
									pt_lg_ind.classList.remove('toggle');
								}
							} else {
								Array.from(el.children).forEach(function (em) {
									em.classList.remove('toggle');
								});
								pt.classList.add('toggle');
								if (pt_leg) {
									Array.from(pt_leg.children).forEach(function (legLi) {
										legLi.classList.remove('toggle');
									});
									pt_lg_ind.classList.add('toggle');
								}
							}
						}
						e.preventDefault();
					});
				}
			});
			Array.from(el.children).forEach(em => {
				let hds = em.offsetLeft;

				if (em.querySelector('.info')) {
					em.classList.add('has-info');
				}

				if (!global_dir[1]) {
					hds = el.clientWidth - em.offsetLeft;
				}

				if (hds > el.clientWidth * 0.5) {
					em.classList.add('inv');
				}

				if (em.offsetTop > el.clientHeight * 0.5) {
					em.classList.add('inv-v');
				}
			});
			if (list_hs_legend.length) {
				if (closest) {
					const legends = closest.querySelectorAll('[class*="l4hs"] > li');

					if (legends.length) {
						Array.from(legends).forEach(function (li) {
							const closestLeg = li.closest('.l4hs-l');

							if (closestLeg) {
								append_url(li, 'toggle', 'toggle');
							}

							const closestDef = li.closest('.l4hs');
							const index = Array.from(li.parentNode.children).indexOf(li);

							if (closestDef) {
								const mobileLink = li.querySelector('a.desktop-hide');
								const relatedLi = closest.querySelector(`[class*="l4hs-l"] li:nth-child(${index + 1})`);

								if (mobileLink && relatedLi) {
									const clone = mobileLink.cloneNode(true);
									clone.classList.replace('desktop-hide', 'toggle-mobile');
									clone.classList.remove('toggle');

									relatedLi.appendChild(clone);
								}
							}

							const relatedLis = closest.querySelectorAll(`[class*="l4hs"] li:nth-child(${index + 1})`);

							if (relatedLis.length) {
								const toggleAnchor = li.querySelector('a.toggle');

								if (toggleAnchor) {
									toggleAnchor.addEventListener('mouseover', function () {
										relatedLis.forEach(function (el) {
											el.classList.add('hover');
										});
									});

									toggleAnchor.addEventListener('mouseout', function () {
										relatedLis.forEach(function (el) {
											el.classList.remove('hover');
										});
									});
									if (closestLeg) {
										toggleAnchor.addEventListener('click', function (e) {
											if (toggleAnchor.parentElement.classList.contains('toggle')) {
												relatedLis.forEach(function (el) {
													el.classList.remove('toggle');
												});
											} else {
												legends.forEach(function (legend) {
													legend.classList.remove('toggle');
												});
												relatedLis.forEach(function (el) {
													el.classList.add('toggle');
												});
											}
											e.preventDefault();
										});
									}
								}
							}
						});
					}
				}
			}
		});
	}
});
window.dispatchEvent(hotspotsEvt);


// Handles marquees by cloning list items for seamless scroll and initializes typewriter effect on '.type' marquees.
const maqrueeEvt = new CustomEvent('maqruee');
const moduleMaqrueeJs = fp('js/plugin-typewritter.js', 'plugin_typewriter_js');

let typewriterLoading = false;
let typewriterCallbacks = [];
let marqueeRAF = 0;

function getPendingMarquees(root) {
	const scope = root && root.querySelectorAll ? root : document;
	const marquees = [];

	if (scope.matches && scope.matches('.m6kn:not(.done):not(.typewriter-pending)')) {
		marquees.push(scope);
	}

	scope.querySelectorAll('.m6kn:not(.done):not(.typewriter-pending)').forEach(el => {
		marquees.push(el);
	});

	return marquees;
}

function runTypewriterCallbacks() {
	const callbacks = typewriterCallbacks.slice();
	typewriterCallbacks = [];

	callbacks.forEach(callback => {
		callback();
	});
}

function loadTypewriter(callback) {
	if (typeof Typewriter === 'function') {
		callback();
		return;
	}

	typewriterCallbacks.push(callback);

	if (typewriterLoading) {
		return;
	}

	typewriterLoading = true;

	const script = document.createElement('script');
	script.src = moduleMaqrueeJs;
	script.async = true;
	script.setAttribute('data-typewriter-loader', 'true');

	script.onload = () => {
		typewriterLoading = false;
		runTypewriterCallbacks();
	};

	script.onerror = () => {
		typewriterLoading = false;
		typewriterCallbacks = [];
		console.warn('Script failed: ' + moduleMaqrueeJs);
	};

	document.body.appendChild(script);
}

function getTypewriterStringSplitter() {
	return str => {
		if (typeof GraphemeSplitter === 'function') {
			const splitter = new GraphemeSplitter();
			return splitter.splitGraphemes(str);
		}

		return Array.from(str);
	};
}

function initTypewriterMarquee(elements) {
	loadTypewriter(() => {
		if (typeof Typewriter !== 'function') {
			elements.forEach(el => {
				el.classList.remove('typewriter-pending');
			});
			return;
		}

		const stringSplitter = getTypewriterStringSplitter();

		elements.forEach(el => {
			if (el.classList.contains('done')) return;

			const ul = el.querySelector('ul');

			if (!ul) {
				el.classList.remove('typewriter-pending');
				return;
			}

			const texts = Array.from(ul.children).map(li => {
				return (li.textContent || '').trim();
			}).filter(text => {
				return text !== '';
			});

			if (!texts.length) {
				el.classList.remove('typewriter-pending');
				return;
			}

			const wrapper = document.createElement('span');
			wrapper.className = 'inner';

			let delay = 'natural';
			if (el.classList.contains('fast')) delay = 50;
			if (el.classList.contains('slow')) delay = 200;
			if (el.hasAttribute('data-speed')) delay = parseFloat(el.dataset.speed);

			try {
				new Typewriter(wrapper, {
					loop: true,
					strings: texts,
					autoStart: true,
					delay,
					stringSplitter
				});

				el.innerHTML = '';
				el.appendChild(wrapper);
				el.classList.remove('typewriter-pending');
				el.classList.add('done');
			} catch (error) {
				el.classList.remove('typewriter-pending');
				console.warn('Typewriter marquee failed:', error);
			}
		});
	});
}

function initNormalMarquee(elements) {
	elements.forEach(el => {
		if (el.classList.contains('done')) return;

		const ul = el.querySelector('ul');
		if (!ul) return;

		const li = ul.children;
		if (!li.length) return;

		el.style.setProperty('--items', li.length);

		requestAnimationFrame(() => {
			const pageRoot = root_id || document.documentElement;
			const divBy = ul.clientWidth || pageRoot.clientWidth || 1;
			const containerWidth = pageRoot.clientWidth || window.innerWidth;
			const clonesNeeded = Math.max(3, Math.ceil(containerWidth / divBy) + 2);

			for (let i = 0; i < clonesNeeded; i++) {
				const clone = ul.cloneNode(true);
				el.appendChild(clone);
			}

			if (el.children[0]) {
				el.children[0].classList.add('clone');
			}
		});

		el.classList.add('done');
	});
}

function initMarquee(root) {
	const moduleMaqruee = getPendingMarquees(root);

	if (!moduleMaqruee.length) return;

	const mqType = [];
	const mqNorm = [];

	for (const el of moduleMaqruee) {
		if (el.classList.contains('type')) {
			el.classList.add('typewriter-pending');
			mqType.push(el);
		} else {
			mqNorm.push(el);
		}
	}

	if (mqNorm.length) {
		initNormalMarquee(mqNorm);
	}

	if (mqType.length) {
		initTypewriterMarquee(mqType);
	}
}

function scheduleMarquee(root) {
	if (marqueeRAF) {
		cancelAnimationFrame(marqueeRAF);
	}

	marqueeRAF = requestAnimationFrame(() => {
		marqueeRAF = 0;
		initMarquee(root || document);
	});
}

window.addEventListener('maqruee', () => {
	scheduleMarquee(document);
});

window.dispatchEvent(maqrueeEvt);

if (window.Shopify && window.Shopify.designMode) {
	document.addEventListener('shopify:section:load', event => {
		scheduleMarquee(event.target);
	});

	document.addEventListener('shopify:section:select', event => {
		scheduleMarquee(event.target);
	});

	document.addEventListener('shopify:block:select', event => {
		const section = event.target && event.target.closest ? event.target.closest('.shopify-section') : null;
		scheduleMarquee(section || event.target);
	});

	const marqueeObserver = new MutationObserver(mutations => {
		for (const mutation of mutations) {
			for (const node of mutation.addedNodes) {
				if (!node.querySelectorAll) continue;

				if (
					(node.matches && node.matches('.m6kn:not(.done)')) ||
					node.querySelector('.m6kn:not(.done)')
				) {
					scheduleMarquee(document);
					return;
				}
			}
		}
	});

	if (document.body) {
		marqueeObserver.observe(document.body, {
			childList: true,
			subtree: true
		});
	}
}


// Toggles 'm6cp-open' class on the html element when the compare module's button is clicked.
const moduleCompare = document.querySelectorAll('.m6cp');
if (moduleCompare.length) {
	moduleCompare.forEach(el => {
		const linkBtn = el.querySelector('.link-btn a[role="button"]');
		if (!linkBtn) return;

		linkBtn.addEventListener('click', e => {
			e.preventDefault();
			html_tag.classList.toggle('m6cp-open');
		});
	});
}


// Enables native share functionality on links with data-share attribute using the Web Share API.
const shareBtns = document.querySelectorAll('a[data-share]');
if (shareBtns.length && navigator.share) {
	shareBtns.forEach(el => {
		el.addEventListener('click', e => {
			e.preventDefault();
			navigator.share({
				title: document.title,
				url: el.getAttribute('data-share')
			});
		});
	});
}


// Scrolls the page to target elements specified in data-scroll on option change or element click, preventing default for links.
const data_scroll_product_slider = document.querySelectorAll('[data-scroll]');
if (data_scroll_product_slider.length) {
	Array.from(data_scroll_product_slider).forEach(el => {
		const isOption = el.tagName.toLowerCase() === 'option';
		const selector = el.getAttribute('data-scroll');

		const scrollHandler = () => {
			const targetElements = document.querySelectorAll(selector);
			if (targetElements.length > 0) {
				targetElements[0].scrollIntoView();
			}
		};

		if (isOption) {
			const em = el.parentNode;
			em.addEventListener('change', () => {
				const dx = em.options[em.selectedIndex].getAttribute('data-scroll');
				if (dx !== null) {
					const targetElements = document.querySelectorAll(dx);
					if (targetElements.length > 0) {
						targetElements[0].scrollIntoView();
					}
				}
			});
		} else {
			el.addEventListener('click', e => {
				scrollHandler();
				if (el.tagName.toLowerCase() === 'a') {
					e.preventDefault();
				}
			});
		}
	});
}

// Syncs select option changes with a Swiper slider, navigating to the specified slide index.
const data_update_generic_slider = document.querySelectorAll('[data-slide-to]');
if (data_update_generic_slider.length) {
	Array.from(data_update_generic_slider).forEach(el => {
		if (el.tagName.toLowerCase() !== 'option') {
			return;
		}

		const em = el.parentNode;
		const closestLi = el.closest('li');

		if (closestLi !== null) {
			em.addEventListener('change', () => {
				const dx = em.options[em.selectedIndex].getAttribute('data-slide-to');
				if (dx !== null) {
					const findSwiper = closestLi.querySelector('.s4wi');

					if (findSwiper && findSwiper.children[0].swiper) {
						findSwiper.children[0].swiper.slideTo(dx);
					}
				}
			});
		}
	});
}

window.addEventListener("removeSDCcss", function (event) {
	const shopify_default_css = document.getElementById('shopify-dynamic-checkout');
	if (shopify_default_css) {
		shopify_default_css.remove();
	}
});
window.dispatchEvent(removeSDCcssEvt);


// Adds 'scrolled' and 'scr2' classes to HTML on scroll, touchmove or once the page is scrolled past the threshold, removes only 'scrolled' on resize.
const scrolled_threshold = 10;

const addScrolledClass = () => {
	if (html_tag.classList.contains('scrolled')) return;
	html_tag.classList.add('scrolled', 'scr2');
};

const applyScrolledState = () => {
	if (html_tag.classList.contains('scrolled')) return;

	const y = window.scrollY || window.pageYOffset || 0;
	if (y > scrolled_threshold) addScrolledClass();
}

if (!html_tag.classList.contains('scrolled')) {
	if (mediaMin760.matches) {
		window.addEventListener('resize', throttle(() => {
			html_tag.classList.remove('scrolled');
		}, 500));
	}

	window.addEventListener('scroll', addScrolledClass, asyncPass);
	window.addEventListener('touchmove', addScrolledClass, asyncPass);

	window.addEventListener('pageshow', () => {
		requestAnimationFrame(() => {
			requestAnimationFrame(applyScrolledState);
		});
	}, asyncPass);

	window.addEventListener('load', () => {
		requestAnimationFrame(applyScrolledState);
	}, asyncPass);

	applyScrolledState();
}


// Manages CSS custom properties for header heights on different screen sizes (tablet and mobile).
let customHeaderT_ready = false;
let customHeaderT_timeout = 0;
let customHeaderT_lastH = null;

function customHeaderT() {
	if (customHeaderT_ready || customHeaderT_timeout || mediaMin1000.matches || !top_id || !nav_main) return;

	customHeaderT_timeout = setTimeout(() => {
		customHeaderT_timeout = 0;

		const h = top_id.clientHeight;

		if (h !== customHeaderT_lastH) {
			customHeaderT_lastH = h;
			html_tag.style.setProperty('--header_mih_c', `${h}px`);
		}

		customHeaderT_ready = true;
	}, 0);
}

function navMediaTab() {
	customHeaderT_ready = false;

	function firstInteraction() {
		removeListeners();
		customHeaderT();
	}

	function removeListeners() {
		if (!isMobile) {
			window.removeEventListener('mousemove', firstInteraction);
		}
		document.removeEventListener('keyup', firstInteraction);
		document.removeEventListener('touchstart', firstInteraction);
		document.removeEventListener('scroll', firstInteraction);
	}

	if (!isMobile) {
		window.addEventListener('mousemove', firstInteraction, asyncOnce);
	}

	document.addEventListener('keyup', firstInteraction, asyncOnce);
	document.addEventListener('touchstart', firstInteraction, asyncPass);
	document.addEventListener('scroll', firstInteraction, asyncPass);

	window.addEventListener('resize', throttle(() => {
		customHeaderT_ready = false;
		customHeaderT();
	}, 500));
}


let customHeaderM_ready = false;
let customHeaderM_timeout = 0;
let customHeaderM_lastH = null;

function customHeaderM() {
	if (customHeaderM_ready || customHeaderM_timeout || mediaMin760.matches || !header_outer || !header_inner || !requiredElementsExist) return;

	customHeaderM_timeout = setTimeout(() => {
		customHeaderM_timeout = 0;

		const h = header_outer.clientHeight;

		if (h !== customHeaderM_lastH) {
			customHeaderM_lastH = h;
			html_tag.style.setProperty('--sticky_offset_m', `${h}px`);
		}

		customHeaderM_ready = true;
	}, 0);
}

function navMediaM() {
	customHeaderM_ready = false;

	function firstInteractionM() {
		removeListenersM();
		customHeaderM();
	}

	function removeListenersM() {
		if (!isMobile) {
			window.removeEventListener('mousemove', firstInteractionM);
		}
		document.removeEventListener('keyup', firstInteractionM);
		document.removeEventListener('touchstart', firstInteractionM);
		document.removeEventListener('scroll', firstInteractionM);
	}

	if (!isMobile) {
		window.addEventListener('mousemove', firstInteractionM, asyncOnce);
	}

	document.addEventListener('keyup', firstInteractionM, asyncOnce);
	document.addEventListener('touchstart', firstInteractionM, asyncPass);
	document.addEventListener('scroll', firstInteractionM, asyncPass);

	window.addEventListener('resize', throttle(() => {
		customHeaderM_ready = false;
		customHeaderM();
	}, 500));
}


if (nav_main) {
	if (mediaTablet.matches) {
		navMediaTab();
	}

	mediaTablet.addEventListener('change', e => {
		if (e.matches) navMediaTab();
	});

	if (mediaMax760.matches) {
		navMediaM();
	}

	mediaMax760.addEventListener('change', e => {
		if (e.matches) navMediaM();
	});
}


var list_product_slider = document.getElementsByClassName('l4pr');
if (list_product_slider.length) {
	function l4prClick(element) {
		let index = parseInt(element.dataset.l4prIndex);

		if (isNaN(index)) {
			return;
		}
		const m6prElement = element.closest('.m6pr');
		let findSwiper;

		if (m6prElement !== null) {
			findSwiper = m6prElement.querySelector('.l4pr.s4wi').children[0].swiper;
		} else {
			findSwiper = document.querySelector('.l4pr.s4wi').children[0].swiper;
		}
		if (findSwiper !== undefined) {
			findSwiper.slideTo(index);
		}
	}

	document.addEventListener('click', function (event) {
		const isOption = event.target.tagName.toLowerCase() === 'option';
		if (!isOption && event.target.matches('[data-l4pr-index], [data-l4pr-index] *')) {
			l4prClick(event.target.closest('[data-l4pr-index]'));
			if (event.target.tagName.toLowerCase() === 'a') {
				if (event.target.classList.contains('swiper-pagination-bullet')) {
					const slide = event.target.closest('.swiper-slide');
					const siblings = Array.from(getSiblings(slide));
					siblings.forEach(em => {
						em.firstElementChild.classList.remove('swiper-pagination-bullet-active');
					});
					event.target.classList.add('swiper-pagination-bullet-active');
				}
				event.preventDefault();
			}
		}
	});
	document.addEventListener('change', function (event) {
		const isSelect = event.target.tagName.toLowerCase() === 'select';
		if (isSelect) {
			const selectedOption = event.target.options[event.target.selectedIndex];
			l4prClick(selectedOption);
		}
	});
}

// Adds 'limit-clicked' class to parent on clicking limited links inside .check elements and prevents default action.
document.addEventListener('click', function (e) {
	const target = e.target.closest('.check[data-limit] a.limit, .check[data-limit] .limit a');
	if (target) {
		target.closest('.check').classList.add('limit-clicked');
		e.preventDefault();
	}
});

// Live search
var liveSearch = function (elem, livesearch_placeholders) {
	const searchTerm = elem.value.trim();
	getSearchResults(searchTerm, livesearch_placeholders);
}
var getSearchResults = function (searchTerm, livesearch_placeholders) {
	var liveSearchEl = document.getElementById('livesearch');
	if (searchTerm.length > 0) {
		fetch(routes.predictive_search_url + "?q=" + searchTerm + "&resources[limit]=4&resources[limit_scope]=each&section_id=livesearch")
			.then((response) => {
				if (!response.ok) {
					var error = new Error(response.status);
					throw error;
				}
				return response.text();
			})
			.then((text) => {
				const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-livesearch').innerHTML;
				liveSearchEl.innerHTML = resultsMarkup;
				search_id.classList.remove('processing');
				if (liveSearchEl.querySelectorAll('[data-search-suggestion]')) {
					Array.from(liveSearchEl.querySelectorAll('[data-search-suggestion]')).forEach(function (el) {
						el.addEventListener('click', function (e) {
							e.preventDefault();
							search_input = search_id.getElementsByTagName('input');
							search_input[0].value = el.dataset.searchSuggestion;
							search_id.classList.add('processing');
							liveSearch(search_input[0]);
						});
					});
				}
				window.dispatchEvent(ratingsEvt);
			})
			.catch((error) => {
				// this.close();
				throw error;
			});
	} else if (livesearch_placeholders) {
		liveSearchEl.innerHTML = ''
		liveSearchEl.appendChild(livesearch_placeholders);
		html_tag.classList.add('search-full', 'search-full-mode');
		search_id.classList.remove('processing');
	} else {
		search_id.classList.remove('processing');
	}
};

// AJAX cart - handling add-to-cart, bulk/upsell items, cart updates, notes, discounts, and item removal.
var ajaxCart = (function (module) {
	var init, formOverride, addCartItem, handleCartPanel, updateCartPanel, handleCartPage, updateCartPage, showCartPanel, openCart, refreshCart, updateDiscount, handleCartUpdates, removeItem, updateCartCount, handleErrorMessage, addToCart, addNote; // Define the functions
	var productFormContainer, cartPageContainer, sideCartContainer, cartPageTemplate, countElement, totalElement, itemsQueue, formObject, count, checkedProducts, openCartPromise, cartRefreshQueue = Promise.resolve(), cartFallbackStarted, activeNoteSave, queuedNoteSave; // Define the data and elements

	init = function () {
		productFormContainer = document.querySelectorAll('form.f8pr:not(.cart-initialized), form.form-card:not(.initialized, .cart-initialized)');
		cartPageContainer = document.querySelector('.form-cart, .cart-empty');
		sideCartContainer = document.getElementById('cart');
		countElement = document.getElementById('cart-count');
		totalElement = document.getElementById('cart-total');

		if (productFormContainer.length) {
			formOverride();
		} // when there is an product form, initialize the ajax cart for the entire form
		if (cartPageContainer != null) { // when there is an cart form, initialize the ajax cart for the inputs in the form
			cartPageContainer = cartPageContainer.parentElement;
			cartPageTemplate = cartPageContainer.id.replace('shopify-section-', '');
			handleCartUpdates(cartPageContainer);
		}
	};

	function processLinkedForm(form, action = 'add') {
		const formId = form.getAttribute('id');
		if (!formId) return;

		const btn = document.querySelector(`button[form="${formId}"]`);
		if (!btn) return;

		const closestForm = btn.closest('form.f8ps');
		if (!closestForm) return;

		if (action === 'add') {
			closestForm.classList.add('processing');
		} else if (action === 'remove') {
			closestForm.classList.remove('processing');
		}
	}

	formOverride = function () {
		Array.from(productFormContainer).forEach(function (form) {
			if (form.classList.contains('cart-initialized')) {
				return;
			}
			form.classList.add('cart-initialized');
			form.addEventListener('submit', function (e) {
				new_css('form-validation-css', validation_css);

				form.classList.add('processing');

				processLinkedForm(form, 'add');
				/*if (sticky) {
					sticky.classList.add('processing');
				}*/
				e.preventDefault();
				addCartItem(form);
			});
		});
	};

	addCartItem = function (form, listItem) {
		let selectedUpsellItems = null;

		if (form.classList.contains('f8pr-buy-button')) {
			const productContainer = form.closest('div.f8pr');
			const currentUpsellElement = productContainer ? productContainer.querySelector('.upsell-items') : null;

			if (currentUpsellElement) {
				selectedUpsellItems = currentUpsellElement.querySelectorAll('input:checked');
			}
		}

		addToCart(form, listItem, selectedUpsellItems);
	}

	function getCartJsonForStandardEvent(response) {
		if (
			response &&
			Array.isArray(response.items) &&
			typeof response.item_count !== 'undefined' &&
			typeof response.total_price !== 'undefined'
		) {
			return Promise.resolve(response);
		}

		const cartJsonUrl = getCartFallbackUrl().replace(/\/$/, '') + '.js';

		return fetch(cartJsonUrl, {
			credentials: 'same-origin',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Accept': 'application/json'
			}
		}).then((cartResponse) => {
			if (!cartResponse.ok) {
				throw new Error(`Cart state request failed: ${cartResponse.status} ${cartResponse.statusText}`);
			}

			return cartResponse.json();
		});
	}

	function resolveStandardCartMutation(standardMutation, response) {
		if (!standardMutation) return Promise.resolve(true);

		return getCartJsonForStandardEvent(response)
			.then((cart) => standardMutation.resolveFromAjaxCart(cart))
			.catch((error) => {
				standardMutation.reject(error, 'INVALID', false);
				console.warn('Standard storefront cart result conversion failed', error);
				return false;
			});
	}

	function rejectStandardCartMutation(standardMutation, error, code, emitError = true) {
		if (standardMutation) standardMutation.reject(error, code, emitError);
	}

	function getStandardCartMutationStatus(response) {
		const parsedStatus = parseInt(response && response.status, 10);
		if (Number.isFinite(parsedStatus)) return parsedStatus;
		return response && response.status === 'bad_request' ? 400 : 0;
	}


	function settleStandardCartMutationFailure(standardMutation, response) {
		if (!standardMutation) return Promise.resolve(false);

		const status = getStandardCartMutationStatus(response);
		standardMutation.reject(
			createStandardCartError(response),
			status >= 500 || status === 423 || status === 429 || status === 430 ? 'SERVICE_UNAVAILABLE' : 'INVALID',
			true
		);
		return Promise.resolve(false);
	}


	function handlePostMutationFailure(standardMutation, error, failureMessage) {
		console.warn(failureMessage, error);

		return resolveStandardCartMutation(standardMutation, false).then(() => {
			navigateToCartOnce();
			return false;
		});
	}

	function getStandardAddLines(form, selectedUpsellItems) {
		const data = new FormData(form);
		const lines = [];
		const mainProductId = data.get('id');
		const mainQuantity = parseInt(data.get('quantity') || 1, 10);

		if (mainProductId) {
			lines.push({
				merchandiseId: mainProductId,
				quantity: Number.isFinite(mainQuantity) ? mainQuantity : 1
			});
		}

		if (selectedUpsellItems && selectedUpsellItems.length) {
			Array.from(selectedUpsellItems).forEach((element) => {
				if (!element.dataset.id) return;
				lines.push({ merchandiseId: element.dataset.id, quantity: 1 });
			});
		}

		return lines;
	}

	function requireNativeCartRefresh(result, message) {
		return Promise.resolve(result).then((updated) => {
			if (!updated) throw new Error(message);
			return true;
		});
	}

	function updateCartSummaryFromSection(response) {
		if (!response || !response.sections || !response.sections['side-cart']) {
			throw new Error('Cart summary section is missing from the add response.');
		}

		const section = new DOMParser()
			.parseFromString(response.sections['side-cart'], 'text/html')
			.querySelector('#shopify-section-side-cart');

		if (!section) throw new Error('Cart summary section contains invalid markup.');

		const quantityElement = section.querySelector('[data-totalqty]');
		const totalPriceElement = section.querySelector('[data-totalprice]');

		if (!quantityElement || !totalPriceElement) {
			throw new Error('Cart summary data is missing from the add response.');
		}

		updateCartCount(quantityElement.dataset.totalqty, totalPriceElement.dataset.totalprice);
		return true;
	}

	function refreshCartAfterAdd(response, listItem) {
		const updates = [];

		if (general.enable_cart_drawer) {
			updates.push(
				requireNativeCartRefresh(
					updateCartPanel(response, true, !!listItem),
					'Cart drawer refresh did not complete.'
				)
			);
		} else {
			updates.push(Promise.resolve().then(() => updateCartSummaryFromSection(response)));
		}

		if (general.template == 'cart' && cartPageContainer != null) {
			updates.push(
				requireNativeCartRefresh(
					updateCartPage(response),
					'Cart page refresh did not complete.'
				)
			);
		}

		return Promise.all(updates).then(() => true);
	}

	const handleAddToCartResponse = async function (response, form, listItem, upsellItems, standardMutation) {
		form.classList.remove('processing');
		document.querySelectorAll('[data-error-key]').forEach(function (el) {
			el.classList.remove('is-invalid');
		});

		processLinkedForm(form, 'remove');

		if (response.status) {
			if (listItem) listItem.remove();
			hidePanels();

			if (typeof response.description == 'object') {
				let keys = Object.keys(response.description);
				let messages = Object.values(response.description);

				for (let i = 0; i < keys.length; i++) {
					const errorElement = document.querySelector('[data-error-key="' + keys[i] + '"]');
					if (errorElement) errorElement.classList.add('is-invalid');
				}

				for (let i = 0; i < messages.length; i++) {
					handleErrorMessage(messages[i]);
				}
			} else {
				handleErrorMessage(response.description);
			}

			await settleStandardCartMutationFailure(standardMutation, response);
			return false;
		}

		if (listItem) listItem.remove();
		const standardSettlement = resolveStandardCartMutation(standardMutation, response);

		try {
			await refreshCartAfterAdd(response, listItem);
		} catch (error) {
			await standardSettlement;
			throw error;
		}

		await standardSettlement;

		if (upsellItems && upsellItems.length > 0) {
			upsellItems.forEach(function (checkbox) {
				checkbox.checked = false;
			});
		}

		if (!general.enable_cart_drawer) {
			window.location.href = routes.cart_url;
		}

		return true;
	};

	addToCart = function (form, listItem, upsellItems) {
		const sections = ['side-cart'];

		if (general.template == 'cart' && cartPageTemplate) {
			sections.push(cartPageTemplate);
		}

		const sectionsToFetch = sections.join(',');
		const hasBulkItems = upsellItems && upsellItems.length > 0;
		const eventContainer = listItem && listItem.closest ? listItem.closest('#cart, .form-cart') : null;
		const standardTarget = getStandardCartEventTarget(form, eventContainer);
		const standardLines = getStandardAddLines(form, upsellItems);
		const standardMutation = standardLines.length ? beginStandardCartMutation('lines', standardTarget, {
			action: 'add',
			context: getStandardCartContext(standardTarget, 'product'),
			lines: standardLines
		}) : null;

		let request;
		let mutationSucceeded = false;

		if (hasBulkItems) {
			const bulkFormData = new FormData(form);
			let allItems = [];
			const mainProductId = bulkFormData.get('id');
			const mainProductQuantity = bulkFormData.get('quantity') || 1;
			const mainProductItem = {
				id: parseInt(mainProductId),
				quantity: parseInt(mainProductQuantity)
			};
			const sellingPlan = bulkFormData.get('selling_plan');

			if (sellingPlan) mainProductItem.selling_plan = parseInt(sellingPlan);

			const properties = {};
			for (let [key, value] of bulkFormData.entries()) {
				if (key.startsWith('properties[')) {
					const propKey = key.replace('properties[', '').replace(']', '');
					properties[propKey] = value;
				}
			}

			if (Object.keys(properties).length > 0) mainProductItem.properties = properties;
			allItems.push(mainProductItem);

			Array.from(upsellItems).forEach((element) => {
				const upsellItem = {
					id: parseInt(element.dataset.id),
					quantity: 1
				};

				if (element.dataset.parentProduct) {
					upsellItem.parent_id = parseInt(element.dataset.parentProduct);
				}

				allItems.push(upsellItem);
			});

			const config = {
				method: 'POST',
				credentials: 'same-origin',
				body: JSON.stringify({ items: allItems, sections: sectionsToFetch }),
				headers: {
					'Content-Type': 'application/json',
					'X-Requested-With': 'xmlhttprequest'
				}
			};

			request = fetch(routes.cart_add_url, config);
		} else {
			const formData = new FormData(form);
			formData.append('sections', sectionsToFetch);
			const config = {
				method: 'POST',
				body: formData,
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Accept': 'application/javascript'
				}
			};

			request = fetch(routes.cart_add_url, config);
		}

		return request
			.then(async (cartResponse) => {
				let response;
				mutationSucceeded = cartResponse.ok;

				try {
					response = await cartResponse.json();
				} catch (error) {
					throw new Error('Invalid add-to-cart response');
				}

				if (!cartResponse.ok && !response.status) response.status = cartResponse.status;
				mutationSucceeded = !response.status;

				return handleAddToCartResponse(response, form, listItem, upsellItems, standardMutation);
			})
			.catch((error) => {
				form.classList.remove('processing', 'processed');
				processLinkedForm(form, 'remove');

				if (mutationSucceeded) {
					return handlePostMutationFailure(
						standardMutation,
						error,
						'Post-mutation add-to-cart handling failed.'
					);
				}

				rejectStandardCartMutation(standardMutation, error, 'SERVICE_UNAVAILABLE', true);
				console.warn('addCartItem error', error);

				if (hasBulkItems) {
					handleErrorMessage('Er is een fout opgetreden bij het toevoegen aan de winkelwagen.');
				}

				return false;
			});
	};


	handleErrorMessage = function (errorMessage = false) {
		if (errorMessage) {
			var alertAttributes = {
					message: errorMessage,
					type: "error"
				},
				showAlertEvent = new CustomEvent("showAlert", {
					detail: alertAttributes
				});
			window.dispatchEvent(showAlertEvent);
		}
	}

	showCartPanel = function () {
		openPanel('cart');
		window.dispatchEvent(new CustomEvent("themeCartOpened"));
	}

	function getCartPanelMarkup(sectionHtml) {
		if (typeof sectionHtml !== 'string' || !sectionHtml) return null;

		const section = new DOMParser()
			.parseFromString(sectionHtml, 'text/html')
			.querySelector('#shopify-section-side-cart');

		return section ? section.innerHTML : null;
	}

	function getCartPageMarkup(sectionHtml) {
		if (typeof sectionHtml !== 'string' || !sectionHtml || !cartPageTemplate) return null;

		const section = new DOMParser()
			.parseFromString(sectionHtml, 'text/html')
			.querySelector('#shopify-section-' + cartPageTemplate);

		return section ? section.innerHTML : null;
	}

	function getCartSectionsUrl(sectionIds) {
		const url = new URL(window.location.href);
		url.searchParams.delete('section_id');
		url.searchParams.set('sections', sectionIds.join(','));
		return url.pathname + url.search;
	}

	function refreshCartSummary() {
		if (!countElement && !totalElement) return Promise.resolve(true);

		return fetch(getCartFallbackUrl() + '.js', {
			credentials: 'same-origin',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Accept': 'application/json'
			}
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Cart summary request failed: ${response.status} ${response.statusText}`);
				}
				return response.json();
			})
			.then((cart) => {
				let formattedTotal = null;

				if (totalElement) {
					if (!window.Shopify || typeof window.Shopify.formatMoney !== 'function') {
						throw new Error('Shopify.formatMoney is unavailable for the cart total refresh.');
					}
					formattedTotal = window.Shopify.formatMoney(cart.total_price);
				}

				updateCartCount(cart.item_count, formattedTotal);
				return true;
			});
	}

	updateCartPage = function (response = false) {
		if (!response || !response.sections || !cartPageTemplate) {
			return Promise.resolve(false);
		}

		const resultsMarkup = getCartPageMarkup(response.sections[cartPageTemplate]);

		if (resultsMarkup == null) return Promise.resolve(false);

		handleCartPage(resultsMarkup);
		return Promise.resolve(true);
	}

	updateCartPanel = function (response = false, openCartPanel = true, undoRemove = false, forceRefetch = false) {
		if (!sideCartContainer) return Promise.resolve(false);

		if (response) {
			if (!response.sections || !response.sections['side-cart']) {
				console.warn('updateCartPanel: side-cart section missing');
				return Promise.resolve(false);
			}

			const resultsMarkup = getCartPanelMarkup(response.sections['side-cart']);

			if (resultsMarkup == null) return Promise.resolve(false);

			handleCartPanel(resultsMarkup, openCartPanel, undoRemove);
			return Promise.resolve(true);
		}

		if (sideCartContainer.childNodes.length < 3 || forceRefetch) {
			return fetch(window.Shopify.routes.root + '?section_id=side-cart')
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Request failed: ${response.status} ${response.statusText}`);
					}
					return response.text();
				})
				.then((text) => {
					const resultsMarkup = getCartPanelMarkup(text);

					if (resultsMarkup == null) return false;

					handleCartPanel(resultsMarkup, openCartPanel);
					return true;
				})
				.catch((error) => {
					console.warn('updateCartPanel error', error);
					return false;
				});
		}

		showCartPanel();
		return Promise.resolve(true);
	}

	function getCartFallbackUrl(fallbackUrl) {
		if (typeof fallbackUrl === 'string' && fallbackUrl) return fallbackUrl;
		return routes.cart_url || '/cart';
	}

	function navigateToCartOnce(fallbackUrl) {
		if (cartFallbackStarted) return;
		cartFallbackStarted = true;

		const targetUrl = getCartFallbackUrl(fallbackUrl);

		try {
			window.location.assign(targetUrl);
		} catch (error) {
			window.location.href = targetUrl;
		}
	}

	refreshCart = function () {
		const performRefresh = function () {
			init();

			const sectionIds = [];

			if (sideCartContainer) {
				sectionIds.push('side-cart');
			}

			if (cartPageContainer && cartPageTemplate && !sectionIds.includes(cartPageTemplate)) {
				sectionIds.push(cartPageTemplate);
			}

			if (!sectionIds.length) {
				return refreshCartSummary();
			}

			return fetch(getCartSectionsUrl(sectionIds), {
				credentials: 'same-origin',
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Accept': 'application/json'
				}
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Cart sections request failed: ${response.status} ${response.statusText}`);
					}
					return response.json();
				})
				.then((sections) => {
					let panelMarkup = null;
					let pageMarkup = null;

					if (sideCartContainer) {
						panelMarkup = getCartPanelMarkup(sections['side-cart']);
						if (panelMarkup == null) {
							throw new Error('Missing or invalid cart section: side-cart');
						}
					}

					if (cartPageContainer) {
						pageMarkup = getCartPageMarkup(sections[cartPageTemplate]);
						if (pageMarkup == null) {
							throw new Error(`Missing or invalid cart page section: ${cartPageTemplate}`);
						}
					}

					if (panelMarkup != null) {
						handleCartPanel(panelMarkup, false, false, false);
					}

					if (pageMarkup != null) {
						handleCartPage(pageMarkup);
					}

					return true;
				});
		};

		const queuedRefresh = cartRefreshQueue
			.catch(() => true)
			.then(performRefresh);

		cartRefreshQueue = queuedRefresh;
		return queuedRefresh;
	};

	openCart = function (options = {}) {
		const shouldRedirect = options.redirect !== false;
		const fallbackUrl = getCartFallbackUrl(options.fallbackUrl);

		if (!openCartPromise) {
			openCartPromise = Promise.resolve()
				.then(() => {
					init();

					if (!general.enable_cart_drawer || !sideCartContainer) return false;

					return updateCartPanel(false, true);
				})
				.then((opened) => !!opened)
				.finally(() => {
					openCartPromise = null;
				});
		}

		return openCartPromise
			.then((opened) => {
				if (!opened && shouldRedirect) {
					navigateToCartOnce(fallbackUrl);
				}
				return opened;
			})
			.catch((error) => {
				if (shouldRedirect) {
					navigateToCartOnce(fallbackUrl);
					return false;
				}
				throw error;
			});
	}

	handleCartPage = function (resultsMarkup) {
		cartPageContainer.innerHTML = resultsMarkup;
		if (typeof window.updateAcceleratedCheckoutLayout === 'function') {
			window.updateAcceleratedCheckoutLayout();
		}
		window.dispatchEvent(semanticInputEvt);
		window.dispatchEvent(formValidateEvt);
		window.dispatchEvent(accordeonEvt);
		window.dispatchEvent(countdownEvt);
		window.dispatchEvent(bindInputEvt);
		window.dispatchEvent(schemeTooltipEvt);
		window.dispatchEvent(popupsEvt);
		handleCartUpdates(cartPageContainer);
		updateCartCount();
	}

	handleCartPanel = function (resultsMarkup, openCartPanel, undoRemove, preserveRemoving = true) {
		let items = sideCartContainer.querySelectorAll('.l4ca > li');
		sideCartContainer.innerHTML = resultsMarkup;
		Array.from(items).forEach(function (item, index) {
			if (preserveRemoving && item.classList.contains('removing')) {
				if (undoRemove && sideCartContainer.querySelectorAll('.l4ca > li')[(index + 1)]) {
					sideCartContainer.querySelector('.l4ca').insertBefore(item, sideCartContainer.querySelectorAll('.l4ca > li')[(index + 1)]);
				} else if (undoRemove) {
					sideCartContainer.querySelector('.l4ca').append(item);
				} else {
					sideCartContainer.querySelector('.l4ca').insertBefore(item, sideCartContainer.querySelectorAll('.l4ca > li')[(index)]);
				}
				if (sideCartContainer.querySelector('.empty:not(.hidden)')) {
					sideCartContainer.querySelector('.empty').classList.add('hidden');
				}
			}
		});

		if (sideCartContainer.querySelector('.product-recommendations:not(.product-recommendations-initialized)')) {
			window.dispatchEvent(recommendedProductsEvt);
		}

		window.dispatchEvent(modulePanelEvt);
		window.dispatchEvent(listCartEvt);
		window.dispatchEvent(semanticInputEvt);
		handleCartUpdates(sideCartContainer);
		window.dispatchEvent(formValidateEvt);
		window.dispatchEvent(accordeonEvt);
		window.dispatchEvent(schemeTooltipEvt);
		window.dispatchEvent(popupsEvt);
		updateCartCount();
		if (openCartPanel) {
			showCartPanel();
		}
	}

	function createCartNoteAbortError() {
		if (typeof DOMException === 'function') {
			return new DOMException('Superseded cart note save', 'AbortError');
		}

		const error = new Error('Superseded cart note save');
		error.name = 'AbortError';
		return error;
	}

	function hasPendingCartNoteSave() {
		return Boolean(activeNoteSave || queuedNoteSave);
	}

	function restoreCartNoteNavigationState(element) {
		if (!element || element.getAttribute('data-cart-note-locked') !== 'true') return;

		if ('disabled' in element) {
			element.disabled = element.getAttribute('data-cart-note-original-disabled') === 'true';
		}
		if ('inert' in element) {
			element.inert = element.getAttribute('data-cart-note-original-inert') === 'true';
		}

		if (element.getAttribute('data-cart-note-had-aria-disabled') === 'true') {
			element.setAttribute('aria-disabled', element.getAttribute('data-cart-note-original-aria-disabled') || 'false');
		} else {
			element.removeAttribute('aria-disabled');
		}

		element.removeAttribute('data-cart-note-locked');
		element.removeAttribute('data-cart-note-original-disabled');
		element.removeAttribute('data-cart-note-original-inert');
		element.removeAttribute('data-cart-note-had-aria-disabled');
		element.removeAttribute('data-cart-note-original-aria-disabled');
	}

	function setCartNoteNavigationLocked(locked) {
		const navigationElements = document.querySelectorAll(
			'[data-cart-note-navigation], [data-cart-note-navigation-container]'
		);

		Array.from(navigationElements).forEach((element) => {
			if (!locked) {
				restoreCartNoteNavigationState(element);
				return;
			}

			if (element.getAttribute('data-cart-note-locked') !== 'true') {
				element.setAttribute('data-cart-note-locked', 'true');
				if ('disabled' in element) {
					element.setAttribute('data-cart-note-original-disabled', element.disabled ? 'true' : 'false');
				}
				if ('inert' in element) {
					element.setAttribute('data-cart-note-original-inert', element.inert ? 'true' : 'false');
				}
				element.setAttribute(
					'data-cart-note-had-aria-disabled',
					element.hasAttribute('aria-disabled') ? 'true' : 'false'
				);
				element.setAttribute(
					'data-cart-note-original-aria-disabled',
					element.getAttribute('aria-disabled') || ''
				);
			}

			if ('disabled' in element) element.disabled = true;
			if (element.hasAttribute('data-cart-note-navigation-container') && 'inert' in element) {
				element.inert = true;
			}
			element.setAttribute('aria-disabled', 'true');
		});
	}

	function bindCartNoteNavigationGuards(container) {
		const navigationElements = container.querySelectorAll(
			'[data-cart-note-navigation]:not([data-cart-note-navigation-listening])'
		);
		const navigationForms = container.querySelectorAll(
			'form[data-cart-note-navigation-form]:not([data-cart-note-navigation-listening])'
		);

		Array.from(navigationElements).forEach((element) => {
			element.setAttribute('data-cart-note-navigation-listening', 'true');
			element.addEventListener('click', function (event) {
				if (!hasPendingCartNoteSave()) return;
				event.preventDefault();
				event.stopImmediatePropagation();
			}, true);
		});

		Array.from(navigationForms).forEach((form) => {
			form.setAttribute('data-cart-note-navigation-listening', 'true');
			form.addEventListener('submit', function (event) {
				if (!hasPendingCartNoteSave()) return;
				event.preventDefault();
				event.stopImmediatePropagation();
			}, true);
		});
	}

	function finishCartNoteOperation(operation, result) {
		if (!operation || operation.completionSettled) return false;
		operation.completionSettled = true;
		operation.resolveCompletion(result);
		return true;
	}

	function supersedeCartNoteOperation(operation) {
		if (!operation || operation.superseded) return;
		operation.superseded = true;
		rejectStandardCartMutation(
			operation.standardMutation,
			createCartNoteAbortError(),
			'INVALID',
			false
		);
		if (!operation.started) finishCartNoteOperation(operation, false);
	}

	function markCartNoteSaved(note) {
		const noteElements = document.querySelectorAll('textarea.note-listening, textarea[name="note"]');
		Array.from(noteElements).forEach((noteElement) => {
			if (noteElement.value === note) {
				noteElement.setAttribute('data-cart-note-saved-value', note);
			}
		});
	}

	function performCartNoteSave(operation) {
		let mutationSucceeded = false;
		const requestConfig = {
			method: 'POST',
			body: JSON.stringify({
				'note': operation.note,
				'sections': getNativeCartSectionsValue()
			}),
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		};

		return fetch(routes.cart_update_url, requestConfig)
			.then(async (cartResponse) => {
				mutationSucceeded = cartResponse.ok;
				const response = await cartResponse.json();

				if (operation.superseded) return false;
				if (!cartResponse.ok && !response.status) response.status = cartResponse.status;
				if (response.status) {
					mutationSucceeded = false;
					const error = createStandardCartError(response);
					handleErrorMessage(error.message);
					await settleStandardCartMutationFailure(operation.standardMutation, response);
					return false;
				}
				mutationSucceeded = true;

				await resolveStandardCartMutation(operation.standardMutation, response);
				if (operation.superseded) return false;
				markCartNoteSaved(operation.note);

				await refreshNativeCartSurfaces(response, operation.container, {
					refreshPanel: operation.container !== sideCartContainer,
					refreshPage: operation.container === sideCartContainer,
					openPanel: false
				});

				if (operation.superseded) return false;
				return true;
			})
			.catch((error) => {
				if (operation.superseded) return false;

				if (mutationSucceeded) {
					return handlePostMutationFailure(
						operation.standardMutation,
						error,
						'Post-mutation cart note handling failed.'
					);
				}

				rejectStandardCartMutation(
					operation.standardMutation,
					error,
					'SERVICE_UNAVAILABLE',
					true
				);
				console.warn('addNote error', error);
				return false;
			});
	}

	function startNextCartNoteSave() {
		if (activeNoteSave || !queuedNoteSave) {
			if (!activeNoteSave && !queuedNoteSave) setCartNoteNavigationLocked(false);
			return;
		}

		const operation = queuedNoteSave;
		queuedNoteSave = null;

		if (operation.superseded) {
			finishCartNoteOperation(operation, false);
			startNextCartNoteSave();
			return;
		}

		activeNoteSave = operation;
		operation.started = true;
		setCartNoteNavigationLocked(true);

		performCartNoteSave(operation)
			.then((result) => finishCartNoteOperation(operation, result))
			.catch((error) => {
				if (!operation.superseded) {
					rejectStandardCartMutation(operation.standardMutation, error, 'SERVICE_UNAVAILABLE');
				}
				finishCartNoteOperation(operation, false);
			})
			.then(() => {
				if (activeNoteSave === operation) activeNoteSave = null;
				startNextCartNoteSave();
			});
	}

	handleCartUpdates = function (container) {
		var updateItemInput = container.querySelectorAll('input[name="updates[]"]'),
			removeItemLink = container.querySelectorAll('.remove-from-cart-link:not(.listening)'),
			discountForm = container.querySelectorAll('.discount-form:not(.listening)'),
			removeDiscountLink = container.querySelectorAll('.remove-discount:not(.listening)');

		Array.from(updateItemInput).forEach(function (input) {
			if (input.classList.contains('listening')) return;
			input.classList.add('listening');
			input.addEventListener('change', function (e) {
				updateItemQty(e.target, container);
			});
		});

		Array.from(discountForm).forEach(function (form) {
			form.classList.add('listening');
			form.addEventListener('submit', function (e) {
				e.preventDefault();
				updateDiscount(form, form.querySelector('input[name="discount"]').value, 'add', container);
			});
		});
		Array.from(removeDiscountLink).forEach(function (link) {
			link.classList.add('listening');
			link.addEventListener('click', function (e) {
				e.preventDefault();
				updateDiscount(link, link.dataset.discountCode, 'remove', container);
			});
		});

		bindCartNoteNavigationGuards(container);

		const noteElements = container.querySelectorAll('textarea[name="note"]:not(.note-listening)');
		Array.from(noteElements).forEach((noteElement) => {
			noteElement.classList.add('note-listening');
			noteElement.setAttribute('data-cart-note-saved-value', noteElement.value);
			noteElement.addEventListener('change', () => {
				if (noteElement.getAttribute('data-cart-note-saved-value') === noteElement.value) return;
				addNote(noteElement, container);
			});
		});

		if (hasPendingCartNoteSave()) setCartNoteNavigationLocked(true);

		Array.from(removeItemLink).forEach(function (link) {
			link.classList.add('listening');
			link.addEventListener('click', function (e) {
				e.preventDefault();
				removeItem(e.currentTarget, container);
			});
		});
	}

	function getNativeCartSectionsValue() {
		return ['side-cart', cartPageTemplate]
			.filter(Boolean)
			.filter((sectionId, index, sectionIds) => sectionIds.indexOf(sectionId) === index)
			.join(',');
	}

	function refreshNativeCartSurfaces(response, container, options = {}) {
		const updates = [];
		const refreshPanel = options.refreshPanel !== false;
		const refreshPage = options.refreshPage !== false;
		const openPanelAfterRefresh = options.openPanel === true;
		const undoRemove = options.undoRemove === true;

		if (refreshPanel && sideCartContainer) {
			if (!response || !response.sections || !response.sections['side-cart']) {
				return Promise.reject(new Error('Cart drawer section is missing from the cart response.'));
			}

			updates.push(
				updateCartPanel(response, openPanelAfterRefresh, undoRemove).then((updated) => {
					if (!updated) throw new Error('Cart drawer refresh did not complete.');
					return true;
				})
			);
		}

		if (refreshPage && cartPageContainer != null) {
			if (!response || !response.sections || !response.sections[cartPageTemplate]) {
				return Promise.reject(new Error('Cart page section is missing from the cart response.'));
			}

			updates.push(
				updateCartPage(response).then((updated) => {
					if (!updated) throw new Error('Cart page refresh did not complete.');
					return true;
				})
			);
		}

		if (!updates.length && !sideCartContainer && cartPageContainer == null) {
			updates.push(refreshCartSummary());
		}

		return Promise.all(updates).then(() => true);
	}

	addNote = function (attribute, container) {
		const note = attribute.value;

		if (queuedNoteSave && queuedNoteSave.note === note) return queuedNoteSave.completion;
		if (activeNoteSave && !activeNoteSave.superseded && activeNoteSave.note === note) {
			return activeNoteSave.completion;
		}

		const target = getStandardCartEventTarget(attribute, container);
		const standardMutation = beginStandardCartMutation('note', target, {
			context: getStandardCartContext(target, 'cart'),
			note: note
		});
		let resolveCompletion;
		const operation = {
			note: note,
			container: container,
			standardMutation: standardMutation,
			started: false,
			superseded: false,
			completionSettled: false,
			resolveCompletion: null,
			completion: null
		};

		operation.completion = new Promise((resolve) => {
			resolveCompletion = resolve;
		});
		operation.resolveCompletion = resolveCompletion;

		if (queuedNoteSave) supersedeCartNoteOperation(queuedNoteSave);
		queuedNoteSave = operation;
		if (activeNoteSave) supersedeCartNoteOperation(activeNoteSave);

		setCartNoteNavigationLocked(true);
		startNextCartNoteSave();
		return operation.completion;
	}

	updateDiscount = function (element, discountCode, action, container) {
		if (!discountCode) return Promise.resolve(false);

		discountCode = discountCode.toLowerCase();
		let discounts = [];
		const existingDiscounts = container.querySelectorAll('.remove-discount');

		for (const discount of existingDiscounts) {
			discounts.push(discount.dataset.discountCode.toLowerCase());
		}

		if (action === 'add') {
			if (discounts.includes(discountCode)) {
				handleErrorMessage(container.querySelector('.discount-form .already-applied-error-message ').innerText);
				return Promise.resolve(false);
			}

			discounts.push(discountCode);
		} else if (action === 'remove') {
			const index = discounts.indexOf(discountCode);
			if (index === -1) return Promise.resolve(false);
			discounts.splice(index, 1);
		}

		const target = getStandardCartEventTarget(container, container);
		const standardMutation = beginStandardCartMutation('discount', target, {
			discountCodes: discounts.map((code) => ({ code: code }))
		});
		let mutationSucceeded = false;

		element.classList.add('processing');
		const config = {
			method: 'POST',
			body: JSON.stringify({
				'discount': discounts.join(','),
				'sections': getNativeCartSectionsValue()
			}),
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json',
				'Accept': 'application/javascript'
			}
		};

		return fetch(routes.cart_update_url, config)
			.then(async (cartResponse) => {
				mutationSucceeded = cartResponse.ok;
				const response = await cartResponse.json();

				if (!cartResponse.ok && !response.status) response.status = cartResponse.status;
				if (response.status) {
					mutationSucceeded = false;
					const error = createStandardCartError(response);
					handleErrorMessage(error.message);
					await settleStandardCartMutationFailure(standardMutation, response);
					return false;
				}

				const rejectedDiscount = response.discount_codes && response.discount_codes.find((discount) => {
					return discount.code.toLowerCase() === discountCode && discount.applicable === false;
				});

				if (rejectedDiscount) {
					mutationSucceeded = true;
					const messageElement = container.querySelector('.discount-form .not-applicable-error-message ');
					const message = messageElement ? messageElement.innerText : 'Discount code is not applicable';
					const discountForm = container.querySelector('.discount-form');

					if (discountForm) discountForm.querySelector('input[name="discount"]').value = '';
					handleErrorMessage(message);
					await resolveStandardCartMutation(standardMutation, response);
					return false;
				}

				mutationSucceeded = true;
				await resolveStandardCartMutation(standardMutation, response);
				await refreshNativeCartSurfaces(response, container, {
					openPanel: container === sideCartContainer
				});
				return true;
			})
			.catch((error) => {
				if (mutationSucceeded) {
					return handlePostMutationFailure(
						standardMutation,
						error,
						'Post-mutation discount handling failed.'
					);
				}

				rejectStandardCartMutation(standardMutation, error, 'SERVICE_UNAVAILABLE', true);
				console.warn('updateDiscount error', error);
				return false;
			})
			.finally(() => {
				element.classList.remove('processing');
			});
	};

	const updateItemQty = function (input, container) {
		const line = parseInt(input.dataset.line);
		const quantity = parseInt(input.value);
		const lineId = input.dataset.lineKey || String(line);
		const target = getStandardCartEventTarget(container, container);
		const standardMutation = beginStandardCartMutation('lines', target, {
			action: quantity === 0 ? 'remove' : 'update',
			context: getStandardCartContext(target, 'cart'),
			lines: [{ id: lineId, quantity: quantity }]
		});
		let mutationSucceeded = false;

		const config = {
			method: 'POST',
			body: JSON.stringify({
				'line': line,
				'quantity': quantity,
				'sections': getNativeCartSectionsValue()
			}),
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json',
				'Accept': 'application/javascript'
			}
		};

		const noteElBefore = container ? container.querySelector('textarea[name="note"]') : null;
		const savedNote = noteElBefore ? noteElBefore.value : null;

		return fetch(routes.cart_change_url, config)
			.then(async (cartResponse) => {
				mutationSucceeded = cartResponse.ok;
				const response = await cartResponse.json();

				if (!cartResponse.ok && !response.status) response.status = cartResponse.status;
				if (response.status) {
					mutationSucceeded = false;
					const error = createStandardCartError(response);
					handleErrorMessage(error.message);
					await settleStandardCartMutationFailure(standardMutation, response);
					return false;
				}

				mutationSucceeded = true;
				await resolveStandardCartMutation(standardMutation, response);
				await refreshNativeCartSurfaces(response, container, {
					openPanel: container === sideCartContainer
				});

				if (savedNote) {
					const newNoteElement = document.querySelector('textarea[name="note"]');
					if (newNoteElement) newNoteElement.value = savedNote;
				}
				return true;
			})
			.catch((error) => {
				if (mutationSucceeded) {
					return handlePostMutationFailure(
						standardMutation,
						error,
						'Post-mutation quantity handling failed.'
					);
				}

				rejectStandardCartMutation(standardMutation, error, 'SERVICE_UNAVAILABLE', true);
				console.warn('updateItemQty error', error);
				return false;
			});
	};

	removeItem = function (link, container) {
		const line = parseInt(link.dataset.line);
		const lineId = link.dataset.lineKey || String(line);
		let item = link.closest('li');
		const target = getStandardCartEventTarget(container, container);
		const standardMutation = beginStandardCartMutation('lines', target, {
			action: 'remove',
			context: getStandardCartContext(target, 'cart'),
			lines: [{ id: lineId, quantity: 0 }]
		});
		let mutationSucceeded = false;

		if (container === sideCartContainer && item && item.querySelector('.removed') != null) {
			item.classList.add('processing');
		}

		const config = {
			method: 'POST',
			body: JSON.stringify({
				'line': line,
				'quantity': 0,
				'sections': getNativeCartSectionsValue()
			}),
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json',
				'Accept': 'application/javascript'
			}
		};

		return fetch(routes.cart_change_url, config)
			.then(async (cartResponse) => {
				mutationSucceeded = cartResponse.ok;
				const response = await cartResponse.json();

				if (!cartResponse.ok && !response.status) response.status = cartResponse.status;
				if (response.status) {
					mutationSucceeded = false;
					const error = createStandardCartError(response);
					handleErrorMessage(error.message);
					await settleStandardCartMutationFailure(standardMutation, response);
					return false;
				}

				mutationSucceeded = true;

				if (container === sideCartContainer && item && item.querySelector('.removed') != null) {
					item.dispatchEvent(new CustomEvent('removing'));
					item.classList.add('removing');
					item.classList.remove('processing');
					item.querySelector('.removed a').addEventListener('click', function (e) {
						const undoLink = e.currentTarget;
						item.classList.add('processing');
						let tempForm = document.createElement('form');
						tempForm.innerHTML = '<input type="hidden" name="id" value="' + undoLink.dataset.id + '"><input type="hidden" name="quantity" value="' + undoLink.dataset.qty + '">';

						if (undoLink.dataset.selling_plan) {
							tempForm.innerHTML += '<input type="hidden" name="selling_plan" value="' + undoLink.dataset.selling_plan + '">';
						}

						if (undoLink.dataset.parentKey) {
							tempForm.innerHTML += '<input type="hidden" name="parent_line_key" value="' + undoLink.dataset.parentKey + '">';
						}

						for (var key in undoLink.dataset) {
							if (key.indexOf('property-') === 0) {
								var data = JSON.parse(undoLink.dataset[key]);
								tempForm.innerHTML += '<input type="hidden" name="properties[' + data[0] + ']" value="' + data[1] + '">';
							}
						}

						let undoUpsellItems = null;
						if (undoLink.dataset.childrenId) {
							let tempFormUpsell = document.createElement('form');
							const parentLineKeys = undoLink.dataset.childrenId.split(',');

							parentLineKeys.forEach((key) => {
								tempFormUpsell.innerHTML += '<input type="hidden" data-id="' + key + '" data-parent-product="' + undoLink.dataset.id + '">';
							});

							undoUpsellItems = tempFormUpsell.querySelectorAll('input');
						}

						addToCart(tempForm, item, undoUpsellItems);
						tempForm.remove();
					});
				}

				await resolveStandardCartMutation(standardMutation, response);
				await refreshNativeCartSurfaces(response, container, {
					openPanel: container === sideCartContainer
				});
				return true;
			})
			.catch((error) => {
				if (item) item.classList.remove('processing');

				if (mutationSucceeded) {
					return handlePostMutationFailure(
						standardMutation,
						error,
						'Post-mutation remove handling failed.'
					);
				}

				rejectStandardCartMutation(standardMutation, error, 'SERVICE_UNAVAILABLE', true);
				console.warn('removeItem error', error);
				return false;
			});
	};


	updateCartCount = function (count, total) {
		if (count == null) {
			const qtyEl = document.querySelector('[data-totalqty]');
			if (qtyEl && qtyEl.dataset) {
				count = qtyEl.dataset.totalqty;
			}
		}

		if (countElement && count != null) {
			countElement.innerHTML = count;
		}

		if (totalElement) {
			if (total == null) {
				const priceEl = document.querySelector('[data-totalprice]');
				if (priceEl && priceEl.dataset) {
					total = priceEl.dataset.totalprice;
				}
			}

			if (total != null) {
				totalElement.innerHTML = total;
			}
		}
	};

	module = {
		init: init,
		load: updateCartPanel,
		open: openCart,
		refresh: refreshCart
	};
	return module;

}(ajaxCart || {}));
ajaxCart.init();

window.addEventListener("ajaxCart", function (evt) {
	ajaxCart.init();
});

window.addEventListener("localizationForm", function (evt) {
	// Currency/country/language selector
	var localization_form = document.querySelectorAll('.localization-form a:not(.listening)');
	Array.from(localization_form).forEach(function (el) {
		el.classList.add('listening');
		el.addEventListener("click", function(event) {
			event.preventDefault();
			var form = el.closest('form'),
				input = form.querySelector('input[name="locale_code"], input[name="country_code"]');
			input.value = el.dataset.value;
			form.submit();
		})
	})
});
window.dispatchEvent(localizationFormEvt);

// Productpage AR functionality
var model3d = document.querySelectorAll('[data-shopify-xr]');
if (model3d.length) {
	window.ProductModel = {
		loadShopifyXR() {
			Shopify.loadFeatures([
				{
					name: 'shopify-xr',
					version: '1.0',
					onLoad: this.setupShopifyXR.bind(this),
				},
			]);
		},
		setupShopifyXR(errors) {
			if (errors) return;
			if (!window.ShopifyXR) {
				document.addEventListener('shopify_xr_initialized', () =>
						this.setupShopifyXR()
				);
				return;
			}
			document.querySelectorAll('[id^="ProductJSON-"]').forEach((modelJSON) => {
				window.ShopifyXR.addModels(JSON.parse(modelJSON.textContent));
				modelJSON.remove();
			});
			window.ShopifyXR.setupXRElements();
		},
	};
	if (window.ProductModel) window.ProductModel.loadShopifyXR();
}

// Productcards variant select
window.addEventListener("productcardVariants", function (evt) {
	var card_id_input = document.querySelectorAll('.l4ca > li select[name="id"]:not(.listening), .upsell-items.l4cl > li p:has(select) select:not(.listening)');
	var product_card_add_to_cart = document.querySelectorAll('.l4cl .product-card.update-variants select[name="id"]:not(.listening)');
	if (!card_id_input.length && product_card_add_to_cart.length) {
		card_id_input = product_card_add_to_cart;
	}
	if (card_id_input.length) {
		new_css('form-validation-css', validation_css);
		Array.from(card_id_input).forEach(function (el) {
			el.classList.add('listening');
			var productCard = el.closest('.product-card');

			// Lay-out: Variant picker
			if (productCard && productCard.querySelector('ul.variant-picker')) {
				var updateAvailableSizes = function (sizeChanged) {
					var colorContainer = productCard.querySelector('ul.color');
					if (!colorContainer) {
						return;
					}
					if (sizeChanged) {
						colorContainer.classList.remove('sizes-initialized');
					}
					if (colorContainer.classList.contains('sizes-initialized')) {
						return;
					}
					colorContainer.classList.add('sizes-initialized');
					// Get available sizes for selected color
					var availableSizes = colorContainer.querySelector('input:checked').getAttribute('data-sizes');
					var availableInventory = colorContainer.querySelector('input:checked').getAttribute('data-sizes-availability');
					var sizes = availableSizes.split('/');
					var inventory = availableInventory.split('/');
					productCard.querySelectorAll('.variant-picker input').forEach(function (input) {
						input.parentElement.style.display = 'none'
						if (sizes.includes(input.value)) {
							input.parentElement.style.display = 'block'
							var sizeIndex = sizes.indexOf(input.value);
							if (sizeIndex !== -1) {
								if (input.nextSibling) {
									if (inventory[sizeIndex] == 'true') {
										input.parentElement.querySelector('label').classList.remove('disabled-style');
									} else {
										input.parentElement.querySelector('label').classList.add('disabled-style');
									}
								}
							}
						}
					});
					// If there is only one color swatch and all variants are not available, show all variants
					var totalColorSwatches = productCard.querySelectorAll('.check.color li').length;
					if (totalColorSwatches == 1) {
						var totalDisabled = productCard.getElementsByClassName('disabled-style').length;
						var totalLiElements = productCard.querySelectorAll('.variant-picker li').length - 1;
						if (totalDisabled == totalLiElements) {
							productCard.querySelectorAll('.variant-picker .disabled-style').forEach(function (el) {
								el.parentElement.style.display = 'block'
							});
						}
					}
				}
				productCard.addEventListener('mouseover', function () {
					updateAvailableSizes();
				});
				productCard.querySelectorAll('input[type="radio"]:not(.listening), input[name^="color"]:not(.listening)').forEach(function (radio) {
					radio.classList.add('listening');
					radio.addEventListener('change', function () {
						const productCardForm = productCard.querySelector('form');
						const redirectsToProduct = Boolean(
							this.closest('ul.variant-picker') &&
							productCardForm &&
							productCardForm.classList.contains('product-options')
						);

						var updateOptions = function () {
							this.options = Array.from(productCard.querySelectorAll('select[name^="options"], input[type="radio"][name^="options"]:checked, input[type="radio"][name^="color"]:checked'), (select) => select.value);
						}

						var getVariantData = function () {
							var data = [];
							Array.from(productCard.querySelectorAll('select[name="id"] option')).forEach(function (r) {
								data.push(JSON.parse(r.dataset.options));
							});
							this.variantData = data;
							return this.variantData;
						}
						var updateMasterId = function () {
							var variantData = getVariantData();
							this.currentVariant = variantData.find((variant) => {
								return this.options.every((option) => variant.options.includes(option));
							});
						}
						var setUnavailable = function (el) {
							el.classList.add('unavailable');
							el.querySelector('button[type="submit"]').textContent = translations.unavailable_text;
							el.querySelector('button[type="submit"]').setAttribute('disabled', 'disabled');
						}

						var updateVariantInput = function () {
							if (!this.currentVariant) {
								setUnavailable(productCard.querySelector('form'));
							} else {
								const select = productCard.querySelector('select[name="id"]');
								select.value = this.currentVariant.id;
								select.dispatchEvent(
									redirectsToProduct ? changeEvent : createProductSelectChangeEvent(radio, false)
								);
								const input = productCard.querySelector('input[name="product-id"]');
								input.value = this.currentVariant.id;
								input.dispatchEvent(new Event('change', {
									bubbles: true
								}));
							}
						}
						updateOptions();
						updateMasterId();
						updateVariantInput();
						updateAvailableSizes(true);

						// Submit form if option is size
						if (this.closest('ul.variant-picker')) {
							if (productCard.querySelector('form').classList.contains('product-options')) {
								// Redirect if product has a third option
								var window_location_url = document.location.origin + productCard.querySelector('a').getAttribute('href');
								if (window_location_url.includes('?')) {
									window_location_url = window_location_url + '&';
								} else {
									window_location_url = window_location_url + '?';
								}
								window_location_url = window_location_url + 'variant=' + productCard.querySelector('form select').value
								window.location.href = window_location_url;
							} else {
								// Add variant to card
								if (radio.nextElementSibling.classList.contains('disabled-style')) {
									return;
								}
								productCard.querySelector('form:not(.process-add-to-cart) button[type="submit"]').click();
								productCard.querySelector('form').classList.add('initialized');
								setTimeout(function () {
									productCard.querySelector('form').classList.remove('initialized');
									radio.checked = false;
								}, 500);
							}
						}
					});
				});
			}

			el.addEventListener('change', function (event) {
				const standardProductSelectSource = event.isTrusted || event.xclusiveStandardProductSelectSource ?
					(event.xclusiveStandardProductSelectSource || el) :
					null;

				setTimeout(function () {
					let standardProductSelect = null;

					try {
						const selected_option = el.options[el.selectedIndex];
						const productFormSection = el.closest('li');

						if (!selected_option || !productFormSection) return;

						if (standardProductSelectSource) {
							standardProductSelect = beginStandardProductSelect(el, standardProductSelectSource);
						}

						const variant_data = JSON.parse(selected_option.dataset.variantinfo);
						const productImage = productFormSection.querySelector('img');

						if (variant_data.image && productImage && productFormSection.querySelector('picture.slider') == undefined) {
							productImage.src = variant_data.image;
							productImage.removeAttribute('srcset');
							productImage.removeAttribute('sizes');
						}
						const isBlackFridaySale = selected_option.dataset.blackFridaySale === 'true';
						const cardPrice = productFormSection.querySelector('.price');
						if (variant_data.price && cardPrice) {
							const currentPrice = isBlackFridaySale
								? '<span class="drv-black-friday-sale-amount">' + variant_data.price + '</span>'
								: variant_data.price;
							cardPrice.innerHTML = '<span class="old-price"></span>' + (variant_data.price_old ? '&nbsp;' : '') + currentPrice;
							cardPrice.classList.toggle('drv-black-friday-price', isBlackFridaySale);
						}
						const saleBadge = productFormSection.querySelector('[data-product-sale-badge]');
						if (saleBadge && selected_option.hasAttribute('data-sale-badge')) {
							saleBadge.textContent = selected_option.dataset.saleBadge;
							saleBadge.classList.toggle('drv-black-friday-badge', isBlackFridaySale);
							saleBadge.classList.toggle('hidden', !selected_option.dataset.saleBadge);
						}
						const oldPrice = productFormSection.querySelector('.old-price');
						if (oldPrice) {
							if (variant_data.price_old) {
								oldPrice.innerHTML = variant_data.price_old;
								oldPrice.classList.remove('hidden');
							} else {
								oldPrice.classList.add('hidden');
							}
						}
						const checkInput = productFormSection.querySelector('.check > input');
						if (checkInput) {
							checkInput.checked = true;
							checkInput.dataset.id = variant_data.id;
						}
						window.dispatchEvent(productcardVariantsEvt);
						window.dispatchEvent(semanticSelectEvt);
						ajaxCart.init();

						if (standardProductSelect) standardProductSelect.resolveFrom(selected_option);
					} catch (error) {
						if (standardProductSelect) standardProductSelect.reject(error);
						console.warn('Product card variant change error', error);
					}
				}, 1);
			});
		});
	}
});


// Productpage variant select - updates variants, bulk quantities, UI, and cart dynamically with AJAX and event handling.
const productVariantRequests = new WeakMap();
window.addEventListener("productVariants", function (evt) {
	var main_id_input = Array.from(document.querySelectorAll('.m6pr select[name="variant-id"]:not(.listening), .m6pr input[type="radio"][name="variant-id"]:not(.listening), .m6pr-compact select[name="variant-id"]:not(.listening), .m6pr-compact input[type="radio"][name="variant-id"]:not(.listening)'));
	var options_input = Array.from(document.querySelectorAll('.m6pr select[name^="options"]:not(.listening), .m6pr input[type="radio"][name^="options"]:not(.listening), .m6pr-compact select[name^="options"]:not(.listening), .m6pr-compact input[type="radio"][name^="options"]:not(.listening)'));
	var inputs = main_id_input.concat(options_input);
	var product_card_add_to_cart = document.querySelectorAll('.l4cl .product-card.update-variants select[name="id"]:not(.listening)');
	if (inputs.length) {
		new_css('form-validation-css', validation_css);
		inputs.forEach(function (el) {
			el.classList.add('listening');
			el.addEventListener('change', function (event) {
				const standardProductSelectSource = event.isTrusted || event.xclusiveStandardProductSelectSource ?
					(event.xclusiveStandardProductSelectSource || el) :
					null;

				setTimeout(function () {
					var productFormTemplate = el.dataset.template,
						productFormId = el.getAttribute('form'),
						productFormSection = productFormTemplate ? document.querySelector('.m6pr-' + productFormTemplate) : null,
						sticky = document.getElementById('sticky-add-to-cart'),
						isQuickshop = false,
						hasSticky = false;

					if (!productFormTemplate || !productFormSection) return;

					const productForm = productFormSection.querySelector('form.f8pr');
					if (!productForm) return;
					productForm.classList.add('processing');

					if (productFormTemplate.startsWith('quickshop')) {
						productFormTemplate = productFormTemplate.replace('quickshop-', '');
						if (productFormId) productFormId = productFormId.replace('-quickshop', '');
						isQuickshop = true;
					}
					const variantSelection = productFormSection.querySelector('.f8pr-variant-selection');
					const productGallery = productFormSection.querySelector('.l4pr');
					const oldProductUrl = productFormSection.dataset.productUrl;

					if (!variantSelection || !oldProductUrl) {
						productForm.classList.remove('processing');
						return;
					}

					const selectedOption = el.tagName === 'SELECT' ?
						el.options[el.selectedIndex] :
						variantSelection.querySelector(`input[name="${el.name}"]:checked`);
					const allSelectedOptions = Array.from(variantSelection.querySelectorAll('input:checked, select option:checked'));

					if (!selectedOption) {
						productForm.classList.remove('processing');
						return;
					}

					var newProductUrl = oldProductUrl;
					if (selectedOption.dataset && selectedOption.dataset.productUrl) {
						newProductUrl = selectedOption.dataset.productUrl;
					} else if (allSelectedOptions[0] && allSelectedOptions[0].dataset.productUrl) {
						newProductUrl = allSelectedOptions[0].dataset.productUrl;
					}
					let isSameProduct = oldProductUrl === newProductUrl || !newProductUrl;
					var newUrl = newProductUrl,
						fetchUrl = newProductUrl,
						params = '',
						renderSections = productFormTemplate;
					if (!isSameProduct && isQuickshop) {
						newProductUrl = oldProductUrl;
						fetchUrl = oldProductUrl;
						newUrl = oldProductUrl;
						isSameProduct = true;
					}
					if (sticky) {
						renderSections += ',sticky-add-to-cart';
						hasSticky = true;
						sticky.classList.add('processing');
					}
					if (isSameProduct) {
						params = `sections=${renderSections}`;
					}
					if (el.name == 'variant-id') {
						params += `&variant=${el.value}`;
					} else {
						const selectedOptionValues = allSelectedOptions.map(({
							dataset
						}) => dataset.optionValueId).filter(Boolean);
						params += selectedOptionValues.length > 0 ?
							`&option_values=${selectedOptionValues.join(',')}` :
							'';
					}
					if (params) {
						fetchUrl = newProductUrl + `?${params}`;
					}

					const standardProductSelect = standardProductSelectSource ?
						beginStandardProductSelect(el, standardProductSelectSource) :
						null;
					const previousRequest = productVariantRequests.get(productFormSection);

					if (previousRequest) {
						const supersededError = createProductVariantAbortError();
						if (previousRequest.standardProductSelect) {
							previousRequest.standardProductSelect.reject(supersededError);
						}
						if (previousRequest.controller) previousRequest.controller.abort();
					}

					const requestState = {
						controller: typeof AbortController === 'function' ? new AbortController() : null,
						standardProductSelect: standardProductSelect
					};
					productVariantRequests.set(productFormSection, requestState);

					const fetchOptions = requestState.controller ? { signal: requestState.controller.signal } : {};
					Promise.resolve()
						.then(() => {
							if (productVariantRequests.get(productFormSection) !== requestState) {
								throw createProductVariantAbortError();
							}
							return fetch(fetchUrl, fetchOptions);
						})
						.then((response) => {
							if (productVariantRequests.get(productFormSection) !== requestState) {
								throw createProductVariantAbortError();
							}
							if (!response.ok) {
								var error = new Error(response.status);
								throw error;
							}
							return response.text();
						})
						.then((text) => {
							if (productVariantRequests.get(productFormSection) !== requestState) {
								throw createProductVariantAbortError();
							}

							var sections = null;
							var productSectionHtml = text;
							if (isSameProduct) {
								sections = JSON.parse(text);
								productSectionHtml = sections[productFormTemplate];
							}

							if (typeof productSectionHtml !== 'string' || !productSectionHtml.trim()) {
								throw new Error('Product variant response is missing the product section');
							}

							var resultsMarkupForm = new DOMParser().parseFromString(productSectionHtml, 'text/html');
							var responseVariantSelection = resultsMarkupForm.querySelector('.f8pr-variant-selection');
							var resultsGallery = resultsMarkupForm.querySelector('.l4pr');

							if (!responseVariantSelection || !resultsGallery) {
								throw new Error('Product variant response contains incomplete product markup');
							}

							var stickyResultsMarkupForm = null;
							if (hasSticky && isSameProduct && productFormTemplate.endsWith('main-product') && !isQuickshop) {
								var stickySectionHtml = sections && sections['sticky-add-to-cart'];
								if (typeof stickySectionHtml !== 'string' || !stickySectionHtml.trim()) {
									throw new Error('Product variant response is missing the sticky cart section');
								}
								stickyResultsMarkupForm = new DOMParser().parseFromString(stickySectionHtml, 'text/html');
								if (!stickyResultsMarkupForm.getElementById('shopify-section-sticky-add-to-cart')) {
									throw new Error('Product variant response contains incomplete sticky cart markup');
								}
							}

							var currentVariantElement = resultsMarkupForm.querySelector('[data-current-variant]');
							var selected_variant_id = currentVariantElement ? currentVariantElement.getAttribute('data-current-variant') : '';

							if (!isSameProduct) {
								if (!resultsMarkupForm.querySelector('head title') || !resultsMarkupForm.querySelector('#content')) {
									throw new Error('Combined-listing response contains incomplete page markup');
								}
							} else {
								if (!resultsMarkupForm.querySelector('.f8pr') || !productFormSection.querySelector('.f8pr')) {
									throw new Error('Product variant response contains incomplete form markup');
								}

								if (productGallery && productGallery.dataset.variantImage) {
									if (!productFormSection.querySelector('.l4pr-container') || !resultsMarkupForm.querySelector('.l4pr-container')) {
										throw new Error('Product variant response contains incomplete gallery markup');
									}
								}

								var requiredReplacementSelectors = [
									'.f8pr-codes',
									'.f8pr-price',
									'.f8pr-product-form-installment',
									'.f8pr-fallback-id-input',
									'.f8pr-buy-button',
									'.f8pr-amount',
									'.f8pr-preorder',
									'.f8pr-upsell',
									'.f8pr-quantity-rules',
									'.f8pr-volume-pricing'
								];

								requiredReplacementSelectors.forEach(function (selector) {
									if (resultsMarkupForm.querySelector(selector) && !productFormSection.querySelector(selector)) {
										throw new Error('Product variant response cannot replace missing target: ' + selector);
									}
								});

								Array.from(productFormSection.getElementsByClassName('f8pr-selling-plan')).forEach(function (sellingPlan) {
									if (
										resultsMarkupForm.querySelector('.f8pr-selling-plan') &&
										!resultsMarkupForm.querySelector('.f8pr-selling-plan[data-element="' + sellingPlan.getAttribute('data-element') + '"]')
									) {
										throw new Error('Product variant response contains incomplete selling-plan markup');
									}
								});
							}

							if (!isSameProduct) {
								document.querySelector('head title').innerHTML = resultsMarkupForm.querySelector('head title').innerHTML;
								document.getElementById('content').innerHTML = resultsMarkupForm.querySelector('#content').innerHTML;
							} else {
								productFormSection.querySelector('.f8pr').className = resultsMarkupForm.querySelector('.f8pr').className;
								if (productGallery && productGallery.dataset.variantImage) {
									productFormSection.querySelector('.l4pr-container').innerHTML = resultsMarkupForm.querySelector('.l4pr-container').innerHTML;
								}
								if (resultsMarkupForm.querySelector('.l4pr .label') != null) {
									productFormSection.querySelector('.l4pr .label').innerHTML = resultsMarkupForm.querySelector('.l4pr .label').innerHTML;
								}
								if (resultsMarkupForm.querySelector('.f8ps') != null && productFormSection.querySelector('.f8ps') != null && general.template == 'product' && (productFormSection == document.getElementById('shopify-section-' + productFormTemplate))) {
									productFormSection.querySelector('.f8ps').innerHTML = resultsMarkupForm.querySelector('.f8ps').innerHTML;
								}
								if (resultsMarkupForm.querySelector('[data-variant-id]') != null && productFormSection.querySelector('[data-variant-id]') != null) {
									productFormSection.querySelector('[data-variant-id]').setAttribute('data-variant-id', selected_variant_id);
								}
								if (resultsMarkupForm.querySelector('.f8pr-stock') != null) {
									Array.from(productFormSection.getElementsByClassName('f8pr-stock')).forEach(function (el) {
										el.parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-stock'), el);
									});
								}
								if (resultsMarkupForm.querySelector('.f8pr-variant-selection') != null) {
									productFormSection.querySelector('.f8pr-variant-selection').parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-variant-selection'), productFormSection.querySelector('.f8pr-variant-selection'));
								}
								if (resultsMarkupForm.querySelector('.f8pr-selling-plan') != null) {
									Array.from(productFormSection.getElementsByClassName('f8pr-selling-plan')).forEach(function (el) {
										var newSellingPlanEl = resultsMarkupForm.querySelector('.f8pr-selling-plan[data-element="' + el.getAttribute('data-element') + '"]');
										newSellingPlanEl.classList = el.classList;
										el.parentNode.replaceChild(newSellingPlanEl, el);
									});
								}
								if (resultsMarkupForm.querySelector('.f8pr-pickup') != null) {
									Array.from(productFormSection.getElementsByClassName('f8pr-pickup')).forEach(function (el) {
										el.parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-pickup'), el);
									});
								}
								if (resultsMarkupForm.querySelector('.f8pr-codes') != null) {
									productFormSection.querySelector('.f8pr-codes').parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-codes'), productFormSection.querySelector('.f8pr-codes'));
								}
								const newSaleBadges = resultsMarkupForm.querySelectorAll('[data-product-sale-badge]');
								productFormSection.querySelectorAll('[data-product-sale-badge]').forEach(function (badge, index) {
									if (newSaleBadges[index]) badge.replaceWith(newSaleBadges[index]);
								});
								if (resultsMarkupForm.querySelector('.f8pr-price') != null) {
									productFormSection.querySelector('.f8pr-price').parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-price'), productFormSection.querySelector('.f8pr-price'));
								}
								if (resultsMarkupForm.querySelector('.f8pr-product-form-installment') != null) {
									productFormSection.querySelector('.f8pr-product-form-installment').parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-product-form-installment'), productFormSection.querySelector('.f8pr-product-form-installment'));
								}
								if (resultsMarkupForm.querySelector('.f8pr-fallback-id-input') != null) {
									productFormSection.querySelector('.f8pr-fallback-id-input').parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-fallback-id-input'), productFormSection.querySelector('.f8pr-fallback-id-input'));
								}
								if (resultsMarkupForm.querySelector('.f8pr-buy-button') != null) {
									productFormSection.querySelector('.f8pr-buy-button').parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-buy-button'), productFormSection.querySelector('.f8pr-buy-button'));
								}
								if (resultsMarkupForm.querySelector('.f8pr-amount') != null) {
									productFormSection.querySelector('.f8pr-amount').parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-amount'), productFormSection.querySelector('.f8pr-amount'));
								}
								if (resultsMarkupForm.querySelector('.f8pr-preorder') != null) {
									productFormSection.querySelector('.f8pr-preorder').parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-preorder'), productFormSection.querySelector('.f8pr-preorder'));
								}
								if (resultsMarkupForm.querySelector('.f8pr-shipping-timer') != null && productFormSection.querySelector('.f8pr-shipping-timer') != null) {
									productFormSection.querySelector('.f8pr-shipping-timer').parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-shipping-timer'), productFormSection.querySelector('.f8pr-shipping-timer'));
									window.dispatchEvent(countdownEvt);
								}
								if (resultsMarkupForm.querySelector('.f8pr-upsell') != null) {
									productFormSection.querySelector('.f8pr-upsell').parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-upsell'), productFormSection.querySelector('.f8pr-upsell'));
								}
								if (resultsMarkupForm.querySelector('.f8pr-quantity-rules') != null) {
									productFormSection.querySelector('.f8pr-quantity-rules').parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-quantity-rules'), productFormSection.querySelector('.f8pr-quantity-rules'));
								}
								if (resultsMarkupForm.querySelector('.f8pr-volume-pricing') != null) {
									productFormSection.querySelector('.f8pr-volume-pricing').parentNode.replaceChild(resultsMarkupForm.querySelector('.f8pr-volume-pricing'), productFormSection.querySelector('.f8pr-volume-pricing'));
								}
								if (hasSticky && productFormTemplate.endsWith('main-product') && !isQuickshop && stickyResultsMarkupForm) {
									sticky.innerHTML = stickyResultsMarkupForm.getElementById('shopify-section-sticky-add-to-cart').innerHTML;
								}
								productFormSection.querySelector('form.f8pr').classList.remove('processing', 'unavailable');
								if (sticky) {
									sticky.classList.remove('processing', 'unavailable');
								}
							}
							if (isQuickshop) {
								if (productGallery && productGallery.dataset.variantImage) {
									if (productFormSection.querySelector('.l4pr.no-thumbs-mobile')) {
										productFormSection.querySelector('.l4pr.no-thumbs-mobile').classList.add('no-thumbs-desktop');
									}
									if (productFormSection.querySelector('.l4pr.static')) {
										productFormSection.querySelector('.l4pr.static').classList.remove('static');
									}
									if (productFormSection.querySelector('.l4pr li.sticky')) {
										productFormSection.querySelector('.l4pr li.sticky').remove();
									}
								}
								if (productFormSection.querySelector('.f8pr-variant-selection') != null) {
									Array.from(productFormSection.querySelectorAll('.mobile-scroll')).forEach(function (el) {
										el.classList.remove('mobile-scroll');
									});
									productFormSection.querySelector('.f8pr-variant-selection').innerHTML = productFormSection.querySelector('.f8pr-variant-selection').innerHTML.replaceAll(productFormTemplate, `quickshop-${productFormTemplate}`).replaceAll(productFormId, `${productFormId}-quickshop`).replaceAll('quickshop-quickshop-', 'quickshop-');
									if (productFormSection.querySelector('.f8pr-variant-selection a[data-popup].initialized-popup')) {
										productFormSection.querySelector('.f8pr-variant-selection a[data-popup].initialized-popup').classList.remove('initialized-popup');
									}
								}
								const buyButton = productFormSection.querySelector('.f8pr-buy-button');
								if (buyButton && buyButton.getAttribute('id')) {
									let id = buyButton.getAttribute('id');
									if (!id.includes(`quickshop-${productFormTemplate}`))
										id = id.replaceAll(productFormTemplate, `quickshop-${productFormTemplate}`);
									if (!id.includes(`${productFormId}-quickshop`))
										id = id.replaceAll(productFormId, `${productFormId}-quickshop`);
									buyButton.id = id.replace(/(quickshop-)+/g, 'quickshop-').replace(/-$/, '');
								}
								if (productFormSection.querySelector('.f8pr-product-form-installment') != null) {
									productFormSection.querySelector('.f8pr-product-form-installment').innerHTML = productFormSection.querySelector('.f8pr-product-form-installment').innerHTML.replaceAll(productFormTemplate, `quickshop-${productFormTemplate}`).replaceAll(productFormId, `${productFormId}-quickshop`).replaceAll('quickshop-quickshop-', 'quickshop-');
								}
								if (productFormSection.querySelector('.f8pr-fallback-id-input') != null) {
									productFormSection.querySelector('.f8pr-fallback-id-input').innerHTML = productFormSection.querySelector('.f8pr-fallback-id-input').innerHTML.replaceAll(productFormTemplate, `quickshop-${productFormTemplate}`).replaceAll(productFormId, `${productFormId}-quickshop`);
								}
								if (productFormSection.querySelector('.pickup') != null) {
									Array.from(productFormSection.getElementsByClassName('pickup')).forEach(function (el) {
										el.remove();
									});
								}
								if (productFormSection.querySelector('.l4pr-container .m6tb')) {
									productFormSection.querySelector('.l4pr-container .m6tb').remove();
								}
							}
							if (productGallery && productGallery.dataset.variantImage) {
								window.dispatchEvent(listProductSliderEvt);
								window.dispatchEvent(updateSlidersEvt);
								window.dispatchEvent(fancyboxEvt);
							}
							if (productFormSection.querySelector('.l4pr .swiper-outer') && resultsGallery.dataset.featured_media_position && resultsGallery.dataset.mediaSize > 1) {
								var swiper = productFormSection.querySelector('.l4pr .swiper-outer').swiper;
								swiper.slideTo((resultsGallery.dataset.featured_media_position - 1), 500);
							}
							if (
								!isQuickshop &&
								!html_tag.classList.contains('mobile') &&
								resultsGallery.dataset.featured_media_position > 0 &&
								resultsGallery.classList.contains('static')
							) {
								const target = productFormSection.querySelector(
									'#section-product-' + resultsGallery.dataset.featured_media_position
								);

								if (target) {
									target.scrollIntoView();
								}
							}
							if (window.Shopify && Shopify.PaymentButton) {
								Shopify.PaymentButton.init();
							}
							window.dispatchEvent(productVariantsEvt);
							window.dispatchEvent(semanticSelectEvt);
							window.dispatchEvent(showHideDataElementEvt);
							window.dispatchEvent(sellingplansEvt);
							window.dispatchEvent(pickupAvailabilityEvt);
							window.dispatchEvent(sizechartPopupEvt);
							window.dispatchEvent(modulePanelEvt);
							window.dispatchEvent(modulePanelAnchorEvt);
							window.dispatchEvent(schemeTooltipEvt);
							window.dispatchEvent(popupsEvt);
							window.dispatchEvent(removeSDCcssEvt);
							window.dispatchEvent(semanticInputEvt);
							window.dispatchEvent(formZindexEvt);
							window.dispatchEvent(dataChangeEvt);
							window.dispatchEvent(ratingsEvt);
							window.dispatchEvent(listProductSliderEvt);
							window.dispatchEvent(listDropEvt);
							window.dispatchEvent(fancyboxEvt);
							window.dispatchEvent(rangeSliderEvt);
							window.dispatchEvent(recommendedProductsEvt);
							window.dispatchEvent(accordeonEvt);
							window.dispatchEvent(countdownEvt);
							window.dispatchEvent(moduleTabsEvt);
							window.dispatchEvent(recentlyViewedProductsEvt);
							if (typeof upsellPopup !== 'undefined' && typeof upsellPopup.init === 'function') {
								upsellPopup.init();
							}
							linkMore();
							ajaxCart.init();
							if (hasSticky && (productFormTemplate.endsWith('main-product')) && (!isQuickshop)) {
								window.dispatchEvent(stickyAddToCartEvt);
							}
							window.dispatchEvent(new CustomEvent("themeVariantUpdated"));
							if (general.template == 'product' && productFormTemplate.endsWith('main-product') && !isQuickshop) {
								window.history.replaceState({}, '', `${newUrl}${isSameProduct && selected_variant_id ? `?variant=${selected_variant_id}` : ''}`);
							}
							if (standardProductSelect) {
								standardProductSelect.resolveFrom(
									responseVariantSelection,
									el.name === 'variant-id' ? selectedOption : null
								);
							}
						})
						.catch((error) => {
							if (standardProductSelect) standardProductSelect.reject(error);
							if (!error || error.name !== 'AbortError') {
								console.warn('Productform variant change error', error);
							}
						})
						.finally(() => {
							if (productVariantRequests.get(productFormSection) === requestState) {
								productVariantRequests.delete(productFormSection);
								const currentProductForm = productFormSection.querySelector('form.f8pr');
								if (currentProductForm) currentProductForm.classList.remove('processing');
								if (sticky) sticky.classList.remove('processing');
							}
						});
				}, 1);
			});
		});
	}
	if (product_card_add_to_cart.length) {
		window.dispatchEvent(productcardVariantsEvt);
	}
});
window.dispatchEvent(productVariantsEvt);

window.addEventListener("stickyAddToCart", function (evt) {
	var stickyAddToCart = document.querySelector('#product_id_sticky:not(.listening)');
	if (stickyAddToCart) {
		stickyAddToCart.classList.add('listening');
		stickyAddToCart.addEventListener('change', function (event) {
			let currentTarget = event.currentTarget
			setTimeout(function () {
				const select = document.querySelector('#main-product select[name="variant-id"]');
				if (select) {
					select.value = currentTarget.value;
					select.dispatchEvent(createProductSelectChangeEvent(currentTarget, false));
				} else {
					const inputs = document.querySelectorAll('#main-product input[type="radio"][name="variant-id"]');
					Array.from(inputs).forEach(function (input) {
						if (input.value == currentTarget.value) {
							input.checked = true;
							input.dispatchEvent(createProductSelectChangeEvent(currentTarget, false));
						} else {
							input.checked = false;
						}
					});
				}
			}, 1);
		})
	}
});
window.dispatchEvent(stickyAddToCartEvt);

// Productpage selling plans
window.addEventListener("sellingplans", function (evt) {
	var selling_plan_group_input = document.querySelectorAll('input[name="selling_plan_group"]');
	var selling_plan_input = document.querySelectorAll('input[name="selling_plan"]');
	if (selling_plan_group_input.length) {
		Array.from(selling_plan_group_input).forEach(function (el) {
			var productFormTemplate = el.dataset.template,
				productForm = document.querySelector('.m6pr-' + productFormTemplate);
			el.addEventListener('change', function () {
				if (productForm.querySelector('input[id^="purchase_option_single"][name="selling_plan_group"]:checked') != null) {
					changeSellingPlanRequired(false, el.getAttribute('data-enable'));
				} else {
					changeSellingPlanRequired(true, el.getAttribute('data-enable'));
				}
			});
		});
		var changeSellingPlanRequired = function (addAttribute, container) {
			Array.from(selling_plan_input).forEach(function (el) {
				el.checked = false;
				el.removeAttribute('required');
				el.setAttribute('type', 'hidden');
				if (el.getAttribute('name')) {
					el.setAttribute('xname', el.getAttribute('name'));
					el.removeAttribute('name');
				}
				if (addAttribute && (el.closest('[data-element]').getAttribute('data-element') == container)) {
					el.setAttribute('required', 'required');
					el.setAttribute('type', 'radio');
					if (el.getAttribute('xname')) {
						el.setAttribute('name', el.getAttribute('xname'));
						el.removeAttribute('xname');
					}
				}
			});
		};
	}
});
window.dispatchEvent(sellingplansEvt);

// Productpage pickup availability
window.addEventListener("pickupAvailability", function (evt) {
	var pickup_availability_anchor = document.querySelectorAll('[data-pickup-availability]');
	if (pickup_availability_anchor.length) {
		Array.from(pickup_availability_anchor).forEach(function (el) {
			el.addEventListener('click', function (e) {
				e.preventDefault();
				var selected_variant_id = el.dataset.id;
				fetch(window.Shopify.routes.root + 'variants/' + selected_variant_id + '/?section_id=pickup-availability')
					.then((response) => {
						if (!response.ok) {
							var error = new Error(response.status);
							throw error;
						}
						return response.text();
					})
					.then((text) => {
						const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').getElementById('pickup-availability').innerHTML;
						var section = document.getElementById('pickup-availability');
						section.innerHTML = resultsMarkup;
						append_url(section, 'Close', 'm6pn-close');
						openPanel('pickup-availability');
					})
					.catch((error) => {
						console.log("pickupAvailability error", error);
						throw error;
					});
			});
		});
	}
});
window.dispatchEvent(pickupAvailabilityEvt);


// Cart upsell horizontal slider controls
const cartUpsellSliderEvt = new CustomEvent('cartUpsellSlider');
window.addEventListener('cartUpsellSlider', function () {
	var cart_upsell_sliders = document.querySelectorAll('.product-recommendations.cart-upsell.horizontal-scrollable');
	if (cart_upsell_sliders.length) {
		Array.from(cart_upsell_sliders).forEach(function (el) {
			var list = el.querySelector('ul.l4ca'),
				prev = el.querySelector('.cart-upsell-nav-prev'),
				next = el.querySelector('.cart-upsell-nav-next');
			if (!list || !prev || !next) return;

			var setButtonState = function (button, muted) {
				if (muted) {
					button.classList.add('is-muted');
					button.setAttribute('aria-disabled', 'true');
					button.setAttribute('tabindex', '-1');
				} else {
					button.classList.remove('is-muted');
					button.setAttribute('aria-disabled', 'false');
					button.removeAttribute('tabindex');
				}
			};

			var updateButtons = function () {
				var max_scroll = list.scrollWidth - list.clientWidth;
				if (max_scroll <= 1) {
					setButtonState(prev, true);
					setButtonState(next, true);
					return;
				}
				setButtonState(prev, list.scrollLeft <= 1);
				setButtonState(next, list.scrollLeft >= max_scroll - 1);
			};

			var scrollList = function (direction) {
				var item = list.querySelector('li'),
					gap = 12,
					distance = list.clientWidth;
				if (item) {
					distance = item.getBoundingClientRect().width + gap;
				}
				list.scrollBy({ left: direction * distance, behavior: 'smooth' });
			};

			if (prev.getAttribute('data-cart-upsell-nav-initialized') != 'true') {
				prev.setAttribute('data-cart-upsell-nav-initialized', 'true');
				prev.addEventListener('click', function (event) {
					event.preventDefault();
					if (prev.getAttribute('aria-disabled') == 'true') return;
					scrollList(-1);
				});
			}

			if (next.getAttribute('data-cart-upsell-nav-initialized') != 'true') {
				next.setAttribute('data-cart-upsell-nav-initialized', 'true');
				next.addEventListener('click', function (event) {
					event.preventDefault();
					if (next.getAttribute('aria-disabled') == 'true') return;
					scrollList(1);
				});
			}

			if (list.getAttribute('data-cart-upsell-scroll-initialized') != 'true') {
				list.setAttribute('data-cart-upsell-scroll-initialized', 'true');
				list.addEventListener('scroll', updateButtons, { passive: true });
			}

			updateButtons();
			setTimeout(updateButtons, 250);
		});
	}
});
window.dispatchEvent(cartUpsellSliderEvt);

// Productpage recommended products
window.addEventListener("recommendedProducts", function (evt) {
	var product_recommendations = document.querySelectorAll(".product-recommendations:not(.product-recommendations-initialized)");
	if (product_recommendations.length) {
		Array.from(product_recommendations).forEach(function (el) {
			el.classList.add('product-recommendations-initialized');
			var product_id = el.dataset.productId.split(','),
				limit = el.dataset.limit || el.dataset.upsellLimit,
				template = el.dataset.template,
				intents = el.dataset.intent.split(','),
				count = 0,
				calls = intents.length * product_id.length,
				matchedResponses = 0,
				rejectedResponses = 0,
				lastResultsMarkup;
			if (product_id === undefined) {
				document.getElementById('shopify-section-' + template).classList.remove('hidden');
				return;
			}
			const isCartUpsellContext = function (node, sectionMarkup) {
				return (
					node &&
					(node.classList.contains('cart-upsell') ||
						node.dataset.template == 'side-cart' ||
						node.closest('#cart, #shopify-section-side-cart') != null ||
						(sectionMarkup && sectionMarkup.id == 'shopify-section-side-cart') ||
						node.querySelector('input[name="section-id"][value="side-cart"], form[id^="quick-add-side-cart"]') != null)
				);
			};
			const targetIsCartUpsell = isCartUpsellContext(el);
			var cart_upsell = targetIsCartUpsell;
			const getRecommendationContainer = function (node, isCartUpsell) {
				if (!node) {
					return null;
				}
				if (isCartUpsell) {
					return node.querySelector('.l4ca');
				}
				return node.querySelector('article') || node.querySelector('.l4cl');
			};
			var fetchRecommendedProducts = function (url, intent) {
				fetch(url)
					.then((response) => {
						if (!response.ok) {
							var error = new Error(response.status);
							throw error;
						}
						return response.text();
					})
					.then((text) => {
						count++;
						const responseDoc = new DOMParser().parseFromString(text, 'text/html');
						const sectionMarkup = responseDoc.getElementById('shopify-section-' + template);
						const resultsMarkup = sectionMarkup ? sectionMarkup.querySelector('.product-recommendations') : null;
						const resultsIsCartUpsell = isCartUpsellContext(resultsMarkup, sectionMarkup);
						if (resultsMarkup && resultsIsCartUpsell === targetIsCartUpsell) {
							const targetContainer = getRecommendationContainer(el, targetIsCartUpsell);
							const sourceContainer = getRecommendationContainer(resultsMarkup, resultsIsCartUpsell);
							if (targetContainer && sourceContainer) {
								matchedResponses++;
								lastResultsMarkup = resultsMarkup;
								if (calls == 1) {
									targetContainer.innerHTML = sourceContainer.innerHTML;
								} else {
									Array.from(sourceContainer.children).forEach(function (em) {
										targetContainer.appendChild(em);
									});
								}
							} else {
								rejectedResponses++;
							}
						} else {
							rejectedResponses++;
						}
						if (count == calls) {
							if (matchedResponses == 0 && rejectedResponses > 0) {
								console.warn('recommendedProducts context mismatch', {
									template: template,
									targetIsCartUpsell: targetIsCartUpsell,
									rejectedResponses: rejectedResponses
								});
								return;
							}
							var seen = {};
							el.querySelectorAll('.l4ca > li[data-product-id]').forEach(function (el) {
								if (seen[el.dataset.productId]) {
									el.remove();
								} else {
									seen[el.dataset.productId] = true;
								}
							});
							if (cart_upsell && el.dataset.upsellLimit) {
								var upsell_limit = parseInt(el.dataset.upsellLimit, 10);
								if (upsell_limit > 0) {
									Array.from(el.querySelectorAll('.l4ca > li[data-product-id]')).forEach(function (item, index) {
										if (index >= upsell_limit) {
											item.remove();
										}
									});
								}
							}
							if (el.querySelector('.l4cl, .l4ca') && el.querySelector('.l4cl, .l4ca').children.length == 0) {
								el.innerHTML = '';
								if (el.classList.contains('tab')) {
									el.closest('.m6tb').querySelector('nav ul li[data-index="' + el.getAttribute('data-index') + '"]').remove();
									if (el.closest('.m6tb').querySelector('nav ul li a') != null) {
										el.closest('.m6tb').querySelector('nav ul li a').click();
									}
								}
								return;
							}
							if (lastResultsMarkup && lastResultsMarkup.getAttribute('data-hide') != null) {
								document.getElementById('shopify-section-' + template).classList.add('margin-mobile-content');
								if (intent == 'related') {
									if (lastResultsMarkup.getAttribute('data-tab') != null) {
										document.getElementById('shopify-section-' + template).querySelector('li[data-index="' + el.closest('[data-index]').getAttribute('data-index') + '"]').remove();
										el.innerHTML = '';
									} else {
										document.getElementById('shopify-section-' + template).innerHTML = '';
										return;
									}
								} else {
									el.innerHTML = '';
									return;
								}
							}
							if (template && document.getElementById('shopify-section-' + template)) {
								document.getElementById('shopify-section-' + template).classList.remove('hidden');
							}
							el.classList.remove('hidden');
							window.dispatchEvent(listScrollableEvt);
							window.dispatchEvent(listCollectionSliderEvt);
							window.dispatchEvent(formZindexEvt);
							window.dispatchEvent(semanticInputEvt);
							window.dispatchEvent(ratingsEvt);
							window.dispatchEvent(schemeTooltipEvt);
							window.dispatchEvent(popupsEvt);
							window.dispatchEvent(semanticSelectEvt);
							window.dispatchEvent(productcardVariantsEvt);
							window.check_limit_event();
							window.dispatchEvent(cartUpsellSliderEvt);
							ajaxCart.init();
							quickShop.init();
						}
					})
					.catch((error) => {
						console.log("recommendedProducts error", error);
						throw error;
					});
			};
			intents.forEach(function (intent) {
				if (el.classList.contains('cart-upsell') && intent == 'related' && !el.dataset.upsellLimit) {
					limit = 4;
				}
				product_id.forEach(function (id) {
					var url = routes.product_recommendations_url + '?section_id=' + template + (limit ? '&limit=' + limit : '') + '&product_id=' + id + '&intent=' + intent;
					fetchRecommendedProducts(url, intent);
				});
			});
		});
	}
	if (document.getElementById('section-related') == null) {
		document.querySelectorAll('a[href="#section-related"]').forEach(function (el) {
			el.parentElement.remove();
		})
	}
});
window.dispatchEvent(recommendedProductsEvt);

// Recently viewed products
window.addEventListener("recentlyViewedProducts", function (evt) {
	var recently_viewed_products = document.querySelectorAll(".recently-viewed-products:not(.recently-viewed-products-initialized)");
	currProductData = JSON.parse(localStorage.getItem("recentlyViewedProduct"));
	if (general.viewed_product) {
		var numberOfProducts = 12,
			productUrl = general.viewed_product,
			productId = general.viewed_product_id,
			productData = {
				productUrl: productUrl,
				productId: productId
			},
			pushNewProductData = false,
			currProductData, sameProduct, newProductData, sameProductIndex;
		if (currProductData === null) {
			currProductData = [];
			pushNewProductData = true;
		} else {
			sameProduct = currProductData.filter(e => e.productId === productId).length > 0;
			if (sameProduct) {
				sameProductIndex = currProductData.map(function (e) {
					return e.productId;
				}).indexOf(productId);
				currProductData.splice(sameProductIndex, 1);
				pushNewProductData = true;
			}
			if (currProductData.length < numberOfProducts && !sameProduct) {
				pushNewProductData = true;
			} else if (currProductData.length >= numberOfProducts && !sameProduct) {
				currProductData.shift();
				pushNewProductData = true;
			}
		}
		if (pushNewProductData) {
			currProductData.push(productData);
			newProductData = JSON.stringify(currProductData);
			localStorage.setItem("recentlyViewedProduct", newProductData);
		}
	}
	if (recently_viewed_products.length) {
		const productData = JSON.parse(localStorage.getItem("recentlyViewedProduct"));
		if (productData == null) {
			Array.from(recently_viewed_products).forEach(function (el) {
				el.remove();
			});
			return;
		}

		var widthClass = 'w33',
			recently_viewed_products_el = recently_viewed_products[0],
			number_of_items = parseInt(recently_viewed_products[recently_viewed_products.length - 1].querySelector('[data-number_of_items]').dataset.number_of_items),
			enable_quick_buy_desktop = recently_viewed_products_el.querySelector('[data-enable_quick_buy_desktop]'),
			enable_quick_buy_mobile = recently_viewed_products_el.querySelector('[data-enable_quick_buy_mobile]'),
			enable_quick_buy_qty_selector = recently_viewed_products_el.querySelector('[data-enable_quick_buy_qty_selector]'),
			quick_buy_compact = recently_viewed_products_el.querySelector('[data-enable_quick_buy_compact]'),
			quick_buy_drawer = recently_viewed_products_el.querySelector('[data-enable_quick_buy_drawer]'),
			enable_color_picker = recently_viewed_products_el.querySelector('[data-enable_color_picker]'),
			content_alignment = recently_viewed_products_el.querySelector('[data-content_alignment]'),
			show_title = recently_viewed_products_el.querySelector('[data-show_title]'),
			show_price = recently_viewed_products_el.querySelector('[data-show_price]'),
			show_stock = recently_viewed_products_el.querySelector('[data-show_stock]'),
			show_labels = false,
			show_swatches = recently_viewed_products_el.querySelector('[data-show_swatches]'),
			fill_images = recently_viewed_products_el.querySelector('[data-fill_images]'),
			images_rounded = recently_viewed_products_el.querySelector('[data-images_rounded]'),
			template = recently_viewed_products_el.querySelector('[data-template]').dataset.template,
			length = productData.length,
			max = number_of_items;
		switch (max) {
			case 2:
				widthClass = 'w50'
				break;
			case 3:
				widthClass = 'w33'
				break;
			case 4:
				widthClass = 'w25'
				break;
			case 5:
				widthClass = 'w20'
				break;
			case 6:
				widthClass = 'w16'
				break;
			case 7:
				widthClass = 'w14'
				break;
			case 8:
				widthClass = 'w12'
				break;
			default:
				widthClass = 'w10'
				break;
		}
		var recentlyViewedHtml = '',
			recentlyViewedProductsObj = {},
			itemsDone = 0,
			data = productData.reverse();
		Array.from(data).forEach(function (product, index, array) {
			fetch(product.productUrl + '/?section_id=' + template)
				.then((response) => {
					if (!response.ok) {
						var error = new Error(response.status);
						throw error;
					}
					return response.text();
				})
				.then((text) => {
					const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').getElementById('shopify-section-' + template).innerHTML;
					recentlyViewedProductsObj[product.productId] = resultsMarkup;
					itemsDone++;
					if (itemsDone === array.length) {
						Array.from(productData).forEach(function (product, index, array) {
							recentlyViewedHtml += recentlyViewedProductsObj[product.productId];
						});
						Array.from(recently_viewed_products).forEach(function (el, index, array) {
							el.classList.add('recently-viewed-products-initialized');
							var list_collection = el.querySelector('.l4cl');
							list_collection.innerHTML = recentlyViewedHtml;
							var placeholder_items = list_collection.querySelectorAll('.placeholder-product');
							Array.from(placeholder_items).forEach(function (el, index, array) {
								el.remove();
							});
							if (el.classList.contains('compact')) {
								var compact = true;
							} else {
								var compact = false;
								if ((length - placeholder_items.length) > max) {
									list_collection.classList.add('slider');
								} else {
									list_collection.classList.add('mobile-compact');
								}
								list_collection.classList.add(widthClass);
							}
							if (compact) {
								Array.from(el.querySelectorAll('.l4cl > li > *:not(figure), .l4cl > li > figure .label, .l4cl > li > figure .link-btn, .l4cl > li > figure form')).forEach(function (em) {
									em.remove();
								});
							}
							if (show_title == null) {
								Array.from(list_collection.querySelectorAll('h3')).forEach(function (el) {
									el.remove();
								});
							}
							if (show_price == null) {
								Array.from(list_collection.querySelectorAll('.price, .s1pr')).forEach(function (el) {
									el.remove();
								});
							}
							if (show_stock == null) {
								Array.from(list_collection.querySelectorAll('.stock')).forEach(function (el) {
									el.remove();
								});
							}
							if (show_labels === false) {
								Array.from(list_collection.querySelectorAll('.s1lb')).forEach(function (el) {
									el.remove();
								});
							}
							if (show_swatches == null) {
								Array.from(list_collection.querySelectorAll('.color')).forEach(function (el) {
									el.remove();
								});
							}
							if (enable_quick_buy_desktop == null && enable_quick_buy_mobile == null) {
								Array.from(list_collection.querySelectorAll('form, .link-btn, .variant-picker')).forEach(function (el) {
									el.remove();
								});
							} else {
								if (number_of_items > 5) {
									Array.from(el.querySelectorAll('.l4cl > li')).forEach(function (em) {
										em.classList.remove('dynamic-quickshop');
									});
									Array.from(list_collection.querySelectorAll('form, .link-btn, .variant-picker')).forEach(function (el) {
										if (el.classList.contains('quick-add-one-click-form')) {
											el.classList.remove('mobile-only');

										} else if (el.classList.contains('quickshop')) {
											if (quickshop_behavior == 'on_hover') {
												el.classList.remove('visible');
											}
										} else {
											el.remove();
										}
									});
								}
								if (quick_buy_drawer) {
									Array.from(list_collection.querySelectorAll('form, .link-btn')).forEach(function (el) {
										const newItem = document.createElement('p');
										newItem.classList.add('link-btn');
										newItem.innerHTML = '<a class="overlay-tertiary" href="' + el.closest('li').querySelector('a').getAttribute('href') + '" data-quickshop>' + translations.view_options_text + '</a>';
										el.parentNode.replaceChild(newItem, el);
									});
								}
								Array.from(list_collection.querySelectorAll('form, .link-btn')).forEach(function (el) {
									if (enable_quick_buy_desktop == null) {
										el.classList.add('mobile-only')
									}
									if (enable_quick_buy_mobile == null) {
										el.classList.add('mobile-hide')
									}
								});
								if (enable_quick_buy_qty_selector == null) {
									Array.from(list_collection.querySelectorAll('.input-amount')).forEach(function (el) {
										el.remove();
									});
								}
								if (show_swatches == null) {
									Array.from(list_collection.querySelectorAll('.check.color')).forEach(function (el) {
										el.remove();
									});
								}
								if (quick_buy_compact) {
									Array.from(list_collection.querySelectorAll('form button')).forEach(function (el) {
										el.classList.add('compact');
										el.querySelector('.mobile-hide').remove();
										el.querySelector('.icon-cart').classList.remove('mobile-only');
									});
									Array.from(list_collection.querySelectorAll('.link-btn a')).forEach(function (el) {
										if (el.querySelector('.icon-cart') != null) {
											el.classList.add('compact');
											el.querySelector('.mobile-hide').remove();
											el.querySelector('.icon-cart').classList.remove('mobile-only');
										} else {
											el.textContent = translations.view_text;
										}
									});
								}
							}
							Array.from(list_collection.querySelectorAll('img')).forEach(function (el) {
								if (fill_images == null) {
									el.classList.remove('filled');
								} else {
									el.classList.add('filled');
									if (el.getAttribute('src').includes('&pad_color=fff')) {
										el.setAttribute('src', el.getAttribute('src').replace('&pad_color=fff', ''))
									}
									if (el.getAttribute('srcset') && (el.getAttribute('srcset').includes('&pad_color=fff'))) {
										el.setAttribute('srcset', el.getAttribute('srcset').replaceAll('&pad_color=fff', ''))
									}
								}
							});
							if (images_rounded != null) {
								Array.from(list_collection.querySelectorAll('figure, picture')).forEach(function (el) {
									el.classList.add('rounded');
								});
							}
							if (content_alignment != null) {
								Array.from(el.querySelectorAll('.l4cl > li')).forEach(function (em) {
									em.classList.remove('text-start', 'text-center');
									em.classList.add(recently_viewed_products_el.querySelector('[data-content_alignment]').dataset.content_alignment);
								});
							}
							window.dispatchEvent(ratingsEvt);
						});
						window.dispatchEvent(listCollectionSliderEvt);
						window.dispatchEvent(formZindexEvt);
						window.dispatchEvent(semanticInputEvt);
						window.dispatchEvent(schemeTooltipEvt);
						window.dispatchEvent(popupsEvt);
						window.dispatchEvent(listScrollableEvt);
						window.check_limit_event();
						ajaxCart.init();
						quickShop.init();
					}
				})
				.catch((error) => {
					console.log("recentlyViewedProducts error", error);
					throw error;
				});
		});
	}
});
window.dispatchEvent(recentlyViewedProductsEvt);

// Address page
var address_delete_button = document.getElementsByClassName("address-delete-button");
if (address_delete_button.length) {
	Array.from(address_delete_button).forEach(function (el) {
		el.addEventListener('click', function (e) {
			e.preventDefault();
			if (confirm(el.dataset.confirmMessage)) {
				var form = document.createElement("form");
				form.setAttribute("method", 'post');
				form.setAttribute("action", el.dataset.target);
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", '_method');
				hiddenField.setAttribute("value", 'delete');
				form.appendChild(hiddenField);
				document.body.appendChild(form);
				form.submit();
				document.body.removeChild(form);
			}
		});
	});
}

// Product reviews button
var add_review_button = document.getElementsByClassName("spr-summary-actions-newreview");
if (add_review_button.length) {
	Array.from(add_review_button).forEach(function (el) {
		el.addEventListener('click', function (e) {
			Array.from(add_review_button).forEach(function (el) {
				el.remove();
			});
			setTimeout(function () {
				if (document.getElementsByClassName("new-review-form").length > 0) {
					document.getElementsByClassName("new-review-form")[0].scrollIntoView(true);
				}
			}, 10);
		});
	});
}

var checkbox_required = document.getElementsByClassName('checkbox-required');
if (checkbox_required.length) {
	Array.from(checkbox_required).forEach(function (form_el) {
		var inputs = form_el.getElementsByTagName('input');
		Array.from(inputs).forEach(function (input_el) {
			input_el.addEventListener('click', function (e) {
				checkIfChecked(form_el);
			});
		});
	});
	var checkIfChecked = function (form) {
		var checked = form.querySelector('input:checked');
		var inputs = form.getElementsByTagName('input');
		if (!checked) {
			if (inputs[0] != null) {
				inputs[0].setAttribute('required', '');
			}
		} else {
			if (inputs != null) {
				Array.from(inputs).forEach(function (el) {
					el.removeAttribute('required');
				});
			}
		}
	}
}

// Focuses the first non-checkbox/radio input inside an accordion section when it’s opened by clicking its label.
const accordionLabel = document.querySelectorAll('.accordion-a summary label');
if (accordionLabel.length) {
	Array.from(accordionLabel).forEach(el => {
		el.closest('summary').addEventListener('click', function (e) {
			const detailsElement = el.closest('details');
			if (detailsElement && !detailsElement.open) {
				const inputElement = detailsElement.querySelector('div input:not([type="checkbox"]):not([type="radio"])');
				if (inputElement) {
					setTimeout(function () {
						inputElement.focus();
					}, 0);
				}
			}
		});
	});
}

document.addEventListener('scroll', function () {
	const m6cl = document.querySelector('.m6cl');
	if (m6cl) {
		html_tag.classList.add('t1cl');
		if (m6cl.classList.contains('sticky') && document.querySelector('.f8sr.mobile-sticky')) {
			html_tag.classList.add('has-m6cl-sticky');
		}
	}
}, asyncPass);



window.addEventListener('resize', throttle(() => {
	customMega();
}, 500));

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- */

// Quickshop
var quickShop = (function (module) {
	var init, quickshopOverride, openQuickshop, handleQuickshopPanel; // Define the functions
	var quickshopButton, quickshopContainer; // Define the data and elements

	init = function () {
		quickshopButton = document.querySelectorAll('[data-quickshop]:not(.quickshop-initialized)');
		quickshopContainer = document.getElementById('quickshop');
		if (quickshopButton.length) {
			quickshopOverride();
		}
	};
	quickshopOverride = function () {
		Array.from(quickshopButton).forEach(function (el) {
			el.classList.add('quickshop-initialized');
			el.addEventListener('click', function (e) {
				el.classList.add('loading');
				e.preventDefault();
				quickshopContainer.innerHTML = '';
				openQuickshop(el.getAttribute('href'), el);
			});
		});
	};

	openQuickshop = function (quickshopUrl, el) {
		fetch(quickshopUrl)
			.then((response) => {
				if (!response.ok) {
					var error = new Error(response.status);
					throw error;
				}
				return response.text();
			})
			.then((text) => {
				const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('div[id$="main-product"]'),
					container = resultsMarkup.querySelector('.m6pr'),
					sectionId = container.getAttribute('data-template'),
					formId = container.getAttribute('data-form-id')
				const viewEventTarget = resultsMarkup.querySelector('[data-standard-view-event="product"]');

				if (viewEventTarget) {
					try {
						const viewEventPayload = JSON.parse(viewEventTarget.getAttribute('data-standard-view-event-payload'));
						viewEventPayload.context = 'dialog';
						viewEventTarget.setAttribute('data-standard-view-event-payload', JSON.stringify(viewEventPayload));
						viewEventTarget.setAttribute('data-standard-view-event-trigger', 'manual');
					} catch (error) {
						console.warn('Quickshop standard product view payload could not be updated', error);
					}
				}

				container.classList.add('m6pr-compact');
				container.classList.remove('m6pr');
				if (resultsMarkup.querySelector('header.mobile-only')) {
					resultsMarkup.querySelector('header.mobile-only').classList.remove('mobile-only');
				}
				if (resultsMarkup.querySelector('.l4pr.no-thumbs-mobile')) {
					resultsMarkup.querySelector('.l4pr.no-thumbs-mobile').classList.add('no-thumbs-desktop');
				}
				if (resultsMarkup.querySelector('.l4pr.static')) {
					resultsMarkup.querySelector('.l4pr.static').classList.remove('static');
				}
				if (resultsMarkup.querySelector('.l4pr-container .m6tb')) {
					resultsMarkup.querySelector('.l4pr-container .m6tb').remove();
				}
				if (resultsMarkup.querySelector('.l4ml.w50')) {
					resultsMarkup.querySelector('.l4ml.w50').classList.remove('w50');
				}
				Array.from(resultsMarkup.querySelectorAll('.mobile-scroll')).forEach(function (el) {
					el.classList.remove('mobile-scroll');
				});
				Array.from(resultsMarkup.querySelectorAll('a[href="#section-info"]')).forEach(function (el) {
					el.setAttribute('href', quickshopUrl + el.getAttribute('href'));
				});
				Array.from(resultsMarkup.querySelectorAll('.pickup, .has-social, .syk-x, .benefit, .true-size, .l4pr li.sticky, .product-recommendations, header.mobile-hide, #section-info')).forEach(function (el) {
					el.remove();
				});
				if (resultsMarkup.querySelector('header > h1, header > h2, header > h3, header > h4, header > h5')) {
					resultsMarkup.querySelector('header > h1, header > h2, header > h3, header > h4, header > h5').innerHTML = '<a href="' + quickshopUrl + '">' + resultsMarkup.querySelector('header > h1, header > h2, header > h3, header > h4, header > h5').innerHTML + '</a>';
				}
				resultsMarkup.innerHTML = resultsMarkup.innerHTML.replaceAll(sectionId, `quickshop-${ sectionId }`);
				resultsMarkup.innerHTML = resultsMarkup.innerHTML.replaceAll(formId, `${ formId }-quickshop`);
				handleQuickshopPanel(resultsMarkup.innerHTML, el);
			})
			.catch((error) => {
				console.log("openQuickshop error", error);
				throw error;
			});
	}

	handleQuickshopPanel = function (resultsMarkup, el = false) {
		quickshopContainer.innerHTML = resultsMarkup;
		window.dispatchEvent(modulePanelEvt);
		window.dispatchEvent(semanticInputEvt);
		window.dispatchEvent(ratingsEvt);
		window.dispatchEvent(productVariantsEvt);
		window.dispatchEvent(listProductSliderEvt);
		window.dispatchEvent(listDropEvt);
		window.dispatchEvent(semanticSelectEvt);
		window.dispatchEvent(showHideDataElementEvt);
		window.dispatchEvent(sellingplansEvt);
		window.dispatchEvent(pickupAvailabilityEvt);
		window.dispatchEvent(modulePanelAnchorEvt);
		window.dispatchEvent(formZindexEvt);
		window.dispatchEvent(fancyboxEvt);
		window.dispatchEvent(accordeonEvt);
		window.dispatchEvent(dataChangeEvt);
		window.dispatchEvent(countdownEvt);
		window.dispatchEvent(schemeTooltipEvt);
		window.dispatchEvent(popupsEvt);
		window.dispatchEvent(moduleTabsEvt);
		window.dispatchEvent(sizechartPopupEvt);
		linkMore();
		window.dispatchEvent(rangeSliderEvt);
		if (typeof upsellPopup !== 'undefined' && typeof upsellPopup.init === 'function') {
			upsellPopup.init();
		}
		if (window.Shopify && Shopify.PaymentButton) {
			Shopify.PaymentButton.init();
		}
		setTimeout(function () {
			window.dispatchEvent(removeSDCcssEvt);
		}, 1);
		ajaxCart.init();
		if (window.ProductModel) window.ProductModel.loadShopifyXR();
		if (typeof findAndHideShownElements === 'function') {
			findAndHideShownElements();
		}
		new_css('product-css', window.filepaths['async_product_css']);
		openPanel('quickshop');
		if (el) {
			el.classList.remove('loading')
		}
	}

	module = {
		init: init,
		open: openQuickshop
	};
	return module;
}(quickShop || {}));
quickShop.init();

window.addEventListener("quickShop", function (evt) {
	quickShop.init();
});

if (totop_id) {
	document.addEventListener('scroll', function () {
		if (window.scrollY > window.innerHeight) {
			totop_id.classList.remove('hidden');
		} else {
			totop_id.classList.add('hidden');
		}
	})
}

if (!general.enable_cart_drawer && document.getElementById('cart-count')) {
	fetch(window.Shopify.routes.root + 'cart.js')
		.then(response => response.json())
		.then(data => {
			document.getElementById('cart-count').innerHTML = data.item_count;
		})
		.catch((error) => {
			console.log("cartCount error", error);
		});
}

var address_form = document.getElementsByClassName('address-form');
if (address_form.length) {
	Array.from(address_form).forEach(function (el) {
		let countryInput = el.getElementsByClassName('address-country-option')[0],
			provinceInput = el.getElementsByClassName('address-province-option')[0],
			provinceInputContainer = el.getElementsByClassName('address-provinces')[0];
		let checkForProvinces = function (input) {
			let selected = input;
			setTimeout(function () {
				if (selected.options[selected.selectedIndex].dataset.provinces) {
					let provinces = JSON.parse(selected.options[selected.selectedIndex].dataset.provinces);
					if (provinces.length) {
						provinceInput.innerHTML = '';
						if (provinceInput.dataset.default) {
							var value = provinceInput.dataset.default;
						}
						Array.from(provinces).forEach(function (province) {
							if (value && (value == province[0] || value == province[1])) {
								provinceInput.innerHTML += '<option selected value="' + province[0] + '">' + province[1] + '</option>';
							} else {
								provinceInput.innerHTML += '<option value="' + province[0] + '">' + province[1] + '</option>';
							}
						});
						provinceInputContainer.style.display = '';
						if (provinceInputContainer.querySelector('.select-wrapper')) {
							provinceInputContainer.querySelector('.select-wrapper').parentNode.replaceChild(provinceInput, provinceInputContainer.querySelector('.select-wrapper'));
							provinceInput.classList.remove('semantic-select-initialized', 'select-init');
							provinceInput.removeAttribute('data-random');
							window.dispatchEvent(semanticSelectEvt);
						}
					} else {
						Array.from(provinceInput.querySelectorAll('options:not([value=""][disabled])')).forEach(function (el) {
							el.remove();
						});
						provinceInputContainer.style.display = 'none';
					}
				}
			}, 10);
		}
		if (countryInput.dataset.default) {
			var value = countryInput.dataset.default;
			for (var i = 0, count = countryInput.options.length; i < count; i++) {
				var option = countryInput.options[i];
				if (value == option.value || value == option.innerHTML) {
					option.setAttribute('selected', 'selected');
				}
			}
		}
		checkForProvinces(countryInput);
		countryInput.addEventListener("change", function () {
			checkForProvinces(this);
		});
	})
}

if (document.querySelectorAll('[data-upsell]')) {
	loadRes(window.filepaths['plugin_upsell_popup_js']);
}

window.addEventListener("navScroll", () => {

	const container = document.querySelector('.nav-scroll-wrapper:has(.nav-scroll)') || null;
	if (!container) {
		return;
	}
	const scrollElement = container.querySelector('.nav-scroll');

	function checkOverflow() {

		const isEnd = scrollElement.scrollLeft + scrollElement.clientWidth >= scrollElement.scrollWidth;
		const isStart = scrollElement.scrollLeft === 0;

		scrollElement.classList.toggle('no-scroll', scrollElement.clientWidth === scrollElement.scrollWidth);
		scrollElement.classList.toggle('end', isEnd);
		scrollElement.classList.toggle('start', isStart);


	}

	function checkDropdown() {
		const menuItems = document.querySelectorAll('.nav-scroll-wrapper.dropdown > ul.nav-scroll:not(.no-scroll) > li:has(ul):not(.promo)');
		const navbar = document.querySelector('.nav-scroll-wrapper > ul.nav-scroll:not(.no-scroll)');
		menuItems.forEach(menuItem => {
			menuItem.addEventListener('mouseover', event => {
				// menuItem.classList.remove('inv');
				const menuItemRect = menuItem.getBoundingClientRect();
				const dropdown = menuItem.querySelector(':scope > ul');
				const navbarWidth = navbar.offsetWidth;
				let leftPosition = calculateLeftPosition(event.currentTarget);
				setTimeout(() => {

					const dropdownWidth = dropdown.offsetWidth; // Get the dropdown width after it's been made visible
					if (dropdownWidth === 0) {
						return;
					} // Dropdown is hidden

					leftPosition = leftPosition - (dropdownWidth / 2) + menuItemRect.width / 2; // Center the dropdown under the menu item
					leftPosition = Math.min(leftPosition, navbarWidth - dropdownWidth); // Prevent dropdown from going off the right side of the screen/scroll container
					leftPosition = Math.max(0, leftPosition); // Prevent dropdown from going off the left side of the screen/scroll container
					dropdown.style.left = `${leftPosition}px`; // Set the left position of the dropdown
					setTimeout(() => {
						dropdown.style.visibility = 'visible';
					}, 1);
				}, 1);
			});

			function calculateLeftPosition(element) {
				const elementRect = element.getBoundingClientRect();
				const parentRect = element.parentNode.getBoundingClientRect();
				const parentLeft = parentRect.left;
				return elementRect.left - parentLeft;
			}
		});
	}

	setTimeout(() => {
		checkOverflow();
		checkDropdown();
	}, 1);

	scrollElement.addEventListener('scroll', checkOverflow);
	window.addEventListener('resize', checkOverflow);
	window.addEventListener('resize', checkDropdown);

});
window.dispatchEvent(navScrollEvt);

// ShoptheLook Drawer
var shopTheLookDrawer = (function (module) {
	var init, shopTheLookOverride, openShopTheLook, handleQuickshopPanel; // Define the functions
	var shopTheLookBtn; // Define the data and elements
	var shopTheLookContainer;
	var maxItems;
	init = function () {
		shopTheLookBtn = document.querySelectorAll('[data-shopthelook]:not(.shopthelook-initialized)');
		shopTheLookContainer = document.querySelector('#add-products-to-banner ul');
		if (shopTheLookContainer) {
			maxItems = shopTheLookContainer.dataset.items;
		}
		if (shopTheLookBtn.length) {
			shopTheLookOverride();
		}
	};
	shopTheLookOverride = function () {
		Array.from(shopTheLookBtn).forEach(function (el) {
			el.classList.add('shopthelook-initialized');
			el.addEventListener('click', function (e) {
				el.classList.add('loading');
				e.preventDefault();
				shopTheLookContainer.innerHTML = '';
				var widthClass;
				switch (maxItems) {
					case '4':
						widthClass = 'w25'
						break;
					case '5':
						widthClass = 'w20'
						break;
					default:
						widthClass = 'w16'
						break;
				}
				shopTheLookContainer.classList = `l4cl ${widthClass} slider mobile-compact`;
				openShopTheLook(el);
			});
		});
	};

	openShopTheLook = function (el) {
		var productData = JSON.parse(el.getAttribute('data-products'));
		if (productData.length == 0) {
			productData = new Array(parseInt(maxItems));
		}
		var shopTheLookHTML = ''
		var shopTheLookProductsObj = {}
		var itemsDone = 0;
		Array.from(productData).forEach(function (product, index, array) {
			fetch(product + '/?section_id=product-item')
				.then((response) => {
					if (!response.ok) {
						var error = new Error(response.status);
						throw error;
					}
					return response.text();
				})
				.then((text) => {
					const resultsElement = new DOMParser().parseFromString(text, 'text/html').getElementById('shopify-section-product-item');
					const viewEventTarget = resultsElement ? resultsElement.querySelector('[data-standard-view-event="product"]') : null;

					if (viewEventTarget) {
						try {
							const viewEventPayload = JSON.parse(viewEventTarget.getAttribute('data-standard-view-event-payload'));
							viewEventPayload.context = 'dialog';
							viewEventTarget.setAttribute('data-standard-view-event-payload', JSON.stringify(viewEventPayload));
							viewEventTarget.setAttribute('data-standard-view-event-trigger', 'manual');
						} catch (error) {
							console.warn('Shop the look standard product view payload could not be updated', error);
						}
					}

					const resultsMarkup = resultsElement ? resultsElement.innerHTML : '';
					shopTheLookProductsObj[product] = resultsMarkup;
					itemsDone++;
					if (itemsDone === array.length) {
						Array.from(productData).forEach(function (product, index, array) {
							shopTheLookHTML += shopTheLookProductsObj[product];
						});
						el.classList.add('shopthelook-initialized-initialized');
						shopTheLookContainer.innerHTML = shopTheLookHTML;
						window.dispatchEvent(ratingsEvt);
						window.dispatchEvent(listCollectionSliderEvt);
						window.dispatchEvent(formZindexEvt);
						window.dispatchEvent(semanticInputEvt);
						window.dispatchEvent(semanticSelectEvt);
						window.dispatchEvent(schemeTooltipEvt);
						window.dispatchEvent(popupsEvt);
						window.dispatchEvent(listScrollableEvt);
						window.dispatchEvent(productcardVariantsEvt);
						window.check_limit_event();
						ajaxCart.init();
						quickShop.init();
						openPanel('add-products-to-banner');
						el.classList.remove('loading');
					}
				})
				.catch((error) => {
					console.log("shopTheLookDrawer error", error);
					throw error;
				});
		});
	}
	module = {
		init: init
	};
	return module;
}(shopTheLookDrawer || {}));
shopTheLookDrawer.init();

window.addEventListener("productBlockPopup", function (evt) {
	let link = document.querySelectorAll('[data-block-popup]:not(.block-popup-initialized)');
	let linkActiveQuickshop = document.querySelectorAll('.popup-a.block-popup-quickshop-popup-initalized[data-title^="block-popup"]');
	let linkActive = document.querySelectorAll('.popup-a.block-popup-initialized[data-title^="block-popup"]');

	if (link.length) {
		link.forEach(function (el) {
			let renderedPopup_id = el.getAttribute('data-block-popup');
			let popup = document.querySelector('.popup-a[data-title="' + renderedPopup_id + '"].block-popup-initialized');
			if (popup && popup.classList.contains('shown')) {
				popup.remove();
				let renderedPopup = document.querySelector('.popup-a[data-title="' + renderedPopup_id + '"]:not(.block-popup-initialized)');
				renderedPopup.classList.add('block-popup-initialized');
				document.querySelector('#root').appendChild(renderedPopup);
				loadPopup(renderedPopup_id, function () {
					hidePanels();
				});
			}

			el.addEventListener('click', function (e) {

				if (linkActive.length) {
					linkActive.forEach(el => el.remove());
				}
				let popup_id = el.getAttribute('data-block-popup');
				let popupWrapper = document.querySelector('.popup-a[data-title="' + popup_id + '"]:not(.block-popup-initialized)');
				let isQuickshop = false;
				if (e.target.closest('[data-template]')) {
					let productFormTemplate = e.target.closest('[data-template]').getAttribute('data-template')

					if (productFormTemplate.startsWith('quickshop')) {
						isQuickshop = true;
					}

					if (isQuickshop) {
						if (linkActiveQuickshop.length) {
							linkActiveQuickshop.forEach(el => el.remove());
						}
					}
				}

				if (!el.classList.contains('block-popup-initialized')) {
					if (isQuickshop) {
						popupWrapper.classList.add('block-popup-quickshop-popup-initalized');
					} else {
						popupWrapper.classList.add('block-popup-initialized');
					}
					document.querySelector('#root').appendChild(popupWrapper);
				}

				loadPopup(popup_id, function () {
					hidePanels();
				});
				el.classList.add('block-popup-initialized');
				e.preventDefault();
			});
		});
	}
});
window.dispatchEvent(productBlockPopupEvt);

window.addEventListener("sizechartPopup", function (evt) {
	let sizechart_popup = document.querySelectorAll('.popup-a[data-title^="sizing-chart-popup-"]:not(.sizechart-popup-initalized)');
	let sizechart_popupActive = document.querySelectorAll('.popup-a.sizechart-popup-initalized[id^="sizing-chart-popup-"]');

	if (sizechart_popupActive.length && sizechart_popup.length) {
		sizechart_popupActive.forEach(el => el.remove());
	}

	if (sizechart_popup.length) {
		sizechart_popup.forEach(el => {
			el.classList.add('sizechart-popup-initalized');
			document.querySelector('#root').appendChild(el);
		});
	}

});
window.dispatchEvent(sizechartPopupEvt);
