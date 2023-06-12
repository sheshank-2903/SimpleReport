import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import Header from './Header';
import Middle from './Middle.js';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
     <CssBaseline />
     <main>
      <div className="App">
        <Header/>
        <Middle/>
      </div>
     </main>
    </ThemeProvider>
  );
}

export default App;
