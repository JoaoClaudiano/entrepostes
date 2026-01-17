// ⚙️ Credenciais Supabase
const SUPABASE_URL = "https://xcxjpbsdvyksklqeuofa.supabase.co";
const SUPABASE_KEY = "sb_publishable_VQAfxI1bhLWSDVrxIv4lTw_sa5aWoDf";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// MAPA
const map = L.map("map", { zoomControl: false })
  .setView([-15.793889, -47.882778], 4);
  
  // 🩹 Fix para iOS / GitHub Pages
setTimeout(() => {
  map.invalidateSize();
}, 500);

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
).addTo(map);

// FORM
const form = document.getElementById("form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
let clickedLatLng = null;

// 🔄 CARREGAR MEMÓRIAS
loadMemories();

async function loadMemories() {
  const { data, error } = await supabase
    .from("memories")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  data.forEach(addMarker);
}

// 📍 CLIQUE NO MAPA
map.on("click", (e) => {
  clickedLatLng = e.latlng;
  form.style.display = "block";
});

// 💾 SALVAR MEMÓRIA
document.getElementById("save").onclick = async () => {
  if (!clickedLatLng) return;

  const { error } = await supabase.from("memories").insert({
    title: titleInput.value,
    content: contentInput.value,
    lat: clickedLatLng.lat,
    lng: clickedLatLng.lng,
  });

  if (error) {
    console.error(error);
    return;
  }

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

// 🕯️ MARCADOR
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

document.addEventListener("touchstart", () => {
  map.invalidateSize();
}, { once: true });


