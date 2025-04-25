// index.js – finale Version mit dynamischer Auswahl-Logik

let map;
let overlay;
let currentAirport = null;

let selected = {
    positions: null,
    exits: null,
    taxiways: null,
    holdpoints: null,
    runways: null,
};

const selectionSteps = ['positions', 'exits', 'taxiways', 'holdpoints', 'runways'];
let activeSteps = [];
let currentStepIndex = 0;

const airportMap = {
    "lowg": new Lowg(),
    "lows": new Lows(),
    // Weitere Flughäfen hier ergänzen ("loww": new Loww(), usw.)
};

document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById("airportSelector");
    selector.addEventListener("change", () => {
        const selectedCode = selector.value;
        loadAirport(selectedCode);
    });

    loadAirport("lows"); // Standard-Flughafen
});

function loadAirport(code) {
    currentAirport = airportMap[code];
    if (map) map.remove();

    map = L.map("map", {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 1,
    });

    overlay = L.imageOverlay(currentAirport.image, currentAirport.imageBounds).addTo(map);
    map.fitBounds(currentAirport.imageBounds);
    map.setMaxBounds(currentAirport.imageBounds);

    resetAll();

    activeSteps = selectionSteps.filter(group => currentAirport[group]);
    currentStepIndex = 0;

    for (let group of selectionSteps) {
        if (currentAirport[group]) {
            addMarkers(currentAirport[group], getColorForGroup(group), group);
        }
    }

    enableGroup(activeSteps[currentStepIndex]);
}

function addMarkers(locations, color, group) {
    for (const [name, coords] of Object.entries(locations)) {
        const marker = L.circleMarker(coords, {
            radius: 10,
            color,
            fillColor: color,
            fillOpacity: 0.5,
        })
        .addTo(map)
        .bindTooltip(name, { permanent: false, direction: 'top' })
        .on('click', () => {
            const expectedGroup = activeSteps[currentStepIndex];
            if (group !== expectedGroup) {
                alert(`Bitte in der richtigen Reihenfolge wählen: ${expectedGroup.toUpperCase()} ist aktuell dran.`);
                return;
            }

            selected[group] = { name, marker };
            highlightMarker(marker, getHighlightColorForGroup(group));
            currentStepIndex++;

            if (currentStepIndex < activeSteps.length) {
                enableGroup(activeSteps[currentStepIndex]);
            } else {
                showPopup(generateInstructions());
            }
        });

        marker.options.group = group;
        marker.options.originalColor = color;
    }
}

function highlightMarker(marker, color) {
    marker.setStyle({
        color,
        fillColor: color,
        fillOpacity: 1.0,
    });
}

function enableGroup(group) {
    map.eachLayer((layer) => {
        if (layer.options?.group === group) {
            const isSelected = selected[group]?.marker === layer;
            layer.setStyle({
                fillOpacity: isSelected ? 1.0 : 0.3,
            });
        }
    });
}

function generateInstructions() {
    const parts = [];

    if (selected.positions) { 
		parts.push(`from ${selected.positions.name}`)
	};
    if (selected.exits) {
		parts.push(`via ${selected.exits.name}`)
		if (selected.taxiways) {
			parts.push(`and ${selected.taxiways.name}`);
		}
	}
	else {
		if (selected.taxiways) {
		parts.push(`, ${selected.taxiways.name}`)
		};
	};    
    if (selected.holdpoints) { 
		parts.push(`to Holdingpoint ${selected.holdpoints.name}`)
	};
    if (selected.runways) {
		parts.push(`Runway ${selected.runways.name}`)
	};

    return `Taxi ${parts.join(" ")}.`;
}

function showPopup(instructions) {
    document.getElementById("taxiInstructions").textContent = instructions;
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    alert("Neuer Versuch: Bitte wähle erneut.");
    resetAll();
    enableGroup(activeSteps[0]);
}

function resetAll() {
    selected = {
        positions: null,
        exits: null,
        taxiways: null,
        holdpoints: null,
        runways: null,
    };
    currentStepIndex = 0;

    if (!map) return;
    map.eachLayer((layer) => {
        if (layer.options?.originalColor) {
            layer.setStyle({
                color: layer.options.originalColor,
                fillColor: layer.options.originalColor,
                fillOpacity: 0.5,
            });
        }
    });
}

function getColorForGroup(group) {
    return {
        positions: 'blue',
        exits: 'green',
        taxiways: 'orange',
        holdpoints: 'red',
        runways: 'black',
    }[group];
}

function getHighlightColorForGroup(group) {
    return {
        positions: 'darkblue',
        exits: 'darkgreen',
        taxiways: 'darkorange',
        holdpoints: 'darkred',
        runways: 'gray',
    }[group];
}
