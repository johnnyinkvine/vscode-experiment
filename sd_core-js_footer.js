// ----------------------------------------------------------------------------
// * This is js / jquery that is loaded just before the closing body tag.

$( "body" ).on( "click", ".sd_refresh_browser_btn", function(event) {
	sd_refresh_browser();
});
	
$( "body" ).on( "click", ".sd_close_modal_btn", function(event) {
	bootbox.hideAll();
});
$( "body" ).on( "click", ".modal-content", function(event) {
	event.stopPropagation();
});
$( "body" ).on( "click", ".bootbox.modal", function(event) {
	event.stopPropagation();
	bootbox.hideAll();
});


$( "body" ).on( "click", ".sd_scroll_to_top_btn", function(event) {
	event.preventDefault();
	sd_scroll_to();
	return false;
});


$( "body" ).on( "click", "a[href*=\\#]", function(event) {

	if( 
		( $(this.hash).length ) 
		// disable for sd_POPUP_trigger
		&& ( !$(this).hasClass("sd_POPUP_trigger") )
		// disable for sd_COLLAPSE_trigger
		&& ( !$(this).hasClass("sd_COLLAPSE_trigger") )
		// disable for wc-tabs... such as is on a product page
		&& ( $(this).closest($(".wc-tabs")).length < 1 )
		// disable for bootstrap tabs
		&& ( $(this).attr("data-toggle") != "tab" )
	
	) {
		
		event.preventDefault();			
		
		sd_scroll_to({
			//scroll_container: _scroll_container,
			scroll_position: $( this.hash ),
			offset: 0,
		});
		
	}
});


function sd_sort_sd_js_vars_functions(_obj) {
	
	var _number_arr = [];

	var _number_obj = {};
	var _string_obj = {};

	var _return_obj = {};	
	
	$.each( _obj, function( _key, _value ) {

		var _first_substring = _key.substr(0, _key.indexOf('_')); 
		
		// if there is no '_' , then this will be an empty string, which is interpreted as the number zero...
		if (  ( _first_substring == "" ) || ( isNaN(_first_substring) )  ) {
	
			_string_obj[_key] = _value;
	
		}
		// otherwise, add var _first_substring to array _number_arr
		else {
			
			// put this _first_substring in an array to serve as a sortable index place holder ..and.. "sort" var of _number_obj
			_number_arr.push(_first_substring);
			
			_number_obj[_key] = {};		
			_number_obj[_key]['sort'] = _first_substring;			
			_number_obj[_key]['function'] = _value;
			
		}
			
	});
	
	// numerically sort the number array
	_number_arr.sort(function(a, b){return a - b});	
	
	// for each _number_arr,
	// for each _number_obj
	// if _number_arr key == _number_obj['sort'] then add to an object
	// remove this _number_obj because another _number_obj can have identical ['sort']
	$.each( _number_arr, function( _number_arr_KEY, _number_arr_VALUE ) {
			
		$.each( _number_obj, function( _number_obj_KEY, _number_obj_VALUE ) {
				
			if( _number_arr_VALUE == _number_obj_VALUE['sort'] ) {
				
				_return_obj[_number_obj_KEY] = _number_obj_VALUE['function'];
				
				delete _number_obj._number_obj_KEY;
				
			}
				
				
		});				
			
			
	});	

	$.each( _string_obj, function( _string_obj_KEY, _string_obj_VALUE ) {
			
		_return_obj[_string_obj_KEY] = _string_obj_VALUE;			
		
			
	});

	return _return_obj;
	
}


sd_js_vars['on_document_ready'] = sd_sort_sd_js_vars_functions( sd_js_vars['on_document_ready'] );
sd_js_vars['on_window_load'] = sd_sort_sd_js_vars_functions( sd_js_vars['on_window_load'] );
sd_js_vars['on_site_display'] = sd_sort_sd_js_vars_functions( sd_js_vars['on_site_display'] );
sd_js_vars['on_resize'] = sd_sort_sd_js_vars_functions( sd_js_vars['on_resize'] );



// execute all on_document_ready functions
document.addEventListener("DOMContentLoaded", function(event) {
	//console.log("on_document_ready ------------------------------------");
	$.each( sd_js_vars['on_document_ready'], function( function_key, function_value ) {
		function_value();
		//console.log(function_key);		
	});
});

// execute all on_window_load functions
window.onload = function() {
	//console.log("on_window_load ------------------------------------");
	$.each( sd_js_vars['on_window_load'], function( function_key, function_value ) {
		function_value();
		//console.log(function_key);		
	});	
};

function sd_on_site_display() {
	//console.log("on_site_display ------------------------------------");
	$.each( sd_js_vars['on_site_display'], function( function_key, function_value ) {
		function_value();
		//console.log(function_key);		
	});	
};	

// execute all on_resize functions
window.onresize = function() {
	//console.log("on_resize ------------------------------------");
	$.each( sd_js_vars['on_resize'], function( function_key, function_value ) {
		function_value();
		//console.log(function_key);		
	});	
};


function sd_add_wpadminbar_control() {
	
	// if there is a wpadminbar element
	if ( $( "#wpadminbar" ).length > 0 ) {
		$("body").append("<div class='sd_wpadminbar_control_btn'></div>");
	}
}
$( "body" ).on( "click", ".sd_wpadminbar_control_btn", function(event) {
	if( $(this).hasClass("sd_obj_active") ) {
		$(this).removeClass("sd_obj_active");
		$("#wpadminbar").removeClass("sd_obj_active");
	}
	else {
		$(this).addClass("sd_obj_active");
		$("#wpadminbar").addClass("sd_obj_active");		
	}
});


/* function sd_set_overlay_scrollbars() {
	
	// this is a way to place each of the scroll items to be placed in the sd_js_vars['sd_SCROLL'] with a name instead of index
	$( ".sd_SCROLL, .sd_SCROLL_X, .sd_SCROLL_Y" ).each(function( index ) {
		
		var _this_id = $(this).attr("id");
		if( _this_id == "" ) {
			_this_id = index;
		}

		sd_js_vars['sd_SCROLL'][_this_id] = 
		$(this).overlayScrollbars({ 
			"scrollbars" : {"clickScrolling" : true },
		}).overlayScrollbars();
		
	});
	
} */
function sd_set_quick_cart_overlay_scrollbars() {

	/* sd_js_vars['sd_SCROLL']['sd_QUICK_CART_target'] =
	$("#sd_QUICK_CART_target .woocommerce-mini-cart").overlayScrollbars({ 
		"scrollbars" : {"clickScrolling" : true },
	}).overlayScrollbars();	 */	

}

function sd_update_overlay_scrollbars(sd_arg_arr) {
	//sd_update_overlay_scrollbars({
	//	target: "" // the string name of the sd_js_vars['sd_SCROLL'] item, usually the id, but index if no id was assigned to the element
	//});
	sd_js_vars['sd_SCROLL'][sd_arg_arr['target']].update();
}




function sd_scroll_to(sd_arg_arr) {
	//sd_scroll_to({
	//	scroll_position: 0, // optional | number OR jquery object string 	
	//	scroll_container: "html, body", // optional | default to "html, body" | jquery object string or sd_js_vars['sd_SCROLL'] item string 
	//	offset: 0, // optional | number. amount of additional space at top
	//	duration: .6, // optional | number. duration of the animation
	//	delay: 0, // optional | number. delay before animation
	//});	

	if (sd_arg_arr == undefined) {
		var sd_arg_arr = {};
	}
	
	var _scroll_container = "html, body";
	var _scroll_position = 0;
	var _offset = 0;
	var _duration = 0.6;
	var _delay = 0;

	

	if ( ( "scroll_container" in sd_arg_arr == true ) && ( sd_arg_arr['scroll_container'] != "html, body" ) ) {
		_scroll_container = sd_arg_arr['scroll_container'];
	}
	
	
	//console.log(_scroll_container);
		
	
	if ( "offset" in sd_arg_arr == true ) {
		_offset += Number(sd_arg_arr['offset']);
		//console.log('offset in sd_arg_arr ' + _offset);
	} 	
	//console.log(_offset);
	
	if ( "duration" in sd_arg_arr == true ) {
		_duration = sd_arg_arr['duration'];
		//console.log('offset in sd_arg_arr ' + _offset);
	} 

	if ( "delay" in sd_arg_arr == true ) {
		_delay = sd_arg_arr['delay'];
		//console.log('offset in sd_arg_arr ' + _offset);
	} 	
	

	if ( "scroll_position" in sd_arg_arr == true ) {
		
		// if this is not a number
		if ( isNaN(sd_arg_arr['scroll_position']) ) {
			
	
			if ( _scroll_container != "html, body" ) {
				
				if ( $( _scroll_container ).css("position") === "static" ) {
					$( _scroll_container ).addClass("position-relative");
				}				
				
				//console.log("scroll container Y-POSITION: " + $( _scroll_container ).offset().top);
				//console.log("scroll container SCROLL-TOP: " + $( _scroll_container ).scrollTop());
				//console.log("item OFFSET-TOP: " + $( sd_arg_arr['scroll_position'] ).offset().top);
				
				_scroll_position = ( $( _scroll_container ).scrollTop() + $( sd_arg_arr['scroll_position'] ).offset().top ) - $( _scroll_container ).offset().top;				
				
			}
			// is a jquery object string
			else {
				
				_scroll_position = $( sd_arg_arr['scroll_position'] ).offset().top - $( _scroll_container ).offset().top;
				//console.log("string is body " + _scroll_position);	
			}

			

		}
		else {
			_scroll_position = sd_arg_arr['scroll_position'];
			//console.log("number " + _scroll_position);	
		}
	}

	var _scroll_top_position = _scroll_position - _offset;

	// use tween max
	//console.log("not in sd_js_vars");
	gsap.to($( _scroll_container ), { duration:_duration, scrollTop:_scroll_top_position, ease:"power1.inOut", delay:_delay });
	
	
}


// fullscreen functions
function sd_fullscreen_OPEN(jquery_object) {
	
	if (jquery_object) {
		// the [0] makes this jquery object into a js object
		elem = jquery_object[0];
		//console.log("fullscreen object");
	}
	else {
		//elem = document;
		elem = jQuery("html")[0];
		//console.log("fullscreen document");
	}
	
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) { // Firefox
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { // IE/Edge
		elem.msRequestFullscreen();
	}
}

function sd_fullscreen_CLOSE() {
	
	var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
			(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
			(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
			(document.msFullscreenElement && document.msFullscreenElement !== null);	
	if (isInFullScreen) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) { // Firefox
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) { // IE/Edge
			document.msExitFullscreen();
		}
	}
	
}
// end of - fullscreen functions

/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
( function() {
	var isIe = /(trident|msie)/i.test( navigator.userAgent );

	if ( isIe && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
} )();