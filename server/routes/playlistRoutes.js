const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const authenticateUser = require('../middlewares/authenticate');

router.post('/create', playlistController.createPlaylist);
router.get('/:userId',playlistController.getPlaylists);
router.patch('/:id', playlistController.updatePlaylist);
router.patch('/update/:id', playlistController.updatePlaylistView);

router.patch('/privacy/:id', authenticateUser, playlistController.updatePlaylistPrivacy);
router.delete('/delete/:id',playlistController.deletePlaylist);
// Add more routes for playlist-related operations

router.get('/public/types', playlistController.getPublicPlaylists);

module.exports = router;
