import './static/css/fontawesome-all.css';
import './static/css/bootstrap-grid.min.css';
import './static/css/hint.min.css';
import './static/css/style.css';

export const onRouteUpdate = () => {
	const $ = require("jquery");
	window.jQuery = $;
	$(document).ready(function() {
		/* Modo oscuro */
	    if(localStorage.getItem("darkMode") === "true" && !$("html").hasClass("dark")) {
			$("#dark-mode").addClass("on");
			$("html").addClass("dark");
			localStorage.setItem("darkMode", true);
	    }
	    /* Inicializar slideshow */
	    $("#slideshow>div>img:first-of-type").click();

	});

	if(localStorage.getItem("darkMode") === "true") {
		$("#dark-mode").addClass("on");
	}

	$("#dark-mode").click(function() {
		$(this).toggleClass("on");
		$("html").toggleClass("dark");
		localStorage.setItem("darkMode", $(this).hasClass("on"));
	});

	$("#slideshow>div>img").click(function () {
		$("#slideshow>img").attr("src", $(this).attr("src"));
		$("#slideshow>div>img")
			.removeClass("on")
			.eq($(this).index()).addClass("on");
	})

}