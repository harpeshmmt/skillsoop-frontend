import { BrowserRouter, Routes, Route } from "react-router";
import Registrationpage from "../pages/Registrationpage";
import Loginpage from "../pages/Loginpage";
import Demo from "../pages/Demo";
import Emailverification from "../pages/Emailverification";
import Dashboard from "../pages/Dashboard";
import Verifyemail from "../pages/Verify-email";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Forgotpassword from "../pages/Forgotpassword";
import Resetpassword from "../pages/Resetpassword";

const Pageroutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="skillsoop-frontend">
          <Route index element={<Registrationpage />} />
          <Route element={<PublicRoute />}>
            <Route path="login" element={<Loginpage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="candidate/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="demo" element={<Demo />} />
          <Route path="emailverification" element={<Emailverification />} />
          <Route path="verify-email/:token/:id" element={<Verifyemail />} />
          <Route path="reset-password/:token/:id" element={<Resetpassword />} />
          <Route path="forgot-password" element={<Forgotpassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Pageroutes;
