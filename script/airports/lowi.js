class Lowi {
    constructor() {
        this.image = './resources/innsbruck_images/LOWI.png';
        this.imageBounds = [[0, 0], [2000, 3000]];

        this.positions = {
            "Apron": [300, 2000],
            "Hangar Süd": [600, 1270],
            "Hangar Nord": [1150, 1950]
        };

        this.taxiways = {
            "L": [650, 1500]
        }

        this.holdpoints = {
            "A": [1300, 750],
            "B": [400, 2330],
            "Z": [920, 2070]
        };

        this.runways = {
            "08": [1820, 240],
            "26": [350, 2750],
        };
    }
}