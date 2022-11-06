import React from "react";
import Host from "./host/Host";
import NoData from "./card/NoData";
import HiddenHosts from "./host/HiddenHosts";
import { DashboardState, useElasticSearch } from "./useElasticSearch";
import { Layout } from "antd";
import FairlyticsHeader from "./header/FairlyticsHeader";

const { Header, Content } = Layout;

const contentStyle = {
  width: "100%",
  maxWidth: "1200px",
  padding: "8px",
  marginTop: "3rem",
  marginLeft: "auto",
  marginRight: "auto",
};

const headerStyle = { background: "white" };

const Analytics: React.FC<{ fairlyticsKey: string }> = ({ fairlyticsKey }) => {
  const {
    dashboardState,
    error,
    interval,
    setInterval,
    toHide,
    toDisplay,
  } = useElasticSearch(fairlyticsKey);

  if (dashboardState === DashboardState.InitialLoading)
    return <NoData initialLoading={true} />;
  if (dashboardState === DashboardState.NoData)
    return <NoData initialLoading={false} />;

  return (
    <>
      <Header style={headerStyle}>
        <FairlyticsHeader
          interval={interval}
          setInterval={setInterval}
          loading={dashboardState === DashboardState.loading}
        />
      </Header>
      <Content style={contentStyle}>
        <div>
          {toDisplay.map((h) => (
            <Host key={h.hostname} data={h} interval={interval} />
          ))}

          {<HiddenHosts data={toHide} />}
        </div>
      </Content>
    </>
  );
};

export default Analytics;
