
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGIyZGRjZWFhNDE3MDU1YWExYmJiNmE4NTg2NDIwZCIsInN1YiI6IjY0ODJlYzk0ZTI3MjYwMDBjOTJmYzk3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vNTJgQc8kvDPiyMDV_KSzpC26Trk7oqkPknzyDm-_S8";
const BASE_URL = "https://api.themoviedb.org/3";
async function getRandomMovie(genre) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genre}`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.results.length);
  const randomMovie = data.results[randomIndex];
  return randomMovie;
}

document.querySelector("#random-Movie").addEventListener("click", async () => {
  const selectGenre = document.querySelector("#select-Genre");
  const genreId = selectGenre.value;
  const movie = await getRandomMovie(genreId);
  const movieInfoDiv = document.querySelector(".movie-info");

  document.querySelector("#movie h2").textContent = movie.title;
  document.querySelector("#movie img").src = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
  document.querySelector("#movie img").alt = movie.title;
  document.querySelector("#movie p").textContent = movie.overview;
  

movieInfoDiv.classList.remove('hidden');

  const videosResponse = await fetch(
    `${BASE_URL}/movie/${movie.id}/videos`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  const videosData = await videosResponse.json();

  if (videosData.results.length > 0) {
    const video = videosData.results[0];

    if (video.site === "YouTube") {
      const youtubeUrl = `https://www.youtube.com/watch?v=${video.key}`;
      document.querySelector("#open-trailer").addEventListener("click", () => {
        window.open(youtubeUrl, '_blank');
      });
      document.querySelector("#open-trailer").style.display = "block";
    } else {
      document.querySelector("#open-trailer").style.display = "none";
    }
  } else {
    document.querySelector("#open-trailer").style.display = "none";
  }

  const movieImg = document.querySelector("#movie img");

// Function to set image size based on screen width
const setImageSize = () => {
  const width = window.innerWidth;
  if (width <= 768) {
    movieImg.src = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
  } else {
    movieImg.src = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
  }
};

// Initially set image size
setImageSize();

// Update image size on window resize
window.addEventListener('resize', setImageSize);

});