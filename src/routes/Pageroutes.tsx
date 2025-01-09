import { BrowserRouter, Routes, Route } from "react-router";
import Registrationpage from "../pages/Registrationpage";
import Loginpage from "../pages/Loginpage";
import App from "../App";

const Pageroutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registrationpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/registration" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pageroutes;
