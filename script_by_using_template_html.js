const searchMovieForm = document.getElementById("searchForm");

searchMovieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.getElementById("searchMovie");
  fetchMovieData(search.value);
  search.value = "";
});

async function fetchMovieData(search) {
  const cardsParent = document.querySelector(".cards-parent");
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=ee62d61b`
    );
    const movieData = await response.json();
    bindMovieData(movieData.Search);
  } catch (error) {
    cardsParent.innerHTML = "<h1>Oops...Not found!</h1>";
  }
}

function bindMovieData(movies) {
  const parentCard = document.querySelector(".cards-parent");
  const movieCardTemplate = document.getElementById("movie-card-template");
  parentCard.innerHTML = "";
  movies.map((movie) => {
    if (movie.Poster === "N/A") return;
    const cardClone = movieCardTemplate.content.cloneNode(true);
    makeCard(cardClone, movie);
    parentCard.appendChild(cardClone);
  });
}
function makeCard(cardClone, movie) {
  const cardImg = cardClone.querySelector(".card-image");
  const cardTitle = cardClone.querySelector("#title span");
  const cardYear = cardClone.querySelector("#year span");
  const cardType = cardClone.querySelector(".movie-type span");

  cardImg.src = movie.Poster;
  cardTitle.innerHTML = movie.Title;
  cardYear.innerHTML = movie.Year;
  cardType.innerHTML = movie.Type.toUpperCase();
}
