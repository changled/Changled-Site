var accessKeys = ["12345"];
var projects = [azrael, lodeals, tiledriver, minishell, detectivore, calculon, linearsim, fantasticalcin, martianpoker, lzw, mastermind, wordcount, rickoff, sirmixabot, lyfesaver];
var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 65, 66];


function handleIntro() {
   var $portrait = $("#self_portrait");
   var $bio = $("#intro_bio");
   var portraitHeight = $portrait.height();

   $("#self_portrait").hide().fadeIn(1500);

}

function swipeImage($elImage, buttonClass, project, imageSource, $projectdisplay, maxImageHeight, imgDescriptHeight) {
   var imageIndexStr = imageSource.match(/\d+/)[0];  // gets the number as a string from the URL (src)
   var imageIndex = parseInt(imageIndexStr);   // converts string to number
   var numImages = project.numimages;

   if (buttonClass === "leftbutton") {
      if (imageIndex <= 1) {
         imageIndex = numImages;
      }
      else {
         imageIndex --;
      }
   }
   else if (buttonClass === "rightbutton") {
      if (imageIndex >= numImages) {
         imageIndex = 1;
      }
      else {
         imageIndex++;
      }
   }
   else {
      console.log("ERROR-- Invalid image index: " + imageIndex);
      imageIndex = 1;
   }

   
   var newImageURL = imageSource.replace(imageIndexStr, imageIndex);
   var newImageDescription = project.imageDescriptions[imageIndex - 1];
   $elImage.attr("src", newImageURL);
   $projectdisplay.children("p").text(newImageDescription);
   console.log("new image description (" + imageIndex + "): " + newImageDescription);

   // resize project display
   $elImage.on('load', onLoad = function() {
      
      var newImageDescriptHeight = $projectdisplay.children("p").height();
      var imageHeight = $elImage.height();
      var displayHeight = imageHeight + parseInt(newImageDescriptHeight);
      $projectdisplay.css("height", displayHeight + "px");
   });
}

function getProjectFromId(id) {
   for (var i = 0; i < projects.length; i++) {
      if (projects[i].id == id) {
         return projects[i];
      }
   }

   console.log("ERROR (getProjectFromId): Project with id " + id + " not found");
}

// sets up the featured images for each project
function fillInProjectImages(project) {
   var htmlStr = "<div class= \"projectdisplay\">";

   htmlStr += "<button class=\"leftbutton\"><</button>";
   htmlStr += "<img src=\"images/" + project.id + "/img_1.png\"";
   htmlStr += "title=\"" + project.imageDescriptions[0] + "\" />";
   htmlStr += "<button class=\"rightbutton\">></button>";
   htmlStr += "<p>" + project.imageDescriptions[0] + "</p></div>";

   return htmlStr;
}

// sets up all projects with any featured images if any
function fillInProjects() {
   $(".project").each(function() {
      var id = this.id;
      var project = getProjectFromId(id);
      var htmlStr = "";
      var imagePath = "images/" + project.id + "/img_1.png";
      
      htmlStr += "<h3 class=\"projectname\">" + project.name + "</h3>";

      if (project.numimages > 0)
         htmlStr += fillInProjectImages(project);
      
      htmlStr += "<p>";
      htmlStr += "<b>Description</b>: " + project.description + "<br />";
      htmlStr += "Timeline: " + project.timeline;
      htmlStr += "</p>";

      if (id == "project_azrael") {
         htmlStr += "<p><a href=\"http://localhost:60470/\" target=\"_blank\">Try Azrael out for yourself!</a></p>"
      }

      $(this).html(htmlStr);
      // console.log($(this).html());
      
      if (project.numimages > 1) {
         var $projectdisplay = $(this).children(".projectdisplay");
         var $featuredImage = $projectdisplay.children("img");
         var elImage = $projectdisplay.children("img");
         var $buttons = $projectdisplay.children("button");
         var windowHeight = $(window).height();
         var maxImageHeight = windowHeight * 0.80;
         var imgDescriptHeight = $projectdisplay.children("p").height();
         var maxImageDisplayHeight = maxImageHeight + imgDescriptHeight;
         // console.log("window height: " + windowHeight + ", image description height: " + imgDescriptHeight);
         // console.log("max image height: " + maxImageHeight + ", max img display height: " + imgDescriptHeight);
         // fill in image buttons
         $buttons.each(function() {
            var className = $(this).attr("class");

            this.addEventListener("click", function() {
               var imageSource = $featuredImage.attr("src");
               swipeImage($featuredImage, className, project, imageSource, $projectdisplay, maxImageHeight, imgDescriptHeight);
               }, false);
         });

         $projectdisplay.css("max-height", maxImageDisplayHeight + "px");
         var displayHeight = $projectdisplay.height();
         $featuredImage.css("max-height", maxImageHeight + "px");
         
      }
   });
}

function headerAnimation() {
   var prevScroll = $(this).scrollTop();
   var windowHeight = $(window).height();
   var windowWidth = $(window).width();
   var titleToTop = $("#projects h2").offset().top;
   var $projectsTitle = $("#projects h2");
   var whereTitleMeetsWindow = titleToTop - windowHeight;
   var thisScroll, distanceToTop, distanceToTranslate;
   var animFlag = true;

   // start out off screen
   $projectsTitle.css("transform", "translateX(" + windowWidth + "px)");

   $(window).on("scroll", function() {
      thisScroll = $(this).scrollTop();
      distanceToTop = (thisScroll - whereTitleMeetsWindow) * 2;
      distanceToTranslate = (windowWidth - ((distanceToTop / windowHeight) * windowWidth));

      // scrolling up
      if (thisScroll < prevScroll) {
         $projectsTitle.css("transform", "translateX(0px)");

         if (animFlag == false && (thisScroll + windowHeight) <= titleToTop) {
            animFlag = true;
         }
      }
      // scrolling down
      else {
         if (animFlag == true && ((distanceToTop / 2) >= windowHeight)) {
            animFlag = false;
         }
      }

      if (animFlag == true && distanceToTranslate > 0) {
         $projectsTitle.css("transform", "translateX(" + distanceToTranslate + "px)");
      }
      else {
         $projectsTitle.css("transform", "translateX(0px)");
      }

      prevScroll = thisScroll;
   })
}

function handleSecretKey() {
   var correctKeyCount = 0;
   var keyLen = konamiCode.length;

   $(document).keydown(function(evnt) {
      // console.log("[" + correctKeyCount + "] you entered: " + evnt.keyCode);
      // console.log("konamiCode[0]: " + konamiCode[0]);

      if (konamiCode[correctKeyCount] == evnt.keyCode) {
         if (correctKeyCount < keyLen - 1) {
            console.log("WHOOHOO [" + correctKeyCount + "] you entered: " + evnt.keyCode);
            correctKeyCount += 1;
         }
         else {
            console.log("KONAMI CODE ENTERED -- DO SOMETHING");
            correctKeyCount = 0;
         }
      }
      else {
         correctKeyCount = 0;
      }

   });
}

// does parallax for my self portrait in the About Section
// sets parallax range to difference(logos below including padding, bottom of portrait)
function photoParallax() {
   var window_scroll, translate_y, next_top, image_bottom, initial_y_translate, max_y_translate;
   var $image = $("#self_portrait");

   window_height = $(window).height();
   next_top = parseInt($("#cp_logo").offset().top) - parseInt($("#education_icons").css("padding-top"));
   image_bottom = parseInt($image.height()) + parseInt($image.offset().top);
   max_y_translate = next_top - image_bottom;
   initial_y_translate = -max_y_translate;
   
   $image.css("transform", "translateY(" + initial_y_translate + "px)");

   $(window).scroll(function() {
      window_scroll = $(window).scrollTop();
      translate_y = initial_y_translate + (window_scroll * 0.2);

      if(translate_y <= max_y_translate && translate_y >= -max_y_translate) {
         $image.css("transform", "translateY(" + translate_y + "px)");
      }     
   });
}


//note: if anything goes wrong, first check that the section element and animation match up
function handleGeneralAnimation() {
   var window_scroll;
   var window_height = $(window).height();
   var intro_scroll = $("#intro_section").position().top;
   var contact_scroll = $("#contact_section").position().top;
   var $main_logo = $("#main_logo");

   var intro_reset_bool = false;
   var contact_reset_bool = true;

   var $intro_el_1 = $("#intro_section");
   var $intro_el_2 = $("#intro_section .first_text"); 
   var $contact_el_1 = $("#contact_section #contact_words");
   var $contact_el_2 = $("#contact_section .first_text_letter");
   var $contact_el_3 = $("#contact_section .tab");

   var $contact_tab = $("#contact_section .tab").hover(function() {
      $(this).children("div").children("address").css("visibility", "visible");
   }).mouseleave(function() {
      $(this).children("div").children("address").css("visibility", "hidden");
   });
   

   $(window).scroll(function() {
      window_scroll = $(window).scrollTop();

      // main logo
      if(window_scroll <= 200) {
         $main_logo.css("left", (240 - window_scroll) + "px");
      }
      else {
         $main_logo.css("left", "40px");
      }

      // intro section
      //   - start off with reset_bool as false in base case of starting
      //   - at scrollTop 0, which isn't covered in window.scroll
      if(window_scroll <= intro_scroll && intro_reset_bool === true) {
         intro_reset_bool = false;
         $intro_el_1.css("animation", "intro_transition 3s 1");
         $intro_el_2.css("animation", "intro_text 3s 1");
      }
      if(intro_reset_bool === false && window_scroll >= intro_scroll + window_height) {
         intro_reset_bool = true;
         $intro_el_1.css("animation", "none");
         $intro_el_2.css("animation", "none");
      }

      // contact section
      if(window_scroll >= contact_scroll && contact_reset_bool === true) {
         contact_reset_bool = false;
         $contact_el_1.css("animation", "contact_text_container 3s linear");
         $contact_el_2.css("animation", "contact_text 3s 1");
         $contact_el_3.css("animation", "contact_tabs 4s linear");
      }
      if(contact_reset_bool === false && window_scroll <= contact_scroll - window_height) {
         contact_reset_bool = true;
         $contact_el_1.css("animation", "none");
         $contact_el_2.css("animation", "none");
         $contact_el_3.css("animation", "none");
      }
   });
}


// MAIN
handleIntro();
// fillInProjects();
handleSecretKey();
headerAnimation();
photoParallax();
// handleTabAnim();
window.onload = function() {
   handleGeneralAnimation();
};

