export type PageStat = {
  pageUrl: string;
  hits: number;
  sources?: ReferrerStat[];
};
export type ReferrerStat = { pageUrl: string; hits: number };
export type BrowserStat = { browserName: string; hits: number };
// Un bucket de la série temporelle : un jour, une semaine ou un mois selon la période demandée.
export type VisitsStat = {
  date: string;
  dateNumber: number;
  hits: number;
  visitors: number;
  sessions: number;
};
export type HourlyVisitsStat = { hour: number; hits: number };
export type AreaStat = { name: string; hits: number };
export type CountryStat = { name: string; hits: number; areas: AreaStat[] };

export type HostStats = {
  hostname: string;
  hits: number;
  visitors: number;
  sessions: number;
  pages: PageStat[];
  sources: ReferrerStat[];
  browsers: BrowserStat[];
  visits: VisitsStat[];
  hourlyProfil: HourlyVisitsStat[];
  countries: CountryStat[];
};
