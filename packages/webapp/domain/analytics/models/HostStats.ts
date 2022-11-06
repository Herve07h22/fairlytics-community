export type PageStat = {
  pageUrl: string;
  hits: number;
  sources?: ReferrerStat[];
};
export type ReferrerStat = { pageUrl: string; hits: number };
export type BrowserStat = { browserName: string; hits: number };
export type DailyVisitsStat = {
  day: string;
  dayNumber: number;
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
  dailyVisits: DailyVisitsStat[];
  hourlyProfil: HourlyVisitsStat[];
  countries: CountryStat[];
};
