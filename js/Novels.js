const NOVEL_LIMIT = 20;

const novelList =
    document.getElementById("novel-list");

const novelSearch =
    document.getElementById("novel-search");


async function getNovels(query = "romance") {

    try {

        novelList.innerHTML =
            "<p>Loading novels...</p>";

        const NOVEL_URL =
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=*,availability&limit=${NOVEL_LIMIT}`;
    
        const response =
            await fetch(NOVEL_URL);

        if (!response.ok) {
            throw new Error("Could not load novels");
        }

        const data =
            await response.json();

        novelList.innerHTML = "";

        if (data.docs.length === 0) {

            novelList.innerHTML =
                "<p>No novels found.</p>";

            return;
        }

        data.docs.forEach(book => {

            if (!book.cover_i) {
                return;
            }

            const card =
                document.createElement("div");

            card.classList.add("movie-card", "novel-card");

card.style.cursor = "pointer";

card.addEventListener("click", function() {

    window.location.href =
        `novel.html?work=${book.key}`;

});

card.innerHTML = `

                <img
                    src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
                    alt="${book.title}"
                >

                <h3>${book.title}</h3>

                <p>
                    ✍️ ${book.author_name
                        ? book.author_name[0]
                        : "Unknown author"}
                </p>

                <p>
                    📅 ${book.first_publish_year
                        || "Unknown year"}
                </p>
            `;

            novelList.appendChild(card);

        });

    } catch (error) {

        console.error("Novel error:", error);

        novelList.innerHTML =
            "<p>Sorry, we couldn't load the novels.</p>";

    }

}


// Search when Enter is pressed

novelSearch.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            const query =
                novelSearch.value.trim();

            if (query) {
                getNovels(query);
            }

        }

    }
);


// Load novels when page opens

getNovels();