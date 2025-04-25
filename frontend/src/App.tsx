import {Container, CssBaseline, Typography} from "@mui/material";
import Artists from "./features/atists/Artists.tsx";
import {Route, Routes} from "react-router-dom";
import FullArtist from "./features/atists/FullArtist.tsx";

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
                 <Route path='/albums/:id' element={<FullArtist />}/>
                 <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
             </Routes>
         </Container>
      </main>
    </>
  )
}

export default App
