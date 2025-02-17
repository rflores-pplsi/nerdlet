import React from "react";
import { NrqlQuery } from "nr1";

function FailedComponent() {
  return (
    <>
      <NrqlQuery
        accountIds={[124794]}
        query="SELECT count(*) FROM PlaywrightFullReport WHERE status = 'failed' SINCE 365 DAYS AGO"
        pollInterval={60000}
      >
        {({ data }) => {
          // console.log(data);
          if (!data) {
            //console.log("no data available");
            return "";
          } else {
            return data[0].data[0].count;
          }
        }}
      </NrqlQuery>
    </>
  );
}

export default FailedComponent;
