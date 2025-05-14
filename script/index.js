let map;
let overlay;
let currentAirport = null;

let selected = {
    positions: null,
    exits: null,
    holdpoints: null,
    runways: null,
};

const selectionSteps = ['positions', 'exits', 'holdpoints', 'runways'];
let activeSteps = [];
let currentStepIndex = 0;

const airportMap = {
    "loww": new Loww(),
    "lowl": new Lowl(),
    "lowg": new Lowg(),
    "lows": new Lows(),
    "lowi": new Lowi(),
    "lowk": new Lowk()
};

document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById("airportSelector");
    selector.addEventListener("change", () => {
        const selectedCode = selector.value;
        loadAirport(selectedCode);
    });

    loadAirport("loww");
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

    activeSteps = selectionSteps.filter(group => {
        if (group === 'exits') {
            return currentAirport[group] !== undefined;
        }
        return true;
    });

    currentStepIndex = 0;

    for (let group of selectionSteps) {
        if (currentAirport[group]) {
            addMarkers(currentAirport[group], getColorForGroup(group), group);
        }
    }

    updateSelectionDisplay();
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
            updateSelectionDisplay();
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
            const isSelected =
                selected[group]?.marker === layer;

            layer.setStyle({
                fillOpacity: isSelected ? 1.0 : 0.3,
            });
        }
    });
}

function generateInstructions() {
    const parts = [];
    if (selected.positions) parts.push(`from ${selected.positions.name}`);
    if (selected.exits) parts.push(`via ${selected.exits.name}`);
    if (selected.holdpoints) {
        if(selected.exits) {
            parts.push(`and Holdingpoint ${selected.holdpoints.name}`)
        }
        else{
            parts.push(`via Holdingpoint ${selected.holdpoints.name}`)
        }
    };
    if (selected.runways) parts.push(`to Runway ${selected.runways.name}`);

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
    updateSelectionDisplay();
}

function resetAll() {
    selected = {
        positions: null,
        exits: null,
        taxiways: [],
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

function undoLastStep() {
    if (currentStepIndex === 0) return;

    const currentGroup = activeSteps[Math.max(currentStepIndex - 1, 0)];

    currentStepIndex--;
    const removed = selected[currentGroup];
    if (removed?.marker) {
        removed.marker.setStyle({
            color: removed.marker.options.originalColor,
            fillColor: removed.marker.options.originalColor,
            fillOpacity: 0.5,
        });
    }

    selected[currentGroup] = null;
    enableGroup(activeSteps[currentStepIndex]);
    updateSelectionDisplay();
}

function updateSelectionDisplay() {
    const display = document.getElementById("selectionDisplay");
    if (!display) return;

    display.innerHTML = `
        <strong>Aktuelle Auswahl:</strong><br>
        🅿️ Position: ${selected.positions?.name || '–'}<br>
        🚪 Exit: ${selected.exits?.name || '–'}<br>
        ⛔ Holding Point: ${selected.holdpoints?.name || '–'}<br>
        🛬 Runway: ${selected.runways?.name || '–'}
    `;
}

function getColorForGroup(group) {
    return {
        positions: 'blue',
        exits: 'green',
        holdpoints: 'red',
        runways: 'black',
    }[group];
}

function getHighlightColorForGroup(group) {
    return {
        positions: 'darkblue',
        exits: 'darkgreen',
        holdpoints: 'darkred',
        runways: 'gray',
    }[group];
}

function proceedFromTaxiways() {
    if (activeSteps[currentStepIndex] === 'taxiways') {
        currentStepIndex++;
        enableGroup(activeSteps[currentStepIndex]);
        updateSelectionDisplay();
    }
}

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}