/*
 * This is mostly taken from a tutorial from Marcin Dziewulski from tympanus.net/codrops
 *    link here: https://tympanus.net/codrops/2011/04/22/animated-skills-diagram/
 *    minor edits made by me for code readability
 * This JS file creates a diagram object using JavaScript library Raphael
 *    it uses a random value to create unique arcs for each tier of skill
 *    upon hovering over a particular arc, the center text will update and slight UI changes
*/

var raph_diagram = {
   description: "this is an animated circular diagram of my skills.",
};

// makes the cp_logo and book_logo images a square
function square_other_imgs() {
   var $parent = $("#education_icons");
   var $cp_element = $("#education_icons #cp_logo");
   
   var icon_width = $parent.width() * 0.2;
   var cp_width = $cp_element.width();
   cp_width = icon_width;

   $cp_element.height(cp_width);
   // $cp_element.css("max-width", cp_width);
   // $cp_element.css("min-height", cp_width);

   var $book_element = $("#education_icons #book_logo");
   // $book_element.width(cp_width);
   $book_element.height(cp_width);

   $parent.css("justify-content", "space-around ");

   // $("#career #education img").mouseenter(function(evnt) {
   //    console.log("mouse entered!");
   //    evnt.stopPropagation();
   //    $cp_element.hide();
   // });
   // $("#career #education img").mouseleave(function(evnt) {
   //    evnt.stopImmediatePropagation();
   //    if(!evnt) {
   //       // var evnt = window.event
   //       // evnt.cancelBubble = true;
   //       // if(evnt.stopPropagation) evnt.stopPropagation();

   //    }
   //    else {
   //       console.log("mouse out");
   //       // if 
   //       $cp_element.show();
   //    }
      
   // });
}

function get_random(lower, upper) {
   var rand = Math.random();
   var value = (rand * (upper - lower + 1)) + 1;

   return Math.floor(value);
}

function expand_arcs(arcs, max_unexpanded_index, size, container) {
   // var index = max_unexpanded_index;
   var expanded_size = raph_diagram.expanded_item_width_selected;

   for (var index = max_unexpanded_index; index < arcs.length; index++) {
      arcs[index].show().animate({ opacity: 1 }, 1000 );
   }
   
   // $(".get").find(".arc:gt(" + index + ")").each(function() {
   //    arcs[index].show().animate({ opacity: 1 }, 1000 );
   //    index += 1;
   // });
   console.log("mouse over circle: expanding " + index + " arcs");
   $("#diagram svg").css("width", expanded_size);
   $("#diagram svg").css("height", expanded_size);
   raph_diagram.center_circle.attr("cx", expanded_size / 2);
   raph_diagram.center_circle.attr("cy", expanded_size / 2);
   raph_diagram.center_text.attr("x", expanded_size / 2);
   raph_diagram.center_text.attr("y", expanded_size / 2);
}

function collapse_arcs(arcs, max_unexpanded_index, size, center_circle) {
   // var index = max_unexpanded_index;
   var unexpanded_size = raph_diagram.unexpanded_item_width;

   for (var index = 0; index < max_unexpanded_index; index++) {
      // raph_diagram.arc_objects[index].attr("x", )
      // console.log("igoring index " + index);
   }

   for (index; index < arcs.length; index++) {
      // var arc = arcs[index];
      var arc = raph_diagram.arc_objects[index]
      arc.animate({ opacity: 0 }, 1000, function() { arc.hide() });
   }

   $("#diagram svg").css("width", unexpanded_size);
   $("#diagram svg").css("height", unexpanded_size);

   raph_diagram.center_circle.attr("cx", unexpanded_size / 2);
   raph_diagram.center_circle.attr("cy", unexpanded_size / 2);
   raph_diagram.center_text.attr("x", unexpanded_size / 2);
   raph_diagram.center_text.attr("y", unexpanded_size / 2);


   // $(".get").find(".arc:gt(" + index + ")").each(function() {
   //    console.log("   " + index);
   //    var arc = arcs[index];
   //    arc.animate({ opacity: 0 }, 1000, function() { arc.hide() });
   //    index += 1;
   // });

   console.log("mouse left circle: collapsing " + index + " arcs ");
}


var object = {
   init: function() {
      square_other_imgs();
      this.diag();
   },
   diag: function() {
      var container_width = $("#education_icons").width();
      // var container_width = $(".bio").width() / 2;
      var unexpanded_item_width = container_width * 0.2;
      var expanded_item_width_selected = container_width * 0.5;
      var expanded_item_width_unselected = container_width * 0.1;
      var diagram_length = expanded_item_width_selected;
      var centerXY = diagram_length / 2;
      var inner_radius = (1 / 10) * diagram_length;
      var $skill_elements = $(".get").find(".arc");
      var num_skills = $skill_elements.length;
      var arc_total_width = ((diagram_length - (inner_radius * 2)) / (num_skills + 1)) / 2;
      var arc_width = (5/6) * arc_total_width;
      var arc_gap = arc_total_width - arc_width;

      raph_diagram.unexpanded_item_width = unexpanded_item_width;
      raph_diagram.expanded_item_width_selected = expanded_item_width_selected;
      raph_diagram.expanded_item_width_unselected = expanded_item_width_unselected;

      // console.log("fullcontainer width: " + container_width);
      
      var raph = Raphael("diagram", diagram_length, diagram_length),
         radius = inner_radius,
         defaultText = "Skills",
         speed = 250;

      
      // console.log("container width (1/2): " + expanded_item_width_selected);
      // console.log("inner radius: " + inner_radius);
      // console.log("number of skills: " + num_skills);
      var ssum = inner_radius + (num_skills * arc_total_width);
      // console.log("inner diameter + (number of skills * arc_width) = " + ssum);
      // console.log("total size of arc: " + arc_total_width);
      // console.log("size of arc width: " + arc_width);
      // console.log("size of arc gap: " + arc_gap);
      $("#diagram svg").css("margin", arc_width);
      // console.log("unexpanded container width: " + unexpanded_item_width);
      
      // middle circle
      var center_circle = raph.circle(centerXY, centerXY, radius + arc_gap).attr({
         stroke: "none",
         fill: "#193340"
      });
      
      var title = raph.text(centerXY, centerXY, defaultText).attr({
         font: "15px Arial",
         fill: "#fff"
      }).toFront();

      raph_diagram.center_circle = center_circle;
      raph_diagram.center_text = title;
      
      raph.customAttributes.arc = function(value, color, radius) {
         var v = 3.6 * value,
            alpha = v == 360 ? 359.99 : v,
            random = get_random(91, 240),
            a = (random - alpha) * Math.PI/180,
            b = random * Math.PI/180,
            sx = diagram_length / 2 + radius * Math.cos(b),
            sy = diagram_length / 2 - radius * Math.sin(b),
            x = diagram_length / 2 + radius * Math.cos(a),
            y = diagram_length / 2 - radius * Math.sin(a),
            path = [["M", sx, sy], ["A", radius, radius, 0, + (alpha > 180), 1, x, y]];
         return { path: path, stroke: color }
      }
    
      var index = 0;
      var max_unexpanded_index = 0;
      var curr_size;
      var arc_objects = [];
      raph_diagram.arc_objects = arc_objects;

      $skill_elements.each(function() {
         var arc_info = $(this), 
            color = arc_info.find(".color").val(),
            value = arc_info.find(".percent").val(),
            text = arc_info.find(".text").text();
         
         radius += arc_total_width;
         var this_arc = raph.path().attr({ arc: [value, color, radius], "stroke-width": arc_width });
         arc_objects.push(this_arc);

         curr_size = (radius + arc_width) * 2;

         // if (curr_size >= unexpanded_item_width) {
         //    console.log("WIDTH EXCEEDED (" + index + "): current size = " + curr_size);
         //    this_arc.hide();
         //    if (max_unexpanded_index == 0) {
         //       max_unexpanded_index = index;
         //    }
         // }
         // else {
         //    console.log("(" + index + ") current size = " + curr_size);
         // }
         
         this_arc.mouseover(function() {
            this.animate({ "stroke-width": arc_width * 2, opacity: .75 }, 1000, "elastic");
            
            if(Raphael.type != 'VML') //solves IE problem
               this.toFront();

            title.stop().animate({ opacity: 0 }, speed, ">", function() {
               this.attr({ text: text + "\n" + value + "%" }).animate({ opacity: 1 }, speed, "<");
            });
         });
         this_arc.mouseout(function() {
            this.stop().animate({ "stroke-width": arc_width, opacity: 1 }, speed * 4, "elastic");
            title.stop().animate({ opacity: 0 }, speed, ">", function() {
               title.attr({ text: defaultText }).animate({ opacity: 1 }, speed, "<");
            });   
         });

         index += 1;
      });

      // $("#diagram").mouseenter(function(evnt) {
      //    console.log("mouse entered diagram!");
      //    evnt.stopPropagation();
      // }).mouseout(function(evnt) {
      //    console.log("mouse left diagram!");
      //    evnt.stopPropagation();
      // });

      // console.log("max unexpanded index: " + max_unexpanded_index);
      // collapse_arcs(arc_objects, max_unexpanded_index, unexpanded_item_width);
      // center_circle.mouseover(function() {
      //    expand_arcs(arc_objects, max_unexpanded_index);
      //    $("#diagram svg").css("width", expanded_item_width_selected);
      // });

      // $("#diagram svg").mouseout(function () {
      //    collapse_arcs(arc_objects, max_unexpanded_index, unexpanded_item_width, center_circle);
      // });
   }
}

$(function() {
   object.init();
});
