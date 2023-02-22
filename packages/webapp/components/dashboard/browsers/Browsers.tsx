import React from "react";
import { Col } from "antd";
import { BrowserStat } from "domain/analytics/models/HostStats";
import { BorderedCard } from "../card/BorderedCard";
import { Column, DataTable } from "../datatable/DataTable";
import { FormattedViewsNumber } from "../datatable/FormattedNumber";
import { withRatio } from "../datatable/withRatio";
import { BackgroundProgress } from "../datatable/BackgroundProgress";

type Device = "Scrapper" | "Mobile" | "Desktop";


function classificationNavigateur(navigateur: string): Device {
  const formatedNavigateur = navigateur.toLowerCase();

  if (
    formatedNavigateur.includes("bot") ||
    formatedNavigateur.includes("headless")
  )
    return "Scrapper";

  if (
    formatedNavigateur.includes("mobile") ||
    formatedNavigateur.includes("samsung") ||
    formatedNavigateur.includes("instagram") ||
    formatedNavigateur.includes("miui") ||
    formatedNavigateur.includes("facebook")
  )
    return "Mobile";

  return "Desktop";
}

const Browsers: React.FC<{ browsers: BrowserStat[]; hits: number }> = ({
  browsers,
  hits,
}) => {
  // On catégorise les pages vues selon Mobile / Desktop
  const pagesVuesParNavigateur = browsers.map((v) => ({
    browser: v.browserName,
    hits: v.hits,
    device: classificationNavigateur(v.browserName),
  }));

  const pagesVuesParDevice = pagesVuesParNavigateur.reduce(
    (acc, val) => {
      if (acc[val.device]) {
        acc[val.device] += val.hits;
      } else {
        acc[val.device] = val.hits;
      }
      return acc;
    },
    { Scrapper: 0, Mobile: 0, Desktop: 0 }
  );

  const tabPagesVues = (Object.keys(pagesVuesParDevice) as Device[]).map(
    (k) => ({
      browser: k,
      hits: pagesVuesParDevice[k],
      ratio: Math.ceil((100 * pagesVuesParDevice[k]) / hits),
      level:1,
      children: pagesVuesParNavigateur.filter(b => b.device === k).map(withRatio(pagesVuesParDevice[k], 2))
    })
  ).sort((b1, b2) => b2.hits - b1.hits);

  const columns: Column<typeof tabPagesVues[0]>[] = [
    {
      title: "Navigateur",
      dataIndex: "browser",
      render: (record) => record.level === 1 ? (
        <span className="wordbreak">
          <BackgroundProgress value={record.ratio} />
          {record.browser}
        </span>
      ) : record.browser,
    },
    {
      title: "Vues",
      dataIndex: "vues",
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
      <BorderedCard title="Navigateurs">
        <DataTable
          data={tabPagesVues}
          columns={columns}
          keyIndex="browser"
        />
      </BorderedCard>
    </Col>
  );
};

export default Browsers;
