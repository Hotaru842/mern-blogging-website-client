import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.page";
import Profile from "./pages/profile.page";
import Error from "./pages/404.page";
import Navbar from "./components/navbar.component";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;