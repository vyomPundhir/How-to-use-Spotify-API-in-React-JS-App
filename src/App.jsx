import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const client_id= "020989549ba041579c0eb90c5014562e"
  const redirect_uri="http://localhost:5173/"
  const api_uri = "https://accounts.spotify.com/authorize";
  const response_type = "token"
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

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if(!token && hash){
      token=hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    setToken(token)
  }, [])

  const logout = () =>{
    setToken("")
    window.localStorage.removeItem("token")
  }
  
  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q : searchKey,
        type: "artist"
      }
    })

    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img className='w-[100px] h-[100px]' src={artist.images[0].url}/> : <div>No Image</div>}
        {artist.name}
      </div>
    ))
  }

  return (
    <div className="bg-slate-900 h-auto text-white">
      <header>
        <h1>Spotify React</h1>
        {!token ?
        <a href={`${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(" ")}&response_type=${response_type}&show_dialog=true`}>Login to spotify</a> : <button onClick={logout}>Logout</button>
        }

        {
          token ? 
          <form onSubmit={searchArtists}>
            <input className='text-black' type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"}>Search</button>
          </form>

          : <h2>Please Login</h2>
        }

        {
          renderArtists()
        }
        
      </header>
    </div>
  )
}

export default App









// import React, { useEffect } from 'react'
// import Login from './components/Login'
// import { useStateProvider } from './utils/StateProvider'
// import { reducerCases } from './utils/Constants';
// import Spotify from './components/Spotify';

// const App = () => {
//   const [{token}, dispatch] = useStateProvider();
//   useEffect(() => {
//     const hash = window.location.hash;
//     if(hash){
//       const token = hash.substring(1).split("&")[0].split('=')[1];
//       dispatch({ type: reducerCases.SET_TOKEN, token });
//     }
//   }, [dispatch, token]);
  

//   return token ? (<Spotify/>) :
//   (
//     <div className="bg-slate-800 h-screen text-white">
//       <Login/>
//     </div>
//   )
// }

// export default App