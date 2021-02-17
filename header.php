<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Slick_Demon
 */
 
// keep this for records / debugging
record_template_include(array('dir' => dirname(__FILE__),'file' => basename(__FILE__)));  
?>
<!doctype html>

<?php // add class to html "sd_LOADMASK_active" ?>

<html <?php language_attributes(); ?> class="sd_LOADMASK_active" >
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	
	<?php // add sd_LOADMASK_active classes immediately ?>
	<style>.sd_LOADMASK_active,.sd_LOADMASK_active body{overflow:hidden;}#sd_LOADMASK{position:fixed;top:0px;right:0px;bottom:0px;left:0px;z-index:1000000;background-color:#ffffff;background:#ffffff;}</style>
	
	<?php
	// favicon-----
	if( !empty(sd_vars()['brand_defines']['logos']['favicon']) ) {
		echo '<link rel="shortcut icon" type="image/png" href="' . esc_attr(sd_vars()['brand_defines']['logos']['favicon']['sizes']['medium']) . '"/>';
	}
	else {
		echo '<link rel="shortcut icon" type="image/png" href="' . get_template_directory_uri() . '/images/demonIcon.png"/>';
	}
	?>
	
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div class="mydiv">
	Hellod this is runnning away
</div>
	<?php
		sd_set_template_part(array( 'target_file' => 'sd_LOADMASK.php' ));
	?>

	<?php // js sd_set_sd_js_vars() ensures that the page is always at least the height of the veiwport?>
	<div id="page" class="site">
	
		<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'sd' ); ?></a>
		
		<?php
			do_action( 'sd_header_before' );
			sd_set_template_part(array( 'target_file' => 'header-before.php' ));
			
		?>

		<?php // set the header_classes ?>		
		<header id="masthead" class="site-header <?php echo esc_attr( sd_vars()['page_settings']['SET']['header_classes'] ); ?>">	
			<?php
			/**
			 * sadasfd
			 * asdasddsff
			 * asdsdadfdsasda
			 */
				sd_set_template_part(array( 'target_file' => 'header-layout.php' ));
			?>		
		</header><!-- #masthead -->	
		
		<?php
			do_action( 'sd_header_after' );
			sd_set_template_part(array( 'target_file' => 'header-after.php' ));
		?>
		
		<?php
			sd_set_template_part(array( 'target_file' => 'content-wrapper-open.php' ));
		?>
	</div>
</body>