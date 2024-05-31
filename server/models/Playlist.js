const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    public: { type: Boolean, default: true },
    movies: [{ 
      imdbID: { type: String, required: true }, // Movie IMDb ID
      title: { type: String, required: true },
      year: { type: String },
      // Add more movie details here if needed
    }]
});

module.exports = mongoose.model('Playlist', playlistSchema);
