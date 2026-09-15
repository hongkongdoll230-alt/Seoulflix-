const API_KEY = "93dc5be9db632afc685dee71c33c1d1e";

const movieContainer = document.getElementById("movie-list");


async function loadMovies() {

    try {

        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`
        );

        const data = await response.json();

        movieContainer.innerHTML = "";

        data.results.forEach(movie => {

            const card = document.createElement("div");

            card.className = "movie-card";

            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.vote_average.toFixed(1)}</p>
            `;

            card.onclick = () => {
                window.location.href =
                    `movie.html?id=${movie.id}&type=movie`;
            };

            movieContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Error loading movies:", error);

        movieContainer.innerHTML =
            "<p>Unable to load movies.</p>";

    }

}


loadMovies();