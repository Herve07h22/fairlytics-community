import React from "react";
import { Col } from "antd";
import { AreaStat, CountryStat } from "domain/analytics/models/HostStats";
import { Column, DataTable } from "../datatable/DataTable";
import { FormattedViewsNumber } from "../datatable/FormattedNumber";
import { BorderedCard } from "../card/BorderedCard";
import { withRatio } from "../datatable/withRatio";
import { BackgroundProgress } from "../datatable/BackgroundProgress";

const Countries: React.FC<{ pays: CountryStat[]; hits: number }> = ({
  pays,
  hits,
}) => {
  const pagesVues = pays.map(withRatio(hits)).map(p => ({...p, children:p.areas.map(withRatio(p.hits,2))}))

  const columns: Column<
    CountryStat & {
      ratio: number;
      level: number;
    }
  >[] = [
    {
      title: "Pays",
      dataIndex: "name",
      render: (record) => record.level === 1 ? (
        <span className="wordbreak">
          <BackgroundProgress value={record.ratio} />
          {record.name}
        </span>
      ) : record.name,
    },
    {
      title: "Vues",
      dataIndex: "hits",
      render: (record) => <FormattedViewsNumber views={record.hits} />,
    },
    {
      title: "%",
      dataIndex: "ratio",
      render: (record) => record.ratio + "%",
    },
  ];

  return (
    <Col xl={12} span={24}>
      <BorderedCard title="Pays des visiteurs">
        <DataTable
          data={pagesVues}
          columns={columns}
          keyIndex="name"
        />
      </BorderedCard>
    </Col>
  );
};

export default Countries;
