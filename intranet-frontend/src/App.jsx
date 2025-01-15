import { Routing } from "./routes/Routing"
import './App.css'
import { createTheme, ThemeProvider } from "@mui/material"

const customBreakPoints = createTheme({
  breakpoints: {
      values: {
          xs: 413,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536
      }
  }
})


function App() {
  
  return (
  <>
  <ThemeProvider theme={customBreakPoints}>
  <Routing/>
  </ThemeProvider>
  </>
  )
}

export default App
