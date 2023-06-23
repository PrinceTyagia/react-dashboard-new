import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { greenColor, redColor, yellowColor } from "../helper/Constants";
import Maps from "../components/Maps";

import { token } from "../helper/Constants";

import ActiveLoationicon from "../components/ActiveLoationicon";
import DisconnectedLocationicon from "../components/DisconnectedLoationicon";
import InactiveLoationicon from "../components/InactiveLoationicon";

const Dashboard = () => {
  const [newData, setNewData] = useState([]);
  const [connectionStates, setConnectionStates] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Code to be executed after 1 second
      console.log('useEffect called after half 1 second');
    }, 500);
    getData();
    // Clean up the timer when the component unmounts or when the effect changes
    return () => clearTimeout(timer);

  }, []);// Empty dependency array ensures the effect runs only once
  useEffect(() => {
    const connectionStatesArray = newData.map((item) => {
      const lastContactAtMoment = moment.utc(item.lastContactAt);
      const lastContactAtString = lastContactAtMoment.fromNow();
      const hours = moment().diff(lastContactAtMoment, "hours");

      let stateColor;
      if (hours <= 3) {
        stateColor = greenColor;
      } else if (hours > 3 && hours <= 12) {
        stateColor = yellowColor;
      } else {
        stateColor = redColor;
      }

      return {
        location: item.location,
        lastContactAtString,
        stateColor,
      };

    });
 
    setConnectionStates(connectionStatesArray);
  }, [newData]);
  const getData = () => {
    axios
      .get("/dashboard/connstat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newDataArray = res.data.map((item) => {
          // Perform any necessary data transformations or manipulations
          return item; // Return the modified item or create a new object/array
        });
        setNewData(newDataArray);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const convertedLocations = newData.map((item) => {
    const lastContactAtMoment = moment(item.lastContactAt);
    const hours = moment().diff(lastContactAtMoment, "hours");
    let status;

    if (hours <= 3) {
      status = "active";
    } else if (hours > 3 && hours <= 12) {
      status = "inactive";
    } else {
      status = "disconnect";
    }

    return {
      location: item.location,
      status: status,
    };
  });
  const countStatus = convertedLocations.reduce(
    (count, item) => {
      if (item.status === "active") {
        count.active++;
      } else if (item.status === "inactive") {
        count.inactive++;
      } else {
        count.disconnect++;
      }
      return count;
    },
    { active: 0, inactive: 0, disconnect: 0 }
  );

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle d-flex border-bottom">
          <h1>Dashboard</h1>
          <nav style={{ paddingLeft: "20px" }}>
            <ol className="breadcrumb d-flex">
              <li className="breadcrumb-item d-flex active">
                Active Locations | Inactive Locations | Disconnected Locations
              </li>
            </ol>
          </nav>
        </div>

        <div className="row justify-content-md-center">
        <div className="col-col-lg-43 col-sm-1 col-md-3 col-xs-3">
            <div className="card border-white " style={{ borderRadius: "20px" }}>
              <ActiveLoationicon countstatus={countStatus.active}/>

            </div>
          </div>

          <div className="col-col-lg-43 col-sm-1 col-md-3 col-xs-3">
            <div className="card border-white" style={{ borderRadius: "20px", fontFamily:"Roboto-Bold" }}>
            <DisconnectedLocationicon countstatus={countStatus.inactive} style={{ borderRadius: "20px" }}/></div> </div>

            <div className="col-col-lg-43 col-sm-1 col-md-3 col-xs-3">
            <div className="card border-white" style={{ borderRadius: "20px" }}>
           <InactiveLoationicon countstatus={countStatus.disconnect}/>

            </div>
          </div>
        </div>

        <section className="section">
          <div className="row align-items-top">
            <div className="col-lg-6" >
              {/* Card 
with header and footer */}
              <div className="card ">
                <div className="card-header cardbg">
                  <i className="bi bi-geo-alt" fill="#26A6D5"></i> Active Locations
                  | Inactive Locations | Disconnected Locations
                </div>
                <div className="card-body" style={{ height: "538px", overflow: "scroll" }}>
                  {/* Table with stripped rows */}
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Location</th>

                        <th scope="col">Last Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {connectionStates.map((connectionState, index) => (
                        <tr key={index}>
                          <th
                            scope="row"
                            style={{
                              color: connectionState.stateColor,
                            }}
                          >
                            {connectionState.location}
                          </th>

                          <td
                            style={{
                              color: connectionState.stateColor,
                            }}
                          >
                            {connectionState.lastContactAtString}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* End Table with stripped rows */}
                </div>


              </div>
              {/* End Card with header and footer */}
            </div>

            <div className="col-lg-6">
              {/* Card with an image overlay */}
              <div className="card cardbg">
                {/* <img src={IndiaMap} alt="" style={{ padding: "20px" }} /> */}
                <Maps connectionStates={connectionStates} />
              </div>
              {/* End Card with an image overlay */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
