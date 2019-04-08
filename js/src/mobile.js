import { pre } from "./utilities";

var is_mobile = false;
jQuery(document).ready(function ($) {

	function detectWidth(){ 
		let window_width = $(window).width();
		if (window_width <= 640 && is_mobile == false) {
			is_mobile = true;
			$("html body").addClass("mobile");
			$("body").trigger("mobile_change");
		} else if (window_width > 640 && is_mobile == true) {
			is_mobile = false;
			$("html body").removeClass("mobile");
			$("body").trigger("mobile_change");
		}
	}
	
	$(window).resize(function () {
		detectWidth();
	});
	detectWidth();

});