"use strict";

// IconSheet - constructor
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
                    "x": x,
                    "y": y,
                };
                x += iconWidth;
                if (x >= obj.iconSheetWidth) {
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

// IconSheet - methods
IconSheet.prototype = {
    draw: function(context, x, y, iconName) {
        if (this.iconMap.hasOwnProperty(iconName)) {
            context.drawImage(this.iconSheet,
                              this.iconMap[iconName].x, this.iconMap[iconName].y,
                              this.iconWidth, this.iconHeight,
                              x, y,
                              this.iconWidth, this.iconHeight);
        }
        return this;
    },
    numIcons: function() {
        return Object.keys(this.iconMap).length;
    },
    isLoaded: function() {
        return (this.iconSheetWidth > 0);
    },
    onLoad: function(callback) {
        if (this.isLoaded()) {
            callback.apply(this);
        } else {
            this.callWhenReady.push(readyFunc);
        }
        return this;
    }
};
