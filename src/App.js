import "./assets/css/style.css";
import {
  BrowserRouter,
  Routes,
  Route,

  Navigate,
} from "react-router-dom";
import "./assets/css/style.css";

import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import Mainlayout from "./components/Mainlayout";
import Dashboard from "./views/Dashboard";
import Locationmatrics from "./views/Locationmatrics";
import Dispatchstatistics from "./views/Dispatchstatistics";
import Orderstatistics from "./views/Orderstatistics";
import Useraccount from "./views/Useraccount";
import Login from "./views/Login";
import Newuser from "./views/Newuser";
import Signup from "./views/Signup";
import Resetpassword from "./views/Resetpassword";
import Editprofile from "./views/Editprofile";
import Pagenotfound from "./views/Pagenotfound";

import { useSelector } from "react-redux";
import axios from "axios";

function App() {
  const isToken = useSelector((state) => state.auth.token);

  if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = "https://dboard.novussoftware.in/api";
  } else {
    axios.defaults.baseURL = "http://localhost:3000/";
  }
  axios.defaults.withCredentials = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !isToken ? <Navigate to="/login" /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/login"
          element={!isToken ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Mainlayout />}>
          <Route index element={<Dashboard />} />
          <Route path="locationmatrics" element={<Locationmatrics />} />
          <Route path="orderstatistics" element={<Orderstatistics />} />
          <Route path="dispatchstatistics" element={<Dispatchstatistics />} />
          <Route path="useraccount" element={<Useraccount />} />
          <Route path="useraccount/newuser" element={<Newuser />} />
          <Route path="editprofile" element={<Editprofile />} />
          <Route path="useraccount/editprofile/:id/:name/:img" element={<Editprofile />} />
        </Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
