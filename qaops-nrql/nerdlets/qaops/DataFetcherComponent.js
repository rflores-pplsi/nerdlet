import React from "react";
import NrqlQuery from "nr1";

class DataFetcher extends React.Component {
  getQuery() {
    const query = `SELECT * FROM PlaywrightFullReport WHERE status = '${this.props.selectedValue}' LIMIT MAX SINCE 365 DAYS AGO`;
    return query;
  }

  render() {
    return (
      <NrqlQuery accountIds={[124794]} query={this.getQuery()} pollInterval={60000}>
        {({ data }) => {
          if (!data) {
            return "";
          } else {
            const sValue = this.props.selectedValue;
            return { data, sValue };
          }
        }}
      </NrqlQuery>
    );
  }
}

export default DataFetcher;
