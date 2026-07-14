import {
  bucketsOf,
  DateRange,
  Granularity,
  granularityOf,
} from "./DateRange";
import { VisitsStat } from "./HostStats";

export type VisitsTimeSeries = {
  granularity: Granularity;
  buckets: { start: Date; visitors: number; hits: number }[];
};

// Elasticsearch n'émet aucun bucket avant la première ni après la dernière visite,
// et en saute quand personne ne vient : on réaligne la série sur la période demandée
// pour que le graphe couvre toujours toute la période, trous compris.
export const visitsTimeSeries = (
  visits: VisitsStat[],
  range: DateRange
): VisitsTimeSeries => ({
  granularity: granularityOf(range),
  buckets: bucketsOf(range).map((start) => {
    const visit = visits.find((v) => v.dateNumber === start.getTime());
    return {
      start,
      visitors: visit ? visit.visitors : 0,
      hits: visit ? visit.hits : 0,
    };
  }),
});
