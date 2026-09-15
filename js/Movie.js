const API_KEY = "93dc5be9db632afc685dee71c33c1d1e";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const mediaType = params.get("type") || "movie";

const movieDetails = document.getElementById("movie-details");

async function getMovieDetails() {

    if (!movieId) {
        movieDetails.innerHTML = "<p>Movie not found.</p>";
        return;
    }

    const API_URL =
    `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`;

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load movie");
        }

        const movie = await response.json();

        const title = mediaType === "tv" ? movie.name : movie.title;

        const releaseDate = mediaType === "tv"
            ? movie.first_air_date
            : movie.release_date;

        let trailer = movie.videos.results.find(
            video => video.type === "Trailer" && video.site === "YouTube"
        );

        movieDetails.innerHTML = `
            <div class="details-container">

                <img
                    class="details-poster"
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    alt="${title}"
                >

                <div class="details-info">

                    <button id="watchlist-btn">
                        🔖 Add to Watchlist
                    </button>

                    <h1>${title}</h1>

                    <p>⭐ ${movie.vote_average.toFixed(1)}</p>

                    <p>📅 ${releaseDate}</p>

                    <p>${movie.overview}</p>

${
    trailer
    ? `
        <div class="trailer">
            <h2>🎬 Trailer</h2>

            <button
                class="play-trailer"
                onclick="playTrailer('${trailer.key}')">
                ▶ Play Trailer
            </button>

            <div id="trailer-player"></div>
        </div>
    `
    : "<p>No trailer available.</p>"
}

                </div>

            </div>
        `;

        // WATCHLIST

        const watchlistBtn =
            document.getElementById("watchlist-btn");

        let watchlist =
            JSON.parse(localStorage.getItem("watchlist")) || [];

        const alreadySaved =
            watchlist.some(item =>
                item.id === movie.id &&
                item.type === mediaType
            );

        if (alreadySaved) {
            watchlistBtn.innerHTML = "✅ In Watchlist";
        }

        watchlistBtn.addEventListener("click", function() {

            let watchlist =
                JSON.parse(localStorage.getItem("watchlist")) || [];

            const savedIndex =
                watchlist.findIndex(item =>
                    item.id === movie.id &&
                    item.type === mediaType
                );

            if (savedIndex !== -1) {

                watchlist.splice(savedIndex, 1);

                watchlistBtn.innerHTML =
                    "🔖 Add to Watchlist";

            } else {

                watchlist.push({
                    id: movie.id,
                    title: title,
                    poster_path: movie.poster_path,
                    vote_average: movie.vote_average,
                    type: mediaType
                });

                watchlistBtn.innerHTML =
                    "✅ In Watchlist";
            }

            localStorage.setItem(
                "watchlist",
                JSON.stringify(watchlist)
            );

        });

    } catch (error) {

        console.error(error);

        movieDetails.innerHTML =
            "<p>Sorry, we couldn't load this movie.</p>";
    }
}

getMovieDetails();

function playTrailer(trailerKey) {

    const player = document.getElementById("trailer-player");

    player.innerHTML = `
        <iframe
            src="https://www.youtube.com/embed/${trailerKey}?autoplay=1"
            title="Movie Trailer"
            allowfullscreen>
        </iframe>
    `;
}