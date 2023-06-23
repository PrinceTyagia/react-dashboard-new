import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import loginbackground from "../assets/img/dashboardbackground.svg";
import logincard from "../assets/img/logincard.svg";
import Logowhite from "../assets/img/logowhite-01.svg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      loginId: email,
      password: password,
    };
    // Make an API request to authenticate the user
    axios
      .post(
        "https://dboard.novussoftware.in/api/dashboardinfo/authenticate",
        payload
      )
      .then((response) => {
        // Save the token to local storage
        localStorage.setItem("token", response.data.token);

        // Dispatch a login action to update the Redux store
        dispatch(login(response.data.token));
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };
  // console.log(email);
  // console.log(password);
  if (isAuthenticated) {
    return navigate("/dashboard");
  }
  return (

<main style={{ backgroundImage: `url(${loginbackground})`}}>
  <div className="container" >
    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
            
            <div className="card shadow-lg  p-4" style={{ borderRadius:"50px", backgroundColor:"rgb(75 201 226 / 96%)", backgroundImage: `url(${logincard})` }}>
              <div className="card-body">

                <div className=" pb-2">
                  <div className="text-center  pb-0 fs-4"><img src={Logowhite} alt="" style={{width:'131px', height:'50.57px'}} /></div>
                  <p className="text-center text-white pt-2 small">Welcome! Please login to your account.</p>
                </div>
                <form className="row g-3 needs-validation"  noValidate onSubmit={handleSubmit}>
                  
                  <div className="col-12 text-white">
                  
                    <div className="input-group has-validation">

                   <input  className="form-control bg-transparent text-white" placeholder="Email"     type="text" id="email" value={email} autoComplete="on" onChange={handleEmailChange} />
                    </div>
                  </div>
                  <div className="input-group text-white has-validation">
                   <input  className="form-control bg-transparent text-white" placeholder="Password" type="current-password" id="password" value={password} autoComplete="on" onChange={handlePasswordChange} />
                    </div>
                  <div className="col-7 text-white">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="remember" defaultValue="true" id="rememberMe" />
                      <label className="form-check-label" style={{fontSize: '12px'}} htmlFor="rememberMe">Remember me</label>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className=" text-white" style={{fontSize: '12px'}}>
                      <Link to="/resetpassword">
                     Forgot Password</Link>
                    </div>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-primary w-60" type="submit">Login</button>
                  </div>
                  <div className="col-6">

                    <Link to="/signup" >

                    <button className="btn btn-signup text-black d-flex btn-primary ms-auto w-60" type="submit">Sign up</button></Link>
                  </div>
                  
                </form>
                
              </div>
              <p className="small text-white mt-3 text-center">Term of use. Privacy policy</p>
            </div>
          
          </div>
        </div>
      </div>
      
    </section>
    
  </div>
</main>

  )
}

export default Login