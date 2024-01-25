import React from 'react'
import "./banner.css"
import MovieContent from '../components/MovieContent';
import MovieDate from '../components/MovieDate';
import Playbtn from '../components/Playbtn';
import MovieSwiper from '../components/MovieSwiper';
import defaultImage from '../images/default-back-picture.jpg'


const apiKey = "dd7e06e21fb7d013bbbced7e171eac8e";

function Banner() {   
    const [movies, setMovies] = React.useState([])
    const [activeMovie, setActivemovie] = React.useState(false)
    
    const fetchData = () => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
            .then(res => res.json())
            .then(data => {
                if (data && data.results) {
                    data.results[0].active = true;
                    setActivemovie(data.results[0]);
                }
                setMovies(data);
                
                data.results.forEach(movie => {
                    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`)
                        .then(response => response.json())
                        .then(movieData => {
                          
                            setMovies(prevMovies => {
                                const updatedMovies = prevMovies.results.map(prevMovie => {
                                    if (prevMovie.id === movie.id) {
                                        return {
                                            ...prevMovie,
                                            genres: movieData.genres,
                                        };
                                    }
                                    return prevMovie;
                                });
                                return {
                                    ...prevMovies,
                                    results: updatedMovies,
                                };
                            });
                        })
                        .catch(error => console.error(error));
                });
            })
            .catch(error => console.error(error));
    };
    
    
    React.useEffect(() => {
        fetchData();
    }, [])

   
   function addActive() {
    if (movies && movies.results) {
        movies.results.map(movie => ({
            ...movie,
            active: activeMovie
        }))
    }
   } 
   addActive();

    const updateInfo = (id) => {
        if (movies && movies.results) {
           setMovies(prevMovies => {
            const updatedMovies = prevMovies.results.map(movie => {
                movie.active = false

                if (id === movie.id) {
                    movie.active = true
                }
                return movie
            });
            return {
                ...prevMovies,
                results: updatedMovies
            };
           });
        }
    };
    
   console.log(movies.results)
  return (
    <div className="banner">
        {movies && movies.results  ? (movies.results.map(movie => (
            <div className="movie" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="Backgrpund Image" className={`bgImg ${movie.active ? "active" : ''}`} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <MovieContent movie={movie}/>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <MovieDate movie={movie}/>
                            <Playbtn movie={movie}/>
                        </div>
                    </div>
                </div>
            </div>
        ))
        ) : (<p>Loading...</p>)}
        {movies && movies.results  ? <MovieSwiper slides ={movies} updateInfo={updateInfo}/> : <p>Loading...</p>}
        
    </div>
    
  )
}

export default Banner
