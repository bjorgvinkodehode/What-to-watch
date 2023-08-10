//API key and base URL for the Movie Database API
const API_KEY =
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

// Event listener to the #get-movie element to fetch and display a random movie
// Get movie based on selection from the #select-Genre
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
  
  // Get the videos data from the API
  const videosResponse = await fetch(
    `${BASE_URL}/movie/${movie.id}/videos`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  const videosData = await videosResponse.json();

  // Check if there are any videos available
  if (videosData.results.length > 0) {
    // Get the first video
    const video = videosData.results[0];
    
    // Check if the video is a YouTube video
    if (video.site === "YouTube") {
      // Update the src attribute of the iframe element on the page
      document.querySelector("#movie iframe").src = `https://www.youtube.com/embed/${video.key}`;
      
      // Show the iframe element
      document.querySelector("#movie iframe").style.display = "block";
    } else {
      // Hide the iframe element
      document.querySelector("#movie iframe").style.display = "none";
    }
  } else {
    // Hide the iframe element
    document.querySelector("#movie iframe").style.display = "none";
  }
});
