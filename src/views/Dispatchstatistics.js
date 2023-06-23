import React, { useEffect, useRef, useState } from "react";
import {
  gpissuessvg,
  notreceivedsvg,
  inqueuesvg,
  dispachedsvg,
  unpackedsvg,
  DispatchStatisticchartOptions,
  DispatchStatisticAllIndiachartOptions,
} from "../helper/Constants";
import { Link } from "react-router-dom";
import { token } from "../helper/Constants";
import DateRangePicker from 'react-bootstrap-daterangepicker';

import moment from 'moment';
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import FileSaver from "file-saver";
import ToggleSwitch from "../components/ToggleSwitch";
ChartJS.register(...registerables);



const Dispatchstatistics = () => {

  const [datasetVisibility, setDatasetVisibility] = useState({
    unPacked: true,
    inQueue: true,
    gpIssues: true,
    dispatch: true,
    notRcvd: true,
  });
  const [dispatchstatisticsData, setDispatchStatisticsData] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState('');

  useEffect(() => {

    //get current date 
    const endDate = moment().format('DD-MM-YYYY');
    //get  a date in previous 9 days
    const startDate = moment().subtract(9, 'days').format('DD-MM-YYYY');


    const dateRange = `${startDate} to ${endDate}`;
    setSelectedDateRange(dateRange);

    //call api function chart data in onload page
    fetchData(startDate, endDate, isChecked);
    //call hook date range deafult value in hook on page load 
    setSelectedDates([startDate, endDate])
  }, [isChecked]);



  //date range function
  const handleDateRangeChange = (event, picker) => {
    const startDate = picker.startDate.format('DD-MM-YYYY');
    const endDate = picker.endDate.format('DD-MM-YYYY');
    const dateRange = `${startDate} to ${endDate}`;
    setSelectedDateRange(dateRange);
    fetchData(startDate, endDate);
    setSelectedDates([startDate, endDate])

  };

  //percentage function toggel

  const handleToggleSwitch = () => {
    setIsChecked(!isChecked);

    fetchData(selectedDates[0], selectedDates[1], !isChecked);
    console.log(isChecked);
  };

  // orderexport file download function
  const dispatchDownload = () => {

    const payload = {
      fromDate: selectedDates[0],
      percentage: isChecked,
      toDate: selectedDates[1],
    };
    axios
      .post(
        "https://dboard.novussoftware.in/api/dashboard/invstatsexcel",
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
        FileSaver.saveAs(blob, "DispatchStatistics.xlsx");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //fectData in chart js
  const fetchData = (startDate, endDate) => {
    const payload = {
      fromDate: startDate,
      percentage: isChecked,
      toDate: endDate,
    };
    axios
      .post("/dashboard/dinvstats", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log("resdata", response.data);
        setDispatchStatisticsData(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };





  // dispatchcharts options dataBar and AllindiaDataBar
  const dispatchStaticDataBar = {
    labels: dispatchstatisticsData?.map((item) => item.label),
    datasets: [
      {
        label: "Unpacked",
        backgroundColor: "#FF68F5",
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
        data: dispatchstatisticsData?.map(
          (item) => item.invoicesPendingForPacking
        ),
        hidden: !datasetVisibility.unPacked,
      },
      {
        label: "In Queue ",
        backgroundColor: "#FF6868",
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
        data: dispatchstatisticsData?.map(
          (item) => item.packedInvoicesPendingForGatePassIssuance
        ),
        hidden: !datasetVisibility.inQueue,
      },
      {
        label: "GP Isuued",
        backgroundColor: "#6D72B4",
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
        data: dispatchstatisticsData?.map(
          (item) => item.invoicesWithoutDispatchDocumentDetails
        ),
        hidden: !datasetVisibility.gpIssues,
      },
      {
        label: "Dispatch",
        backgroundColor: "#19A54D",
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
        data: dispatchstatisticsData?.map((item) => item.dispatchedInvoices),
        hidden: !datasetVisibility.dispatch

      },
      {
        label: "Not Rcvd",
        backgroundColor: "#F2F22E",
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
        data: dispatchstatisticsData?.map(
          (item) => item.invoicesNotReceivedInWarehouse
        ),
        hidden: !datasetVisibility.notRcvd
      },
    ],
  };
  const dispatchStaticAllIndiaDataBar = {
    labels: " ",
    datasets: [
      {
        label: "Unpacked",
        backgroundColor: "#FF68F5",
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
        data: dispatchstatisticsData?.map(
          (item) => item.invoicesPendingForPacking
        ),
      },
      {
        label: "In Queue ",
        backgroundColor: "#FF6868",
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
        data: dispatchstatisticsData?.map(
          (item) => item.packedInvoicesPendingForGatePassIssuance
        ),
      },
      {
        label: "gp Isuued",
        backgroundColor: "#6D72B4",
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
        data: dispatchstatisticsData?.map(
          (item) => item.invoicesWithoutDispatchDocumentDetails
        ),
      },
      {
        label: "Dispatch",
        backgroundColor: "#19A54D",
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
        data: dispatchstatisticsData?.map((item) => item.dispatchedInvoices),
      },
      {
        label: "Not Rcvd",
        backgroundColor: "#F2F22E",
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
        data: dispatchstatisticsData?.map(
          (item) => item.invoicesNotReceivedInWarehouse
        ),
      },
    ],
  };


  function toggleDataset(datasetIndex) {
    setDatasetVisibility((prevState) => {
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
        <h1>Dispatch Statistics</h1>
        <nav style={{ paddingLeft: "20px" }}>
          <ol className="breadcrumb d-flex">
            <li className="breadcrumb-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="breadcrumb-item d-flex active">In Queue</li>
            <li className="breadcrumb-item d-flex active">Unpacked</li>
            <li className="breadcrumb-item d-flex active">Dispached</li>
            <li className="breadcrumb-item d-flex active">GP Issues</li>
            <li className="breadcrumb-item d-flex active">Not Received</li>
          </ol>
        </nav>
      </div>

      <div className="col-lg-12">
        <div className="card cardbg">
          <div className="card-body">
            <div className="d-flex flex-row bd-highlight align-items-center">

              <div className="p-1 bd-highlight">Select Date</div>

              <div className="p-1 w-25 align-items-center bd-highlight">
                <DateRangePicker
                  initialSettings={{
                    startDate: moment().subtract(9, "days"),
                    endDate: moment(),
                    autoApply: true,

                  }}
                  onApply={handleDateRangeChange}
                >
                  <div className="form-control  d-flex p-1 align-items-center">

                    <input
                      type="text"
                      className="form-control border-white"
                      value={selectedDateRange}
                      readOnly
                      placeholder="Select a date range"
                    /><i class="bi bi-calendar-event-fill text-info"></i>
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
                  onClick={dispatchDownload}
                  className="btn btn-primary m-2"
                >
                  <i className="bi bi-file-earmark-arrow-down-fill"></i>Export
                  .xlsx
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="row align-items-top">
          <div className="col-lg-8">
            <div className="card cardbg">
              <div className="card-body">
                <div className="d-flex bd-highlight">
                  <div
                    id="unPacked"
                    onClick={() => toggleDataset(0)}
                    style={{ backgroundColor: datasetVisibility.unPacked ? "" : "" }} className="p-1 flex-fill bd-highlight">

                    <img
                      src={unpackedsvg}
                      style={{ width: "100%", heigh: "100%" }}
                      alt=""
                    />

                  </div>
                  <div
                    id="unPacked"
                    onClick={() => toggleDataset(1)}
                    style={{ backgroundColor: datasetVisibility.inQueue ? "" : "" }} className="p-1 flex-fill bd-highlight">
                    <img
                      src={inqueuesvg}
                      style={{ width: "100%", heigh: "100%" }}
                      alt=""
                    />
                  </div>
                  <div
                    id="unPacked"
                    onClick={() => toggleDataset(2)}
                    style={{ backgroundColor: datasetVisibility.gpIssues ? "" : "" }}
                    className="p-1 flex-fill bd-highlight">
                    <img
                      src={gpissuessvg}
                      style={{ width: "100%", heigh: "100%" }}
                      alt=""
                    />
                  </div>
                  <div
                    id="unPacked"
                    onClick={() => toggleDataset(3)}
                    style={{ backgroundColor: datasetVisibility.dispatch ? "" : "" }}
                    className="p-1 flex-fill bd-highlight">
                    <img
                      src={dispachedsvg}
                      style={{ width: "100%", heigh: "100%" }}
                      alt=""
                    />
                  </div>
                  <div
                    id="unPacked"
                    onClick={() => toggleDataset(4)}
                    style={{ backgroundColor: datasetVisibility.notRcvd ? "" : "" }} className="p-1 flex-fill bd-highlight">
                    <img
                      src={notreceivedsvg}
                      style={{ width: "100%", heigh: "100%" }}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="row align-items-top">
          <div className="col-lg-8">
            {/* Card 
            with header and footer */}
            <div className="card">
              <div className="card-header cardbg">Dispatch Statistics</div>
              <div className="card-body">
                {/* Table with stripped rows */}
                <Bar style={{ height: "500px" }} data={dispatchStaticDataBar} options={DispatchStatisticchartOptions} />
                {/* End Table with stripped rows */}
              </div>


            </div>
            {/* End Card with header and footer */}
          </div>

          <div className="col-lg-4">
            {/* Card 
            with header and footer */}
            <div className="card">
              <div className="card-header cardbg">All India | Dispatch Statistics</div>
              <div className="card-body">
                {/* Table with stripped rows */}
                <Bar style={{ height: "500px" }} data={dispatchStaticAllIndiaDataBar} options={DispatchStatisticAllIndiachartOptions} />
                {/* End Table with stripped rows */}
              </div>


            </div>
            {/* End Card with header and footer */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dispatchstatistics;
