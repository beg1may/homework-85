import {Container, CssBaseline, Typography} from "@mui/material";
import Artists from "./features/atists/Artists.tsx";
import {Route, Routes} from "react-router-dom";
import AlbumsByIdArtist from "./features/album/AlbumsByIdArtist.tsx";
import TracksByIdAlbum from "./features/tracks/TracksByIdAlbum.tsx";
import {ToastContainer} from "react-toastify";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Track_history from "./features/track_history/Track_history.tsx";

function App() {
  return (
    <>
        <CssBaseline />
        <ToastContainer/>
        <header>
            <AppToolbar />
        </header>
      <main>
         <Container maxWidth="xl">
             <Routes>
                 <Route path='/' element={<Artists />}/>
                 <Route path='/albums/:id' element={<AlbumsByIdArtist />}/>
                 <Route path='/tracks/:id' element={<TracksByIdAlbum />}/>
                 <Route path='/track_history' element={<Track_history />}/>
                 <Route path="/register" element={<Register/>}/>
                 <Route path="/login" element={<Login />}/>
                 <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
             </Routes>
         </Container>
      </main>
    </>
  )
}

export default App
