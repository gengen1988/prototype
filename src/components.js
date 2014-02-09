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
    onClick: function () {
        console.log(this);
        Crafty.e();
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
                x: 10,
                y: 10,
                w: 100,
                h: 100
            });
        this.items = [];
    },

    add: function (item) {
        this.items.push(item);
    }
});



Crafty.c('MenuItem', {
    init: function () {
        this.requires('SimpleUI');
    }
});

Crafty.c('UI', {
    init: function () {
        this.requires('2D, Canvas');
    },

    show: function (x, y) {

    },

    hide: function () {
    }
});

Crafty.c('SimpleUI', {
    init: function () {
        this.requires('UI, Color');
    }
});

function radToDeg(rad) {
    return rad * 180 / Math.PI;
}