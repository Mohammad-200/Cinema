const apiKey = "dd7e06e21fb7d013bbbced7e171eac8e";

const fetchMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch movies.");
  return response.json();
};

const fetchMovieDetails = async (id) => {
  const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
  const videosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;

  const [detailsResponse, videosResponse] = await Promise.all([
    fetch(detailsUrl),
    fetch(videosUrl),
  ]);

  const [details, videos] = await Promise.all([
    detailsResponse.json(),
    videosResponse.json(),
  ]);

  const trailer = videos.results.find((video) => video.type === "Trailer");
  return {
    ...details,
    trailer: trailer
      ? transformYouTubeUrl(`https://www.youtube.com/watch?v=${trailer.key}`)
      : null,
  };
};

const transformYouTubeUrl = (url) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
};

export { fetchMovies, fetchMovieDetails };
