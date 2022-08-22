import logo from './logo.svg';
// import './App.css';
import Home from './components/Home';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Detail from './components/Detail';
import { createContext, useState } from "react";
export const ThemeContext = createContext(null);

function App() {

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className='App' id={theme}>
        <div className="header">
          <span className="title">Where is the World?</span>
          <span className="dark-mode-button" onClick={() => {
            toggleTheme()
          }}>Dark mode</span>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:name" element={<Detail />}>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
