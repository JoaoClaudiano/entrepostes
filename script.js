// ⚙️ Credenciais Supabase
const SUPABASE_URL = "https://xcxjpbsdvyksklqeuofa.supabase.co";
const SUPABASE_KEY = "sb_publishable_VQAfxI1bhLWSDVrxIv4lTw_sa5aWoDf";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// Inicializa o mapa
const map = L.map("map", { zoomControl: false })
  .setView([-15.793889, -47.882778], 4);

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
).addTo(map);

// Formulário
const form = document.getElementById("form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
let clickedLatLng = null;

// Load memórias do banco
loadMemories();

async function loadMemories() {
  const { data } = await supabase
    .from("memories")
    .select("*");

  data.forEach(addMarker);
}

// Clique no mapa para abrir form
map.on("click", (e) => {
  clickedLatLng = e.latlng;
  form.style.display = "block";
});

// Salvar
document.getElementById("save").onclick = async () => {
  await supabase.from("memories").insert({
    title: titleInput.value,
    content: contentInput.value,
    lat: clickedLatLng.lat,
    lng: clickedLatLng.lng,
  });

  addMarker({
    title: titleInput.value,
    content: contentInput.value,
    lat: clickedLatLng.lat,
    lng: clickedLatLng.lng,
  });

  form.style.display = "none";
  titleInput.value = "";
  contentInput.value = "";
};

// Função para adicionar marcador
function addMarker(memoria) {
  const marker = L.circleMarker(
    [memoria.lat, memoria.lng],
    {
      radius: 6,
      color: "#ffd27d",
      fillOpacity: 0.8,
    }
  ).addTo(map);

  marker.bindPopup(`
    <strong>${memoria.title}</strong><br/><br/>
    <em>${memoria.content}</em>
  `);
}