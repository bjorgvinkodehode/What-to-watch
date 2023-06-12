//API key and base URL for the Movie Database API
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGIyZGRjZWFhNDE3MDU1YWExYmJiNmE4NTg2NDIwZCIsInN1YiI6IjY0ODJlYzk0ZTI3MjYwMDBjOTJmYzk3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vNTJgQc8kvDPiyMDV_KSzpC26Trk7oqkPknzyDm-_S8";
const BASE_URL = "https://api.themoviedb.org/3";

//asynchronous function to get a random movie from a genre
// Get movie from the API using the provided genre
async function getRandomMovie(genre) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genre}`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  // Parse the response as JSON
  // Generate a random index based on the number of results
  // Get the random movie from the array
  // Return the random movie
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.results.length);
  const randomMovie = data.results[randomIndex];
  return randomMovie;
}

// Add an event listener to the #get-movie element to fetch and display a random movie
// Get movie based on selection from the #genre-select
// Call the getRandomMovie function to get a random movie from the selected genre
// Update the inner HTML

document.querySelector("#random-Movie").addEventListener("click", async () => {
  const selectGenre = document.querySelector("#select-Genre");
  const genreId = selectGenre.value;
  const movie = await getRandomMovie(genreId);
  document.querySelector("#movie").innerHTML = `
    <h2>${movie.title}</h2>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <p>${movie.overview}</p>
  `;
});
