function extractTrackInfo(playlistItems: any[]) {
  const trackTitles: string[] = [];
  playlistItems.forEach((playlistItem) => {
    const track = playlistItem.track;
    const trackName = track.name;
    const trackArtist = track.artists[0].name;

    trackTitles.push(`${trackName} by ${trackArtist}`);
  });
  return trackTitles;
}

export { extractTrackInfo };
