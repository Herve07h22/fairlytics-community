import React from "react";
import { Col } from "antd";
import Chart from "../chart/Chart";
import { HourlyVisitsStat } from "domain/analytics/models/HostStats";
import { BorderedCard } from "../card/BorderedCard";

const HourlyProfil: React.FC<{ profils: HourlyVisitsStat[] }> = ({ profils }) => {
  const xLabelsArray = profils.map((v) => v.hour + "h");
  const yDataArray = profils.map((v) => v.hits);

  return (
    <Col xl={12} span={24}>
      <BorderedCard title="Horaires des visites">
        <Chart
          xLabelsArray={xLabelsArray}
          yDataArray={yDataArray}
          serieLabel="Horaires des visites"
        />
      </BorderedCard>
    </Col>
  );
};

export default HourlyProfil;
