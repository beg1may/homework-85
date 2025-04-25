import {Container, CssBaseline, Typography} from "@mui/material";
import Artists from "./features/atists/Artists.tsx";
import {Route, Routes} from "react-router-dom";
import AlbumsByIdArtist from "./features/album/AlbumsByIdArtist.tsx";
import TracksByIdAlbum from "./features/tracks/TracksByIdAlbum.tsx";

function App() {

  return (
    <>
      <CssBaseline />
      <header>
        Header
      </header>
      <main>
         <Container maxWidth="xl">
             <Routes>
                 <Route path='/' element={<Artists />}/>
                 <Route path='/albums/:id' element={<AlbumsByIdArtist />}/>
                 <Route path='/tracks/:id' element={<TracksByIdAlbum />}/>
                 <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
             </Routes>
         </Container>
      </main>
    </>
  )
}

export default App
