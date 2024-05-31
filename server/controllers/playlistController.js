const Playlist = require('../models/Playlist');

// Controller method to create a new playlist
exports.createPlaylist = async (req, res) => {
    try {
        console.log("Received playlist data:", req.body);

        const { userId, name, public, movies } = req.body;

        // Check if a playlist with the same name already exists for the user
        const existingPlaylist = await Playlist.findOne({ userId, name });
        if (existingPlaylist) {
            return res.status(400).json({ message: 'A playlist with this name already exists.' });
        }

        const newPlaylist = new Playlist({ userId, name, public, movies });
        await newPlaylist.save();
        res.status(201).json(newPlaylist);
    } catch (err) {
        console.error("Error creating playlist:", err);
        res.status(500).json({ message: err.message });
    }
};


// Controller method to get all playlists for a user
exports.getPlaylists = async (req, res) => {
    try {
        const userId = req.params.userId;
        const playlists = await Playlist.find({ userId });
        res.json(playlists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller method to update a playlist
// Controller method to update a playlist
exports.updatePlaylist = async (req, res) => {
    try {
        const { movieId, title, year } = req.body; // Get movie details from request body
        const playlistId = req.params.id; 

        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            playlistId,
            { $push: { movies: { imdbID: movieId, title, year } } }, // Push movie object
            { new: true }
        );

        if (!updatedPlaylist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.json(updatedPlaylist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePlaylistView= async (req, res) => {
    try {
        const { public } = req.body;
        const playlistId = req.params.id; 

        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            playlistId,
            { $set: { public } },
            { new: true }
        );

        if (!updatedPlaylist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.json(updatedPlaylist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller method to delete a playlist
exports.deletePlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id; // Assuming playlistId is passed in the URL params

        const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

        if (!deletedPlaylist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.json({ message: 'Playlist deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.getPublicPlaylists = async (req, res) => {
    try {
        const publicPlaylists = await Playlist.find({ public: true });
        res.json(publicPlaylists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};













// Controller method to update the privacy status of a playlist
exports.updatePlaylistPrivacy = async (req, res) => {
    try {
        const { public } = req.body;
        const playlistId = req.params.id;

        console.log('Received request to update playlist privacy');
        console.log('Playlist ID:', playlistId);
        console.log('New Privacy Status:', public);

        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            playlistId,
            { $set: { public } },
            { new: true }
        );

        console.log('Updated Playlist:', updatedPlaylist);

        if (!updatedPlaylist) {
            console.log('Playlist not found');
            return res.status(404).json({ message: 'Playlist not found' });
        }

        console.log('Playlist updated successfully');
        res.json(updatedPlaylist);
    } catch (err) {
        console.error('Error updating playlist privacy:', err);
        res.status(500).json({ message: 'Error updating playlist privacy' });
    }
};


// In your backend, e.g., Express.js

exports.deletelist = async (req, res) => {
    try {
      const playlistId = req.params.id;
      // Assuming you have a function to delete a playlist by its ID
      const result = await deletePlaylistById(playlistId);
      if (result) {
        res.status(200).send({ message: 'Playlist deleted successfully' });
      } else {
        res.status(404).send({ message: 'Playlist not found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };
  


