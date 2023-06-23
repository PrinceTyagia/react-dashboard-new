import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import {
  token,
  completesvg,
  blockedsvg,
  pendingsvg,
  gpissuessvg,
  notreceivedsvg,
  inqueuesvg,
  dispachedsvg,
  unpackedsvg,
  loactionmatricschartOptions,
} from "../helper/Constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Locationmatrics = () => {
  const [dropdownData, setDropdownData] = useState([]);
  const [orderstatisticsData, setOrderStatisticsData] = useState([]);
  const [dispatchstatisticsData, setDispatchStatisticsData] = useState([]);
  const [datasetVisibility, setDatasetVisibility] = useState({
    pending: true,
    blocked: true,
    completed: true,
  });
  const [disdatasetVisibility, setDisDatasetVisibility] = useState({
    unPacked: true,
    inQueue: true,
    gpIssues: true,
    dispatch: true,
    notRcvd: true,
  });
  useEffect(() => {
    axios
      .get("/dashboard/locations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDropdownData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dropdown data:", error);
      });
  }, []);
  const fetchData = useCallback((selectedValue) => {
    if (selectedValue) {
      axios
        .get(`/dashboard/location/${selectedValue}/orderstats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log("order response", response.data);
          setOrderStatisticsData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);
  const fetchDataDispatch = useCallback((selectedValue) => {
    if (selectedValue) {
      axios
        .get(`/dashboard/location/${selectedValue}/dinvstats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log("dispatch response", response.data);
          setDispatchStatisticsData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);
  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    fetchData(selectedValue);
    fetchDataDispatch(selectedValue);
  };
  const dataHorBarOrder = {
    labels: orderstatisticsData?.map((item) => item.label),
    datasets: [
      {
        label: "Pending ",
        backgroundColor: "#68c3ff",
        borderColor: "rgba(54,162,235,1)",

        borderWidth: 1,
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20,
        },
        borderSkipped: false,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: orderstatisticsData?.map((item) => item.pendingOrders),
        hidden: !datasetVisibility.pending, // Set the visibility based on the state
      },
      {
        label: "Blocked ",
        backgroundColor: "#b4c232",
        borderColor: "transparent",
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20,
        },

        borderSkipped: false,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: orderstatisticsData?.map((item) => item.blockedOrders),
        hidden: !datasetVisibility.blocked, // Set the visibility based on the state
      },
      {
        label: "Completed",
        backgroundColor: "#c45791",
        borderColor: "transparent",
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20,
        },
        borderSkipped: false,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: orderstatisticsData?.map((item) => item.completedOrders),
        hidden: !datasetVisibility.completed, // Set the visibility based on the state
      },
    ],
  };
  const dataHorBardispatch = {
    labels: dispatchstatisticsData?.map((item) => item.label),
    datasets: [
      {
        label: "Unpacked",
        backgroundColor: "#FF68F5",
        borderColor: "transparent",
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20,
        },
        borderSkipped: false,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dispatchstatisticsData?.map(
          (item) => item.invoicesPendingForPacking
        ),
        hidden: !disdatasetVisibility.unPacked,
      },
      {
        label: "In Queue ",
        backgroundColor: "#FF6868",
        borderColor: "transparent",
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20,
        },
        borderSkipped: false,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dispatchstatisticsData?.map(
          (item) => item.packedInvoicesPendingForGatePassIssuance
        ),
        hidden: !disdatasetVisibility.inQueue,
      },
      {
        label: "GP Isuued",
        backgroundColor: "#6D72B4",
        borderColor: "transparent",
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20,
        },
        borderSkipped: false,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dispatchstatisticsData?.map(
          (item) => item.invoicesWithoutDispatchDocumentDetails
        ),
        hidden: !disdatasetVisibility.gpIssues,
      },
      {
        label: "Dispatch",
        backgroundColor: "#19A54D",
        borderColor: "transparent",
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20,
        },
        borderSkipped: false,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dispatchstatisticsData?.map((item) => item.dispatchedInvoices),
        hidden: !disdatasetVisibility.dispatch,
      },
      {
        label: "Not Rcvd",
        backgroundColor: "#F2F22E",
        borderColor: "transparent",
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20,
        },
        borderSkipped: false,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dispatchstatisticsData?.map(
          (item) => item.invoicesNotReceivedInWarehouse
        ),
        hidden: !disdatasetVisibility.notRcvd,
      },
    ],
  };
  //orderstatis
  function toggleDataset(datasetIndex) {
    setDatasetVisibility((prevState) => {
      const updatedVisibility = { ...prevState };
      if (datasetIndex === 0) {
        updatedVisibility.pending = !prevState.pending;
      } else if (datasetIndex === 1) {
        updatedVisibility.blocked = !prevState.blocked;
      } else if (datasetIndex === 2) {
        updatedVisibility.completed = !prevState.completed;
      }
      return updatedVisibility;
    });
  }
  //disptch data
  function toggledispatchDataset(datasetIndex) {
    setDisDatasetVisibility((prevState) => {
      const updatedVisibility = { ...prevState };
      if (datasetIndex === 0) {
        updatedVisibility.unPacked = !prevState.unPacked;
      } else if (datasetIndex === 1) {
        updatedVisibility.inQueue = !prevState.inQueue;
      } else if (datasetIndex === 2) {
        updatedVisibility.gpIssues = !prevState.gpIssues;
      } else if (datasetIndex === 3) {
        updatedVisibility.dispatch = !prevState.dispatch;
      } else if (datasetIndex === 4) {
        updatedVisibility.notRcvd = !prevState.notRcvd;
      }
      return updatedVisibility;
    });
  }

  return (
    <main id="main" className="main">
      <div className="pagetitle d-flex border-bottom">
        <h1>Location Matrics</h1>
        <nav style={{ paddingLeft: "20px" }}>
          <ol className="breadcrumb d-flex">
            <li className="breadcrumb-item d-flex active">Location Matrics</li>
          </ol>
        </nav>
      </div>

      <div className="col-lg-4">
        <div className="card cardbg">
          <div className="card-body">
            <div className="row">
              <label className="col-sm-4 col-form-label locationDropdown">
                Location:
              </label>
              <div className="col-lg-8">
                <select
                  className="form-select"
                  defaultValue={"option1"}
                  onChange={handleDropdownChange}
                >
                  <option disabled value="option1">
                    Select your location
                  </option>
                  {dropdownData.map((option) => (
                    <option id="myDropdown" key={option.key} value={option.key}>
                      {option.location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* End Button Badges */}
      </div>

      <section className="section">
        <div className="row align-items-top">
          <div className="col-lg-5">
            <div className="card cardbg">
              <div className="card-body">
                <div className="d-flex flex-row bd-highlight">
                  <div

                    id="blue"
                    onClick={() => toggleDataset(0)}
                    style={{
                      backgroundColor: datasetVisibility.pending ? "" : "",
                    }}
                    className="p-1 bd-highlight"
                  >
                    <img
                      src={pendingsvg}
                      style={{ width: "100%", heigh: "100%" }}
                      alt=""
                    />
                  </div>
                  <div

                    id="yellow"
                    onClick={() => toggleDataset(1)}
                    style={{
                      backgroundColor: datasetVisibility.blocked ? "" : "",
                    }}
                    className="p-1 bd-highlight"
                  >
                    <img
                      src={blockedsvg}
                      style={{ width: "100%", heigh: "100%" }}
                      alt=""
                    />
                  </div>
                  <div

                    id="red"
                    onClick={() => toggleDataset(2)}
                    style={{
                      backgroundColor: datasetVisibility.completed ? "" : "",
                    }}
                    className="p-1 bd-highlight"
                  >
                    <img
                      src={completesvg}
                      style={{ width: "100%", heigh: "100%" }}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="card cardbg">
              <div className="card-body">
                <div className="d-flex bd-highlight">
                  <div

                    id="unPacked"
                    onClick={() => toggledispatchDataset(0)}
                    style={{
                      backgroundColor: disdatasetVisibility.unPacked ? "" : "",
                    }}
                    className="p-1 flex-fill bd-highlight"
                  >
                    <img
                      src={unpackedsvg}
                      style={{ width: "100%", heigh: "100%" }}
                      alt=""
                    />
                  </div>
                  <div

                    id="unPacked"
                    onClick={() => toggledispatchDataset(1)}
                    style={{
                      backgroundColor: disdatasetVisibility.inQueue ? "" : "",
                    }}
                    className="p-1 flex-fill bd-highlight"
                  >
                    <img
                      src={inqueuesvg}
                      style={{ width: "100%", heigh: "100%" }}
                      alt=""
                    />
                  </div>
                  <div

                    id="unPacked"
                    onClick={() => toggledispatchDataset(2)}
                    style={{
                      backgroundColor: disdatasetVisibility.gpIssues ? "" : "",
                    }}
                    className="p-1 flex-fill bd-highlight"
                  >
                    <img
                      src={gpissuessvg}
                      style={{ width: "100%", heigh: "100%" }}
                      alt=""
                    />
                  </div>
                  <div

                    id="unPacked"
                    onClick={() => toggledispatchDataset(3)}
                    style={{
                      backgroundColor: disdatasetVisibility.dispatch ? "" : "",
                    }}
                    className="p-1 flex-fill bd-highlight"
                  >
                    <img
                      src={dispachedsvg}
                      style={{ width: "100%", heigh: "100%" }}
                      alt=""
                    />
                  </div>
                  <div

                    id="unPacked"
                    onClick={() => toggledispatchDataset(4)}
                    style={{
                      backgroundColor: disdatasetVisibility.notRcvd ? "" : "",
                    }}
                    className="p-1 flex-fill bd-highlight"
                  >
                    <img
                      src={notreceivedsvg}
                      style={{ width: "100%", heigh: "100%" }}
                      alt=""
                    />
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="row align-items-top">
          <div className="col-lg-5">
            {/* Card with header and footer */}
            <div className="card">
              <div className="card-header cardbg">Order Statistics</div>
              <div className="card-body">
                {/* Table with stripped rows */}
                <Bar
                  style={{ height: "300px" }}
                  data={dataHorBarOrder}
                  options={loactionmatricschartOptions}
                />
                {/* End Table with stripped rows */}
              </div>

              {/* <div className="card-footer">View All</div> */}
            </div>
            {/* End Card with header and footer */}
          </div>
          <div className="col-lg-7">
            {/* Card 
with header and footer */}
            <div className="card">
              <div className="card-header cardbg">Dispatch Statistics</div>
              <div className="card-body">
                {/* Table with stripped rows */}
                <Bar
                  style={{ height: "300px" }}
                  data={dataHorBardispatch}
                  options={loactionmatricschartOptions}
                />
                {/* End Table with stripped rows */}
              </div>

              {/* <div className="card-footer">View All</div> */}
            </div>
            {/* End Card with header and footer */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Locationmatrics;
