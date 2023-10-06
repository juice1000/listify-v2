import SpotifyWebApi from 'spotify-web-api-node';

async function setAccessToken(spotifyApi): Promise<void> {
  try {
    // Retrieve an access token.
    const data = await spotifyApi.clientCredentialsGrant();
    const tokenExpirationEpoch = new Date().getTime() / 1000 + data.body['expires_in'];

    console.log('New access token generated, expires in: ' + Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) + ' seconds!');
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi['expires_at'] = tokenExpirationEpoch;
  } catch (error) {
    console.error('Something went wrong when retrieving an access token', error);
  }
}

export { setAccessToken };
