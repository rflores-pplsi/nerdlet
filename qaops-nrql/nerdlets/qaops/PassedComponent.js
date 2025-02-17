import React from "react";
import { NrqlQuery } from "nr1";

function PassedComponent() {
  return (
    <>
      <NrqlQuery
        accountIds={[124794]}
        query="SELECT count(*) FROM Playwright WHERE status = 'passed' SINCE 365 DAYS AGO"
        pollInterval={60000}
      >
        {({ data }) => {
          // console.log(data);
          if (!data) {
            console.log("no data available");
            return "";
          } else {
            console.log("passed tests:", data[0].data[0].count);
            return data[0].data[0].count;
          }
        }}
      </NrqlQuery>
    </>
  );
}

export default PassedComponent;
