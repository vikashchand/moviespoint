import React from 'react';

function PublicPlaylistCard({ playlist }) {
    return (
        <div className="playlist-card">
            <h4>{playlist.name}</h4>
            <p>Movies:</p>
            <ul>
                {playlist.movies.map((movie, index) => (
                    <li key={index}>
                        <strong>Title:</strong> {movie.title} <br />
                        <strong>Year:</strong> {movie.year} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PublicPlaylistCard;
