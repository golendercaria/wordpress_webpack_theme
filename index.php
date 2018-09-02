<?php
	get_header(); 
?>

	<div class="d-grid grid-cols-12">
		<div class="panel darkpurple col-12 align-center">
			<h1>HOW IT WORK</h1>
			<div class="require">npm is required !</div>
		</div>
		<div class="panel darkpurple col-12">
			<ul>
				<li>Add this theme in theme folder</li>
				<li>Open terminal, and go in the theme directory</li>
				<li>Execute "npm install"</li>
				<li>Execute "npm run dev"</li>
				<hr/>
				<li>Change CSS in css/src/ the root file is app.css</li>
				<li>Change JS in js/src/ the root file is app.js</li>
			</ul>
		</div>
		<div class="panel yellow col-12">
			<h2>FEATURES</h2>
			<div class="d-grid grid-cols-12">
				<div class="col-4 col-m-12 d-grid grid-cols-1 justify-self-center">
					<h3>ES6 ready</h3>
					<img src="<?php echo get_template_directory_uri(); ?>/img/es6.png" />
				</div>
				<div class="col-4 col-m-12 d-grid grid-cols-1 justify-self-center">
					<h3>SASS compiling</h3>
					<img src="<?php echo get_template_directory_uri(); ?>/img/compile.png" />
					
				</div>
				<div class="col-4 col-m-12 d-grid grid-cols-1 justify-self-center">
					<h3>Auto reload style</h3>
					<img src="<?php echo get_template_directory_uri(); ?>/img/auto.png" />
					
				</div>
				<div class="col-4 col-m-12 d-grid grid-cols-1 justify-self-center">
					<h3>Module loader</h3>
					<img src="<?php echo get_template_directory_uri(); ?>/img/target.png" />

				</div>
				<div class="col-4 col-m-12 d-grid grid-cols-1 justify-self-center">
					<h3>Auto-prefixer</h3>
					<img src="<?php echo get_template_directory_uri(); ?>/img/autoprefixer.png" />

				</div>
			</div>
		</div>
		<div class="panel orange col-12">
			<h2>ARRIVES</h2>
			<div class="d-grid grid-cols-12">
				<div class="col-4 col-m-12 d-grid grid-cols-1 justify-self-center">
					<h3>Sprite functionnalities</h3>
					<img src="<?php echo get_template_directory_uri(); ?>/img/puzzle.png" />
				</div>
			</div>
		</div>
	</div>


<?php 
	get_footer(); 
?>