class Lowk {
    constructor() {
        this.image = './resources/klagenfurt_images/LOWK.png';
        this.imageBounds = [[0, 0], [2000, 3000]];

        this.positions = {
			"Main Apron": [1800, 650],
			"Apron GAC": [1900, 520],
			"Apron West": [1880, 400],
			"Apron East I": [1900, 720],
			"Apron East II": [1700, 730],
            "Apron South": [1230, 130]
        };
		
		this.taxiways = {
			"L": [1580, 650],
            "M": [1755, 450]
		};
	
        this.holdpoints = {
            "B": [1550, 490],
            "C": [1400, 790],
            "Z": [1350, 378],
            "Y": [1050, 839],
            "X1": [1320, 51],
			"X2": [1197, 250]
        };

        this.runways = {
            "10L": [1500, 320],
            "28R": [160, 2780],
            "10R": [1300, 170],
            "28L": [1000, 715]
        };
    }
}