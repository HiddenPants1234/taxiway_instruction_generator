class Lows {
    constructor() {
        this.image = './resources/salzburg_images/LOWS.png';
        this.imageBounds = [[0, 0], [2000, 3000]];

        this.positions = {
			"Main Apron": [600, 1400],
			"Infront of Tower": [720, 1100],
			"GAC Apron": [950, 910],
			"Round Hangars": [1150, 700],
			"Apron East": [1260, 1620]
        };
		
		this.exits = {
            "Exit 1": [1200, 740],
            "Exit 2": [1050, 1000],
            "Exit 3": [890, 1230],
            "Exit 4": [580, 1690]
        };
	
        this.holdpoints = {
            "B": [1620, 270],
            "C": [1000, 1310],
            "D": [800, 1650],
            "E": [350, 2320],
            "F": [100, 2750],
			"S": [1200, 1440]
        };

        this.runways = {
            "15": [1850, 210],
            "33": [260, 2680]
        };
    }
}