import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.page";
import Error from "./pages/404.page";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="sign-in" element={<UserAuthForm type="sign-in" />} />
          <Route path="sign-up" element={<UserAuthForm type="sign-up" />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;