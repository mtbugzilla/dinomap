/*
    DinoMap - Interactive map for Dino-RPG
    Copyright (C) 2016  Bugzilla@Twinoid (http://twinoid.com/user/148)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

/**
 * Initialization function (temporary, for debugging).
 */
function init() {
    var icons = new IconSheet('images/icons.png',
                              ['default', 'house', 'church', 'castle',
                               'cavern', 'door', 'fount', 'rasca',
                               'swim', 'mountain', 'forest', 'water',
                               'north', 'west', 'south', 'east',
                               'clinik'
                              ], 25, 25);
    var test0 = new DinoMap('#ttt', 0, icons);
    var test1 = new DinoMap('#ttt', 1, icons, { 'alt_tchaud': 1 });
    var test2 = new DinoMap('#ttt', 2, icons);
    var test3 = new DinoMap('#ttt', 3, icons);
    var test4 = new DinoMap('#ttt', 4, icons);
    var test5 = new DinoMap('#ttt', 5, icons, { 'alt_magnet': 1 });
    var test6 = new DinoMap('#ttt', 6, icons);
    var test7 = new DinoMap('#ttt', 7, icons);
    var test8 = new DinoMap('#ttt', 8, icons);
    var test9 = new DinoMap('#ttt', 9, icons);
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
