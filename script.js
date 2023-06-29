const searchButton = document.getElementById("submitButton");

searchButton.addEventListener("click", () => {
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
  const cardHtml = `
    <div class="card">
            <img src=${card.Poster}
                alt="not available" class="card-image">
            <h3>Title : ${card.Title}</h3>
            <h4>Year : ${card.Year}</h4>
            <h5>Type : ${card.Type}</h5>
        </div>
    `;
  return cardHtml;
}

function removeAllChildNodes() {
  const parent = document.querySelector(".cards-parent");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
