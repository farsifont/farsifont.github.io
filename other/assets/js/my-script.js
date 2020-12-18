var mweb_instagram_popup;
var mweb_sidebar_sticky_enable;
var mweb_popup_pic;
var mweb_popup_day;
var mweb_popup_link;
var mweb_header_sticky;

(function($) {
    "use strict";

	
	var mwebThemePopup = {
		init: function( $photo , $link ) {
			
			var self = this;
			
			if(!self.readCookie('run_popup')){
				
			$.magnificPopup.open({
			 
			  mainClass: 'mweb-popup',
			  tLoading: '',
			  tClose: 'دیگر نمایش نده',
			  items: { src: $('<div class="white-popup"><a href="'+$link+'"><img src="'+$photo+'" /></a></div>') },
			  type: 'inline'
			}, 0);
				
			}
		},
		
		createCookie: function ($name,$value,$days) {
			if ($days) {
				var date = new Date();
				date.setTime(date.getTime()+($days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
		   else var expires = "";
		   document.cookie = $name+"="+$value+expires+"; path=/";
		},

		readCookie: function($name) {
			var nameEQ = $name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
			   if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);

			}
			return null;
		}
	}
	
	

	
	
	
	 function init_carousel() {
        $('.mw-owl-carousel').each(function() {
            var config = $(this).data();
            config.navText = ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'];
            var animateOut = $(this).data('animateout');
            var animateIn = $(this).data('animatein');

            if (typeof animateOut != 'undefined') {
                config.animateOut = animateOut;
            }
            if (typeof animateIn != 'undefined') {
                config.animateIn = animateIn;
            }
			
            var owl = $(this);
            owl.owlCarousel(config);
            $(this).find('.owl-item').removeClass('last-item');
            $(this).find('.owl-item.active').last().addClass('last-item');

            var t = $(this);
            owl.on('changed.owl.carousel', function(event) {
                var item = event.item.index;
                t.find('.owl-item').removeClass('last-item');
                setTimeout(function() {
                    t.find('.owl-item.active').last().addClass('last-item');
                }, 100);

            });
            if (config.nav == true) {
                var k = $(this);
                var ts = k.parents('.mweb-block-wrap').find('.block-title');
                //var ts = k.prev('.block-title');

                if (ts.length) {
                    ts.append('<div class="owl-nav"><div class="owl-prev"><i class="fal fa-angle-left"></i></div><div class="owl-next"><i class="fal fa-angle-right"></i></div></div>');
                    var owlurun = $(this);
                    // owlurun.owlCarousel();
                    ts.find('.owl-prev').click(function() {
                        owlurun.trigger('next.owl.carousel');
                    });
                    ts.find('.owl-next').click(function() {
                        owlurun.trigger('prev.owl.carousel');
                    });
                }
            }

        });
		
		
		
		var customer_slider = $('.mw-customer-carousel');
		customer_slider.owlCarousel({
			items: 1,
			loop: true,
			rtl:true ,
			autoplay: true,
			dots: false,
		});
		$('#customer_slider_prev').click(function() {
			customer_slider.trigger('next.owl.carousel');
		});
		$('#customer_slider_next').click(function() {
			customer_slider.trigger('prev.owl.carousel');
		});
		
		
		var partner_slider = $('.owl_brand');
		partner_slider.owlCarousel({
			items: 8,
			loop: true,
			rtl:true ,
			autoplay: true,
			dots: false,
			margin:10,
			navText : ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
			responsiveClass:true,
			responsive:{
				0:{
					items:3,
				},
				600:{
					items:4,
				},
				1000:{
					items:9,
					nav:true,
				}
			}
		});
		$('#down_slider_prev').click(function() {
			partner_slider.trigger('next.owl.carousel');
		});
		$('#down_slider_next').click(function() {
			partner_slider.trigger('prev.owl.carousel');
		});
		
		
		
		
		
    }



    function init_slickslider() {
        $('.slick_slider_wrap').each(function() {
			$(this).slick({
		
				autoplay: true,
				dots: true,
				infinite: true,
				rtl: true,
				slidesToShow: 1,
   			    slidesToScroll: 1,
				customPaging : function(slider, i) {
					var title = slider.$slides.eq(i).find('a').attr('data-title');
					return '<a class="product_banner_title">'+title+'</a>';
				}

			});
        })
		
    }
	
	
	
	function initslider_realtime() {
		$(".owl-realtime").owlCarousel({
			items: 1,
			loop: true,
			rtl:true ,
			autoplay: true,
			dots: false,
			onInitialized: startProgressBar,
			onTranslate: resetProgressBar,
			onTranslated: startProgressBar
		});
	}

	function startProgressBar() {
		$(".slide-progress").css({
			width: "100%",
			transition: "width 5000ms"
		});
	}

	function resetProgressBar() {
		$(".slide-progress").css({
			width: 0,
			transition: "width 0s"
		});
	}
	

	function instagram_popup_widget() {

		if (1 == mweb_instagram_popup) {
				$('.instagram-el').find('a').magnificPopup({
					type: 'image',
					closeOnContentClick: true,
					closeBtnInside: true,
					removalDelay: 500,
					mainClass: 'mfp-fade',
					zoom: {
						enabled: true,
						duration: 500, // duration of the effect, in milliseconds
						easing: 'ease', // CSS transition easing function
						opener: function (element) {
							return element.find('img');
						}
					},
					gallery: {
						enabled: true,
						navigateByImgClick: true,
						preload: [0, 1]
					}
				});
		}
	}
	
	
	
	function countDownInit(){
		if($('.product-date').length >0){
			$('.product-date').each(function(i,item){
			  var date = $(item).attr('data-date');
			  $(item).countdown(date).on('update.countdown', function(event) {
				  var $this = $(this).html(event.strftime(''
					+ '<div class="day"><span class="no">%D</span><span class="text">روز</span></div>'
					+ '<div class="hours"><span class="no">%H</span><span class="text">ساعت</span></div>'
					+ '<div class="min"><span class="no">%M</span><span class="text">دقیقه</span></div>'
					+ '<div class="second"><span class="no">%S</span><span class="text">ثانیه</span></div>'));
				}).on('finish.countdown', function(event) {
				  $(this).html('تمام شد')
					.parent().addClass('disabled');

				});
				
			});
		} 
	}
	
	
	
	function init_review_rate(){
		
		var rate_btn = $('.average_rate');
		if(rate_btn.length > 0 ){
			
			rate_btn.click(function(e){
				e.preventDefault();
				$('.advanced-review').toggleClass('active');
			});
		}
	} 
	
	
	
	
	var mwebvariationForm = {
        init: function() {
	        if ( !$('form.variations_form').length ) {
	            return;
	        }else{
				// do it
	        }
        },
        reDesignVariationForm: function( $wrap ) {
        	if ( typeof $wrap == 'undefined') var $wrap = '';
        	if ( $wrap != '' ) {
	    		$wrap = $wrap+' .type-product.product-type-variable';
	    	}else{
	    		$wrap = '.type-product.product-type-variable';
	    	}
			if ( $($wrap).length  && typeof mw_arr_attr !== 'undefined' ) { 
				$($wrap).find('.variations select').each(function(){
					var select = $(this), select_div, var_attr = mw_arr_attr[select.attr('name')];
					if ( typeof var_attr == 'undefined') { return false; } 
					
					if (var_attr.type == 'select') { 
						select.niceSelect();
					} 
					

					
					select_div = $('<div />', {
				                	'class': 'sellect-wrap'
				            	}).insertAfter(select);
					select.hide();

					select.find( 'option' ).each(function (){
						var option_old = $(this), option;
						if ( option_old.attr('value')!='' ) {
							var inner_opt, class_sellect, val_opt = var_attr.key_val[option_old.attr('value')];
							if (var_attr.type == 'color') {
								inner_opt = $('<span/>', {
												'html': option_old.text()
											});
								var outer_opt = $('<i/>', {
												'style':'background:' + val_opt,
											}).appendTo(inner_opt);
								class_sellect = ' color';
							}else if (var_attr.type == 'image') {
								inner_opt = $('<span/>', {
												'style':'background-image:url("' + val_opt + '")'
											});
								class_sellect = ' image';
							}else if (var_attr.type == 'text') {
								inner_opt = $('<span/>', {
												'html': val_opt
											});
								class_sellect = ' text';
							}
							
							if (var_attr.type != 'select') { 
								option = $('<div/>', {
											'class': 'option'+class_sellect,
											'data-toggle':'tooltip',
											'data-original-title':option_old.text(),
											'data-value': option_old.attr('value')
										}).appendTo(select_div);
								inner_opt.appendTo(option);
								if ( option_old.val() == select.val() ){
									option.addClass('selected');
								}
								
								option.on('click', function () {
									// Update variation values
									if ( $(this).hasClass('selected') ) {
										select.val('').change();
									} else {
										select.val( option_old.val() ).change();
									}
									mwebvariationForm.setSelectedOpt( $(this) );
								});
							}
						}
					});
					
				});
				$( document ).on( 'click', '.variations_form .reset_variations', function(event) {
					$('.variations_form .sellect-wrap .option').removeClass('selected');
				});
			}
		},
		setSelectedOpt: function( option ) {
	        option.toggleClass('selected');
	        option.siblings().removeClass('selected');
	    },
    }
	
	
	function initslider_realtime() {
		$(".owl-realtime").owlCarousel({
			items: 1,
			loop: true,
			rtl:true ,
			autoplay: true,
			dots: false,
			onInitialized: startProgressBar,
			onTranslate: resetProgressBar,
			onTranslated: startProgressBar
		});
	}

	function startProgressBar() {
		$(".slide-progress").css({
			width: "100%",
			transition: "width 5000ms"
		});
	}

	function resetProgressBar() {
	    $(".slide-progress").css({
			width: 0,
			transition: "width 0s"
	    });
	}
			
	NProgress.start();
	$(window).load(function() {
		if(mweb_popup_pic){
			mwebThemePopup.init(mweb_popup_pic,mweb_popup_link);
			mwebThemePopup.createCookie('run_popup',true,mweb_popup_day);
		}
		if(!mwebThemePopup.readCookie('haed_alert')){
			$('.header_alert').show();
		}
		NProgress.done();
		NProgress.remove();
		
	}); 
	 
	
	

    $(document).ready(function($) {
        'use strict';
		
		
  
		if (typeof pr_thumbnails !== 'undefined'){
			$('.count_image').off('click').on('click', function(e) {
				e.preventDefault();
				$.magnificPopup.open({items: pr_thumbnails , gallery: { enabled: true}, type: 'image'});
			});
		}
	
		var embed_video_btn = $('.embed_video');
		var direct_video_btn = $('.direct_video');
		embed_video_btn.magnificPopup({ type: 'iframe',	mainClass: 'mfp-fade',  removalDelay: 160,	preloader: false,	fixedContentPos: false	});
		direct_video_btn.magnificPopup({ type: 'inline',	mainClass: 'popup_inline',  removalDelay: 160,	preloader: false,	fixedContentPos: false, callbacks: { close: function(){ var vid = document.getElementById("html_video"); vid.pause(); } } });
		
		
		$('#popup-video .mfp-close').on('click',function(){
			$('#popup-video video').pause();
			console.log('sss');
		});
		
		$('.woocommerce-product-gallery__image a').magnificPopup({
			type:'image',
			removalDelay: 500,
			zoom: {
				enabled: true,
				duration: 500,
				easing: 'ease', 
				opener: function (element) {
					return element.find('img');
				}
			}
		});

		
		$.extend(true, $.magnificPopup.defaults, {
			tClose: 'بستن', // Alt text on close button
			tLoading: 'بارگزاری ...', // Text that is displayed during loading. Can contain %curr% and %total% keys
			gallery: {
				tPrev: 'قبل', // Alt text on left arrow
				tNext: 'بعد', // Alt text on right arrow
				tCounter: '%curr% از %total%' // Markup for "1 of 7" counter
			},
			image: {
				tError: '<a href="%url%">عکس</a> نمی تواند بارگذاری شود.' // Error message when image could not be loaded
			},
			ajax: {
				tError: '<a href="%url%">محتوا</a> نمی تواند بارگذاری شود.' // Error message when ajax request failed
			}
		});

	
	 
	

		init_carousel();
		init_slickslider();
		instagram_popup_widget();
		initslider_realtime();
		
		if ( $('.counter').length > 0 ){
			$('.counter').counterUp({
				delay: 10,
				time: 1000
			});
		}
		

		if ( 1 == mweb_sidebar_sticky_enable ){
			$('.sidebar-wrap').each(function () {
				var mweb_sidebar_el = $(this);
				mweb_sidebar_el.theiaStickySidebar({
				  additionalMarginTop: 0
				 });
			});
			 
		}
		
		


		var mweb_body = $('body');
		var mweb_off_canvas_button = $('#mweb-trigger');
		var mweb_off_canvas_button_close = $('#mweb-close-off-canvas');
		var mweb_mask = $('.mweb-site-mask');

		mweb_off_canvas_button.click(function() {
			mweb_body.toggleClass('mobile-js-menu');
			return false;
		});

		mweb_off_canvas_button_close.click(function() {
			mweb_body.removeClass('mobile-js-menu');
			return false;
		});

		mweb_mask.click(function() {
			mweb_body.removeClass('mobile-js-menu');
			return false;
		});


		var mobile_menu = $('.mobile-menu-wrap');
		var sub_mobile_menu = mobile_menu.find('li.menu-item-has-children');
		var sub_mobile_a = mobile_menu.find('li.menu-item-has-children > a');

		sub_mobile_a.append('<i class="explain-menu fal fa-angle-left"></i>');

		$('.explain-menu').unbind('click').bind('touchend click', function(e) {
			e.preventDefault();
			$(this).parent('a').toggleClass('active').siblings('ul').slideToggle(500);
		});

		sub_mobile_menu.find('a').click(function(event) {
			event.stopPropagation();
		});

		mobile_menu.click(function(event) {
			event.stopPropagation();
		});



		$('.gototop').click(function(){
			$('html,body').animate({scrollTop:0},'slow');return false;
		});	
		
		
		if ( $('#nav_select').length > 0 ){
			$('#nav_select').tinyNav({
				active: 'selected',
				header: 'فهرست', 
				indent: '-'
				});
		}
		if ( $('#accordionfaq').length > 0 ){
			$("#accordionfaq").smoothAccordion();
		}
		if ( $('.accordion-shortcode').length > 0 ){
			$(".accordion-shortcode").smoothAccordion();
		}

			
		
		countDownInit();
		
		init_review_rate();
		
		$('.progress .progress-bar').progressbar();

		mwebvariationForm.reDesignVariationForm();
		
		
		
		
	
		if ( $('.shortcode_section').length > 0 ){
			var box_wrap = $('<div/>', {
				'class': 'story_wrap',
				'html': '<i id="story-icon" class="fal fa-list"></i>'
			}).appendTo('.single_product_moredetail');
			
			var box_list = $('<ul/>', {
			}).appendTo(box_wrap);
			
			$('.shortcode_section').each(function (){
				
				var data_id = $(this).attr('id');
				var data_title = $(this).attr('data-title');

				var e_li = $('<li/>', {
					'html': '<a href="#' + data_id + '">' + data_title + '</a>'
				}).appendTo(box_list); 
				

			});
			jQuery(box_wrap).theiaStickySidebar({
			  additionalMarginTop: 30
			});
		}
	
	
		$('.story_wrap a').on('click', function(event){     
			event.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
			return false
		});
		
		
		$('.preview_audio').click(function(e) {
			e.preventDefault();
			$(this).toggleClass('active');
			if(!$(this).hasClass('active')){
				var aud = document.getElementById("html_audio"); aud.pause();
			}
		});
		
		$('.or_view').click(function(e) {
			e.preventDefault();
			$(this).parents('.morder_item').next().slideToggle();
		});
		
		
		
		$('.create_account').click(function() {
			$('.login_form').hide('fast');
			$('.register_form').fadeIn();
			return false;
		});
		$('.close_modal').click(function() {
			$('.register_form').hide('fast');
			$('.login_form').fadeIn();
			return false;
		});
		
		if ( $('.quick_access').length > 0 ){
			$('.quick_access').click(function() {
				var pwrap = $(this).parent();
				
				pwrap.toggleClass('active');
				$(this).toggleClass('open');

				var quick_access_menu = pwrap.find('li.menu-item-has-children');
				var quick_access_menu_a = pwrap.find('li.menu-item-has-children > a');

				quick_access_menu_a.append('<i class="explain-menu fal fa-angle-left"></i>');

				$('.explain-menu').unbind('click').bind('touchend click', function(e) {
					e.preventDefault();
					$(this).parent('a').toggleClass('active').siblings('ul').slideToggle(500);
				});
			});
		}
		
		$('.vendor_info').hover(function() {			
			$('.toggle_vendor_info').toggleClass('active');
		});
		
		$('.single_product_loadmore span').on('click', function(e){     
			e.preventDefault();
			$(this).closest('div').hide();
			$('.entry_product').height('auto');
			$('.single_product_moredetail_body').height('auto');
			
		});
		
		
		$('.notify_item .el_more').click(function(e) {
			e.preventDefault();
			$(this).parents('.meta_notify').next().slideToggle();
		});
		
		
	
		if($('#video_plyr').length > 0){
			const player = new Plyr('#video_plyr',{
				controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'pip', 'airplay', 'fullscreen'],
				tooltips: { controls: false, seek: true }	
			});
		}
		
		
		
		$('.woocommerce-MyAccount-navigation ul').slick({
			infinite: false,
			slidesToShow: 9,
			slidesToScroll: 1,
			variableWidth: true,
			rtl:true,
			prevArrow: '<i class="el_myacc_nav fal fa-angle-right"></i>',
			nextArrow: '<i class="el_myacc_nav fal fa-angle-left"></i>',
			responsive: [
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 3
				  }
				},
				{
				  breakpoint: 480,
				  settings: {
					arrows: false,
					slidesToShow: 2
				  }
				}
			]
		});
		

		

		// Accordion for category
		$('.product-categories').mwAccordion({
			btn_open: '<span class="ac-tongle open"></span>',
			btn_close: '<span class="ac-tongle close"></span>',
		}); 
		
		
		$('.nav-tabs_trigger').click(function (e) {
			e.preventDefault();
			$(this).next('.nav-tabs').slideToggle(300);
		}); 
		
		$('.menu_title').click(function (e) {
			e.preventDefault();
			$(this).parent().toggleClass( "active" );
			$('.head_3_menu').slideToggle(300);
		}); 
		
		
		$('.m_search').click(function(e){
			e.preventDefault(); 
			var m_search = $(this).find('i'); 
			$('.m_search_wrap').toggleClass('active', function() {
			  if ( $( this ).is( ".active" ) ) {
				m_search.removeClass('fa-search').addClass('fa-times');
			  } else {
				m_search.removeClass('fa-times').addClass('fa-search');
			  }
			});
		});
		
		if(mweb_header_sticky){
			var offset_top = $('.main_header').height();
			$(window).scroll(function(event){
				var currentScroll = $(this).scrollTop();
				if (currentScroll > offset_top ){
					$('.menu_wrapper').addClass('my_sticky');
				} else {
					$('.menu_wrapper').removeClass('my_sticky');
				}
			});
		}
		
		if($('body').hasClass('single-product')){
			var leftbox_sticky = $('.left_product_detail .sidebar-inner').offset();
			//console.log($(window).width());
			if($(window).width() > 1000 && $('.left_prd_detail').length > 0){
				$(window).scroll(function(event){
					var leftbox_current = $(this).scrollTop();
					if (leftbox_current > leftbox_sticky.top + $('.left_product_detail .sidebar-inner').height()){
						if(mweb_header_sticky){
							$('.left_prd_detail').addClass('left_sticky').css('top', 65);
						}else{
							$('.left_prd_detail').addClass('left_sticky');
						}
						
					} else {
						$('.left_prd_detail').removeClass('left_sticky').css('top',0);
					}
				});
			}
		
			var add_tocart_top = $('.single_product_moredetail').offset().top - ($('.primary_block').height() / 1.5);
			var add_tc = $('.vr_desktop');
			var add_tc_m = $('.vr_mobile');
			var content_el = $('#content').height() - $('.primary_block').height() - 100;
			$(window).scroll(function(event){
				var scl_top = $(this).scrollTop();
				if (scl_top > add_tocart_top && scl_top < content_el) { 
					add_tc.addClass('fixed');
				}else {
					add_tc.removeClass('fixed'); 
				}
				if (scl_top > add_tocart_top) { 
					add_tc_m.addClass('fixed');
				}else {
					add_tc_m.removeClass('fixed'); 
				}
			});
		
		}
		
		
		$('.loadmore').click(function(e){
			e.preventDefault(); 
			$('.term-description').toggleClass('desc_slow', function() {
			  if ( $( this ).is( ".desc_slow" ) ) {
				$('.loadmore').text('کمینه کردن اطلاعات ...');
			  } else {
				$('.loadmore').text('اطلاعات بیشتر ...');
			  }
			});
		});
		
		
		$('.close_alert').click(function(e){
			e.preventDefault();
			$('.header_alert').hide('fast');
			mwebThemePopup.createCookie('haed_alert',true,1);
		});
		
		/*$('.must-log-in a , .login_wrap_io i').click(function () {
			$('html,body').animate({scrollTop:0},'slow');
			$('.login_wrap_io').toggleClass('active');
			$('.mweb-site-mask').removeClass('active');
		}); */
		
		$('span.login_user_btn , .comment_login ,.must-log-in a').click(function () {
			$('html,body').animate({scrollTop:0},'slow');
			$('.account_action').toggleClass('active');
			$('.mweb-site-mask').toggleClass('active');
		}); 
		$('.mweb-site-mask').click(function() {
			$('.account_action').removeClass('active');
			$('.mweb-site-mask').removeClass('active');
		});
		
	
		$('.recommended_warp select').niceSelect();


		var box_mail_wrap = $('.single_share_wrap');


		box_mail_wrap.find('a.first_el').click(function() {
			var share_post_id = $(this).attr('data_post_id');

			var box_popup = $(this).next('.share-to-email-popup');
			if (box_popup.is(':visible')) {
				box_popup.fadeOut( "slow" );
				box_popup.find('.errors').hide().removeClass('error');
				box_popup.find('.share-errors').removeClass('show-error');
			} else {
				box_popup.fadeIn( "slow" );
				var h_el = box_popup.height() - 15 ;
				box_popup.animate({top: '-'+h_el+'px'}, 'slow');
				box_popup.find('input[type=submit]').removeAttr('disabled');
			}

			box_popup.find('.share-mail-cancel').unbind('click').click(function() {
				box_popup.fadeOut( "slow" );
				box_popup.find('.errors').hide().removeClass('error');
				box_popup.find('.share-errors').removeClass('show-error');
				return false;
			});

			box_popup.find('input[type=submit]').unbind('click').click(function() {
				//    $(this).attr('disabled', 'disabled');

				box_popup.find('.error').removeClass('error');
				box_popup.find('.share-errors').removeClass('show-error');

				var source_email = box_popup.find('input[name=source-email]');
				var target_email = box_popup.find('input[name=target-email]');
				var name = box_popup.find('input[name=source-name]');

				if (mweb_is_email(source_email) == false) {
					source_email.addClass('error');
					box_popup.find('.share-errors').addClass('show-error');
				}

				if (mweb_is_email(target_email) == false) {
					target_email.addClass('error');
					box_popup.find('.share-errors').addClass('show-error');
				}

				if (box_popup.find('.error').length == 0) {
					box_popup.find('.share-loading').css('display', 'block');
					// AJAX send the form
					$.ajax({
						url: mweb_ajax_url,
						type: 'POST',
						data: {
							action: 'mweb_ajax_email',
							share_post_id: share_post_id,
							source_email: source_email.val(),
							target_email: target_email.val(),
							name: name.val()
						},
						success: function(data) {
							data = jQuery.parseJSON(data);

							if (data) {
								box_popup.html(data);
							}
							$('.share-mail-close').click(function() {
								box_popup.fadeOut( "slow" );
								return false;
							})
						}
					});
				}
				return false;
			});

			return false;
		});
		
		
		
		
		
		$('.compare-button .compare , .type-product .summary .compare, .yith-wcwl-add-button .add_to_wishlist, .yith-wcwl-wishlistaddedbrowse a, .yith-wcwl-wishlistexistsbrowse a').each(function(){
			$(this).attr('data-toggle', 'tooltip').attr('data-original-title', $(this).text().trim());
		});

		

		$("body *[data-toggle='tooltip']").each(function(){
			$(this).tooltip();
		});
		
		
		$( document ).on ( 'wc_cart_button_updated', function( event, button ) {
			//$( button ).siblings( '.added_to_cart' ).tooltip();
			$( button ).parents( '.add-to-cart-wrap' ).addClass( 'added' ).attr('data-original-title', $( button ).siblings( '.added_to_cart' ).text().trim());
		} );
	
		$('.item_magnifier').magnifier();
		$('.graphic_magnifier').magnifier({
			el_height : 130
		});
		
		
		$('.res_inline_graphics').each(function(){
			$(this).justifiedGallery({
				rowHeight : 150,
				lastRow : 'nojustify',
				rtl	: true,
				captions : false,
				margins : 5
			});
		});
		
	

    });
	
	$(document).ajaxComplete(function(){
		// Wishlist & compare
		$('.compare-button a ,.type-product .summary .compare, .yith-wcwl-add-to-wishlist .add_to_wishlist, .yith-wcwl-wishlistaddedbrowse a, .yith-wcwl-wishlistexistsbrowse a').each(function(){
			$(this).attr('data-toggle', 'tooltip').attr('data-original-title', $(this).text().trim());
		});
		
		// Compare
		$('.woocommerce .compare.button').each(function(){
			if( $(this).text().trim() != '') $(this).attr('data-original-title', $(this).text().trim());
		});
				
		$("body *[data-toggle='tooltip']").each(function(){
			$(this).tooltip();
		});
		
		$('.item_magnifier').magnifier();
	
		
	});
	
	
	$.fn.magnifier = function( options ) {
		var settings = $.extend({
            el_height         : 80,
        }, options);
		var el = $(this);
		var mouseX = 0;
        var mouseY = 0;
        el.on('mousemove', function(event) {
			//event.preventDefault();
			//console.log(settings.el_height);
			event.preventDefault();
			event.stopPropagation();
            var windowTop = $(window).scrollTop();
            mouseX = event.pageX;
            mouseY = event.pageY - windowTop;
            var thisEl = $(this),
                cover = $('#magnifier_wrap'),
                thumbWidth = $(this).width(),
                thumbHeight = $(this).height(),
                coverWidth = cover.outerWidth(),
                coverHeight = cover.height() + 20,
                thisTop = thisEl.offset().top,
                thisLeft = thisEl.offset().left,
                topBreak = (thisTop + settings.el_height) - coverHeight,
				el_data = thisEl.data();
                cover.find('.size-limiter').html('<img src="'+el_data.image+'" />');
					cover.find('strong').html(el_data.title);
					cover.find('.author').html(el_data.author);
					cover.find('.cost').html(el_data.price);
					cover.find('.category').html(el_data.category);
            if (topBreak < windowTop) {
                var diff = windowTop - topBreak;
                if (thisLeft > coverWidth) {
                    cover.show().css({
                        left: thisLeft,
                        top: (thisTop - windowTop) + thumbHeight + diff
                    });
                } else {
                    cover.show().css({
                        left: (thisLeft + coverWidth) + thumbWidth,
                        top: (thisTop - windowTop) + thumbHeight + diff
                    });
                }
            } else {
                if (thisLeft > coverWidth) {
                    cover.show().css({
                        left: thisLeft,
                        top: (thisTop - windowTop) + thumbHeight
                    });
                } else {

                    cover.show().css({
                        left: (thisLeft + coverWidth) + thumbWidth,
                        top: (thisTop - windowTop) + thumbHeight
                    });
                }
            }
        });
		el.on('mouseleave', function(event) {
			var mouseX = 0;
			var mouseY = 0;
			var cover = $('#magnifier_wrap');
			cover.hide().css({
				left: mouseX,
				top: mouseY
			});
		})

    }

	$.fn.mwAccordion = function(options) {
		var $el    = $(this);
		var defaults = {
			active: 'open',
			active_default: 'nav-2',
			el_wrap: 'li',
			el_content: 'ul',
			accordion: true,
			expand: true,
			btn_open: '<i class="fal fa-plus-square"></i>',
			btn_close: '<i class="fal fa-minus-square"></i>'
		};
		var options = $.extend({}, defaults, options);
		
		
		$(document).ready(function() {
			$el.find(options.el_wrap).each(function(){
				$(this).find('> a, > span, > h4').wrap('<div class="accr_header"></div>');
				if(($(this).find(options.el_content)).length){
					$(this).find('> .accr_header').append('<span class="btn_accor">' + options.btn_open + '</span>');
					$(this).find('> '+options.el_content+':not(".accr_header")').wrap('<div class="accr_content"></div>');
				}
			});
			if(options.accordion){
				$('.accr_content').hide();
				$el.find(options.el_wrap).each(function(){
					if(options.active_default!==''){
						if( $(this).hasClass(options.active_default) ){
							$(this).addClass(options.active);
						}
					}
					if($(this).hasClass(options.active)) {
						$(this).find('> .accr_content')
							   .addClass(options.active)
							   .slideDown();
						$(this).find('> .accr_header')
							   .addClass(options.active);
					}
				});
			} else {
				$el.find(options.el_wrap).each(function(){
					if(!options.expand){
						$('.accr_content').hide();
					} else {
						$(this).find('> .accr_content').addClass(options.active);
						$(this).find('> .accr_header').addClass(options.active);
						$(this).find('> .accr_header .btn_accor').html(options.btn_close);
					}
				});
			}

	    });
	    $(window).load(function() {
			$el.find(options.el_wrap).each(function(){
				var $wrap = $(this);
				var $accrhead = $wrap.find('> .accr_header');
				var btn_accor = '.btn_accor';
				
				$accrhead.find(btn_accor).on('click', function(event) {
					event.preventDefault();
					var obj = $(this);
					var slide = true;
					if($accrhead.hasClass(options.active)) {
						slide = false;
					}
					if(options.accordion){
						$wrap.siblings(options.el_wrap).find('> .accr_content').slideUp().removeClass(options.active);
						$wrap.siblings(options.el_wrap).find('> .accr_header').removeClass(options.active);
						$wrap.siblings(options.el_wrap).find('> .accr_header ' + btn_accor).html(options.btn_open);
					}
					if(slide) {
						$accrhead.addClass(options.active);
						obj.html(options.btn_close);
						$accrhead.siblings('.accr_content').addClass(options.active).stop(true, true).slideDown();
					} else {
						$accrhead.removeClass(options.active);
						obj.html(options.btn_open);
						$accrhead.siblings('.accr_content').removeClass(options.active).stop(true, true).slideUp();
					}
					return false;
				});
			});
		});
	};	
		
	
		

})(jQuery);

