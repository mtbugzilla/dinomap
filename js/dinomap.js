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
 * DinoMap creates an image (canvas) of the specified zone.
 *
 * @constructor
 * @param {Object} selector - JQuery selector to which the canvas will be added
 * @param {number} zoneId - id of the zone to display: DinoMap.ROYDIN, etc.
 * @param {IconSheet} icons - icons to be drawn on the map
 * @param {Object} options - options such as map offset and others
 */
function DinoMap(selector, zoneId, icons, options) {
    this.zoneId = zoneId;
    this.icons = icons;
    this.mapImage = null;
    this.mapX = 0;
    this.mapY = 0;
    this.mapWidth = 0;
    this.mapHeight = 0;
    this.jCanvas = null;
    this.context = null;

    if (icons && ! (icons instanceof IconSheet)) {
        throw new TypeError('icons is not an IconSheet object');
    }
    this.jCanvas = $('<canvas/>', {
        'id': 'map_zone' + this.zoneId,
        'class': 'mapcanvas'
    });
    if (selector) {
        $(selector).append(this.jCanvas);
    }
    if (this.jCanvas.get(0).getContext == null) {
        throw new Error('Cannot get canvas context');
    }
    if (options) {
        this.mapX = options.x || 0;
        this.mapY = options.y || 0;
    }
    this.loadMapBackground(options);
    return this;
}

/** DinoMap - constants */
DinoMap.ROYDIN = 0;
DinoMap.TCHAUD = 1;
DinoMap.ILEATL = 2;
DinoMap.JUNGLE = 3;
DinoMap.ATDARK = 4;
DinoMap.MAGNET = 5;
DinoMap.DNWEST = 6;
DinoMap.MONISL = 7;
DinoMap.NIMBAO = 8;
DinoMap.CAUSH = 9;

DinoMap.prototype = {
    /**
     * Draw the map background, locations and paths between them
     * @return {DinoMap} this DinoMap object
     */
    drawAll: function() {
        this.drawBackground();
        this.drawPaths();
        this.drawLocations();
        return this;
    },
    /**
     * Draw the map background image in the canvas
     * @return {DinoMap} this DinoMap object
     */
    drawBackground: function() {
        this.context.globalAlpha = 1.0;
        this.context.clearRect(this.mapX, this.mapY,
                               this.mapWidth, this.mapHeight);
        this.context.drawImage(this.mapImage, this.mapX, this.mapY);
        return this;
    },
    /**
     * Draw the permanent and conditional paths between locations
     * @return {DinoMap} this DinoMap object
     */
    drawPaths: function() {
        var zone = dinorpg_zones[this.zoneId];
        var ctx = this.context;
        var mapX = this.mapX;
        var mapY = this.mapY;
        // draw conditional paths
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#f99';
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        Object.keys(zone).forEach(function(pos) {
            //console.log('conditional paths from', pos, ':', zone[pos].links);
            if (zone[pos].linkscond) {
                for (var i = 0; i < zone[pos].linkscond.length; i += 2) {
                    var condition = zone[pos].linkscond[i];
                    var dest = zone[pos].linkscond[i + 1];
                    ctx.moveTo(mapX + zone[pos].x, mapY + zone[pos].y);
                    if (zone[dest]) {
                        ctx.lineTo(mapX + zone[dest].x, mapY + zone[dest].y);
                    } else {
                        ctx.lineTo(0, 0);
                    }
                }
            }
        });
        ctx.stroke();
        // draw permanent paths
        ctx.strokeStyle = '#fff';
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        Object.keys(zone).forEach(function(pos) {
            //console.log('permanent paths from', pos, ':', zone[pos].links);
            zone[pos].links.forEach(function(dest) {
                //console.log(' - ', pos, '(', zone[pos].x, ',', zone[pos].y, ') to ', dest, '(', zone[dest].x, ',', zone[dest].y, ')');
                ctx.moveTo(mapX + zone[pos].x, mapY + zone[pos].y);
                if (zone[dest]) {
                    ctx.lineTo(mapX + zone[dest].x, mapY + zone[dest].y);
                } else {
                    ctx.lineTo(0, 0);
                }
            });
        });
        ctx.stroke();
        ctx.globalAlpha = 1.0;
        return this;
    },
    /**
     * Draw the locations on the map with the appropriate icons and labels
     * @return {DinoMap} this DinoMap object
     */
    drawLocations: function() {
        var zone = dinorpg_zones[this.zoneId];
        var ctx = this.context;
        var mapX = this.mapX;
        var mapY = this.mapY;
        var mapWidth = this.mapWidth;
        var mapHeight = this.mapHeight;
        var icons = this.icons;
        // draw icons
        Object.keys(zone).forEach(function(pos) {
            icons.draw(ctx, mapX + zone[pos].x - 12, mapY + zone[pos].y - 12,
                       zone[pos].icon);
        });
        // draw labels
        ctx.textAlign = 'start';
        ctx.textBaseline = 'top';
        Object.keys(zone).forEach(function(pos) {
            if (zone[pos].name) {
                if (zone[pos].exitid) {
                    ctx.font = 'italic 10px sans-serif';
                    ctx.fillStyle = '#bc683c';
                } else {
                    ctx.font = 'normal 12px sans-serif';
                    ctx.fillStyle = '#9a4029';
                }
                var textWidth = ctx.measureText(zone[pos].name).width;
                var boxRadius = 7;
                var boxX = mapX + zone[pos].x - textWidth / 2;
                var boxY = mapY + zone[pos].y + 9;
                if (zone[pos].labelx) {
                    boxX += zone[pos].labelx;
                }
                if (zone[pos].labely) {
                    boxY += zone[pos].labely;
                }
                if (boxX + textWidth + boxRadius > mapX + mapWidth) {
                    boxX = mapX + mapWidth - textWidth - boxRadius;
                }
                if (boxX < mapX + boxRadius) {
                    boxX = mapX + boxRadius;
                }
                if (boxY + 2 * boxRadius > mapY + mapHeight) {
                    boxY = mapY + mapHeight - 2 * boxRadius;
                }
                if (boxY < mapY) {
                    boxY = mapY;
                }
                ctx.fillRect(boxX, boxY, textWidth, 2 * boxRadius);
                ctx.beginPath();
                ctx.arc(boxX, boxY + boxRadius, boxRadius, 0, Math.PI * 2);
                ctx.arc(boxX + textWidth, boxY + boxRadius,
                        boxRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#ffee92';
                ctx.fillText(zone[pos].name, boxX, boxY + 2);
            }
        });
        return this;
    },
    /**
     * Load the background image for the map according to the specified
     * options, e.g. 'alt_tchaud' if the Karimbao tower should be displayed.
     */
    loadMapBackground: function(options) {
        var zoneMaps = [
            'zone_roydin.jpg', // 0
            'zone_tchaud.jpg', // 1
            'zone_ileatl.jpg', // 2
            'zone_jungle.jpg', // 3
            'zone_atdark.jpg', // 4
            'zone_magnet.jpg', // 5
            'zone_dnwest.jpg', // 6
            'zone_monisl.jpg', // 7
            'zone_nimbao.jpg', // 8
            'zone_caush.jpg'   // 9
        ];
        if (this.zoneId < 0 || this.zoneId >= zoneMaps.length) {
            throw new RangeError('zoneId out of range: ' + this.zoneId);
        }
        var sourceUrl = 'images/' + zoneMaps[this.zoneId];
        if (options && ((this.zoneId == 1 && options.alt_tchaud) ||
                        (this.zoneId == 2 && options.alt_ileatl) ||
                        (this.zoneId == 4 && options.alt_atdark) ||
                        (this.zoneId == 5 && options.alt_magnet) ||
                        (this.zoneId == 6 && options.alt_dnwest) ||
                        (this.zoneId == 8 && options.alt_nimbao))) {
            sourceUrl = sourceUrl.replace('.jpg', '2.jpg');
        }
        this.mapImage = new Image();
        this.mapImage.onload = (function(obj) {
            return function() {
                obj.mapWidth = this.naturalWidth;
                obj.mapHeight = this.naturalHeight;
                obj.mapX = 30;
                obj.mapY = 20;
                obj.jCanvas.prop({
                    width: obj.mapX + obj.mapWidth,
                    height: obj.mapY + obj.mapHeight
                });
                obj.context = obj.jCanvas.get(0).getContext('2d');
                if (! obj.context) {
                    return;
                }
                obj.icons.onLoad(function() {
                    obj.drawAll();
                });
            };
        })(this);
        this.mapImage.src = sourceUrl;
    },
    /**
     * Return the current zone id that was loaded for this map.
     * @return {Number} the current zone id
     */
    getZoneId: function() {
        return this.zoneId;
    },
    /**
     * Return the jQuery canvas object used - may be null if not loaded yet
     * @return {Object} jQuery canvas object
     */
    getCanvas: function() {
        return this.jCanvas;
    },
    /**
     * Return the canvas context - may be null if image is not loaded yet
     * @return {Object} the canvas context
     */
    getContext: function() {
        return this.context;
    },
    /**
     * Return the width of the map image (if the image is loaded)
     * @return {Number} the width of the map image
     */
    getWidth: function() {
        return this.mapWidth;
    },
    /**
     * Return the height of the map image (if the image is loaded)
     * @return {Number} the height of the map image
     */
    getHeight: function() {
        return this.mapHeight;
    },
    /**
     * Change the map to a new zone with new options
     */
    changeZone: function(newZoneId, options) {
        this.zoneId = newZoneId;
        this.loadMapBackground(options);
    }
};

/**
 * HitSearch - TODO
 *
 * @constructor
 */
function HitSearch(selector) {
        this.selector = selector;
        this.rects = [];
        this.mouseEnterList = [];
        this.mouseLeaveList = [];
        this.mouseMoveList = [];
        // $(selector).enter
        return this;
}

HitSearch.prototype = {
        /** TODO
         * @return {HitSearch} this HitSearch object
         */
        newRect: function(x, y, w, h) {
                var rect = new HitSearchRectangle(this, x, y, w, h);
                this.rects.push(rect);
                return this;
        },
        /** TODO
         * @return {Object} the current selector
         */
        getSelector: function() {
                return this.selector;
        },
        /** TODO
         * @return {HitSearch} this HitSearch object
         */
        setSelector: function(selector) {
                this.selector = selector;
                return this;
        }
};

/**
 * HitSearchRectangle - TODO
 *
 * @constructor
 */
function HitSearchRectangle(hsParent, x, y, w, h) {
        this.hsParent = hsParent;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.mouseEnter = null;
        this.mouseLeave = null;
        this.mouseMove = null;
        return this;
}

// TODO
HitSearchRectangle.prototype = {
        /** TODO */
        mouseenter: function(handler) {
                this.mouseEnter = handler;
                this.hsParent.mouseEnterList.push(this);
        },
        /** TODO */
        mouseleave: function(handler) {
                this.mouseLeave = handler;
                this.hsParent.mouseLeaveList.push(this);
        },
        /** TODO */
        mousemove: function(handler) {
                this.mouseMove = handler;
                this.hsParent.mouseMoveList.push(this);
        }
};
