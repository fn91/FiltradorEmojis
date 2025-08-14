// Simulación de API externa
const emojis = [
    { emoji: "😀", nombre: "sonrisa", categoria: "emociones" },
    { emoji: "😂", nombre: "risa", categoria: "emociones" },
    { emoji: "😍", nombre: "amor", categoria: "emociones" },
    { emoji: "😎", nombre: "cool", categoria: "emociones" },
    { emoji: "😭", nombre: "llorar", categoria: "emociones" },
    { emoji: "🤯", nombre: "mente explotada", categoria: "emociones" },
    { emoji: "🐱", nombre: "gato", categoria: "animales" },
    { emoji: "🐶", nombre: "perro", categoria: "animales" },
    { emoji: "🦊", nombre: "zorro", categoria: "animales" },
    { emoji: "🍕", nombre: "pizza", categoria: "comida" },
    { emoji: "🍔", nombre: "hamburguesa", categoria: "comida" },
    { emoji: "☕", nombre: "café", categoria: "comida" },
    { emoji: "🧠", nombre: "cerebro", categoria: "objetos" },
    { emoji: "👀", nombre: "ojos", categoria: "cuerpo" },
    { emoji: "🥳", nombre: "fiesta", categoria: "eventos" },
    { emoji: "🎉", nombre: "celebración", categoria: "eventos" },
  ];
  
  const emojiContainer = document.getElementById("emojiContainer");
  const searchInput = document.getElementById("emojiSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  
  // Rellenar categorías únicas
  const categoriasUnicas = [...new Set(emojis.map(e => e.categoria))];
  categoriasUnicas.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categoryFilter.appendChild(option);
  });
  
  function mostrarEmojis(filtro = "", categoria = "") {
    emojiContainer.innerHTML = "";
  
    const filtrados = emojis.filter(e =>
      e.nombre.toLowerCase().includes(filtro.toLowerCase()) &&
      (categoria === "" || e.categoria === categoria)
    );
  
    if (filtrados.length === 0) {
      emojiContainer.innerHTML = "<p>No se encontraron emojis 😢</p>";
      return;
    }
  
    filtrados.forEach(e => {
      const div = document.createElement("div");
      div.className = "emoji";
      div.textContent = e.emoji;
      div.title = e.nombre;
  
      div.addEventListener("click", () => {
        copiarAlPortapapeles(e.emoji, div);
      });
  
      emojiContainer.appendChild(div);
    });
  }
  
  function copiarAlPortapapeles(texto, elemento) {
    navigator.clipboard.writeText(texto).then(() => {
      const popup = document.createElement("div");
      popup.className = "copiado";
      popup.textContent = "Copiado!";
      elemento.appendChild(popup);
      setTimeout(() => popup.remove(), 1000);
    });
  }
  
  searchInput.addEventListener("input", () => {
    mostrarEmojis(searchInput.value, categoryFilter.value);
  });
  
  categoryFilter.addEventListener("change", () => {
    mostrarEmojis(searchInput.value, categoryFilter.value);
  });
  
  // Inicial
  mostrarEmojis();
  