import React from "react";
import { NrqlQuery } from "nr1";

function SkippedComponent() {
  return (
    <>
      <NrqlQuery
        accountIds={[124794]}
        query="SELECT count(*) FROM PlaywrightFullReport WHERE status = 'skipped' SINCE 365 DAYS AGO"
        pollInterval={60000}
      >
        {({ data }) => {
          // console.log(data);
          if (!data) {
            //console.log("no data available");
            return "";
          } else {
            return <span>{data[0].data[0].count}</span>;
          }
        }}
      </NrqlQuery>
    </>
  );
}

export default SkippedComponent;
