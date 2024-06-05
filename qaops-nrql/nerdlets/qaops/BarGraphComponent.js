import React, { useState, useEffect } from "react";
import Chart from "./ChartComponent";

export default class BarGraph extends React.Component {
  render() {
    const { rawData, selectedValue } = this.props;

    // Use sortedData to generate the JSON object
    let dailyData = {};
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    rawData[0].data.forEach(item => {
      const date = new Date(item.timestamp);
      const day = date.getDate(); // getDate() returns the day of the month
      const month = monthNames[date.getMonth()]; // getMonth() returns the month
      const key = `${month} ${day}`;
      if (!dailyData[key]) {
        dailyData[key] = 0;
      }
      dailyData[key]++;
    });

    // Convert the dailyData object to a JSON string
    //const jsonDailyData = dailyData;

    return (
      <>
        <div className="barGraph"></div>
        <Chart dData={dailyData} selectedValue={selectedValue} />
      </>
    );
  }
}
