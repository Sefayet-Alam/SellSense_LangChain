import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Homee.js";
import Chat from "./pages/Chatt.js";
import Reviews from "./pages/Reviews";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 container-fluid p-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
