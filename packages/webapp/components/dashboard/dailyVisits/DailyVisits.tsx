import React from "react";
import { Card, Col, Statistic, Row, Divider } from "antd";
import {
  TeamOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import Chart from "../chart/Chart";
import { formatDateDayMonth } from "../../helpers/helpers";
import { formatTimeSeries } from "../../helpers/formatTimeSeries";
import { FormattedNumber } from "../datatable/FormattedNumber";
import { DailyVisitsStat } from "domain/analytics/models/HostStats";

const DailyVisits: React.FC<{
  dailyVisitsStat: DailyVisitsStat[];
  interval: number;
  hits:number,
  visitors:number
}> = ({ interval, dailyVisitsStat , hits, visitors}) => {
  const xLabelsArray = dailyVisitsStat.map((v) => v.day);
  const yDataArray = dailyVisitsStat.map((v) => v.visitors);

  const { xLabelsArrayFormatted, yDataArrayFormatted } = formatTimeSeries({
    format: `now-${interval}d`,
    xLabelsArray,
    yDataArray,
  });


  return (
    <Col span={24}>
      <Card
        title={
          <Row gutter={16}>
            <Col>
              <Statistic
                title="Visiteurs uniques"
                value={FormattedNumber(visitors)}
                prefix={<TeamOutlined />}
              />
            </Col>
            <Col>
              <Divider type="vertical" />
            </Col>
            <Col>
              <Statistic
                title="Visites"
                value={FormattedNumber(hits)}
                prefix={<FileDoneOutlined />}
              />
            </Col>
            {/* space remains to add sessions */}
            
          </Row>
        }
        style={{ marginBottom: "1rem", padding: 0 }}
        bordered={false}
      >
        <Chart
          xLabelsArray={xLabelsArrayFormatted.map((d) => formatDateDayMonth(d))}
          yDataArray={yDataArrayFormatted}
          serieLabel="Visiteurs uniques"
        />
      </Card>
    </Col>
  );
};

export default DailyVisits;


