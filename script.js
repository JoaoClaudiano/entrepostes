// Inicializa o mapa
const map = L.map("map", {
  zoomControl: false,
}).setView([-15.793889, -47.882778], 4); // Brasil como início

// Mapa escuro
L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap",
}).addTo(map);

// Exemplo de ponto (primeira memória — pode ser a tua)
const memoria = {
  lat: -3.7319,
  lng: -38.5267,
  titulo: "Rua da minha infância",
  texto: "Essa rua foi onde eu aprendi a andar de bicicleta. À noite, o poste iluminava pouco, mas era suficiente.",
};

// Marker suave
const marker = L.circleMarker([memoria.lat, memoria.lng], {
  radius: 6,
  color: "#ffd27d",
  fillColor: "#ffd27d",
  fillOpacity: 0.8,
}).addTo(map);

// Conteúdo do card
marker.bindPopup(`
  <strong>${memoria.titulo}</strong>
  <br/><br/>
  <em>${memoria.texto}</em>
`);
