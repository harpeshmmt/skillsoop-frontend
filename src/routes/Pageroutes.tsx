import { BrowserRouter, Routes, Route } from "react-router";
import Registrationpage from "../pages/Registrationpage";
import Loginpage from "../pages/Loginpage";
import Demo from "../pages/Demo";
import Emailverification from "../pages/Emailverification";

const Pageroutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="skillsoop-frontend">
          <Route index element={<Registrationpage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="demo" element={<Demo />} />
          <Route path="emailverification" element={<Emailverification />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Pageroutes;
