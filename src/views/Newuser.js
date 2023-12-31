import React from 'react'
import { Link } from 'react-router-dom'
import profileimage from '../assets/img/profile-img.jpg'
const Newuser = () => {
  return (

    <main id="main" className="main">
      <div className="pagetitle d-flex border-bottom">
        <h1>Add Account</h1>
        <nav style={{ paddingLeft: "20px" }}>
          <ol className="breadcrumb d-flex">
            <li className="breadcrumb-item d-flex active"> Dashboard  </li>
            <li className="breadcrumb-item d-flex"> Add User  </li>
            <li className="breadcrumb-item d-flex"> Edit User  </li>
          </ol>
        </nav>
      </div>


      <div className="col-lg-12">
        <div className="card cardbg">
          <div className="card-body">

            <div className="d-flex flex-row bd-highlight">
              <Link to="/dashboard/newuser"><div class="p-1 bd-highlight"><button type="button" class="btn btn-primary m-2"><i class="bi bi-plus-lg"></i> Add User</button></div></Link>

              <div className="p-1 ms-auto bd-highlight"><button type="button" class="btn btn-primary m-2"><i class="bi bi-file-earmark-arrow-down-fill"></i> Export User</button></div>

            </div>

          </div></div></div>

      <section className="section profile">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body pt-3">
                {/* Bordered Tabs */}
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                  </li>
                  <li className="nav-item">
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-edit">User Details</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Settings</button>
                  </li>

                </ul>
                <div className="tab-content pt-2">

                  <div className="tab-pane fade show active fade profile-edit pt-3" id="profile-edit">
                    {/* Profile Edit Form */}
                    <form>
                      <div className="row mb-3">
                        <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                        <div className="col-md-8 col-lg-9">
                          <img src={profileimage} alt="Profile" />
                          <div className="pt-2">
                            <Link href="#" className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload" /></Link>
                            <Link href="#" className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash" /></Link>
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

                </div>{/* End Bordered Tabs */}
              </div>
            </div>
          </div>
        </div>
      </section>





    </main>









  )
}

export default Newuser