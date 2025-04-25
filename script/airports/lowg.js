class Lowg {
    constructor() {
        this.image = './resources/graz_images/LOWG.png';
        this.imageBounds = [[0, 0], [2000, 3000]];

        this.positions = {
            "Main Apron": [1780, 1030],
            "Main Apron ": [1500, 1200],
            "GAC Apron": [1380, 1400],
            "Apron South": [1260, 1600],
            "Apron Hangar": [1170, 1830],
        };

        this.holdpoints = {
            "B": [1200, 1305],
            "C": [1400, 785],
            "D": [1875, 200],
            "G1": [1080, 1680],
            "G2": [820, 2200],
        };

        this.runways = {
            "16C": [1660, 200],
            "34C": [150, 2680],
            "16L": [1000, 1720],
            "34R": [720, 2180],
        };
    }
}