const btn = document.getElementById("search-btn");
const searchQuery = document.getElementById("search");

function fetchData() {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = ""; // Clear previous results

  const query = searchQuery.value.trim();
  if (!query) {
    alert("Please enter a search term!");
    return;
  }

  fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=title,image_id,thumbnail`
  )
    .then((res) => res.json())
    .then((json) => {
      const data = json.data;

      if (data.length === 0) {
        resultsContainer.innerHTML =
          "<p>No results found. Try another search.</p>";
        return;
      }

      data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";

        const header = document.createElement("h1");
        header.textContent = item.title;

        const image = document.createElement("img");
        if (item.image_id) {
          image.src = `https://www.artic.edu/iiif/2/${item.image_id}/full/200,/0/default.jpg`;
        } else {
          image.alt = "No image available";
        }
        image.style.width = "400px";

        const description = document.createElement("p");
        if (item.thumbnail && item.thumbnail.alt_text) {
          description.textContent = item.thumbnail.alt_text;
        } else {
          description.textContent = "No description available.";
        }

        card.appendChild(header);
        card.appendChild(image);
        card.appendChild(description);
        resultsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Something went wrong:", error);
      resultsContainer.innerHTML =
        "<p>An error occurred while fetching data.</p>";
    });
}

// Attach event listener to the button
btn.addEventListener("click", fetchData);
