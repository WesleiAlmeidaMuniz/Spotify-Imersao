const searchInput = document.getElementById("search-input");
const resultsArtists = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");

function requestApi(searchTerm) {
  const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      const filteredResults = result.filter((artist) =>
        artist.name.toLowerCase().startsWith(searchTerm)
      );
      displayResults(filteredResults);
    });
}

function displayResults(result) {
  resultPlaylist.classList.add("hidden");
  const grid = document.getElementById("grid-container");

  grid.innerHTML = "";

  result.forEach((element) => {
    grid.innerHTML += `<div class="artist-card" id="">
        <div class="card-img">
            <img id="artist-img" class="artist-img" src='${element.urlImg}' />
        <div class="play">
            <span class="fa fa-solid fa-play"></span>
        </div>
        </div>
        <div class="card-text">
            <a title="${element.name}" class="vst" href=""></a>
            <span class="artist-name" id="artist-name">${element.name}</span>
            <span class="artist-categorie">Artista</span>
        </a>
        </div>
        </div>`;
  });

  resultsArtists.classList.remove("hidden");
}

document.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultPlaylist.classList.remove("hidden");
    resultsArtists.classList.add("hidden");
    return;
  }

  requestApi(searchTerm);
});
