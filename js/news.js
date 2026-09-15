const API_KEY = "50ce894c4b274aeca07a57fea2f6d307";

let currentPage = 1;
const articlesPerPage = 6;

const newsList = document.getElementById("news-list");

const keywords = [
    "k-drama",
    "korean drama",
    "k-pop",
    "korean actor",
    "korean actress",
    "korean singer",
    "korean idol",
    "korean entertainment"
];

function loadNews() {

    const params = new URLSearchParams({
        q: '"K-drama" OR "Korean drama" OR "K-pop" OR "Korean actor" OR "Korean actress"',
        language: "en",
        sortBy: "publishedAt",
        pageSize: "30",
        page: currentPage,
        domains: "soompi.com",
        apiKey: API_KEY
    });

    fetch(`https://newsapi.org/v2/everything?${params}`)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            const relevantArticles = data.articles
                .filter(article => {

                    const text = (
                        (article.title || "") + " " +
                        (article.description || "")
                    ).toLowerCase();

                    return keywords.some(keyword =>
                        text.includes(keyword)
                    );
                })
                .slice(0, articlesPerPage);

            relevantArticles.forEach(article => {

                const card = document.createElement("div");
                card.className = "news-card";

                // Image
                if (article.urlToImage) {
                    const image = document.createElement("img");

                    image.src = article.urlToImage;
                    image.alt = article.title;

                    card.appendChild(image);
                }

                // Source
                const source = document.createElement("p");
                source.className = "news-source";
                source.textContent = article.source.name;

                card.appendChild(source);

                // Title
                const title = document.createElement("h3");
                title.textContent = article.title;

                card.appendChild(title);

                // Date
                const date = document.createElement("p");
                date.textContent = new Date(
                    article.publishedAt
                ).toLocaleDateString();

                card.appendChild(date);

                // Read story
                const link = document.createElement("a");
                link.textContent = "Read full story";
                link.href = article.url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                card.appendChild(link);

                newsList.appendChild(card);
            });

            currentPage++;

            // Remove old button
            const oldButton =
                document.getElementById("read-more-news");

            if (oldButton) {
                oldButton.remove();
            }

            // Add Read More button
            const button = document.createElement("button");

            button.id = "read-more-news";
            button.textContent = "Read More News";

            button.addEventListener("click", loadNews);

            newsList.parentElement.appendChild(button);
        })
        .catch(error => {
            console.error("News fetch failed:", error);
        });
}

// First batch
loadNews();