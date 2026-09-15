const params =
    new URLSearchParams(window.location.search);

const workKey =
    params.get("work");

const novelDetails =
    document.getElementById("novel-details");


async function getNovelDetails() {

    if (!workKey) {

        novelDetails.innerHTML =
            "<p>Novel not found.</p>";

        return;
    }

    try {

        const response =
            await fetch(
                `https://openlibrary.org${workKey}.json`
            );

        if (!response.ok) {
            throw new Error("Could not load novel");
        }

        const book =
            await response.json();

        const title =
            book.title || "Unknown title";

        const description =
            typeof book.description === "string"
                ? book.description
                : book.description?.value
                    || "No description available.";

        const coverId =
            book.covers?.[0];


        // Open Library button

        const openLibraryButton = `
            <a
                href="https://openlibrary.org${workKey}"
                target="_blank"
                rel="noopener noreferrer"
                class="play-trailer">
                🔗 Open in Open Library
            </a>
        `;


        novelDetails.innerHTML = `

            <div class="details-container">

                ${
                    coverId
                    ? `
                        <img
                            class="details-poster"
                            src="https://covers.openlibrary.org/b/id/${coverId}-L.jpg"
                            alt="${title}"
                        >
                    `
                    : ""
                }

                <div class="details-info">

                    <h1>${title}</h1>

                    <p>${description}</p>

                    ${openLibraryButton}

                </div>

            </div>

        `;

    } catch (error) {

        console.error("Novel error:", error);

        novelDetails.innerHTML =
            "<p>Sorry, we couldn't load this novel.</p>";

    }

}


getNovelDetails();