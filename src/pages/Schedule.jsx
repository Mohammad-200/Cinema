import React from 'react'
import "./schedule.css"
import Cart from '../components/Cart';


const apiKey = "dd7e06e21fb7d013bbbced7e171eac8e";

function Schedule() {
    const filterList = [
        {
            _id: 1,
            name: 'All',
            active: true,
        },
        {
            _id: 2,
            name: 'Romance',
            active: false,
        },
        {
            _id: 3,
            name: 'Action',
            active: false,
        },
        {
            _id: 4,
            name: 'Thriller',
            active: false,
        },
        {
            _id: 5,
            name: 'Horror',
            active: false,
        },
        {
            _id: 6,
            name: 'Adventure',
            active: false,
        },
    ]

    const [data, setData] = React.useState([])
    const [movies, setMovies] = React.useState([])
    const [loading, setLoading] = React.useState(true);
    const [filters, setFilters] = React.useState(filterList)

    


    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
            const data = await response.json();
            setMovies(data.results);
            setLoading(false);
      
            
            const moviePromises = data.results.map(async (movie) => {
              const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`);
              const movieData = await movieResponse.json();
      
              
              setMovies((prevMovies) => {
                const updatedMovies = prevMovies.map((prevMovie) => {
                  if (prevMovie.id === movie.id) {
                    return {
                      ...prevMovie,
                      genres: movieData.genres,
                    };
                  }
                  return prevMovie;
                });
                return updatedMovies;
              });
            });
      
            // Wait for all fetch requests to complete before updating state again
            await Promise.all(moviePromises);
            setLoading(false);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };
      
        fetchData();
      }, []);
      
            
      React.useEffect(() => {
          setMovies(data);
      }, [data])

      const filterMovies = category => {
          const filteredMovies = movies.filter(movie => movie.genres.some(genre => genre.name === category));
          return setMovies(filteredMovies)
        
      }


  return (
    <section className="schedule" id='schedule'>
        <div className="container-fluid">
            <div className="row">
                <h2 className='section-title'>opening this week</h2>
            </div>
             <div className="row">
                
                   <ul className="filters">
                        {
                            filters.map(filter => {
                               return <li key={filter.id} 
                                          className={`${filter.active ? 'active' : ''}`}
                                          onClick={()=>filterMovies(filter.name)}
                                          >{filter.name}</li>
                            })
                        }
                   </ul>
                
            </div>
            <div className="row mt-5">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    movies.map(movie => <Cart key={movie.id} movie={movie}/>)
                )}
            </div>
        </div>
    </section>
  )
}

export default Schedule
