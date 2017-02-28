/*
    DinoMap - Interactive map for Dino-RPG
    Copyright (C) 2016-2017  Bugzilla@Twinoid (http://twinoid.com/user/148)

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
 * @param {string[]|object} iconNames - list of icon names in order of
 *   appearance or object {name1: {x: int, y: int, [width: int, height: int]}}
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
            if (Array.isArray(iconNames)) {
                iconNames.forEach(function(name) {
                    if (typeof name !== 'object') {
                        obj.iconMap[name] = {
                            'x': x,
                            'y': y,
                            'width': iconWidth,
                            'height': iconHeight
                        };
                    } else  if (name.name) {
                        obj.iconMap[name.name] = {
                            'x': name.x || 0,
                            'y': name.y || 0,
                            'width': name.width || iconWidth,
                            'height': name.height || iconHeight
                        };
                    } else {
                        throw new TypeError('Invalid iconNames in IconSheet().');
                    }
                    x += iconWidth;
                    if (x + iconWidth > obj.iconSheetWidth) {
                        x = 0;
                        y += iconHeight;
                    }
                });
            } else if (typeof iconNames === 'object') {
                Object.keys(iconNames).forEach(function(name) {
                    obj.iconMap[name] = {
                        'x': iconNames[name].x || 0,
                        'y': iconNames[name].y || 0,
                        'width': iconNames[name].width || iconWidth,
                        'height': iconNames[name].height || iconHeight
                    };
                });
            } else {
                throw new TypeError('Invalid iconNames in IconSheet().');
            }
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
     * @return {IconSheet} this IconSheet object
     */
    draw: function(context, x, y, iconName) {
        if (this.isLoaded()) {
            if (this.iconMap.hasOwnProperty(iconName)) {
                context.drawImage(this.iconSheet,
                                  this.iconMap[iconName].x,
                                  this.iconMap[iconName].y,
                                  this.iconMap[iconName].width,
                                  this.iconMap[iconName].height,
                                  x,
                                  y,
                                  this.iconMap[iconName].width,
                                  this.iconMap[iconName].height);
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
     * @return {number} number of named icons
     */
    numIcons: function() {
        return Object.keys(this.iconMap).length;
    },
    /**
     * Return true once the image is successfully loaded.
     * @return {boolean} true if the image is ready
     */
    isLoaded: function() {
        return (this.iconSheetWidth > 0);
    },
    /**
     * Add a callback function to be called once the image is loaded.
     *
     * @param {iconSheetCB} readyFunc - function called when the image is ready
     * @return {IconSheet} this IconSheet object
     */
    onLoad: function(readyFunc) {
        if (this.isLoaded()) {
            readyFunc.apply(this);
        } else {
            this.callWhenReady.push(readyFunc);
        }
        return this;
    }
};
