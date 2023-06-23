import {
  completesvg,
  blockedsvg,
  pendingsvg,
  chartOrderStatistics,
  chartAllIndiaOptions,
} from "../helper/Constants";
import React, { useEffect, useState } from "react";
import { token } from "../helper/Constants";

// date range import area
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import FileSaver from "file-saver";
import ToggleSwitch from "../components/ToggleSwitch";

ChartJS.register(...registerables);

const Orderstatistics = () => {
  const [datasetVisibility, setDatasetVisibility] = useState({
    pending: true,
    blocked: true,
    completed: true,
  });
  const [orderstatisticsData, setOrderStatisticsData] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    //get current date
    const endDate = moment().format("DD-MM-YYYY");
    //get  a date in previous 9 days
    const startDate = moment().subtract(9, "days").format("DD-MM-YYYY");

    const dateRange = `${startDate} to ${endDate}`;
    setSelectedDateRange(dateRange);

    //call api function chart data in onload page
    fetchData(startDate, endDate, isChecked);
    //call hook date range deafult value in hook on page load
    setSelectedDates([startDate, endDate]);
  }, [isChecked]);

  //date range function
  const handleDateRangeChange = (event, picker) => {
    const startDate = picker.startDate.format("DD-MM-YYYY");
    const endDate = picker.endDate.format("DD-MM-YYYY");
    const dateRange = `${startDate} to ${endDate}`;
    setSelectedDateRange(dateRange);
    fetchData(startDate, endDate);
    setSelectedDates([startDate, endDate]);
  };

  //percentage function toggel

  const handleToggleSwitch = () => {
    setIsChecked(!isChecked);
    fetchData(selectedDates[0], selectedDates[1], !isChecked);
    console.log(isChecked);
  };

  // orderexport file download function
  const orderDownload = () => {
    const payload = {
      fromDate: selectedDates[0],
      percentage: isChecked,
      toDate: selectedDates[1],
    };
    axios
      .post(
        "https://dboard.novussoftware.in/api/dashboard/orderstatssexcel",
        payload,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        FileSaver.saveAs(blob, "OrderStatistics.xlsx");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //fetctData in chart js

  const fetchData = (startDate, endDate) => {
    const payload = {
      fromDate: startDate,
      percentage: isChecked,
      toDate: endDate,
    };
    axios
      .post("/dashboard/orderstats", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log("resdata", response.data);
        setOrderStatisticsData(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  //ordercharts options dataBar and AllindiaDataBar
  const OrderStatisticDataBar = {
    labels: orderstatisticsData?.map((item) => item.label),
    datasets: [
      {
        label: "Pending ",
        backgroundColor: "#68c3ff",
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 10,
          bottomRight: 10,
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
          topLeft: 10,
          topRight: 10,
          bottomLeft: 10,
          bottomRight: 10,
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
          topLeft: 10,
          topRight: 10,
          bottomLeft: 10,
          bottomRight: 10,
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
  const OrderStatisticAllIndiaDataBar = {
    labels: " ",
    datasets: [
      {
        label: "Pending",
        backgroundColor: "#68c3ff",
        borderColor: "transparent",
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 0,
          bottomRight: 0,
        },

        borderSkipped: false,
        borderWidth: 1,

        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: orderstatisticsData?.map((item) => item.pendingOrders),
        hidden: !datasetVisibility.pending,
      },
      {
        label: "Blocked ",
        backgroundColor: "#b4c232",

        borderColor: "transparent",
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 0,
          bottomRight: 0,
        },

        borderSkipped: false,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: orderstatisticsData?.map((item) => item.blockedOrders),
        hidden: !datasetVisibility.blocked,
      },
      {
        label: "Completed",
        backgroundColor: "#c45791",
        borderColor: "transparent",
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 0,
          bottomRight: 0,
        },

        borderSkipped: false,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: orderstatisticsData?.map((item) => item.completedOrders),
        hidden: !datasetVisibility.completed,
      },
    ],
  };
  //svg toggle Data hide and show
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

  return (
    <main id="main" className="main">
      <div className="pagetitle d-flex border-bottom">
        <h1>Order Statistics</h1>
        <nav style={{ paddingLeft: "20px" }}>
          <ol className="breadcrumb d-flex">
            <li className="breadcrumb-item d-flex active">Order Statistics</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row align-items-top">
          <div className="col-lg-12  ">

            <div className="card cardbg">
              <div className="card-body ">
                <div className="d-flex flex-row bd-highlight align-items-center">
                  <div className="p-1 bd-highlight">Select Date</div>

                  <div className="p-1 w-25  bd-highlight">
                    <DateRangePicker
                      initialSettings={{
                        startDate: moment().subtract(9, "days"),
                        endDate: moment(),
                        autoApply: true,
                      }}
                      onApply={handleDateRangeChange}
                    >
                      <div className="form-control d-flex p-1 align-items-center">
                        <input
                          type="text"
                          className="form-control border-white"
                          value={selectedDateRange}
                          readOnly
                          placeholder="Select a date range"
                        />
                        <i className="bi bi-calendar-event-fill text-info"></i>
                      </div>
                    </DateRangePicker>
                  </div>

                  <div className="p-1 bd-highlight">
                    <ToggleSwitch
                      isChecked={isChecked}
                      setIsChecked={handleToggleSwitch}
                    />
                  </div>

                  <div className="p-1 ms-auto bd-highlight">
                    <button
                      type="button"
                      onClick={orderDownload}
                      className="btn btn-primary"
                    >
                      <i className="bi bi-file-earmark-arrow-down-fill"></i>
                      Export .xlsx
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            {/* orderSvgLabel */}
            <div className="card cardbg">
              <div className="card-body">
                <div className="d-flex flex-row bd-highlight">
                  <div className="p-1 bd-highlight">
                    <div
                      id="blue"
                      onClick={() => toggleDataset(0)}
                      style={{
                        backgroundColor: datasetVisibility.pending ? "" : "",
                      }}
                    >
                      <img
                        src={pendingsvg}
                        style={{ width: "100%", heigh: "100%" }}
                        alt="pendingsvg"
                      />
                    </div>
                  </div>

                  <div className="p-1 bd-highlight">
                    <div
                      id="yellow"
                      onClick={() => toggleDataset(1)}
                      style={{
                        backgroundColor: datasetVisibility.blocked ? "" : "",
                      }}
                    >
                      <img
                        src={blockedsvg}
                        style={{ width: "100%", heigh: "100%" }}
                        alt="blockedsvg"
                      />
                    </div>
                  </div>

                  <div className="p-1 bd-highlight">
                    <div
                      id="red"
                      onClick={() => toggleDataset(2)}
                      style={{
                        backgroundColor: datasetVisibility.completed ? "" : "",
                      }}
                    >
                      <img
                        src={completesvg}
                        style={{ width: "100%", heigh: "100%" }}
                        alt="completesvg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="row align-items-top">
          <div className="col-lg-9">
            {/* Card with header and footer */}
            <div className="card">
              <div className="card-header cardbg">Order Statistics</div>
              <div className="card-body">
                {/* Table with stripped rows */}
                <Bar
                  style={{ height: "500px" }}
                  data={OrderStatisticDataBar}
                  options={chartOrderStatistics}
                />
                {/* End Table with stripped rows */}
              </div>

              {/* <div className="card-footer">View All</div> */}
            </div>
            {/* End Card with header and footer */}
          </div>

          <div className="col-lg-3">
            {/* Card with header and footer */}
            <div className="card">
              <div className="card-header cardbg">
                All India | Order Statistics
              </div>
              <div className="card-body">
                {/* Table with stripped rows */}

                <Bar
                  style={{ height: "500px" }}
                  data={OrderStatisticAllIndiaDataBar}
                  options={chartAllIndiaOptions}
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

export default Orderstatistics;
