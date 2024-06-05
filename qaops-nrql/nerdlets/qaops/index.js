import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  HeadingText,
  NrqlQuery,
  PieChart,
  Grid,
  GridItem,
  TableChart,
  BarChart,
  LineChart,
  Select,
  SelectItem
} from "nr1";
import PassedComponent from "./PassedComponent";
import FailedComponent from "./FailedComponent";
import SkippedComponent from "./SkippedComponent";
import TimedOutComponent from "./TimedOutComponent";
import ResponseTable from "./TableComponent";
import BarGraph from "./BarGraphComponent";
import fullResults from "./fullResultsComponent";

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction
import "bootstrap/dist/css/bootstrap.min.css";

export default class QaopsNerdlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      selectedValue: "passed"
    };
  }

  getQuery = passedValue => {
    let query = "";
    if (passedValue === "passed") {
      query = `SELECT * FROM Playwright WHERE status = 'passed' LIMIT MAX SINCE 1 MONTHS AGO`;
    } else if (passedValue === "failed") {
      query = `SELECT * FROM Playwright WHERE status = 'failed' LIMIT MAX SINCE 1 MONTHS AGO`;
    } else if (passedValue === "skipped") {
      query = `SELECT * FROM Playwright WHERE status = 'skipped' LIMIT MAX SINCE 1 MONTHS AGO`;
    } else if (passedValue === "timedOut") {
      query = `SELECT * FROM Playwright WHERE status = 'timedOut' LIMIT MAX SINCE 1 MONTHS AGO`;
    } else if (passedValue === "interrupted") {
      query = `SELECT * FROM Playwright WHERE status = 'interrupted' LIMIT MAX SINCE 1 MONTHS AGO`;
    }
    return query;
  };
  render() {
    return (
      <div className="container">
        <HeadingText className="chartsHeader" type={HeadingText.TYPE.HEADING_1}>
          {`Summary of frontend-automation-test [[TESTING PURPOSES ONLY]]`}
        </HeadingText>
        <Grid className="wrapper" gapType={Grid.GAP_TYPE.MEDIUM}>
          <GridItem columnSpan={4} className="grid-table-results">
            <Card>
              <CardBody className="card mb-3 widget-content card-passed">
                <div class="widget-content-wrapper text-white">
                  <div class="widget-content-left">
                    <div class="widget-heading text-shadow">{`Total Passed Tests`}</div>
                    <div class="widget-subheading text-shadow">{`Tests that successfully met expectations`}</div>
                  </div>
                  <div class="widget-content-right ms-auto">
                    <div class="widget-numbers text-white text-shadow">
                      <span>
                        <PassedComponent />
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem columnSpan={4} className="grid-table-results">
            <Card>
              <CardBody className="card mb-3 widget-content card-skipped">
                <div class="widget-content-wrapper text-white">
                  <div class="widget-content-left">
                    <div class="widget-heading text-shadow">{`Total Skipped Tests`}</div>
                    <div class="widget-subheading text-shadow">{`Tests that were not present on pages`}</div>
                  </div>
                  <div class="widget-content-right ms-auto">
                    <div class="widget-numbers text-white text-shadow">
                      <span>
                        <SkippedComponent />
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem columnSpan={4} className="grid-table-results">
            <Card>
              <CardBody className="card mb-3 widget-content card-failed">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading text-shadow">{`Total Failed Tests`}</div>
                    <div className="widget-subheading text-shadow">{`Tests that did not meet expectations`}</div>
                  </div>
                  <div className="widget-content-right ms-auto">
                    <div className="widget-numbers text-white text-shadow">
                      <span className="m-2">
                        <FailedComponent />
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem columnSpan={12} className="grid-table-results">
            <HeadingText className="chartHeader">{`Latest Test Results`}</HeadingText>
            <NrqlQuery accountIds={[124794]} query="SELECT * FROM Playwright SINCE 1 DAYS AGO" pollInterval={100000}>
              {({ data }) => {
                if (!data) {
                  return "";
                } else {
                  return <ResponseTable response={data} />;
                }
              }}
            </NrqlQuery>
          </GridItem>
          <GridItem columnSpan={12} className="">
            <TimedOutComponent />
          </GridItem>
          <GridItem columnSpan={12}>
            <div className="playwright-bar-graph">
              <Select
                onChange={(evt, value) => {
                  this.setState({ selectedValue: value });
                }}
                value={this.state.selectedValue}
                className=""
              >
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="skipped">Skipped</SelectItem>
                <SelectItem value="timedOut">Timed Out</SelectItem>
                <SelectItem value="interrupted">Interrupted</SelectItem>
              </Select>
              <NrqlQuery accountIds={[124794]} query={this.getQuery(this.state.selectedValue)} pollInterval={100000}>
                {({ data }) => {
                  if (!data) {
                    return "";
                  } else {
                    return <BarGraph rawData={data} selectedValue={this.state.selectedValue} />;
                  }
                }}
              </NrqlQuery>
            </div>
          </GridItem>
          <GridItem columnSpan={12}>
            <div className="qaops-footer p-5 mt-5">
              <p className="text-center">&copy; 2024 QAOPS</p>
            </div>
          </GridItem>
          <GridItem columnSpan={12}>
            <NrqlQuery accountIds={[124794]} query="SELECT * FROM PlaywrightFullReport SINCE 1 DAYS AGO">
              {({ data }) => {
                if (!data) {
                  return [];
                } else {
                  return data[0].data[0].testResults;
                }
              }}
            </NrqlQuery>
          </GridItem>
        </Grid>
      </div>
    );
  }
}
