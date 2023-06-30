const searchMovieForm = document.getElementById("searchForm");

searchMovieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.getElementById("searchMovie");
  removeAllChildNodes();
  fetchMovieData(search.value);
  search.value = "";
});

async function fetchMovieData(search) {
  const parentCard = document.querySelector(".cards-parent");
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=ee62d61b`
    );
    const movieData = await response.json();
    const moviesAllCards = movieData.Search.reduce(
      (acc, curr) => acc + makeCard(curr),
      ""
    );

    parentCard.insertAdjacentHTML("afterbegin", moviesAllCards);
  } catch (error) {
    parentCard.insertAdjacentHTML("afterbegin", "<h1>Oops...Not found!</h1>");
  }
}

function makeCard(card) {
  const cardHtml =
    card.Poster !== "N/A"
      ? `
    <div class="card">
            <img src=${card.Poster}
                alt="not available" class="card-image">
                <div class="card-content">
            <h2>Title : ${card.Title}</h2>
            <h3>Year : ${card.Year}</h3>
            <h4 class="movie-type">Type : <span>${card.Type.toUpperCase()}</span></h4>
            </div>
        </div>
    `
      : "<div></div>";
  return cardHtml;
}

function removeAllChildNodes() {
  const parent = document.querySelector(".cards-parent");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
