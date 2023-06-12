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

document.querySelector("#random-Movie").addEventListener("click", async () => {
  const selectGenre = document.querySelector("#select-Genre");
  const genreId = selectGenre.value;
  const movie = await getRandomMovie(genreId);
  
  // Update the text content of the elements on the page
  document.querySelector("#movie h2").textContent = movie.title;
  document.querySelector("#movie img").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  document.querySelector("#movie img").alt = movie.title;
  document.querySelector("#movie p").textContent = movie.overview;
  
  // Get the streaming service availability data from the API
  const availabilityResponse = await fetch(
    `${BASE_URL}/movie/${movie.id}/watch/providers`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  const availabilityData = await availabilityResponse.json();
  
  // Check if the movie is available on any streaming services
  if (availabilityData.results.NO && availabilityData.results.NO.flatrate) {
    // Get the first available streaming service
    const streamingService = availabilityData.results.NO.flatrate[0];
    
    // Update the href and text content of the link element on the page
    document.querySelector("#movie a").href = streamingService.link;
    document.querySelector("#movie a").textContent = `Watch on ${streamingService.provider_name}`;
    
    // Show the link element and hide the "not available" message
    document.querySelector("#movie a").style.display = "inline";
    document.querySelector("#movie p:nth-of-type(2)").style.display = "none";
  } else {
    // Hide the link element and show the "not available" message
    document.querySelector("#movie a").style.display = "none";
    document.querySelector("#movie p:nth-of-type(2)").style.display = "block";
  }
});
