const API_KEY = "93dc5be9db632afc685dee71c33c1d1e";

const KDRAMA_URL =
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_origin_country=KR&sort_by=popularity.desc&language=en-US&page=1`;

async function getKdramas() {

    try {

        const response = await fetch(KDRAMA_URL);
        const data = await response.json();

        const kdramaList =
    document.getElementById("kdrama-list");

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

    kdramaList.appendChild(card);

});

    } catch (error) {

        console.error("K-Drama error:", error);

    }

}

getKdramas();