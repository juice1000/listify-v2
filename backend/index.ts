import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import { getPlaylistTracks } from './controller/playlist';
import { downloadTrack } from './controller/downloadTrack';

// get request through express
getPlaylistTracks().then((tracks) => {
  // then inside get request we will trigger our websocket connection
  // initial response will be length of songs
  console.log(tracks.length);

  // then send over files consecutively and update progress bar
  // this will be important to show our progress bar
  tracks.forEach((track) => {
    const buffer = downloadTrack(track);
    // send through our websocket to client
  });
});
