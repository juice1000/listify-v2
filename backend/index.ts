import express, { Express, Request, Response } from 'express';
import { createServer } from 'node:http';
import session from 'express-session';
import cors from 'cors';

const { Server } = require('socket.io');

import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import { getPlaylistTracks } from './controller/playlist';
import { downloadTrack } from './controller/downloadTrack';
import { SocketReservedEventsMap } from 'socket.io/dist/socket';

//////////////// Setup Server //////////////////
declare module 'express-session' {
  interface SessionData {
    count: number;
  }
}

const port = process.env.PORT || 3000;
const app = express();
const httpServer = createServer(app);

// Session Middleware
const sessionMiddleware = session({
  secret: 'changeit',
  resave: true,
  saveUninitialized: true,
});

app.use(sessionMiddleware);

// CORS
var corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Accept JSON Request and Response
app.use(express.json());

// Socket IO
const io = new Server(httpServer);
io.engine.use(sessionMiddleware);

// Check connection of server
io.on('connection', (socket) => {
  const sessionId = socket.request.session.id;
  // the session ID is used as a room
  socket.join(sessionId);
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Express basic get request
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// Route Playlist
app.post('/playlist', async (req: Request, res: Response) => {
  console.log(req.body);

  const sessionId = req.sessionID;
  const playlistId = req.body.playlistId;

  console.log(playlistId, sessionId);

  if (playlistId) {
    const tracks = await getPlaylistTracks(playlistId);
    // then inside get request we will trigger our websocket connection
    // initial response will be length of songs
    console.log('playlist number of tracks: ', tracks.length);
    // then send over files consecutively and update progress bar
    // this will be important to show our progress bar
    tracks.forEach(async (track) => {
      const buffer = await downloadTrack(track);
      // send through our websocket to client
    });
    res.send('OK');
  } else {
    res.send('NOT OK');
  }
});

// // TODO: get request through express
// getPlaylistTracks().then((tracks) => {
//   // then inside get request we will trigger our websocket connection
//   // initial response will be length of songs
//   console.log('playlist number of tracks: ', tracks.length);

//   // then send over files consecutively and update progress bar
//   // this will be important to show our progress bar
//   tracks.forEach((track) => {
//     const buffer = downloadTrack(track);
//     // send through our websocket to client
//   });
// });
