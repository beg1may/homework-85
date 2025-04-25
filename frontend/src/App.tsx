import {Container, CssBaseline} from "@mui/material";
import Artists from "./features/atists/Artists.tsx";

function App() {

  return (
    <>
      <CssBaseline />
      <header>
        Header
      </header>
      <main>
         <Container maxWidth="xl">
             <Artists />
         </Container>
      </main>
    </>
  )
}

export default App
