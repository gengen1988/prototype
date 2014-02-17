Game = {
    start: function () {
        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(249, 223, 125)');

        //Crafty.init();
        //Crafty.scene('loading');

        /*
        Crafty.addEvent(this, window, 'resize', function () {
            console.log(arguments);
        });
        */
        map.city.forEach(function (city) {
            Crafty.e('City')
                .at(city.x, city.y)
                .name(city.name)
                .register(city.id);
        });

        map.road.forEach(function (road) {
            Crafty.e('Road')
                .link(road.from, road.to);
        });
    },

    mapGrid: {
        width: 24,
        height: 16,
        tile: {
            width: 32,
            height: 32
        }
    },

    width: function () {
        return this.mapGrid.width * this.mapGrid.tile.width;
    },

    height: function () {
        return this.mapGrid.height * this.mapGrid.tile.height;
    }
}