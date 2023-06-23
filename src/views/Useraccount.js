import React from "react";
import Useraccountdetails from "../components/Useraccountdetails";
import { Link } from "react-router-dom";

const Useraccount = () => {
  return (
    <main id="main" className="main">
      <div className="pagetitle d-flex border-bottom">
        <h1>User Account</h1>
        <nav style={{ paddingLeft: "20px" }}>
          <ol className="breadcrumb d-flex">
            <li className="breadcrumb-item d-flex active"> Dashboard </li>
            <li className="breadcrumb-item d-flex"> Add User </li>
            <li className="breadcrumb-item d-flex"> Edit User </li>
          </ol>
        </nav>
      </div>

      <div className="col-lg-12">
        <div className="card cardbg">
          <div className="card-body">
            <div className="d-flex flex-row bd-highlight">
              <Link to="/dashboard/useraccount/newuser">
                <div className="p-1 bd-highlight">
                  <button type="button" className="btn btn-primary m-2">
                    <i className="bi bi-plus-lg"></i> Add User
                  </button>
                </div>
              </Link>

              <Link to="/dashboard/editprofile">
                <div className="p-1 bd-highlight">
                  <button type="button" className="btn btn-primary m-2">
                    <i className="bi bi-gear"></i>Account Settings
                  </button>
                </div>
              </Link>

              <Link to="">
                <div className="p-1 bd-highlight">
                  <button type="button" className="btn btn-primary m-2">
                    <i className="bi bi-question-circle"></i> Need Help
                  </button>
                </div>
              </Link>

              <div className="p-1 ms-auto bd-highlight">
                <button type="button" className="btn btn-primary m-2">
                  <i className="bi bi-file-earmark-arrow-down-fill"></i> Export User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section profile">
        <Useraccountdetails />
      </section>
    </main>
  );
};

export default Useraccount;
