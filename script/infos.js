function changeImages(setNumber) {
    if (!setNumber && setNumber !== 0) return;

    const airports = [
        { name: "Flughafen Wien-Schwechat", code: "IATA: VIE / ICAO: LOWW", folder: "wien_images" },
        { name: "Flughafen Salzburg",        code: "IATA: SZG / ICAO: LOWS", folder: "salzburg_images" },
        { name: "Flughafen Linz",            code: "IATA: LNZ / ICAO: LOWL", folder: "linz_images" },
        { name: "Flughafen Graz",            code: "IATA: GRZ / ICAO: LOWG", folder: "graz_images" },
        { name: "Flughafen Klagenfurt",      code: "IATA: KLU / ICAO: LOWK", folder: "klagenfurt_images" },
        { name: "Flughafen Innsbruck",       code: "IATA: INN / ICAO: LOWI", folder: "innsbruck_images" }
    ];

    const airport = airports[setNumber];
    if (!airport) return;

    const base = `./resources/${airport.folder}`;

    document.getElementById("airport_img_1").src = `${base}/image_1.jpg`;
    document.getElementById("airport_img_2").src = `${base}/image_2.jpg`;
    document.getElementById("airport_img_3").src = `${base}/image_3.jpg`;

    document.getElementById("info_container").style.backgroundImage = `url(${base}/background.jpg)`;

    document.getElementById("airport_name").textContent = airport.name;
    document.getElementById("airport_code").textContent = airport.code;

    fetch(`${base}/info.txt`)
        .then(response => {
            if (!response.ok) throw new Error("Text konnte nicht geladen werden.");
            return response.text();
        })
        .then(text => {
            document.querySelector(".text p").textContent = text;
        })
        .catch(error => {
            console.error("Fehler beim Laden der Info:", error);
            document.querySelector(".text p").textContent = "Informationstext nicht verfügbar.";
        });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("airport_selector").value = "0";
    changeImages(0);
});
