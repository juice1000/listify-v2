import * as fs from 'fs';
import ytdl from 'ytdl-core';
import ytsr from 'ytsr';

async function downloadTrack(track: string): Promise<Buffer> {
  const searchResults = await ytsr(track, { limit: 1 });
  if (searchResults) {
    const url: string = searchResults.items[0]['url'];
    const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });

    const body = [];
    await stream.forEach((chunk) => {
      body.push(chunk);
    });

    console.log('done downloading: ', track);
    const buffer = Buffer.concat(body);

    return buffer;
  }
}

export { downloadTrack };
