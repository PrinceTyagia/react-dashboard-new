import dispachedsvg from "../assets/img/dispachedsvg.svg";
import inqueuesvg from "../assets/img/inqueuesvg.svg";
import unpackedsvg from "../assets/img/unpackedsvg.svg";
import gpissuessvg from "../assets/img/gpissuessvg.svg";
import notreceivedsvg from "../assets/img/notreceivedsvg.svg";
import completesvg from "../assets/img/completesvg.svg";
import blockedsvg from "../assets/img/blockedsvg.svg";
import pendingsvg from "../assets/img/pendingsvg.svg";
import Logo from "../assets/img/logo.svg";
import profileimage from "../assets/img/profile-img.jpg";
import background from "../assets/img/sidebarbackground.svg";

const redColor = "#f26f3f";
const greenColor = "#57ac03";
const yellowColor = "#ddd71f";
const token = localStorage.getItem("token");
//loactionmatrics-chartoptions
const loactionmatricschartOptions = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      beginAtZero: true,
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        color: "#26a6d5",
      },
    },
    y: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        color: "#26a6d5",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "top",
      labels: {
        color: "#b4c232",
        usePointStyle: true,
      },
    },
  },
};


// orderStatis-chartoptions
const chartOrderStatistics = {
  indexAxis: "y",
  animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 1,
      to: 0,
      loop: true
    }
  },


  scales: {
    x: {
      beginAtZero: true,
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        color: "#26a6d5",
      },
    },
    y: {
      stacked: true,
      grid: {
        display: true,
      },
      ticks: {
        color: "#26a6d5",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "top",
      labels: {
        color: "#000",
      },
    },
  },
  maintainAspectRatio: false,
  reponsive: true,
};

const chartAllIndiaOptions = {
  indexAxis: "x",
  maintainAspectRatio: false,
  reponsive: true,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      stacked: false,
      grid: {
        display: false,
      },
      ticks: {
        color: "#26a6d5",
      },
    },
    y: {
      stacked: false,
      grid: {
        display: true,
      },
      ticks: {
        color: "#26a6d5",
      },
    },
  },
  plugins: {

    legend: {
      display: false,
      position: "top",
      labels: {
        color: "#FF9800",
      },
    },

  },
};
//dispatchStatis-chartoptions
const DispatchStatisticchartOptions = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  maintainAspectRatio: false,
  reponsive: true,
  scales: {
    x: {
      beginAtZero: true,
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        color: "#26a6d5",
      },
    },
    y: {
      stacked: true,
      grid: {
        display: true,
      },
      ticks: {
        color: "#26a6d5",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "top",
      labels: {
        color: "#000",
      },
    },
  },
  layout: {
    padding: {
      bottom: 10, // Add some padding at the bottom for the image
    },
  },

};
const DispatchStatisticAllIndiachartOptions = {
  maintainAspectRatio: false,
  reponsive: true,

  scales: {
    x: {
      beginAtZero: true,
      stacked: false,
      grid: {
        display: true,
      },
      ticks: {
        color: "#26a6d5",
      },
    },
    y: {
      stacked: false,
      grid: {
        display: false,
      },
      ticks: {
        color: "#26a6d5",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "top",
      labels: {
        fontColor: "#000",
        fontStyle: "normal",
        fontSize: 12,
        boxWidth: 20,
        padding: 5,
      },
    },
  },
};




export {
  completesvg,
  blockedsvg,
  pendingsvg,
  dispachedsvg,
  inqueuesvg,
  unpackedsvg,
  gpissuessvg,
  notreceivedsvg,
  redColor,
  greenColor,
  yellowColor,
  token,
  loactionmatricschartOptions,
  chartOrderStatistics,
  chartAllIndiaOptions,
  DispatchStatisticchartOptions,
  DispatchStatisticAllIndiachartOptions,
  Logo,
  profileimage,
  background
};
