"use strict";

function init() {
    var icons = new IconSheet("images/icons.png",
                              [ "default", "house", "church", "castle",
                                "cavern", "door", "fount", "rasca",
                                "swim", "mountain", "forest", "water",
                                "north", "west", "south", "east",
                                "clinik"
                              ], 25, 25);
    var test0 = new DinoMap("#ttt", 0, icons);
    var test1 = new DinoMap("#ttt", 1, icons, { "alt_tchaud": 1 });
    var test2 = new DinoMap("#ttt", 2, icons);
    var test3 = new DinoMap("#ttt", 3, icons);
    var test4 = new DinoMap("#ttt", 4, icons);
    var test5 = new DinoMap("#ttt", 5, icons, { "alt_magnet": 1 });
    var test6 = new DinoMap("#ttt", 6, icons);
    var test7 = new DinoMap("#ttt", 7, icons);
    var test8 = new DinoMap("#ttt", 8, icons);
    var test9 = new DinoMap("#ttt", 9, icons);
    //$(window).bind('resize', onResize).bind('mousemove', onMove);
}

/*
  function onMove(e) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = e.clientX - rect.left;
  var mouseY = e.clientY - rect.top;
  };
*/

$(init);
