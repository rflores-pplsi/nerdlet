import React from "react";
import { NerdGraphQuery, ListItem } from "nr1";
import gql from "graphql-tag";
import get from "lodash.get";

export default class GraphqlQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outerResults: null
    };
  }
  async componentDidMount() {
    const outerResults = await NerdGraphQuery.query({
      variables: { accountId },
      query: gql`
        query($accountId: Int!) {
          actor {
            account(id: accountId) {
              summery: nrql(query: "SELECT * FROM Playwright SINCE 1 DAYS AGO") {
                results
              }
            }
          }
        }
      `
    });
    console.log(outerResults);
    this.setState({ outerResults });
  }
  tableRow(summary, detailDataSet) {
    const { duration, status, title } = summary;
    const rows = get(detailDataSet, `actor.account.nrql.results`);
    return rows.map(row => {
      const { duration: rowDuration, status: rowStatus, title: rowTitle } = row;
      return (
        <ListItem key={rowTitle}>
          {rowTitle} - {rowDuration} - {rowStatus}
        </ListItem>
      );
    });
  }

  render() {
    const { outerResults } = this.state;
    if (!outerResults) {
      return;
    }
    return (
      <div className="results">
        {({ data, loading, error }) => {
          if (loading) {
            return;
          }
          if (error) {
            return;
          }
          //debugger;
          const summary = get(outerResults, "data.actor.account.summary.results");
          console.log(data);
          return (
            <div className="results">
              {summary.map(s => {
                return this.tableRow(s, data);
              })}
            </div>
          );
        }}
        ;
      </div>
    );
  }
}
