import React from "react";
import { Col } from "antd";
import { BackgroundProgress } from "../datatable/BackgroundProgress";
import { FormattedViewsNumber } from "../datatable/FormattedNumber";
import { PageStat } from "domain/analytics/models/HostStats";
import { Column, DataTable } from "../datatable/DataTable";
import { BorderedCard } from "../card/BorderedCard";
import { withRatio } from "../datatable/withRatio";

const columns: Column<
PageStat & {
  ratio: number;
}
>[] = [
  {
    title: "Page",
    dataIndex: "page",
    render: (record) => (
      <span className="wordbreak">
        <BackgroundProgress value={record.ratio} />
        {record.pageUrl}
      </span>
    ),
  },
  {
    title: "Vues",
    dataIndex: "views",
    render: (record) => <FormattedViewsNumber views={record.hits}/>
  },
  {
    title: "%",
    dataIndex: "ratio",
    render: (record) => record.ratio + "%",
  },
];

const Pages:React.FC<{pages : PageStat[], hits:number}> = ({ pages, hits }) => {

  const pagesVues = pages.map(withRatio(hits));
  
  return (
    <Col xl={12} span={24}>
      <BorderedCard title="Pages consultées">
        <DataTable data={pagesVues} columns={columns} keyIndex="pageUrl" />
      </BorderedCard>
      
    </Col>
  );
};

export default Pages;
