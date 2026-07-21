import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import Typography from "@mui/material/Typography";
import CardMeteo from "./components/CardMeteo";
const theme = createTheme({
  typography: {
    fontFamily: "MNT",
  },
});
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CardMeteo />
      </ThemeProvider>
    </>
  );
}

export default App;
