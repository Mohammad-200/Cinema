import React, { useState, useEffect } from 'react';
import "./banner.css";
import MovieContent from '../components/MovieContent';
import MovieDate from '../components/MovieDate';
import Playbtn from '../components/Playbtn';
import MovieSwiper from '../components/MovieSwiper';

const apiKey = "dd7e06e21fb7d013bbbced7e171eac8e";

function Banner() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
            if (!response.ok) throw new Error('Failed to fetch movies.');
            const data = await response.json();

            if (data && data.results) {
                const moviesWithDetails = await Promise.all(data.results.map(async movie => {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`);
                    const details = await response.json();
                    return { ...movie, genres: details.genres, active: false };
                }));

                if (moviesWithDetails.length > 0) moviesWithDetails[0].active = true;

                setMovies(moviesWithDetails);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(movies)

    const updateActiveMovie = (id) => {
        setMovies(prevMovies => prevMovies.map(movie => ({
            ...movie,
            active: movie.id === id,
        })));
    };

    return (
        <div className="banner">
            {movies && movies.length > 0 && !isLoading ?  (
                movies.map(movie => (
                    <div className="movie" key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="Movie background" className={`bgImg ${movie.active ? "active" : ''}`} />
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
            ) : (<p>Data is loading...</p>)}
            {movies && movies.length > 0 && !isLoading ? (
                <MovieSwiper slides={movies} updateInfo={updateActiveMovie} />
            ) : <p>Data is loading...</p>}
        </div>
    );
}

export default Banner;
