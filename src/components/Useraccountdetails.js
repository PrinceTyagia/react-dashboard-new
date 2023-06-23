import React, { useEffect, useState } from "react";
// import profileimage from '../assets/img/profile-img.jpg'
import { Link } from "react-router-dom";
import axios from "axios";
import { newData } from "../helper/api/userAccount";

const Useraccountdetails = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUserData(res.data));
  };

  const mergedArray = userData.map((user, index) => {
    return { ...user, ...newData[index] };
  });
  // console.log(mergedArray);

  return (
    <div className="row">
      {/* <div className="col-xl-4 ">
        <div className="card cardbg " style={{ borderRadius: "20px" }}>
          <Link to="/dashboard/editprofile">
            {" "}
            <div className="d-flex ">
              <div className="p-2">
                <img
                  style={{ width: "80px", height: "80px" }}
                  alt="Profile"
                  className="rounded-circle"
                />
              </div>
              <div className=" flex-column p-2" style={{ color: "#115b75" }}>
                <div>
                  {" "}
                 
                </div>
                <div>Suvigyakapoor@gmail.com </div>
                <div> UI / Ux </div>
              </div>
            </div>
          </Link>
          <div className="card-body profile-card sociallinks pt-4 d-flex flex-column align-items-center">
            <div className="social-links">
              <Link to="#" className="twitter">
                <i className="bi bi-twitter" />
              </Link>
              <Link to="#" className="facebook">
                <i className="bi bi-facebook" />
              </Link>
              <Link to="#" className="instagram">
                <i className="bi bi-instagram" />
              </Link>
              <Link to="#" className="linkedin">
                <i className="bi bi-linkedin" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 ">
        <div className="card cardbg " style={{ borderRadius: "20px" }}>
          <Link to="/dashboard/editprofile">
            {" "}
            <div className="d-flex ">
              <div className="p-2">
                <img
                  style={{ width: "80px", height: "80px" }}
                  alt="Profile"
                  className="rounded-circle"
                />
              </div>
              <div className=" flex-column p-2" style={{ color: "#115b75" }}>
                <div>
                  {" "}
                  <strong> Suvigya Kapoor </strong>
                </div>
                <div>Suvigyakapoor@gmail.com </div>
                <div> UI / Ux </div>
              </div>
            </div>
          </Link>
          <div className="card-body profile-card sociallinks pt-4 d-flex flex-column align-items-center">
            <div className="social-links">
              <Link to="#" className="twitter">
                <i className="bi bi-twitter" />
              </Link>
              <Link to="#" className="facebook">
                <i className="bi bi-facebook" />
              </Link>
              <Link to="#" className="instagram">
                <i className="bi bi-instagram" />
              </Link>
              <Link to="#" className="linkedin">
                <i className="bi bi-linkedin" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4 ">
        <div className="card cardbg " style={{ borderRadius: "20px" }}>
          <Link to="/dashboard/editprofile">
            {" "}
            <div className="d-flex ">
              <div className="p-2">
                <img
                  style={{ width: "80px", height: "80px" }}
                  alt="Profile"
                  className="rounded-circle"
                />
              </div>
              <div className=" flex-column p-2" style={{ color: "#115b75" }}>
                <div>
                  {" "}
                  <strong> Suvigya Kapoor </strong>
                </div>
                <div>Suvigyakapoor@gmail.com </div>
                <div> UI / Ux </div>
              </div>
            </div>
          </Link>
          <div className="card-body profile-card sociallinks pt-4 d-flex flex-column align-items-center">
            <div className="social-links">
              <Link to="#" className="twitter">
                <i className="bi bi-twitter" />
              </Link>
              <Link to="#" className="facebook">
                <i className="bi bi-facebook" />
              </Link>
              <Link to="#" className="instagram">
                <i className="bi bi-instagram" />
              </Link>
              <Link to="#" className="linkedin">
                <i className="bi bi-linkedin" />
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {mergedArray.map((item, index) => (
        <div className="col-xl-4">
          <Link
            to={`/dashboard/useraccount/editprofile/${item.id}/${item.name}/${item.img}`}
          >

            <div className="card cardbg " style={{ borderRadius: "20px" }}>
              <div className="d-flex" style={{ color: "#115b75" }}>
                <div className="p-2">
                  <img
                    src={`https://images.unsplash.com/` + item.img}
                    style={{ width: "80px", height: "80px" }}
                    alt="Profile"
                    className="rounded-circle"
                  />
                </div>
                <div className=" flex-column p-2">
                  <div className="social-links">
                    <strong> <div> {item.name} </div> </strong>
                    <div> {item.email} </div>
                    <div> {item.website}</div>
                  </div>
                </div>
              </div>
              <div className="card-body profile-card sociallinks pt-4 d-flex flex-column align-items-center">
                <div className="social-links">
                  <Link to="#" className="twitter">
                    <i className="bi bi-twitter"></i>
                  </Link>
                  <Link to="#" className="facebook">
                    <i className="bi bi-facebook"></i>
                  </Link>
                  <Link to="#" className="instagram">
                    <i className="bi bi-instagram"></i>
                  </Link>
                  <Link to="#" className="linkedin">
                    <i className="bi bi-linkedin"></i>
                  </Link>
                </div>
              </div>
            </div>

          </Link>
        </div>
      ))}
    </div>
  );
};

export default Useraccountdetails;
