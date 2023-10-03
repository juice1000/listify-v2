import React from 'react';
import Form from './components/Form';
import './App.css';

function App() {
  return (
    <div className="my-16 mx-32">
      <img src="./spotify_logo.png" className="logo" alt="logo"></img>
      <h1 className="text-6xl font-bold">Welcome to Listify!</h1>
      <h2 className="text-3xl">Download your Spotify playlists and get the song files in highest quality</h2>
      <Form />
    </div>
  );
}

export default App;
