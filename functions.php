<?php

	const URL_WEBSERVER = "http://localhost:8080";

	function pre($a = null){
		echo "<pre>";
		print_r($a);
		echo "</pre>";
	}

	function fct_enqueue_style() {
		$cssFilePath = glob( get_template_directory() . "/css/build/app.min.*.css" );
		if( !empty( $cssFilePath ) ){
			$cssFileURI = get_template_directory_uri() . "/css/build/" . basename( $cssFilePath[0] );
			wp_enqueue_style( "app-css", $cssFileURI, false);
		}
	}
	
	function fct_enqueue_script() {
		$jsFilePath = glob( get_template_directory() . "/js/build/app.min.*.js" );
		if( !empty( $jsFilePath ) ){
			$jsFileURI = get_template_directory_uri() . "/js/build/" . basename($jsFilePath[0]);
		}else{
			$jsFileURI = URL_WEBSERVER . "/js/src/app.js";
			wp_enqueue_script( 'app-js', $jsFileURI, false );
		}
	}

	add_action( 'wp_enqueue_scripts', 'fct_enqueue_style' );
	add_action( 'wp_enqueue_scripts', 'fct_enqueue_script' );
