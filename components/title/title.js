import { pre } from "../../js/src/utilities";

jQuery(document).ready(function ($) {

	if ($("h1").size() == 0) { 
		return false;
	}

	pre("component title loaded");


	$("body").on("mobile_change", function () {
		if ($("html body").hasClass("mobile")) {

		} else { 

		}
	});

	if ( $("html body").hasClass("mobile") ) { 
		
	}


});