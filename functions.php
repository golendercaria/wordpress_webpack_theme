<?php

	const URL_WEBSERVER = "https://localhost:8083";

	require_once "libs/utilities.php";

	function fct_enqueue_style() {
		$cssFilePath = glob( get_template_directory() . "/css/build/app.min.css" );
		if( !empty( $cssFilePath ) ){
			$cssFileURI = get_template_directory_uri() . "/css/build/" . basename( $cssFilePath[0] );
			wp_enqueue_style( "app-css", $cssFileURI, false);
		}
	}
	
	function fct_enqueue_script() {
		if( $_SERVER["SERVER_NAME"] == "localhost" ){
			$jsFileURI = URL_WEBSERVER . "/js/src/app.js";
		}else{
			$jsFileURI = get_template_directory_uri() . "/js/build/app.min.js";
		}

		wp_enqueue_script('jquery-ui-core');
		
		wp_enqueue_script( 'app-js', $jsFileURI, array('jquery') );
	}

	add_action( 'wp_enqueue_scripts', 'fct_enqueue_style' );
	add_action( 'wp_enqueue_scripts', 'fct_enqueue_script' );
