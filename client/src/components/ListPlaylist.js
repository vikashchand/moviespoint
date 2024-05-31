import React, {  useEffect, useState } from 'react'
import axios from 'axios';
import ListMovie from './ListMovie';

function ListPlaylist({id}) {
    // console.log(id);
    const [movies, setMovieData] = useState({});

    useEffect(() => {
        const fetchMovieData = async () => {
            const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=ee706b8`)
            console.log( response.data);
            setMovieData(response.data);
        }
        fetchMovieData()
    }, [id]);
  return (
    <div>
        <h2>movies {id}</h2>
        <div className='row w-100 m-2'>
        <ListMovie movies={movies} />
      </div>
    </div>
  )
}

export default ListPlaylist