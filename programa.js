var map = L.map('map').setView([4.67981, -74.09238], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Coordenadas corregidas del polígono que encierra La Estrada sin relleno
var laEstradaCoords = [
    [4.683691289615168, -74.09163279050102],
    [4.680633082435396, -74.08899349680935],
    [4.672099972179597, -74.09506601806741],
    [4.67438831019194, -74.09817738054946],
    [4.683691289615168, -74.09163279050102] // Cerrar el polígono
];

var laEstradaPolygon = L.polygon(laEstradaCoords, { color: 'red', fillOpacity: 0 }).addTo(map);
laEstradaPolygon.bindPopup("Barrio La Estrada");

// Función para cargar un archivo GeoJSON de árboles
function cargarArboles(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, { color: 'green', radius: 3 });
                }
            }).addTo(map);
        })
        .catch(error => console.error("Error al cargar el GeoJSON: ", error));
}

// Evento para cargar la capa de árboles al hacer clic en el botón
document.getElementById("Arboles").addEventListener("click", function() {
    cargarArboles("http://localhost:8000/arbolado_urbano.geojson"); // Servir desde un servidor local
});
