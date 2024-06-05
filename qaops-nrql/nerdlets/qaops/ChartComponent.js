import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
const Chart = ({ dData, selectedValue }) => {
  const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  function getLabels(dData) {
    const labels = Object.keys(dData);
    return labels;
  }
  function getValues(dData) {
    const values = Object.values(dData);
    return values;
  }
  function getObjectCount(dData) {
    const count = Object.keys(dData).length;
    // console.log(count); // 18
    return count;
  }
  const colorBG = () => {
    if (selectedValue == "passed") {
      return "rgba(75, 192, 192, 0.2)";
    } else if (selectedValue == "failed") {
      return "rgba(255, 99, 132, 0.2)";
    } else if (selectedValue == "skipped") {
      return "rgba(255, 206, 86, 0.2)";
    } else if (selectedValue == "timedOut") {
      return "rgba(255, 159, 64, 0.2)";
    } else if (selectedValue == "interrupted") {
      return "rgba(153, 102, 255, 0.2)";
    }
  };
  function getColorArray() {
    const color = colorBG();
    const colorArray = new Array(getObjectCount(dData)).fill(color);
    return colorArray;
  }
  const getLegendLabel = () => {
    if (selectedValue == "passed") {
      return "# of Passed Tests";
    } else if (selectedValue == "failed") {
      return "# of Failed Tests";
    } else if (selectedValue == "skipped") {
      return "# of Skipped Tests";
    } else if (selectedValue == "timedOut") {
      return "# of Timed Out Tests";
    } else if (selectedValue == "interrupted") {
      return "# of Interrupted Tests";
    }
  };
  const chartConfig = {
    type: "bar",
    data: {
      labels: getLabels(dData),
      datasets: [
        {
          label: getLegendLabel(),
          data: getValues(dData),
          backgroundColor: colorBG(),
          borderColor: getColorArray(),
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  };

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};
export default Chart;
