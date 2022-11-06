import React from "react";
import { Card, Col, Timeline } from "antd";
import { PageStat } from "domain/analytics/models/HostStats";
import { BorderedCard } from "../card/BorderedCard";

const chercheOrigine = (page: PageStat) => {
  if (page && page.sources && page.sources.length) {
    const origine = page.sources.filter((p) => p && p.pageUrl)[0];
    if (origine && origine.pageUrl) return origine.pageUrl;
  }
  return null;
};

function chercheDestination(
  page: PageStat,
  cheminCourant: string[],
  pages: PageStat[],
  hostname: string
): string[] {
  // Parmi toutes les pages, quelle est celle qui à comme origine la plus fréquente la page courante et qui n'est pas déjà dans le chemin ?
  const pagesEligibles = pages.filter(
    (p) =>
      !cheminCourant.includes(p.pageUrl) &&
      (p.sources || []).find((o) => o.pageUrl.endsWith(hostname + page.pageUrl))
  );
  const pagesEligiblesOrdonnees = pagesEligibles.map((p) => ({
    pageUrl: p.pageUrl,
    hits:
      (p.sources || []).find((o) => o.pageUrl.endsWith(hostname + page.pageUrl))
        ?.hits || 0,
  }));

  if (pagesEligiblesOrdonnees.length) {
    const pageDestinationProbable = pagesEligiblesOrdonnees.sort(
      (p1, p2) => p2.hits - p1.hits
    )[0];
    const cheminComplete = [...cheminCourant, page.pageUrl];

    return chercheDestination(
      pageDestinationProbable,
      cheminComplete,
      pages,
      hostname
    );
  } else {
    return [...cheminCourant, page.pageUrl];
  }
}

const MostCommonWay: React.FC<{ pages: PageStat[]; hostname: string }> = ({
  pages,
  hostname,
}) => {
  const pageLaPlusVue = pages[0];

  const originePageLaPlusVue = chercheOrigine(pageLaPlusVue);

  const cheminPrivilegie = chercheDestination(
    pageLaPlusVue,
    [],
    pages,
    hostname
  );
  const cheminPrivilegieSansDoublon = cheminPrivilegie.reduce(
    (acc, val) => (acc.includes(val) ? acc : [...acc, val]),
    [] as string[]
  );

  return (
    <Col xl={12} span={24}>
      <BorderedCard title="Chemin privilégié">
        <Timeline>
          <Timeline.Item> {originePageLaPlusVue} </Timeline.Item>
          {cheminPrivilegieSansDoublon &&
            cheminPrivilegieSansDoublon.length &&
            cheminPrivilegieSansDoublon.map((d) => (
              <Timeline.Item key={d}>
                {d === "/" ? "Homepage" : d}{" "}
              </Timeline.Item>
            ))}
        </Timeline>
      </BorderedCard>
    </Col>
  );
};

export default MostCommonWay;
