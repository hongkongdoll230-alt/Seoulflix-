const API_KEY = "93dc5be9db632afc685dee71c33c1d1e";

const dramasContainer = document.getElementById("category-dramas");
const moviesContainer = document.getElementById("category-movies");
const animeContainer = document.getElementById("category-anime");
const novelsContainer = document.getElementById("category-novels");


// =========================
// LOAD DRAMAS
// =========================

async function loadDramas() {

    try {

        const response = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_origin_country=KR&sort_by=popularity.desc`
        );

        const data = await response.json();

        dramasContainer.innerHTML = "";

        data.results.slice(0, 6).forEach(drama => {

            const card = document.createElement("div");

            card.className = "movie-card";

            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${drama.poster_path}" alt="${drama.name}">
                <h3>${drama.name}</h3>
                <p>⭐ ${drama.vote_average.toFixed(1)}</p>
            `;

            card.onclick = () => {
                window.location.href = `movie.html?id=${drama.id}&type=tv`;
            };

            dramasContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Error loading dramas:", error);

        dramasContainer.innerHTML = "<p>Unable to load dramas.</p>";

    }

}


// =========================
// LOAD MOVIES
// =========================

async function loadMovies() {

    try {

        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`
        );

        const data = await response.json();

        moviesContainer.innerHTML = "";

        data.results.slice(0, 6).forEach(movie => {

            const card = document.createElement("div");

            card.className = "movie-card";

            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.vote_average.toFixed(1)}</p>
            `;

            card.onclick = () => {
                window.location.href = `movie.html?id=${movie.id}&type=movie`;
            };

            moviesContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Error loading movies:", error);

        moviesContainer.innerHTML = "<p>Unable to load movies.</p>";

    }

}


// =========================
// LOAD ANIME
// =========================

async function loadAnime() {

    try {

        const response = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc`
        );

        const data = await response.json();

        animeContainer.innerHTML = "";

        data.results.slice(0, 6).forEach(anime => {

            const card = document.createElement("div");

            card.className = "movie-card";

            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${anime.poster_path}" alt="${anime.name}">
                <h3>${anime.name}</h3>
                <p>⭐ ${anime.vote_average.toFixed(1)}</p>
            `;

            card.onclick = () => {
                window.location.href = `movie.html?id=${anime.id}&type=tv`;
            };

            animeContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Error loading anime:", error);

        animeContainer.innerHTML = "<p>Unable to load anime.</p>";

    }

}


// =========================
// LOAD NOVELS
// =========================

async function loadNovels() {

    try {

        const response = await fetch(
            "https://openlibrary.org/search.json?q=popular+novels&limit=6"
        );

        const data = await response.json();

        novelsContainer.innerHTML = "";

        data.docs.forEach(novel => {

            const card = document.createElement("div");

            card.className = "movie-card";

            const coverId = novel.cover_i;

            const cover = coverId
                ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                : "https://via.placeholder.com/300x450?text=No+Cover";

            card.innerHTML = `
                <img src="${cover}" alt="${novel.title}">
                <h3>${novel.title}</h3>
                <p>✍️ ${novel.author_name ? novel.author_name[0] : "Unknown Author"}</p>
            `;

            card.onclick = () => {

                if (novel.key) {
                    window.location.href =
                        `novel.html?key=${encodeURIComponent(novel.key)}`;
                }

            };

            novelsContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Error loading novels:", error);

        novelsContainer.innerHTML = "<p>Unable to load novels.</p>";

    }

}


// =========================
// START
// =========================

loadDramas();
loadMovies();
loadAnime();
loadNovels();