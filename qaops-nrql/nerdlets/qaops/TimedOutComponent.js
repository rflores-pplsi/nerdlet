import React from "react";
import { NrqlQuery } from "nr1";

function TimedOutComponent() {
  return (
    <div>
      <NrqlQuery
        accountIds={[124794]}
        query="SELECT count(*) FROM Playwright WHERE status = 'timedOut' SINCE 1 DAYS AGO"
        pollInterval={60000}
      >
        {({ data }) => {
          // console.log(data);
          if (!data) {
            //console.log("no data available");
            return "";
          } else {
            return <h1 className="text-white text-center p-5 m-0">{data[0].data[0].count}</h1>;
          }
        }}
      </NrqlQuery>
    </div>
  );
}

export default TimedOutComponent;
