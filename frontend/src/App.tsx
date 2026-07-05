import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/game/Game";
// import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
