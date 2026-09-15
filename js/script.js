const API_KEY = "93dc5be9db632afc685dee71c33c1d1e";

const MOVIE_URL =
  `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const TV_URL =
  `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_origin_country=KR&sort_by=popularity.desc&language=en-US&page=1`;
  
async function getMovies() {

    try {

        const response = await fetch(MOVIE_URL);
        const data = await response.json();

        const movieList = document.getElementById("movie-list");

        data.results.forEach(movie => {

            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            movieCard.style.cursor = "pointer";

            movieCard.addEventListener("click", function() {
                window.location.href = `movie.html?id=${movie.id}`;
            });

            movieCard.innerHTML = `
                <img 
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                    alt="${movie.title}"
                >

                <h3>${movie.title}</h3>

                <p>⭐ ${movie.vote_average.toFixed(1)}</p>
            `;

            const watchlistBtn = document.createElement("button");

            watchlistBtn.classList.add("watchlist-btn");

            watchlistBtn.innerHTML = "🔖 Add to Watchlist";
let savedWatchlist =
    JSON.parse(localStorage.getItem("watchlist")) || [];

if (savedWatchlist.some(item => item.id === movie.id)) {
    watchlistBtn.innerHTML = "✅ In Watchlist";
}
            watchlistBtn.addEventListener("click", function(event) {

    event.stopPropagation();

    let watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];

    const alreadySaved =
        watchlist.some(item => item.id === movie.id);

    if (alreadySaved) {

        watchlist = watchlist.filter(
            item => item.id !== movie.id
        );

        localStorage.setItem(
            "watchlist",
            JSON.stringify(watchlist)
        );

        watchlistBtn.innerHTML = "🔖 Add to Watchlist";

    } else {

        watchlist.push({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            type: "movie"
        });

        localStorage.setItem(
            "watchlist",
            JSON.stringify(watchlist)
        );

        watchlistBtn.innerHTML = "✅ In Watchlist";

    }

});
            movieCard.appendChild(watchlistBtn);

            movieList.appendChild(movieCard);

        });

    } catch (error) {

        console.error("Movie error:", error);

    }

}

async function getTVShows() {
  try {
    const response = await fetch(TV_URL);
    const data = await response.json();

    const tvList = document.getElementById("tv-list");

data.results.forEach(show => {

    const tvCard = document.createElement("div");
    tvCard.classList.add("movie-card");

    tvCard.innerHTML = `
        <img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            alt="${show.name}"
        >

        <h3>${show.name}</h3>

        <p>⭐ ${show.vote_average.toFixed(1)}</p>
    `;
const watchlistBtn = document.createElement("button");

    watchlistBtn.classList.add("watchlist-btn");

    watchlistBtn.innerHTML = "🔖 Add to Watchlist";

    watchlistBtn.addEventListener("click", function(event) {

        event.stopPropagation();

        let watchlist =
            JSON.parse(localStorage.getItem("watchlist")) || [];

        const alreadySaved =
            watchlist.some(item => item.id === show.id);

        if (alreadySaved) {

            watchlist = watchlist.filter(
                item => item.id !== show.id
            );

            localStorage.setItem(
                "watchlist",
                JSON.stringify(watchlist)
            );

            watchlistBtn.innerHTML = "🔖 Add to Watchlist";

        } else {

            watchlist.push({
                id: show.id,
                title: show.name,
                poster_path: show.poster_path,
                vote_average: show.vote_average,
                type: "tv"
            });

            localStorage.setItem(
                "watchlist",
                JSON.stringify(watchlist)
            );

            watchlistBtn.innerHTML = "✅ In Watchlist";
        }

    });

    let savedWatchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];

    if (savedWatchlist.some(item => item.id === show.id)) {
        watchlistBtn.innerHTML = "✅ In Watchlist";
    }

    tvCard.appendChild(watchlistBtn);
    
    tvList.appendChild(tvCard);
});

  } catch (error) {
    console.error("TV error:", error);
  }
}

getMovies();
getTVShows();

const searchInput = document.getElementById("search");

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchMovies(searchInput.value);
    }

});

async function searchMovies(query) {

    if (!query.trim()) {
        return;
    }

    const SEARCH_URL =
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`;

    try {

        const response = await fetch(SEARCH_URL);
        const data = await response.json();

        const searchList = document.getElementById("search-list");

searchList.innerHTML = "";

        data.results.forEach(item => {

            if (!item.poster_path) {
                return;
            }

            const card = document.createElement("div");
            card.classList.add("movie-card");
           card.style.cursor = "pointer";

card.addEventListener("click", function() {
    window.location.href = `movie.html?id=${item.id}`;
}); 

            const title = item.title || item.name;
            const type = item.media_type === "tv" ? "TV" : "Movie";

            card.innerHTML = `
                <img
                    src="https://image.tmdb.org/t/p/w500${item.poster_path}"
                    alt="${title}"
                >

                <h3>${title}</h3>

                <p>⭐ ${item.vote_average.toFixed(1)} · ${type}</p>
            `;
const watchlistBtn = document.createElement("button");

            watchlistBtn.classList.add("watchlist-btn");

            watchlistBtn.innerHTML = "🔖 Add to Watchlist";

            watchlistBtn.addEventListener("click", function(event) {

                event.stopPropagation();

                let watchlist =
                    JSON.parse(localStorage.getItem("watchlist")) || [];

                const alreadySaved =
                    watchlist.some(saved => saved.id === item.id);

                if (alreadySaved) {

                    watchlist = watchlist.filter(
                        saved => saved.id !== item.id
                    );

                    localStorage.setItem(
                        "watchlist",
                        JSON.stringify(watchlist)
                    );

                    watchlistBtn.innerHTML = "🔖 Add to Watchlist";

                } else {

                    watchlist.push({
                        id: item.id,
                        title: title,
                        poster_path: item.poster_path,
                        vote_average: item.vote_average,
                        type: item.media_type
                    });

                    localStorage.setItem(
                        "watchlist",
                        JSON.stringify(watchlist)
                    );

                    watchlistBtn.innerHTML = "✅ In Watchlist";
                }

            });

            let savedWatchlist =
                JSON.parse(localStorage.getItem("watchlist")) || [];

            if (savedWatchlist.some(saved => saved.id === item.id)) {
                watchlistBtn.innerHTML = "✅ In Watchlist";
            }

            card.appendChild(watchlistBtn);
            
            searchList.appendChild(card);

        });

    } catch (error) {
        console.error("Search error:", error);
    }
}

const menuBtn = document.getElementById("menu-btn");
const hamburgerMenu = document.getElementById("hamburger-menu");

menuBtn.addEventListener("click", function () {

    if (hamburgerMenu.style.display === "flex") {
        hamburgerMenu.style.display = "none";
    } else {
        hamburgerMenu.style.display = "flex";
    }

});