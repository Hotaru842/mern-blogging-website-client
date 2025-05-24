import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.page";
import Error from "./pages/404.page";
import Navbar from "./components/navbar.component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="sign-in" element={<h1>Sign In Page</h1>} />
          <Route path="sign-up" element={<h1>Sign Up Page</h1>} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;