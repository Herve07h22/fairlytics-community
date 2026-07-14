import React from "react";
import { Card, Col, Statistic, Row, Divider } from "antd";
import { TeamOutlined, FileDoneOutlined } from "@ant-design/icons";
import Chart from "../chart/Chart";
import { formatBucketLabel } from "../../helpers/helpers";
import { FormattedNumber } from "../datatable/FormattedNumber";
import { VisitsStat } from "domain/analytics/models/HostStats";
import { DateRange, Granularity } from "domain/analytics/models/DateRange";
import { visitsTimeSeries } from "domain/analytics/models/VisitsTimeSeries";

const SERIE_LABEL: Record<Granularity, string> = {
  day: "Visiteurs uniques par jour",
  week: "Visiteurs uniques par semaine",
  month: "Visiteurs uniques par mois",
};

const Visits: React.FC<{
  visitsStat: VisitsStat[];
  range: DateRange;
  hits: number;
  visitors: number;
}> = ({ range, visitsStat, hits, visitors }) => {
  const { granularity, buckets } = visitsTimeSeries(visitsStat, range);

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
          xLabelsArray={buckets.map((b) =>
            formatBucketLabel(b.start, granularity)
          )}
          yDataArray={buckets.map((b) => b.visitors)}
          serieLabel={SERIE_LABEL[granularity]}
        />
      </Card>
    </Col>
  );
};

export default Visits;
