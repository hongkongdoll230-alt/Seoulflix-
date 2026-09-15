const API_KEY = "93dc5be9db632afc685dee71c33c1d1e";

const ANIME_URL =
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&with_origin_country=JP&sort_by=popularity.desc&language=en-US&page=1`;

async function getAnime() {

    try {

        const response = await fetch(ANIME_URL);
        const data = await response.json();

        const animeList =
            document.getElementById("anime-list");

        data.results.forEach(show => {

            if (!show.poster_path) {
                return;
            }

            const card = document.createElement("div");

            card.classList.add("movie-card");

            card.style.cursor = "pointer";

            card.addEventListener("click", function() {

                window.location.href =
                    `movie.html?id=${show.id}&type=tv`;

            });

            card.innerHTML = `
                <img
                    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    alt="${show.name}"
                >

                <h3>${show.name}</h3>

                <p>⭐ ${show.vote_average.toFixed(1)}</p>
            `;
const watchlistBtn =
    document.createElement("button");

watchlistBtn.classList.add("watchlist-btn");

watchlistBtn.innerHTML =
    "🔖 Add to Watchlist";

watchlistBtn.addEventListener("click", function(event) {

    event.stopPropagation();

    let watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];

    const alreadySaved =
        watchlist.some(item =>
            item.id === show.id &&
            item.type === "tv"
        );

    if (alreadySaved) {

        watchlist = watchlist.filter(item =>
            !(item.id === show.id && item.type === "tv")
        );

        watchlistBtn.innerHTML =
            "🔖 Add to Watchlist";

    } else {

        watchlist.push({
            id: show.id,
            title: show.name,
            poster_path: show.poster_path,
            vote_average: show.vote_average,
            type: "tv"
        });

        watchlistBtn.innerHTML =
            "✅ In Watchlist";
    }

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

});

let savedWatchlist =
    JSON.parse(localStorage.getItem("watchlist")) || [];

if (
    savedWatchlist.some(item =>
        item.id === show.id &&
        item.type === "tv"
    )
) {
    watchlistBtn.innerHTML =
        "✅ In Watchlist";
}

card.appendChild(watchlistBtn);

            animeList.appendChild(card);

        });

    } catch (error) {

        console.error("Anime error:", error);

    }

}

getAnime();