import React from 'react'

const Login = () => {
    const client_id = "020989549ba041579c0eb90c5014562e";
    const redirect_uri = "http://localhost:5173/";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      'user-read-email',
      'user-read-private',
      'user-modify-playback-state',
      'user-read-playback-state',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-read-playback-position',
      'user-top-read'
    ];


  return (
    <section className='bg-[black] h-full text-white'>

      <a href="#">Spotify Login</a>

    </section>
  )
}

export default Login