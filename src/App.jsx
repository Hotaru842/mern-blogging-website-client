import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.page";
import Error from "./pages/404.page";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { lookInSession } from "./common/session";

export const UserContext = createContext({});

function App() {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");

    userInSession ? setUserAuth(JSON.parse(userInSession)) 
    : setUserAuth({ access_token: null });
  }, [])

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userAuth, setUserAuth }}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="sign-in" element={<UserAuthForm type="sign-in" />} />
            <Route path="sign-up" element={<UserAuthForm type="sign-up" />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;