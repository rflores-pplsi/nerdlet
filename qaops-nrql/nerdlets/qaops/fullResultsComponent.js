import React from "react";
import { NrqlQuery } from "nr1";

function fullResults() {
  return (
    <>
      <NrqlQuery accountIds={[124794]} query="SELECT * FROM PlaywrightFullReport SINCE 1 DAYS AGO">
        {({ data }) => {
          // console.log(data);
          if (!data) {
            //console.log("no data available");
            return "no data available";
          } else {
            // console.log(data);
            return <p>{JSON.stringify(data)}</p>;
          }
        }}
      </NrqlQuery>
    </>
  );
}
export default fullResults;
