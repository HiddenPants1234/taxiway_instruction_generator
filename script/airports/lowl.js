class Lowl {
    constructor() {
        this.image = './resources/linz_images/LOWL.png';
        this.imageBounds = [[0, 0], [2000, 3000]];

        this.positions = {
			"Main Apron": [1300, 2150],
			"Military Apron": [900, 1050]
        };
		
		this.taxiways = {
			"V": [1150, 2250],
			"G": [1545, 1600],
            "D": [610, 1700]
		};
	
        this.holdpoints = {
            "A": [1250, 805],
            "B": [850, 1480],
            "C": [580, 1920],
            "D": [400, 2187],
            "G": [1550, 1050],
			"Z": [1100, 1643],
            "F": [700, 2315]
        };

        this.runways = {
            "26": [1793, 210],
            "08": [170, 2770]
        };
    }
}