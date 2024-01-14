import './static/css/fontawesome-all.min.css';
import './static/css/bootstrap-grid.min.css';
import './static/css/hint.min.css';
import './static/css/style.css';

export const onRouteUpdate = () => {
	const isBrowser = () => typeof window !== "undefined";
	const $ = require("jquery");
	if (isBrowser()) {
		window.jQuery = $;
	}

	$(document).ready(function () {
		forceSmallCapsUrls();
		toggleMenu();
		scrollToTop();
		readProgress();
	});

	/* START_ FORCE SMALLCAPS URLS */
	const forceSmallCapsUrls = () => {
		let currentURL = isBrowser() ? window.location.href : '';
		let lowerCaseURL = currentURL.toLowerCase();
		if (isBrowser() && currentURL !== lowerCaseURL) {
			window.location.replace(lowerCaseURL);
		}
	}
	/* END_ FORCE SMALLCAPS URLS */

	/* START_ MENU TOGGLE */
	const toggleMenu = () => {
		$("#menu-icon").removeClass("active");
		$("body").removeClass('nav-open');

		$("#menu-overlay, #menu-icon").on("click", () => {
			$("#menu-icon").toggleClass("active");
			$("body").toggleClass('nav-open');
		});

		$("#navigation a").on("click", () => {
			$("#menu-icon").trigger('click');
		});
	};
	/* END_ MENU TOGGLE */

	/* START_ THEME TOGGLER */
	const storageKey = 'theme-preference';

	const reflectPreference = () => {
		document.firstElementChild.setAttribute('data-theme', theme.value);
		document.querySelector('#theme-toggle').setAttribute('aria-label', theme.value);
	}

	const setPreference = () => {
		localStorage.setItem(storageKey, theme.value);
		reflectPreference();
	}

	const getColorPreference = () => {
		if (localStorage.getItem(storageKey))
			return localStorage.getItem(storageKey);
		else
			return isBrowser() && window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
	}

	const theme = {
		value: getColorPreference(),
	}

	reflectPreference();

	$(document).ready(function () {
		reflectPreference();
		document.querySelector('#theme-toggle').addEventListener('click', function () {
			theme.value = theme.value === 'light'
				? 'dark'
				: 'light';
			setPreference();
		});
	});

	if (isBrowser()) {
		window.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', ({ matches: isDark }) => {
				theme.value = isDark ? 'dark' : 'light';
				setPreference();
			});
	}
	/* END_ THEME TOGGLER */

	/* START_ SCROLL TO TOP */
	const scrollToTop = () => {
		if (isBrowser()) {
			var progressPath = document.querySelector('.scroll-to-top path');
			var pathLength = progressPath.getTotalLength();
			progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
			progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
			progressPath.style.strokeDashoffset = pathLength;
			progressPath.getBoundingClientRect();
			progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
			var updateProgress = function () {
				var scroll = $(window).scrollTop();
				var height = $(document).height() - $(window).height();
				var progress = pathLength - (scroll * pathLength / height);
				progressPath.style.strokeDashoffset = progress;
			}
			updateProgress();
			$(window).scroll(updateProgress);
			var offset = 50;
			var duration = 550;
			$(window).on('scroll', function () {
				if ($(this).scrollTop() > offset) {
					$('.scroll-to-top').addClass('active-progress');
				} else {
					$('.scroll-to-top').removeClass('active-progress');
				}
			});
			$('.scroll-to-top').on('click', function (event) {
				event.preventDefault();
				$('html, body').animate({ scrollTop: 0 }, duration);
				return false;
			})
		}
	};
	/* END_ SCROLL TO TOP */

	/* START_ ISOTOPE GRID */
	$('.button-group').each(function (i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on('click', 'button', function () {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$(this).addClass('is-checked');
		});
	});
	/* END_ ISOTOPE GRID */

	/* START_ READ PROGRESS */
	const readProgress = () => {
		if (isBrowser()) {
			let progressBar = $('progress');
			progressBar.attr('max', $(document).height() - $(window).height());

			$(document).on('scroll', function () {
				progressBar.attr('value', $(window).scrollTop());
			});
		}
	};
	/* END_ READ PROGRESS */

	/* START_ SLIDESHOW */
	function slideshow(forward) {
		var current = $("#header-photo>img.current");
		current.removeClass("current");

		if (forward) {
			current.nextWrap("img").addClass("current");
		} else {
			current.prevWrap("img").addClass("current");
		}
	}

	$.fn.nextWrap = function (selector) {
		var $next = this.next(selector);
		if ($next.length) return $next;
		return this.siblings(selector).first();
	};

	$.fn.prevWrap = function (selector) {
		var $prev = this.prev(selector);
		if ($prev.length) return $prev;
		return this.siblings(selector).last();
	};

	$("#left-slide").on("click", function () { slideshow(false) });
	$("#right-slide").on("click", function () { slideshow(true) });
	/* END_ SLIDESHOW */
}