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
 * This callback type is called when the image for an IconSheet has been
 * loaded and the names for all icons have been mapped to the corresponding
 * areas in the image.
 *
 * @callback iconSheetCB
 * @param {IconSheet} iconSheet - IconSheet object that called this function
 */

/**
 * An IconSheet object can be used to draw named icons from an image
 * containing a fixed grid of icons.
 *
 * @constructor
 * @param {string} sourceUrl - URL of the source image containing the icons
 * @param {string[]} iconNames - list of icon names in order of appearance
 * @param {number} iconWidth - width of all icons
 * @param {number} iconHeight - height of all icons
 * @param {iconSheetCB} [readyFunc] - function called when the image is ready
 */
function IconSheet(sourceUrl, iconNames, iconWidth, iconHeight, readyFunc) {
    this.iconWidth = iconWidth;
    this.iconHeight = iconHeight;
    this.iconMap = {};
    this.iconSheetWidth = 0;
    this.iconSheetHeight = 0;
    this.callWhenReady = [];
    if (readyFunc) {
        this.callWhenReady.push(readyFunc);
    }
    this.iconSheet = new Image();
    this.iconSheet.onload = (function(obj) {
        return function() {
            var x = 0;
            var y = 0;
            obj.iconSheetWidth = this.naturalWidth;
            obj.iconSheetHeight = this.naturalHeight;
            iconNames.forEach(function(name) {
                obj.iconMap[name] = {
                    'x': x,
                    'y': y
                };
                x += iconWidth;
                if (x + iconWidth > obj.iconSheetWidth) {
                    x = 0;
                    y += iconHeight;
                }
            });
            obj.callWhenReady.forEach(function(callback) {
                callback.apply(obj);
            });
        };
    })(this);
    this.iconSheet.src = sourceUrl;
    return this;
}

IconSheet.prototype = {
    /**
     * Draw a named icon at the specified position in a canvas context
     *
     * @param {Object} context - canvas context
     * @param {number} x - X position of the origin of the icon
     * @param {number} y - Y position of the origin of the icon
     * @param {string} iconName - name of the icon to draw
     * @returns {IconSheet} this IconSheet object
     */
    draw: function(context, x, y, iconName) {
        if (this.isLoaded()) {
            if (this.iconMap.hasOwnProperty(iconName)) {
                context.drawImage(this.iconSheet,
                                  this.iconMap[iconName].x,
				  this.iconMap[iconName].y,
                                  this.iconWidth, this.iconHeight,
                                  x, y,
                                  this.iconWidth, this.iconHeight);
            }
        } else {
            this.onLoad(function(c_context, c_x, c_y, c_iconName) {
                return function() {
                    this.draw(c_context, c_x, c_y, c_iconName);
                };
            } (context, x, y, iconName));
        }
        return this;
    },
    /**
     * Return the number of icons mapped to areas of the image.
     * This will return zero until the image is loaded.
     */
    numIcons: function() {
        return Object.keys(this.iconMap).length;
    },
    /**
     * Return true once the image is successfully loaded.
     */
    isLoaded: function() {
        return (this.iconSheetWidth > 0);
    },
    /**
     * Add a callback function to be called once the image is loaded.
     *
     * @param {iconSheetCB} [callback] - function called when the image is ready
     * @returns {IconSheet} this IconSheet object
     */
    onLoad: function(callback) {
        if (this.isLoaded()) {
            callback.apply(this);
        } else {
            this.callWhenReady.push(readyFunc);
        }
        return this;
    }
};
