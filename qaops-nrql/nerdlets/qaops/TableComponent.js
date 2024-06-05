import React, { useState, useEffect } from "react";

function ResponseTable({ response }) {
  const [sortField, setSortField] = useState(0);
  const [sortDirection, setSortDirection] = useState("asc");
  const [isToggled, setIsToggled] = useState(false);
  const [activeColumn, setActiveColumn] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const onSort = field => {
    let fieldIsToggled = !isToggled;
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
    setIsToggled(fieldIsToggled);
    setActiveColumn(activeColumn);
    renderBody();
  };

  const renderHeader = () => {
    let headerElement = ["duration", "status", "title", "timestamp"];
    return headerElement.map((key, index) => {
      return (
        <th
          key={index}
          onClick={() => onSort(key)}
          className={sortField === key ? (isToggled ? "tri triangle-bottom" : "tri triangle-top") : ""}
          scope="column"
        >
          {" "}
          {key.toUpperCase()}
        </th>
      );
    });
  };
  const formatTime = time => {
    let fTime = new Date(time);
    let hours = fTime.getUTCHours();
    let minutes = fTime.getUTCMinutes();
    let seconds = fTime.getUTCSeconds();

    // Pad the minutes and seconds with leading zeros, if required
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Format the duration
    let duration = `${hours}:${minutes}:${seconds}`;

    return duration;
  };
  const formatDate = timestamp => {
    let fDate = new Date(timestamp);
    return fDate.toLocaleDateString("en-US") + " " + fDate.toLocaleTimeString("en-US");
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(response[0].data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li key={number} className={currentPage === number ? "page-item active" : "page-item"}>
        <a onClick={() => setCurrentPage(number)} className="page-link">
          {number}
        </a>
      </li>
    );
  });
  const renderBody = () => {
    let sortedData = [...response[0].data];
    if (sortField !== null) {
      sortedData.sort((a, b) => {
        if (a[sortField] < b[sortField]) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a[sortField] > b[sortField]) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    // Pagination
    const indexOfLastItem = currentPage * 10;
    const indexOfFirstItem = indexOfLastItem - 10;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    return currentItems.map(({ duration, status, timestamp, title }) => {
      return (
        <tr key={title}>
          <td>{formatTime(duration)}</td>
          <td>{status}</td>
          <td>{title}</td>
          <td>{formatDate(timestamp)}</td>
        </tr>
      );
    });
  };

  return (
    <div className="tableResponse">
      <table id="playwright-table" className="table table-responsive table-striped border border-1">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center mt-5">{renderPageNumbers}</ul>
      </nav>
    </div>
  );
}
export default ResponseTable;
