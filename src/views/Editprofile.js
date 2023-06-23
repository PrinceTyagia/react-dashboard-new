import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import profileimage from '../assets/img/profile-img.jpg'
import axios from 'axios'

const Editprofile = () => {
  const { id, img } = useParams()

  const [userData, setUserData] = useState([])
  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => setUserData(res.data))
  }

  // console.log("editprofidata", userData);
  return (

    <main id="main" className="main">
      <div className="pagetitle d-flex border-bottom">
        <h1>Edit Profile</h1>
        <nav style={{ paddingLeft: "20px" }}>
          <ol className="breadcrumb d-flex">
            <li className="breadcrumb-item d-flex active"> Dashboard  </li>
            <li className="breadcrumb-item d-flex"> Add User  </li>
            <li className="breadcrumb-item d-flex"> Edit User  </li>
          </ol>
        </nav>
      </div>


      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">

            <div className="d-flex flex-row bd-highlight">
              <Link to="/dashboard/newuser"><div class="p-2 bd-highlight"><button type="button" className="btn btn-primary m-2"><i class="bi bi-plus-lg"></i> Add User</button></div></Link>

              <div className="p-2 ms-auto bd-highlight"><button type="button" className="btn btn-primary m-2"><i class="bi bi-file-earmark-arrow-down-fill"></i> Export User</button></div>

            </div>

          </div></div></div>

      <section className="section profile">
        <div className="row">
          <div className="col-xl-4">
            <div className="card">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                <img src={`https://images.unsplash.com/` + img} alt="Profile" className="rounded-circle" />
                <h2>{userData.name}</h2>
                <h3>{userData.website}</h3>
                <div className="social-links mt-2">
                  <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
                  <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
                  <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
                  <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                {/* Bordered Tabs */}
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Settings</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                  </li>
                </ul>
                <div className="tab-content pt-2">
                  <div className="tab-pane fade show active profile-overview" id="profile-overview">
                    <h5 className="card-title">About</h5>
                    <p className="small fst-italic">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    <h5 className="card-title">Profile Details</h5>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Full Name</div>
                      <div className="col-lg-9 col-md-8">{userData.name}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Company</div>
                      {userData.company?.name && (
                        <div className='col-lg-9 col-md-8'>{userData.company.name}</div>
                      )}
                      {/* <div className="col-lg-9 col-md-8">{Array.isArray(userData?.company) && userData.company.map((i) => (console.log("cidata", i)))}</div> */}
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Job</div>
                      {userData.company?.bs && (
                        <div className='col-lg-9 col-md-8'>{userData.company.bs}</div>
                      )}
                      {/* <div className="col-lg-9 col-md-8">Web Designer</div> */}
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Country</div>
                      {userData.address?.city && (
                        <div className='col-lg-9 col-md-8'>{userData.address.city}</div>
                      )}
                      {/* <div className="col-lg-9 col-md-8">India</div> */}
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Address</div>
                      {userData.address?.street && (
                        <div className='col-lg-9 col-md-8'>{userData.address.street}</div>
                      )}
                      {/* <div className="col-lg-9 col-md-8">NCR Delhi</div> */}
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Phone</div>
                      <div className="col-lg-9 col-md-8">+91 {userData.phone}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Email</div>
                      <div className="col-lg-9 col-md-8">{userData.email}</div>
                    </div>
                  </div>
                  <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                    {/* Profile Edit Form */}
                    <form>
                      <div className="row mb-3">
                        <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                        <div className="col-md-8 col-lg-9">
                          <img src={profileimage} alt="Profile" />
                          <div className="pt-2">
                            <a href="#" className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload" /></a>
                            <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash" /></a>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="fullName" type="text" className="form-control" id="fullName" defaultValue="Suvigya Kapoor" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">About</label>
                        <div className="col-md-8 col-lg-9">
                          <textarea name="about" className="form-control" id="about" style={{ height: 100 }} defaultValue={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "} />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">Company</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="company" type="text" className="form-control" id="company" defaultValue="Novus Sftware" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">Job</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="job" type="text" className="form-control" id="Job" defaultValue="Web Designer" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">Country</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="country" type="text" className="form-control" id="Country" defaultValue="India" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Address</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="address" type="text" className="form-control" id="Address" defaultValue="NCR Delhi" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="phone" type="text" className="form-control" id="Phone" defaultValue="+91 9796244255" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="email" type="email" className="form-control" id="Email" defaultValue="suvigya.kapoor@novussoftware.in" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="Twitter" className="col-md-4 col-lg-3 col-form-label">Twitter Profile</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="twitter" type="text" className="form-control" id="Twitter" defaultValue="https://twitter.com/#" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="Facebook" className="col-md-4 col-lg-3 col-form-label">Facebook Profile</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="facebook" type="text" className="form-control" id="Facebook" defaultValue="https://facebook.com/#" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="Instagram" className="col-md-4 col-lg-3 col-form-label">Instagram Profile</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="instagram" type="text" className="form-control" id="Instagram" defaultValue="https://instagram.com/#" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="Linkedin" className="col-md-4 col-lg-3 col-form-label">Linkedin Profile</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="linkedin" type="text" className="form-control" id="Linkedin" defaultValue="https://linkedin.com/#" />
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                    </form>{/* End Profile Edit Form */}
                  </div>
                  <div className="tab-pane fade pt-3" id="profile-settings">
                    {/* Settings Form */}
                    <form>
                      <div className="row mb-3">
                        <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Email Notifications</label>
                        <div className="col-md-8 col-lg-9">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="changesMade" defaultChecked />
                            <label className="form-check-label" htmlFor="changesMade">
                              Changes made to your account
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="newProducts" defaultChecked />
                            <label className="form-check-label" htmlFor="newProducts">
                              Information on new products and services
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="proOffers" />
                            <label className="form-check-label" htmlFor="proOffers">
                              Marketing and promo offers
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="securityNotify" defaultChecked disabled />
                            <label className="form-check-label" htmlFor="securityNotify">
                              Security alerts
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                    </form>{/* End settings Form */}
                  </div>
                  <div className="tab-pane fade pt-3" id="profile-change-password">
                    {/* Change Password Form */}
                    <form>
                      <div className="row mb-3">
                        <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="password" type="password" className="form-control" id="currentPassword" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="newpassword" type="password" className="form-control" id="newPassword" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="renewpassword" type="password" className="form-control" id="renewPassword" />
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Change Password</button>
                      </div>
                    </form>{/* End Change Password Form */}
                  </div>
                </div>{/* End Bordered Tabs */}
              </div>
            </div>
          </div>
        </div>
      </section>





    </main>




  )
}

export default Editprofile