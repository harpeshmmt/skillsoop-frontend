import { BrowserRouter, Routes, Route } from "react-router";
import Registrationpage from "../pages/Registrationpage";
import Loginpage from "../pages/Loginpage";

const Pageroutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="skillsoop-frontend">
          <Route index element={<Registrationpage />} />
          <Route path="login" element={<Loginpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Pageroutes;
