let searchButton = document.getElementById("submitButton");

searchButton.addEventListener("click", () => {
  let search = document.getElementById("searchMovie");
  removeAllChildNodes();
  fetchMovieData(search.value);
  search.value = "";
});

async function fetchMovieData(search) {
  try {
    let response = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=ee62d61b`
    );
    let movieData = await response.json();
    movieData = movieData.Search;
    const moviesAllCards = movieData.reduce(
      (acc, curr) => acc + makeCard(curr),
      ""
    );

    const parentCard = document.querySelector(".cards-parent");
    parentCard.insertAdjacentHTML("afterbegin", moviesAllCards);
  } catch (error) {
    console.log(error);
  }
}

function makeCard(card) {
  let cardHtml = `
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
