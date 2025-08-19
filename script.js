const wonders = [
  {
    name: "Great Pyramid of Giza",
    country: "Egypt",
    location: "Giza",
    history: "The last remaining wonder of the ancient world, built as a tomb around 2560 BC.",
    reason: "It is the largest Egyptian pyramid and showcases ancient engineering marvel.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg",
    map: "https://maps.google.com/maps?q=great+pyramid%20of%20giza&t=&z=13&ie=UTF8&iwloc=&output=embed",
    reviews: ["Magnificent!", "Truly ancient wonder."]
  },
  {
    name: "Taj Mahal",
    country: "India",
    location: "Agra",
    history: "Built in 1648 by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal.",
    reason: "A symbol of love and masterpiece of Mughal architecture.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
    map: "https://maps.google.com/maps?q=taj%20mahal&t=&z=13&ie=UTF8&iwloc=&output=embed",
    reviews: ["Beautiful monument.", "A symbol of love."]
  },
  {
    name: "Great Wall of China",
    country: "China",
    location: "China",
    history: "Series of fortifications built across China over centuries.",
    reason: "One of the longest structures ever built by humans.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/GreatWall_2004_Summer_4.jpg",
    map: "https://maps.google.com/maps?q=great%20wall%20of%20china&t=&z=4&ie=UTF8&iwloc=&output=embed",
    reviews: ["Massive and impressive!", "A must-see."]
  },
  {
    name: "Colosseum",
    country: "Italy",
    location: "Rome",
    history: "Built in AD 80, the Colosseum was used for gladiatorial contests.",
    reason: "Iconic symbol of Imperial Rome and its architecture.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Colosseo_2020.jpg",
    map: "https://maps.google.com/maps?q=colosseum%20rome&t=&z=13&ie=UTF8&iwloc=&output=embed",
    reviews: ["Historic place.", "Very grand."]
  },
  {
    name: "Chichen Itza",
    country: "Mexico",
    location: "Yucatán",
    history: "A large pre-Columbian city built by the Maya people.",
    reason: "Famous for the step pyramid 'El Castillo'.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Chichen_Itza_3.jpg",
    map: "https://maps.google.com/maps?q=chichen%20itza&t=&z=13&ie=UTF8&iwloc=&output=embed",
    reviews: ["Amazing pyramid.", "Rich history."]
  },
  {
    name: "Christ the Redeemer",
    country: "Brazil",
    location: "Rio de Janeiro",
    history: "Completed in 1931, it stands 30 meters tall on Mount Corcovado.",
    reason: "Symbol of Christianity and Brazilian culture.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/97/Cristo_Redentor_-_Rio_de_Janeiro%2C_Brasil.jpg",
    map: "https://maps.google.com/maps?q=christ%20the%20redeemer&t=&z=13&ie=UTF8&iwloc=&output=embed",
    reviews: ["Spectacular view!", "Iconic statue."]
  },
  {
    name: "Machu Picchu",
    country: "Peru",
    location: "Cusco Region",
    history: "15th-century Inca citadel located in the Eastern Cordillera of southern Peru.",
    reason: "A masterpiece of Inca civilization.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg",
    map: "https://maps.google.com/maps?q=machu%20picchu&t=&z=13&ie=UTF8&iwloc=&output=embed",
    reviews: ["Breathtaking views.", "Full of history."]
  },
  {
    name: "Petra",
    country: "Jordan",
    location: "Ma'an",
    history: "Historical city famous for its rock-cut architecture and water conduit system.",
    reason: "Known as the 'Rose City' for the color of its stone.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Al_Khazneh_Petra_edit_2.jpg",
    map: "https://maps.google.com/maps?q=petra%20jordan&t=&z=13&ie=UTF8&iwloc=&output=embed",
    reviews: ["Amazing rock city.", "Incredible history."]
  }
];

// Elements
const container = document.getElementById('wonders-container');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalHistory = document.getElementById('modal-history');
const modalReason = document.getElementById('modal-reason');
const modalReviews = document.getElementById('modal-reviews');
const modalMap = document.getElementById('modal-map');
const closeModal = document.querySelector('.close');

// Render Wonders
function renderWonders(list) {
  container.innerHTML = '';
  list.forEach((w) => {
    const card = document.createElement('div');
    card.className = 'wonder-card';
    card.innerHTML = `
      <img src="${w.image}" alt="${w.name}">
      <div class="content">
        <h3>${w.name}</h3>
        <p>${w.country} - ${w.location}</p>
        <button class="like-btn">❤️</button>
      </div>
    `;
    card.querySelector('.like-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      alert(`You liked ${w.name}!`);
    });
    card.addEventListener('click', () => openModal(w));
    container.appendChild(card);
  });
}

// Open Modal
function openModal(w) {
  modal.style.display = 'block';
  modalTitle.textContent = w.name;
  modalHistory.textContent = `History: ${w.history}`;
  modalReason.textContent = `Reason: ${w.reason}`;
  modalReviews.innerHTML = "<h4>Reviews:</h4><ul>" + w.reviews.map(r => `<li>${r}</li>`).join('') + "</ul>";
  modalMap.innerHTML = `<iframe src="${w.map}" width="100%" height="250" style="border:0;" allowfullscreen></iframe>`;
}

// Close Modal
closeModal.onclick = () => { modal.style.display = 'none'; };
window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

// Search & Filter
function filterWonders() {
  const query = searchInput.value.toLowerCase();
  const filter = filterSelect.value;
  const filtered = wonders.filter(w =>
    (w.name.toLowerCase().includes(query) || w.country.toLowerCase().includes(query)) &&
    (filter === 'all' || w.country === filter)
  );
  renderWonders(filtered);
}

// Events
searchInput.addEventListener('input', filterWonders);
filterSelect.addEventListener('change', filterWonders);

// Init
renderWonders(wonders);

