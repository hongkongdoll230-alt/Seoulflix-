const watchlistList = document.getElementById("watchlist-list");

let watchlist =
    JSON.parse(localStorage.getItem("watchlist")) || [];

if (watchlist.length === 0) {

    watchlistList.innerHTML =
        "<p>Your watchlist is empty.</p>";

} else {

    watchlist.forEach(item => {

        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.style.cursor = "pointer";

        card.addEventListener("click", function() {

            window.location.href =
    `movie.html?id=${item.id}&type=${item.type}`;

        });

        card.innerHTML = `
            <img
                src="https://image.tmdb.org/t/p/w500${item.poster_path}"
                alt="${item.title}"
            >

            <h3>${item.title}</h3>

            <p>⭐ ${item.vote_average.toFixed(1)}</p>

            <button class="remove-watchlist">
                ❌ Remove
            </button>
        `;

        const removeBtn =
            card.querySelector(".remove-watchlist");

        removeBtn.addEventListener("click", function(event) {

            event.stopPropagation();

            watchlist = watchlist.filter(
                saved => saved.id !== item.id
            );

            localStorage.setItem(
                "watchlist",
                JSON.stringify(watchlist)
            );

            card.remove();

            if (watchlist.length === 0) {
                watchlistList.innerHTML =
                    "<p>Your watchlist is empty.</p>";
            }

        });

        watchlistList.appendChild(card);

    });

}