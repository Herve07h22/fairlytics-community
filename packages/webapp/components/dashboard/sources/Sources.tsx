import React from "react";
import { Col } from "antd";
import SourceIcon from "./SourceIcon";
import WrappedPageLink from "./WrappedPageLink"; 
import { FormattedViewsNumber } from "../datatable/FormattedNumber";
import { BackgroundProgress } from "../datatable/BackgroundProgress";
import { ReferrerStat } from "domain/analytics/models/HostStats";
import { Column, DataTable } from "../datatable/DataTable";
import { BorderedCard } from "../card/BorderedCard";
import { withRatio } from "../datatable/withRatio";

const columns: Column<
ReferrerStat & {
  ratio: number;
}
>[] = [
  {
    title: "",
    dataIndex: "page",
    render: (record) => (
      <span className="wordbreak">
        <BackgroundProgress value={record.ratio} />
        <SourceIcon label={record.pageUrl} />{" "}
        {record.pageUrl ? <WrappedPageLink label={record.pageUrl} /> : "(direct)"}
      </span>
    ),
  },
  {
    title: "Vues",
    dataIndex: "views",
    render: (record) => <FormattedViewsNumber views={record.hits} />,
  },
  {
    title: "%",
    dataIndex: "ratio",
    render: (record) => record.ratio + "%",
  },
];

const Sources: React.FC<{
  sources: ReferrerStat[];
  hostname: string;
  hits: number;
}> = ({ sources, hostname, hits }) => {
  // On ne regarde que les sources externes
  const sourcesExternes = sources.filter((s) => !s.pageUrl.includes(hostname));

  const pagesVues = sourcesExternes.map(withRatio(hits));


  return (
    <Col xl={12} span={24}>
      <BorderedCard title="Sources des visites">
        <DataTable data={pagesVues} columns={columns} keyIndex="pageUrl" />
      </BorderedCard>
    </Col>
  );
};

export default Sources;
