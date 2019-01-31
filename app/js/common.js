$(function() {


	$(".burger").click(function(){
		$(this).toggleClass("active");
		$("nav").toggleClass("active");
	});
	$("nav a").click(function(){
		$(".burger").toggleClass("active");
		$("nav").toggleClass("active");
	});

	$(".scroll").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 680);
	});
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	$(window).resize(function(){
		windowWidth = $(window).width();
		windowHeight = $(window).height();
	});


	tabsTransform();
	function tabsTransform() {
		if(windowWidth<768){
			$(".technology-nav-item.active-tech").after('<li class="dynamic-li visible-xs"><div>' + $(".technology .tab-pane.active").html() + '</div></li>')
			$(".technology-nav-item").click(function(){
				if($(this).hasClass("active-tech")){
					$(".technology-nav-item").removeClass("active-tech");
					$(".dynamic-li").remove();
				}else{
					$(".technology-nav-item").removeClass("active-tech");
					$(".dynamic-li").remove();
					var html = $($(this).children("a").attr("href")).html();
					html = '<li class="dynamic-li visible-xs"><div>' + html + '</div></li>';
					$(this).after(html);
					$(this).addClass("active-tech");
				}
			});
		}else{
			$(".tab-item").addClass("tab-pane fade")
			$(".dynamic-li").remove();
		}
	}

	$("form input, form textarea").focusin(function(){
		var name = $(this).attr("name");
		$(this).addClass("active")
		$('[for="'+ name +'"]').addClass("active");
	});
	$("form input, form textarea").focusout(function(){
		var name = $(this).attr("name");
		if($(this).val()==""){
			$(this).removeClass("active")
			$('[for="'+ name +'"]').removeClass("active");
		}
	});

	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		asNavFor: '.slider-nav',
		autoplay: true,
		dots: true,
		centerMode: false
	});
	$('.slider-nav').slick({
		slidesToShow: 3,	
		slidesToScroll: 3,
		infinite: false,
		asNavFor: '.slider-for',
		centerMode: false,
		focusOnSelect: true
	});

	$("#form").submit(function () {
		var formID = $(this).attr('id');
		var formNm = $('#' + formID);
		$.ajax({
			type: "POST",
			url: 'send.php',
			data: formNm.serialize(),
			success: function (data) {
				$(".success span").html(data);
				$(".success").addClass("active");
				setTimeout(function() {
					$(".success span").html("");
					$(".success").removeClass("active");
					$("#form input, #form textarea").val("");	
				},4000);

			},
			error: function (jqXHR, text, error) {
				$(".success span").html(error);
				$(".success").addClass("active");
				setTimeout(function() {
					$(".success span").html("");
					$(".success").removeClass("active");
					$("#form input, #form textarea").val("");	
				},4000);
			}
		});
		return false;
	});
	var isHeaderScrolled = false;
	var isPageUpScrolled = false;
	var scrollIDs = ["mission","service","technology","contacts"];
	var idAndOffset = {};
	for(var i = 0; i < scrollIDs.length; i++){
		idAndOffset[scrollIDs[i]] = $("#" + scrollIDs[i]).offset().top;
	}
	window.onscroll = function(event) {
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if(scrolled > 70 && !isHeaderScrolled){
			$("header").addClass("active");
			isHeaderScrolled = true;
		}else if(scrolled < 70 && isHeaderScrolled){
			$("header").removeClass("active");
			isHeaderScrolled = false;
		}
		if(scrolled > windowHeight && !isPageUpScrolled){
			$(".pageup").fadeIn(400);
			isPageUpScrolled = true;
		}else if(scrolled < windowHeight && isPageUpScrolled){
			$(".pageup").fadeOut(400);	
			isPageUpScrolled = false;
		}

		for(var i = 0; i < scrollIDs.length; i++) {
			if(scrolled > idAndOffset[scrollIDs[i]]-150){
				$('nav li').removeClass("active");
				$('nav li [href="#' + scrollIDs[i] + '"]').parent().addClass("active");
			}else{
				$('nav li [href="#' + scrollIDs[i] + '"]').parent().removeClass("active");	
			}	
		}
	}
});

