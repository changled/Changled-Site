function handleNav() {
   var $navbarSection = $(".navbar");
   var $navbarItems = $(".navbar a");
   var navbarHeight = $navbarItems.height();

   // console.log("navbar height: " + navbarHeight);

   $navbarSection.on("mouseover click", function() {
      $navbarItems.show();
      $navbarItems.css("height", navbarHeight * 2 + "px");
   });

   $navbarSection.on("mouseout", function () {
      $navbarItems.hide();
   });
}

function handleMobileNav() {
   var windowWidth = $(window).width();
   var $menuToggle = $(".menu-toggle");
   var headerHeight = $("header").outerHeight(true);
   var menuHeight = $menuToggle.outerHeight(true);
   var headerHeightWithMargin = headerHeight + 8;
   var menuToggleY = (headerHeight - menuHeight) / 2;
   
   $menuToggle.css("transform", "translateY(" + menuToggleY + "px)");
   $(".phone-nav").css("transform", "translateY(" + headerHeightWithMargin + "px)");

   $(".menu-toggle").click(function() {
      console.log("menu click!");
      $(".phone-nav").toggleClass("site-nav--open", 500);
      $(this).toggleClass("open");
   })
}

function resize_intro_text() {
   var window_height = $(window).height();
   $("intro_text").css("height", window_height + "px");
   // console.log("window_height: " + window_height);
}

handleMobileNav();
resize_intro_text();
