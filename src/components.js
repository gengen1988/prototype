var registry = {};

Crafty.c('Grid', {
    init: function () {
        this.attr({
            w: Game.mapGrid.tile.width,
            h: Game.mapGrid.tile.height
        });
    },

    at: function (x, y) {
        if (x === undefined && y === undefined) {
            return {
                x: this.x / Game.mapGrid.tile.width,
                y: this.y / Game.mapGrid.tile.height
            };
        } else {
            return this.attr({
                x: x * Game.mapGrid.tile.width,
                y: y * Game.mapGrid.tile.height
            });
        }
    }
});

Crafty.c('Actor', {
    init: function () {
        this.requires('2D, Canvas, Grid');
    }
});

Crafty.c('Label', {
    init: function () {
        this.requires('UI, Text')
            .textFont({
                size: '16px'
            });
    },

    at: function (x, y) {
        if (x === undefined && y === undefined) {
            return {
                x: this.x / Game.mapGrid.tile.width,
                y: this.y / Game.mapGrid.tile.height
            };
        } else {
            return this.attr({
                x: x * Game.mapGrid.tile.width,
                y: y * Game.mapGrid.tile.height + Game.mapGrid.tile.height
            });
        }
    }
});

Crafty.c('City', {
    init: function () {
        this.actor = Crafty.e('Actor, Color, Mouse')
            .color('red')
            .attr({
                z: 100
            });
        this.label = Crafty.e('Label');

        this.actor.bind('Click', this.onClick);
    },
    onClick: function (e) {
        Crafty('Menu').destroy();
        Crafty.e('Menu').at(e.realX, e.realY);
    },
    register: function (id) {
        registry[id] = this;
    },
    at: function (x, y) {
        this.actor.at(x, y);
        this.label.at(x, y);

        if (x === undefined && y === undefined) {
            return new Crafty.math.Vector2D(this.x / Game.mapGrid.tile.width, this.y / Game.mapGrid.tile.height);
        } else {
            return this.attr({
                x: x * Game.mapGrid.tile.width,
                y: y * Game.mapGrid.tile.height
            });
        }
    },
    name: function (name) {
        this.label.text(name);
        return this;
    }
});

Crafty.c('Road', {
    init: function () {
        this.requires('2D, Canvas, Color')
            .attr({
                h: 5
            })
            .color('black');
    },

    link: function (from, to) {
        var start = new Crafty.math.Vector2D(registry[from].x, registry[from].y);
        var end = new Crafty.math.Vector2D(registry[to].x, registry[to].y);

        this.attr({
            x: start.x + Game.mapGrid.tile.width / 2,
            y: start.y + Game.mapGrid.tile.height / 2,
            w: start.distance(end),
            rotation: radToDeg(start.angleTo(end))
        });
    }
});

Crafty.c('Menu', {
    init: function () {
        this.requires('SimpleUI')
            .color('blue')
            .attr({
                alpha: .5,
                w: 100,
                h: 100
            });
        this.items = [
            //Crafty.e('MenuItem').order(0),
            //Crafty.e('MenuItem').order(1)
        ];
    }
});

Crafty.c('MenuItem', {
    init: function () {
        this.requires('SimpleUI')
            .color('red')
            .attr();
    }
});

Crafty.c('UI', {
    init: function () {
        this.requires('2D, Canvas')
            .attr({
                z: 1000
            });
    },

    show: function () {
        this.visible(true);
    },

    hide: function () {
        this.visible(false);
    }
});

Crafty.c('SimpleUI', {
    init: function () {
        this.requires('UI, Hoverable, Color');
    },

    at: function (x, y) {
        return this.attr({
            x: x,
            y: y
        });
    }
});

Crafty.c('Hoverable', {
    init: function () {
        this.requires('Mouse')
            .bind('MouseOver', this.onMouseOver)
            .bind('MouseOut', this.onMouseOut);
    }
});

Crafty.c('Button', {
    init: function () {
        this.requires('UI, Hoverable');
    }
});

Crafty.c('Container', {
    init: function () {
        this.requires('UI');
        this.items = [];
        this.hide();
    },

    add: function (item) {
        item.addComponent('UI');
        item.hide();
        this.items.push(item);
        return this;
    },

    render: function () {
        this.items.forEach(function (item) {

        });
    },

    removeAll: function () {
        console.log('not implements: remove item');
        // this.items.remove(item);
    }
});

Crafty.c('Dummy', {
    init: function () {
        console.log(Crafty.stage);
        /*
        this.requires('2D, Mouse')
            .attr({
                x: 0,
                y: 0,
                w: Crafty.stage.elem.clientHd
            });
        */
    }
});

function radToDeg(rad) {
    return rad * 180 / Math.PI;
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}
