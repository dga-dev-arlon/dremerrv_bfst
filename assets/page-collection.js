// ---------------------------------------------------------------
// Collection page
// ---------------------------------------------------------------


// custom.js
// -----------------------------------------------

// Adds 'in-col' class to slider elements inside module containers, except those with excluded width classes.  
Array.from(module_collection).forEach(container => {
	Array.from(container.querySelectorAll('.l4cl.slider:not(.w12, .w14, .w16, .w20, .w25, .w33, .w50)')).forEach(element => {
		element.classList.add('in-col');
	});
});



// custom-async.js
// -----------------------------------------------
// Grid or list view
var saveCollectionview = function(attribute, value) {
	const config = {
		method: 'POST',
		body: JSON.stringify({
			attributes: {
				[attribute]: value
			}
		}),
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json',
			'Accept': 'application/javascript'
		}
	};
	fetch(routes.cart_update_url, config)
			.then((response) => response.json())
			.then((response) => {
				if (response.status) {
					handleErrorMessage(response.description);
					return;
				}
			})
			.catch((error) => {
				console.log("saveCollectionview error", error);
			});
}

function insertAfter(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var clearRangeInputs = function(minInput, maxInput) {
	var minInput = document.querySelector('#filter input#min'),
			maxInput = document.querySelector('#filter input#max');
	if (minInput && maxInput) {
		minInput.removeAttribute('name');
		maxInput.removeAttribute('name');
	}
}
var clearAllInputs = function() {
	clearRangeInputs();
	var inputs = document.querySelectorAll('#filter input[type="checkbox"]:checked');
	Array.from(inputs).forEach(function (el) {
		el.checked = false;
	});
}

function saveLoadMoreAnchor() {
	let anchors = document.querySelectorAll('#collection > li > figure > a:not(.load-more-anchor-listening), .m6cl .results > div a:not(.load-more-anchor-listening), .m6cl .results > .l4ne a:not(.load-more-anchor-listening)');
	if (anchors) {
		Array.from(anchors).forEach(function (el) {
			el.classList.add('load-more-anchor-listening');
			el.addEventListener('click', function(e) {
				localStorage.setItem('loadMoreItemClicked', el.getAttribute('href'));
			});
		});
	}
}

// Attaches click handlers to aside navigation toggle links, calling toggle_dropdowns_simple() on their parent element.  
const navAsideEvt = new CustomEvent("navAside")
window.addEventListener("navAside", function(evt) {
	const nav_aside = document.querySelectorAll('.n6as a.toggle:not(.n6as-initalized)');
	if (nav_aside.length) {
		nav_aside.forEach(function (el) {
			el.classList.add('n6as-initalized');
			el.addEventListener('click', function (e) {
				toggle_dropdowns_simple(el.parentElement);
				e.preventDefault();
			});
		});
	}
});
window.dispatchEvent(navAsideEvt);

let forceFormFilterRender = false;
const filtersEvt = new CustomEvent("filters");
window.addEventListener("filters", function(evt) {
	// Manages the filter panel: initializes filter toggles, handles open/close actions, and toggles filter subsections on click or key events.  
	const form_filter = document.getElementsByClassName('f8fl');
	if (form_filter.length) {
		html_tag.classList.add('t1cl');
		let formFilterRendered = false;

		function renderFormFilter() {
			if (!formFilterRendered) {
				Array.from(form_filter).forEach(function (el) {
					append_url(el, 'Close', 'f8fl-toggle');

					const elementId = el.getAttribute('id');

					if (elementId) {
						Array.from(document.querySelectorAll(`[href="#${elementId}"]`)).forEach(link => {
							link.classList.add('f8fl-toggle');
						});
					}
					Array.from(el.querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach(function (el) {
						append_url(el, 'Close', 'header-toggle');
					});
				});
				Array.from(document.getElementsByClassName('f8fl-toggle')).forEach(function (el) {
					el.setAttribute('aria-controls', 'filter');
				});
				formFilterRendered = true;
			}
		}

		function handleFilterClick(event) {
			renderFormFilter();
			if (event.target.matches('a[aria-controls="filter"], a[aria-controls="filter"] *')) {
				html_tag.classList.add('has-filters');
				if (!html_tag.classList.contains('f8fl-open')) {
					hidePanels();
					html_tag.classList.add('f8fl-open');
				} else {
					html_tag.classList.remove('f8fl-open');
				}
				if (event.target.closest('.m6pn') !== null) {
					overlayClose();
				}
				getStickyFooters();
				new_css('css-filters', window.filepaths['async_filters_css']);
				new_css('css-search', window.filepaths['async_search_css']);
				event.preventDefault();
			}
		}

		function handleFilterSub(event) {
			if (event.target.matches('.f8fl a.header-toggle, .f8fl a.header-toggle *')) {
				const closestH = event.target.closest('h1, h2, h3, h4, h5, h6');
				toggle_dropdowns_simple(closestH);
				if (closestH.classList.contains('toggle') && typeof runPaddingsForInputs === 'function') {
					Array.from(nextUntil(closestH, 'h1, h2, h3, h4, h5, h6')).forEach(function (el) {
						Array.from(el.querySelectorAll('[class*="input-"][class*="fix"]')).forEach(runPaddingsForInputs);
					});
				}
				if (!closestH.hasAttribute('id')) {
					event.preventDefault();
				}
			}
		}

		if (forceFormFilterRender) {
			renderFormFilter();
			forceFormFilterRender = false;
		}
		if (!formFilterRendered) {
			document.addEventListener('click', handleFilterClick);
			document.addEventListener('click', handleFilterSub);
			document.addEventListener('keyup', function (event) {
				if (event.key === ' ') {
					handleFilterClick(event);
					handleFilterSub(event);
				}
			});
		}
	}

	var form_sort = document.getElementsByClassName('f8sr'),
			form_sort_list_view,
			form_sort_list_inline;

	function clearSortForm() {
		Array.from(form_sort).forEach((el) => {
			el.classList.remove('fixed');
			html_tag.classList.remove('f8sr-fixed');
		});
	}

	if (form_sort.length) {
		Array.from(form_sort).forEach(function (form_cont) {
			html_tag.classList.add('t1cl');
			if (form_cont.classList.contains('mobile-sticky') || form_cont.classList.contains('sticky')) {
				const trickDiv = createElementWithClass('div', 'offset-dist');
				const trickDist = createElementWithClass('div', 'inner-dist');

				function updateTrickDistHeight(div) {
					if (!div || div.hasHeight || !form_cont) return;
			
					requestAnimationFrame(() => {
						const h = form_cont.offsetHeight;
						div.style.height = `${h}px`;
						root_styles.style.setProperty('--f8sr_height', `${h}px`);
						div.hasHeight = true;
					});
				}
		
				//let updateSearchHeightExecuted = false;
				let updateSearchHeightRAF = 0;
		
				function applySearchHeight() {
					updateSearchHeightRAF = 0;
					if (!search_id) return;
			
					const h = search_id.clientHeight;
					if (h <= 0) return;
			
					root_styles.style.setProperty('--search_height', `${h}px`);
					//updateSearchHeightExecuted = true;
				}
		
				function updateSearchHeight() {
					if (!updateSearchHeightRAF) {
						updateSearchHeightRAF = requestAnimationFrame(applySearchHeight);
					}
				}

				function createEventListeners(element) {
					window.addEventListener('scroll', function () {
						updateTrickDistHeight(element);
						updateSearchHeight();
					});
					/*window.addEventListener('resize', throttle(() => {
						updateTrickDistHeight(element);
						updateSearchHeightExecuted = false;
						updateSearchHeight();
					}, 500));
					window.addEventListener('touchstart', function () {
						updateTrickDistHeight(element);
						updateSearchHeight();
					});
					window.addEventListener('keyup', function () {
						updateTrickDistHeight(element);
						updateSearchHeight();
					});*/
				}
	

				const observer = new IntersectionObserver(
						([e]) => {
							const boundingRect = e.boundingClientRect;

							if (e.isIntersecting) {
								//console.log('Element - on screen.');
								const el_mod = form_cont.classList.contains('sticky') ? e.target.nextElementSibling : form_cont;
								el_mod.classList.remove('fixed');
								html_tag.classList.remove('f8sr-fixed');
							} else {
								const el_mod = form_cont.classList.contains('sticky') ? e.target.nextElementSibling : form_cont;
								if (boundingRect.top < 0) {
									// console.log('Element - above screen.');
									el_mod.classList.add('fixed');
									html_tag.classList.add('f8sr-fixed');
								}
								if (boundingRect.bottom >= window.innerHeight) {
									// console.log('Element - below screen.');
									el_mod.classList.remove('fixed');
									html_tag.classList.remove('f8sr-fixed');
								}
							}
						}, {
							threshold: [0, 1],
							rootMargin: "0px 0px 0px 0px"
						}
				);

				if (form_cont.classList.contains('sticky')) {
					const trg = form_cont;

					trickDist.classList.add('before-f8sr');
					form_cont.after(trickDiv);
					form_cont.before(trickDist);

					createEventListeners(form_cont.nextElementSibling);

					observer.observe(form_cont.previousElementSibling);
				} else if (form_cont.classList.contains('mobile-sticky') && form_cont.classList.contains('mobile-compact')) {
					const trg = form_cont.querySelector('.link-btn');

					if (trg) {
						if (trg.classList.contains('mobile-hide')) {
							form_cont.classList.add('btn-mobile-hide');
						}
					}

					form_cont.prepend(trickDiv);
					form_cont.prepend(trickDist);

					createEventListeners(form_cont.querySelector('.inner-dist'));

					observer.observe(form_cont.querySelector('.offset-dist'));
					if (trg !== undefined && trg !== null) {
						const clone_me = trg.cloneNode(true);
						clone_me.classList.add('clone');
						insertAfter(trg, clone_me);
					}
				}
			}
			form_sort_list_view = Array.from(form_cont.getElementsByClassName('l4vw'));
			form_sort_list_inline = Array.from(form_cont.getElementsByClassName('l4in'));
			let form_view_inputs = form_sort_list_view.concat(form_sort_list_inline);

			if (form_view_inputs.length) {
				Array.from(form_view_inputs).forEach(function (el) {
					if (el.getAttribute('aria-controls') !== null) {
						var im = el,
								view_list = document.getElementById(im.getAttribute('aria-controls'));
						el.querySelectorAll('input').forEach(function (el) {
							el.parentElement.addEventListener('click', function (e) {
								let className = '';
								if (el.getAttribute('data-width')) {
									view_list.classList.remove('w100', 'w50', 'w33', 'w25','w20');
									saveCollectionview('collection_grid_view', el.getAttribute('data-width'));
									className = el.getAttribute('data-width');
									view_list.classList.add(className);
								} else if (el.getAttribute('data-width-mobile')) {
									view_list.classList.remove('w100-mobile', 'w50-mobile');
									saveCollectionview('collection_grid_view_mobile', el.getAttribute('data-width-mobile'));
									className = el.getAttribute('data-width-mobile');
									view_list.classList.add(className);
								}
								else if (el.getAttribute('data-collection_img_view')) {
									let collection_img_view = el.getAttribute('data-collection_img_view');
									saveCollectionview('collection_img_view', collection_img_view);
									if(document.querySelector('li picture.slider') != null) {
										view_list.querySelectorAll('li picture.slider').forEach(function (el) {
											if(el.firstChild.nodeName == 'DIV') {
												if (collection_img_view != 'first') {
													if(el.querySelectorAll('.second-first').length) {
														el.children[0].swiper.slideTo(0, 0, false);
													} else {
														el.children[0].swiper.slideTo(1, 0, false);
													}
												} else {
													if(el.querySelectorAll('.second-first').length) {
														el.children[0].swiper.slideTo(1, 0, false);
													} else {
														el.children[0].swiper.slideTo(0, 0, false);
													}
												}
											} else {
												if (collection_img_view != 'first') {
													let img = el.querySelector('img[data-index="2"]');
													if(img.closest('a') !== null) {
														img = img.closest('a');
													}
													el.prepend(img);
												} else {
													let img = el.querySelector('img[data-index="1"]');
													if(img.closest('a') !== null) {
														img = img.closest('a');
													}
													el.prepend(img);
												}
											}
										});
									} else {
										view_list.querySelectorAll('li picture + picture').forEach(function (el) {
											if (collection_img_view != 'first') {
												el.closest('li').classList.add('second-img-first');
											} else {
												el.closest('li').classList.remove('second-img-first');
											}
										});
									}

								}
							});
						});
					}
				});
			}
		});
	}
});
window.dispatchEvent(filtersEvt);


const initFiltersEvt = new CustomEvent("initFilters");
const filterClearButtonsBound = new WeakSet();
const filterInputsBound = new WeakSet();
let currentResultsAbortController = null;
let currentStandardResultsUpdate = null;
let latestResultsRequestId = 0;
let resultsDebounceTimer = null;
let pendingResultsOptions = null;

function isResultsControlledParam(name) {
	return name === 'q' ||
		name === 'type' ||
		name === 'sort_by' ||
		name === 'page' ||
		name.startsWith('filter.') ||
		name.startsWith('options[');
}

function getResultsUpdateContext() {
	const wrapper = document.querySelector('.collection-wrapper[data-standard-update-type]');
	if (!wrapper) return null;

	const filterForm = document.getElementById('filter');
	const sectionId = wrapper.dataset.standardSectionId || (filterForm ? filterForm.dataset.template : '');
	const section = sectionId ? document.getElementById('shopify-section-' + sectionId) : null;

	if (!section || !section.contains(wrapper)) return null;

	return {
		filterForm: filterForm,
		section: section,
		sectionId: sectionId,
		type: wrapper.dataset.standardUpdateType,
		wrapper: wrapper
	};
}

function getEffectiveResultsParams(context, sourceParams, sortValue) {
	if (sourceParams) {
		const historyParams = new URLSearchParams(sourceParams.toString());
		historyParams.delete('section_id');
		return historyParams;
	}

	const params = new URLSearchParams(window.location.search);
	params.delete('section_id');
	params.delete('page');

	if (context.filterForm) {
		Array.from(params.keys()).forEach(function (name) {
			if (isResultsControlledParam(name)) params.delete(name);
		});

		const formData = new FormData(context.filterForm);
		for (const entry of formData.entries()) {
			params.append(entry[0], entry[1]);
		}
	}

	if (sortValue !== undefined && sortValue !== null) {
		params.set('sort_by', sortValue);
	}

	return params;
}

function beginStandardResultsUpdate(target, urlSearchParams) {
	if (
		!window.XclusiveTheme ||
		typeof window.XclusiveTheme.beginStandardResultsUpdate !== 'function'
	) {
		return null;
	}

	try {
		return window.XclusiveTheme.beginStandardResultsUpdate(target, urlSearchParams);
	} catch (error) {
		console.warn('Standard storefront results update setup failed', error);
		return null;
	}
}

function getStandardResultsCount(root) {
	if (!root) return 0;
	const resultsTarget = root.matches && root.matches('.collection-wrapper') ?
		root :
		root.querySelector('.collection-wrapper');
	const count = resultsTarget ? parseInt(resultsTarget.dataset.standardResultsCount, 10) : 0;
	return Number.isFinite(count) ? count : 0;
}

function createResultsAbortError(message) {
	if (typeof DOMException === 'function') {
		return new DOMException(message || 'Superseded collection or search update', 'AbortError');
	}

	const error = new Error(message || 'Superseded collection or search update');
	error.name = 'AbortError';
	return error;
}

function cancelCurrentResultsRequest(message) {
	const error = createResultsAbortError(message);
	if (currentStandardResultsUpdate) currentStandardResultsUpdate.reject(error);
	currentStandardResultsUpdate = null;

	if (currentResultsAbortController) currentResultsAbortController.abort();
	currentResultsAbortController = null;
}

function setFilterSortValue(filterForm, value) {
	if (!filterForm) return;

	const controls = filterForm.querySelectorAll('[name="sort_by"]');
	let matchedControl = false;

	Array.from(controls).forEach(function (control) {
		if (control.type === 'radio') {
			control.checked = control.value === value;
			if (control.checked) matchedControl = true;
		} else {
			control.value = value;
			matchedControl = true;
		}
	});

	if (!matchedControl) {
		const hiddenInput = document.createElement('input');
		hiddenInput.type = 'hidden';
		hiddenInput.name = 'sort_by';
		hiddenInput.value = value;
		hiddenInput.className = 'sort_by_clone';
		filterForm.appendChild(hiddenInput);
	}
}

function clearResultsProcessing(filterForm, collectionSection) {
	if (filterForm && filterForm.isConnected) filterForm.classList.remove('processing');
	if (collectionSection && collectionSection.isConnected) {
		const list = collectionSection.querySelector('.l4cl.processing');
		if (list) list.classList.remove('processing');
	}
}

function findFilterToggle(root, selector, value) {
	if (!root) return null;
	const elements = root.querySelectorAll(selector);

	for (let index = 0; index < elements.length; index++) {
		if (elements[index].getAttribute('data-filter-toggle') === value) return elements[index];
	}

	return null;
}

function preserveFilterExpansionState(currentFilterForm, updatedFilterForm) {
	const expandedLists = [];
	if (!currentFilterForm || !updatedFilterForm) return expandedLists;

	Array.from(currentFilterForm.querySelectorAll('h4[data-filter-toggle].toggle')).forEach(function (heading) {
		const updatedHeading = findFilterToggle(
			updatedFilterForm,
			'h4[data-filter-toggle]',
			heading.dataset.filterToggle
		);
		if (updatedHeading) updatedHeading.classList.add('toggle');
	});

	Array.from(currentFilterForm.querySelectorAll('ul[data-filter-toggle].link-more-clicked')).forEach(function (list) {
		expandedLists.push(list.dataset.filterToggle);
	});

	return expandedLists;
}

function reopenExpandedFilterLists(root, expandedLists) {
	if (!root || !expandedLists.length) return;

	expandedLists.forEach(function (filterToggle) {
		const list = findFilterToggle(root, 'ul[data-filter-toggle]', filterToggle);
		const link = list ? list.querySelector('a.link-more') : null;
		if (link) link.click();
	});
}

function reinitializeResultsModules() {
	window.dispatchEvent(collectionSortEvt);
	window.dispatchEvent(rangeSliderEvt);
	forceFormFilterRender = true;
	window.dispatchEvent(initFiltersEvt);
	window.dispatchEvent(filtersEvt);
	window.dispatchEvent(modulePanelEvt);
	window.dispatchEvent(ratingsEvt);
	window.dispatchEvent(semanticInputEvt);
	window.dispatchEvent(semanticSelectEvt);
	window.dispatchEvent(schemeTooltipEvt);
	window.dispatchEvent(popupsEvt);
	window.dispatchEvent(collectionLoadMoreEvt);
	window.dispatchEvent(listScrollableEvt);
	window.dispatchEvent(modulePanelAnchorEvt);
	window.dispatchEvent(productcardVariantsEvt);
	window.dispatchEvent(listCollectionSliderEvt);
	window.check_limit_event();
	ajaxCart.init();
	quickShop.init();
	window.dispatchEvent(heightLimitEvt);
}

function processResultsUpdate(options) {
	options = options || {};

	if (resultsDebounceTimer) {
		clearTimeout(resultsDebounceTimer);
		resultsDebounceTimer = null;
	}
	pendingResultsOptions = null;

	const context = getResultsUpdateContext();
	if (!context) return Promise.resolve(false);

	const requestId = ++latestResultsRequestId;
	let fetchOptions = {};
	let abortController = null;
	let standardResultsUpdate = null;

	cancelCurrentResultsRequest('Superseded by a newer collection or search update');

	if ('AbortController' in window) {
		abortController = new AbortController();
		currentResultsAbortController = abortController;
		fetchOptions = {
			signal: abortController.signal
		};
	}

	const filterSearchParams = getEffectiveResultsParams(context, options.searchParams, options.sortBy);
	const filterParams = filterSearchParams.toString();
	standardResultsUpdate = options.emitStandardEvent === false ?
		null :
		beginStandardResultsUpdate(context.wrapper, filterSearchParams);
	currentStandardResultsUpdate = standardResultsUpdate;

	if (context.filterForm) context.filterForm.classList.add('processing');
	const currentList = context.section.querySelector('.l4cl:not(.bls)');
	if (currentList) currentList.classList.add('processing');

	const sectionSearchParams = new URLSearchParams(filterSearchParams.toString());
	sectionSearchParams.set('section_id', context.sectionId);
	const requestUrl = window.location.pathname + '?' + sectionSearchParams.toString();

	return fetch(requestUrl, fetchOptions)
		.then(function (response) {
			if (requestId !== latestResultsRequestId) {
				throw createResultsAbortError('Superseded collection or search response');
			}
			if (!response.ok) {
				throw new Error('Collection or search update failed: ' + response.status + ' ' + response.statusText);
			}
			return response.text();
		})
		.then(function (text) {
			if (requestId !== latestResultsRequestId) {
				throw createResultsAbortError('Superseded collection or search response');
			}

			const parsedDocument = new DOMParser().parseFromString(text, 'text/html');
			const resultsMarkup = parsedDocument.querySelector('#shopify-section-' + context.sectionId);
			const updatedWrapper = resultsMarkup ? resultsMarkup.querySelector('.collection-wrapper[data-standard-update-type="' + context.type + '"]') : null;
			const updatedFilterForm = resultsMarkup ? resultsMarkup.querySelector('#filter') : null;
			const liveSection = document.getElementById('shopify-section-' + context.sectionId);
			const sidebarGlobal = document.querySelector('.filters-aside-initialized');
			const hasInitializedFilterDrawer = Boolean(sidebarGlobal);
			const drawerMarkup = hasInitializedFilterDrawer && resultsMarkup ? resultsMarkup.querySelector('#filters-aside') : null;

			if (!resultsMarkup || !updatedWrapper) {
				throw new Error('Collection or search update response contains incomplete section markup.');
			}
			if (context.filterForm && !updatedFilterForm) {
				throw new Error('Collection or search update response is missing filter form markup.');
			}
			if (hasInitializedFilterDrawer && !drawerMarkup) {
				throw new Error('Collection or search update response is missing filter drawer markup.');
			}
			if (!liveSection || liveSection !== context.section) {
				throw createResultsAbortError('Collection or search section was replaced before the response completed');
			}

			const expandedLists = preserveFilterExpansionState(context.filterForm, updatedFilterForm);

			liveSection.innerHTML = resultsMarkup.innerHTML;
			let filterInteractionRoot = liveSection;

			if (hasInitializedFilterDrawer) {
				sidebarGlobal.innerHTML = drawerMarkup.innerHTML;
				append_url(sidebarGlobal, 'Close', 'm6pn-close');
				sidebarGlobal.classList.add('processed-filter');
				filterInteractionRoot = sidebarGlobal;

				const duplicateFilters = liveSection.querySelector('#filters-aside:not(.filters-aside-initialized)');
				if (duplicateFilters) duplicateFilters.remove();
			}

			linkMore();
			reopenExpandedFilterLists(filterInteractionRoot, expandedLists);

			if (options.scroll !== false) {
				const liveWrapper = liveSection.querySelector('.collection-wrapper');
				if (liveWrapper) {
					liveWrapper.scrollIntoView();
				} else {
					window.scrollTo(0, 0);
				}
			}

			if (options.updateHistory !== false) {
				history.pushState(
					{ filterParams: filterParams },
					'',
					window.location.pathname + (filterParams ? '?' + filterParams : '')
				);
			}

			reinitializeResultsModules();

			const refreshedWrapper = liveSection.querySelector('.collection-wrapper[data-standard-update-type="' + context.type + '"]');
			if (standardResultsUpdate) {
				standardResultsUpdate.resolve(getStandardResultsCount(refreshedWrapper));
			}
			if (currentStandardResultsUpdate === standardResultsUpdate) {
				currentStandardResultsUpdate = null;
			}
			if (currentResultsAbortController === abortController) {
				currentResultsAbortController = null;
			}
			return true;
		})
		.catch(function (error) {
			if (standardResultsUpdate) standardResultsUpdate.reject(error);
			if (!error || error.name !== 'AbortError') {
				console.warn('processResultsUpdate error', error);
			}
			if (currentStandardResultsUpdate === standardResultsUpdate) {
				currentStandardResultsUpdate = null;
			}
			if (currentResultsAbortController === abortController) {
				currentResultsAbortController = null;
			}
			if (requestId === latestResultsRequestId) {
				clearResultsProcessing(context.filterForm, context.section);
			}
			return false;
		});
}

function scheduleResultsUpdate(options) {
	latestResultsRequestId++;
	cancelCurrentResultsRequest('Superseded during the collection or search debounce window');

	pendingResultsOptions = Object.assign({}, pendingResultsOptions || {}, options || {});
	if (resultsDebounceTimer) clearTimeout(resultsDebounceTimer);
	resultsDebounceTimer = setTimeout(function () {
		const scheduledOptions = pendingResultsOptions || {};
		resultsDebounceTimer = null;
		pendingResultsOptions = null;
		processResultsUpdate(scheduledOptions);
	}, 125);
}

window.addEventListener("initFilters", function (evt) {
	const filter_form = document.getElementById('filter');
	if (!filter_form) return;

	new_css('form-validation-css', window.filepaths['async_validation_css']);

	const formFilterInputAnchors = filter_form.querySelectorAll('li label a');
	Array.from(formFilterInputAnchors).forEach(function (el) {
		el.classList.add('no-click');
	});

	const formFilterClear = filter_form.querySelectorAll('a.remove-all, a.clear-range');
	Array.from(formFilterClear).forEach(function (el) {
		if (filterClearButtonsBound.has(el)) return;
		filterClearButtonsBound.add(el);

		el.addEventListener('click', function (event) {
			event.preventDefault();
			if (el.classList.contains('remove-all')) {
				clearAllInputs();
			} else {
				clearRangeInputs();
			}
			processResultsUpdate();
		});
	});

	const formFilterInputs = filter_form.querySelectorAll('input');
	Array.from(formFilterInputs).forEach(function (el) {
		if (filterInputsBound.has(el)) return;
		filterInputsBound.add(el);
		el.addEventListener('change', function () {
			scheduleResultsUpdate();
		});
	});

	const layout = filter_form.dataset.drawer;
	const collectionWrapper = document.querySelector('.collection-wrapper[data-standard-update-type]');
	const filters = collectionWrapper && collectionWrapper.dataset ? collectionWrapper.dataset.filters : undefined;
	const filtersDrawerContent = document.querySelector('#filters-aside');

	if ((filtersDrawerContent && layout === 'static') || (!filters && layout === 'drawer')) {
		const initializedDrawer = document.querySelector('#root .filters-aside-initialized');
		if (initializedDrawer) initializedDrawer.remove();
		hidePanels();
		return;
	}

	if (layout === 'drawer' && filtersDrawerContent) {
		const editor = filtersDrawerContent.dataset.editor;
		let initializedDrawer = document.querySelector('#root .filters-aside-initialized');

		if (!initializedDrawer) {
			document.querySelector('#root').appendChild(filtersDrawerContent);
			filtersDrawerContent.classList.add('filters-aside-initialized');
			initializedDrawer = filtersDrawerContent;
		} else if (editor) {
			if (filtersDrawerContent.classList.contains('inv')) {
				initializedDrawer.classList.add('inv');
			} else {
				initializedDrawer.classList.remove('inv');
			}
			initializedDrawer.classList.remove('processed-filter');
		}

		window.dispatchEvent(navAsideEvt);
	}
});
window.dispatchEvent(initFiltersEvt);

window.XclusiveTheme = window.XclusiveTheme || {};
if (!window.XclusiveTheme.standardResultsPopstateBound) {
	window.XclusiveTheme.standardResultsPopstateBound = true;
	window.addEventListener('popstate', function () {
		processResultsUpdate({
			searchParams: new URLSearchParams(window.location.search),
			updateHistory: false,
			scroll: false,
			emitStandardEvent: false
		});
	});
}


const collectionLoadMoreEvt = new CustomEvent("collectionLoadMore");
window.addEventListener("collectionLoadMore", function (evt) {
	var collection_load_more = document.querySelectorAll('#load-more-button[data-next]:not(.collection-load-more-listening), #load-more-button[data-prev]:not(.collection-load-more-listening)');
	if (collection_load_more) {
		Array.from(collection_load_more).forEach(function (button) {
			button.classList.add('collection-load-more-listening');
			button.addEventListener('click', function(e) {
				e.preventDefault();
				var template = button.getAttribute('data-section'),
						collectionSection = document.getElementById('shopify-section-' + template),
						curr_products = collectionSection.querySelector('.results, .l4cl:not(.bls, .category)'),
						pagination_info = document.getElementById('load-more-info');
				if (button.getAttribute('data-next') != null) {
					var direction = 'next'
				} else {
					var direction = 'prev';
				}
				button.classList.add('loading');
				fetch(button.getAttribute('href'))
						.then((response) => {
							if (!response.ok) {
								var error = new Error(response.status);
								throw error;
							}
							return response.text();
						})
						.then((text) => {
							const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-' + template);
							var	new_products = resultsMarkup.querySelector('.results, .l4cl:not(.bls, .category)'),
									new_button = resultsMarkup.querySelector('#load-more-button[data-'+ direction +'], #load-more-button[data-top]'),
									new_pagination_info = resultsMarkup.querySelector('#load-more-info');

							if (direction == 'prev'){
								var lastScrollHeight = curr_products.scrollHeight;
							}
							if (curr_products && new_products) {
								if (direction == 'next') {
									Array.from(new_products.children).forEach(function (el) {
										curr_products.appendChild(el);
									});
								} else {
									Array.from(new_products.children).reverse().forEach(function (el) {
										curr_products.insertBefore(el, curr_products.firstChild);
									});
								}
							}
							if (direction == 'next' && pagination_info && pagination_info.parentNode && new_pagination_info) {
								pagination_info.parentNode.replaceChild(new_pagination_info, pagination_info);
							}
							if (button && button.parentNode && new_button) {
								button.parentNode.replaceChild(new_button, button);
							} else if (button && direction == 'prev') {
								button.parentNode.remove();
							}
							if (direction == 'prev'){
								var scrollDiff = curr_products.scrollHeight - lastScrollHeight,
										scrollTo = curr_products.scrollTop += scrollDiff;
								window.scrollTo({
									top: scrollTo,
									behavior: 'instant',
								});
							}
							window.history.replaceState({}, '', button.getAttribute('href'));
							saveLoadMoreAnchor();
							window.dispatchEvent(ratingsEvt);
							window.dispatchEvent(semanticInputEvt);
							window.dispatchEvent(schemeTooltipEvt);
							window.dispatchEvent(popupsEvt);
							window.dispatchEvent(collectionLoadMoreEvt);
							window.dispatchEvent(listScrollableEvt);
							window.dispatchEvent(productVariantsEvt);
							window.dispatchEvent(formZindexEvt);
							window.dispatchEvent(semanticSelectEvt);
							window.check_limit_event();
							ajaxCart.init();
							quickShop.init();
						})
						.catch((error) => {
							console.log("collectionLoadMore error", error);
							throw error;
						});
			});
		});
	}
});
window.dispatchEvent(collectionLoadMoreEvt);

// Collectionpage: sort_by
const collectionSortEvt = new CustomEvent("collectionSort")
window.addEventListener("collectionSort", function (evt) {
	const sort_by = document.getElementById('sort_by');
	if (!sort_by) return;
	if (sort_by.getAttribute('data-collection-sort-bound') === '1') return;

	sort_by.setAttribute('data-collection-sort-bound', '1');
	sort_by.addEventListener('change', function () {
		const context = getResultsUpdateContext();

		if (context) {
			setFilterSortValue(context.filterForm, this.value);
			scheduleResultsUpdate({ sortBy: this.value });
			return;
		}

		const url = new URL(window.location.href);
		url.searchParams.set('sort_by', this.value);
		url.searchParams.delete('page');
		window.location.assign(url.pathname + url.search);
	});
});
window.dispatchEvent(collectionSortEvt);