import SpotifyWebApi from 'spotify-web-api-node';
import { setAccessToken } from './auth';
import { extractTrackInfo } from '../models/spotifyData';

// credentials are optional
let spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

async function getPlaylistTracks(): Promise<string[]> {
  if (!spotifyApi['expires_at'] || spotifyApi['expires_at'] < new Date().getTime() / 1000) {
    await setAccessToken(spotifyApi);
  }

  const accessToken = spotifyApi.getAccessToken();
  console.log('The access token is: ' + accessToken);

  const playlist = await spotifyApi.getPlaylist('6akIIIBefkT7JV8sA8G55W');

  if (playlist) {
    const tracks = extractTrackInfo(playlist.body.tracks.items);
    return tracks;
  } else {
    return [];
  }
}

export { getPlaylistTracks };
