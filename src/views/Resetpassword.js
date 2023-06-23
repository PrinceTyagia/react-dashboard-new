import React from 'react'
import loginbackground from "../assets/img/dashboardbackground.svg";
import logincard from "../assets/img/logincard.svg";
import { Link } from 'react-router-dom';

const Resetpassword = () => {
  return (
    <main style={{ backgroundImage: `url(${loginbackground})`}}>
  <div className="container" >
    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
            
            <div className="card   p-4" style={{ borderRadius:"50px", backgroundColor:"rgb(75 201 226 / 96%)", backgroundImage: `url(${logincard})` }}>
              <div className="card-body">

                
             
                <div className=" pb-2">
                  <h5 className="card-title text-white text-center pb-0 fs-4">Novus</h5>
                  <p className="text-center text-white small">Reset Your Account Password.</p>
                </div>
                <form className="row g-3 needs-validation"  >
                  
      
                  <div className="input-group text-white has-validation">
                   <input  className="form-control bg-transparent text-white" placeholder="Email" type="current-Email" id="Email" />
                    </div>

                  <div className="col-6">
                  <Link to="/">
                    <button className="btn btn-primary w-60" type="submit">Continue</button>
                    </Link> 
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

export default Resetpassword