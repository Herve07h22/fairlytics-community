import React from "react";
import { Card, Row, Typography } from "antd";

import DailyVisits from "../dailyVisits/DailyVisits";
import Countries from "../countries/Countries";
import HourlyProfil from "../hourlyProfil/HourlyProfil";
import Browsers from "../browsers/Browsers";
import MostCommonWay from "../mostCommonWay/MostCommonWay";
import Pages from "../pages/Pages";
import Sources from "../sources/Sources";
import { HostStats } from "domain/analytics/models/HostStats";

const Host: React.FC<{ data: HostStats; interval: number }> = ({
  data,
  interval,
}) => {
  return (
    <Card
      title={
        <Typography.Title style={{ color: "white" }}>
          {data.hostname}
        </Typography.Title>
      }
      style={{
        marginBottom: "1rem",
        borderRadius: "10px 10px 0px 0px",
      }}
      headStyle={{
        borderRadius: "10px 10px 0px 0px",
        backgroundColor: "#3E00EE",
      }}
    >
      <Row gutter={[16, 16]} justify="space-around">
        <DailyVisits
          dailyVisitsStat={data.dailyVisits}
          interval={interval}
          hits={data.hits}
          visitors={data.visitors}
        />
        <Pages pages={data.pages} hits={data.hits} />
        <Sources
          sources={data.sources}
          hostname={data.hostname}
          hits={data.hits}
        />
        <MostCommonWay pages={data.pages} hostname={data.hostname} />
        <Countries pays={data.countries} hits={data.hits} />
        <Browsers browsers={data.browsers} hits={data.hits} />
        <HourlyProfil profils={data.hourlyProfil} />
      </Row>
    </Card>
  );
};

export default Host;
