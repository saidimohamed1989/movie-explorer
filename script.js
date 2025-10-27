const movies = [
  {
    title: "Le Voyageur des Étoiles",
    year: 2021,
    rating: 8.1,
    genre: "Science-fiction",
    img: "https://m.media-amazon.com/images/I/81MKQwqcv-L._UF1000,1000_QL80_.jpg",
    desc: "Un pilote solitaire traverse la galaxie pour retrouver une civilisation perdue."
  },
  {
    title: "Minuit à Tunis",
    year: 2019,
    rating: 7.3,
    genre: "Drame",
    img: "https://i.ytimg.com/vi/o0_ZEx3wkXs/hqdefault.jpg?v=5fff6987",
    desc: "Une histoire intime qui explore famille, mémoire et réinvention."
  },
  {
    title: "La Course",
    year: 2023,
    rating: 7.9,
    genre: "Action",
    img: "https://dicodusport.fr/wp-content/uploads/2016/01/definition-Course-a-pied.png",
    desc: "Un pilote de rallye découvre une conspiration qui menace son équipe."
  },
  {
    title: "Café et Code",
    year: 2020,
    rating: 6.8,
    genre: "Comédie",
    img: "https://m.media-amazon.com/images/I/71Qvf0T-ZbL._UF350,350_QL50_.jpg",
    desc: "Rencontres, bugs et cafés : une comédie romantique pour développeurs."
  }
];

const container = document.getElementById("movie-container");
const searchInput = document.getElementById("search");
const genreSelect = document.getElementById("genre");
const ratingInput = document.getElementById("rating");
const ratingValue = document.getElementById("rating-value");
const resetBtn = document.getElementById("reset");
const toggleTheme = document.getElementById("toggle-theme");

function renderMovies(list) {
  container.innerHTML = "";
  list.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.img}" alt="${movie.title}">
      <div class="movie-info">
        <h2>${movie.title} (${movie.year})</h2>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Note:</strong> ${movie.rating}</p>
        <p>${movie.desc}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function populateGenres() {
  const genres = [...new Set(movies.map(m => m.genre))];
  genres.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    genreSelect.appendChild(opt);
  });
}

function filterMovies() {
  const search = searchInput.value.toLowerCase();
  const genre = genreSelect.value;
  const minRating = parseFloat(ratingInput.value);

  const filtered = movies.filter(m =>
    (genre === "all" || m.genre === genre) &&
    m.rating >= minRating &&
    (m.title.toLowerCase().includes(search) || m.desc.toLowerCase().includes(search))
  );

  renderMovies(filtered);
}

searchInput.addEventListener("input", filterMovies);
genreSelect.addEventListener("change", filterMovies);
ratingInput.addEventListener("input", () => {
  ratingValue.textContent = ratingInput.value;
  filterMovies();
});
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  genreSelect.value = "all";
  ratingInput.value = 0;
  ratingValue.textContent = "0";
  filterMovies();
});
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

populateGenres();
renderMovies(movies);
