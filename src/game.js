Game = {
    start: function () {
        Crafty.init(Game.width(), Game.height());
        //Crafty.init();
        Crafty.background('rgb(249, 223, 125)');

        /*
        Crafty.addEvent(this, window, 'resize', function () {
            console.log(arguments);
        });
        */

        // Crafty.e('PlayerCharacter').at(5, 5);
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

        Crafty.e('Menu');

        /*
        for (var x = 0; x < Game.mapGrid.width; ++x) {
            for (var y = 0; y < Game.mapGrid.height; ++y) {
                var atEdge = x == 0 || x == Game.mapGrid.width - 1 || y == 0 || y == Game.mapGrid.height - 1;
                if (atEdge) {
                    Crafty.e('Tree').at(x, y);
                } else if (Math.random() < 0.06) {
                    Crafty.e('Bush').at(x, y);
                }
            }
        }
        */
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