import { StatsRepository } from "domain/analytics/interfaces/StatsRepository";
import { bucketsOf, DateRange } from "domain/analytics/models/DateRange";
import {
  BrowserStat,
  CountryStat,
  HostStats,
  PageStat,
  ReferrerStat,
  VisitsStat,
} from "domain/analytics/models/HostStats";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

// Un hôte de démonstration : le trafic est reconstruit à partir de `dailyHits`,
// les autres statistiques n'en sont que des répartitions.
type HostFixture = {
  hostname: string;
  dailyHits: number; // fréquentation d'un jour de semaine "moyen"
  pages: Array<{ pageUrl: string; weight: number }>;
  sources: Array<{ pageUrl: string; weight: number }>; // "" = accès direct
  browsers: Array<{ browserName: string; weight: number }>;
  countries: Array<{
    name: string;
    weight: number;
    areas: Array<{ name: string; weight: number }>;
  }>;
};

// Le second hôte reçoit moins d'un hit par jour : le dashboard le range dans les
// sites masqués, ce qui permet de voir ce cas-là en local.
const HOSTS: HostFixture[] = [
  {
    hostname: "demo.fairlytics.tech",
    dailyHits: 240,
    pages: [
      { pageUrl: "/", weight: 42 },
      { pageUrl: "/tarifs", weight: 21 },
      { pageUrl: "/blog/analytics-sans-cookies", weight: 18 },
      { pageUrl: "/doc/fonctionnement", weight: 12 },
      { pageUrl: "/contact", weight: 7 },
    ],
    sources: [
      { pageUrl: "", weight: 38 },
      { pageUrl: "https://www.google.com/", weight: 27 },
      { pageUrl: "https://news.ycombinator.com/", weight: 15 },
      { pageUrl: "https://www.linkedin.com/", weight: 12 },
      { pageUrl: "https://mastodon.social/", weight: 8 },
    ],
    browsers: [
      { browserName: "Chrome", weight: 46 },
      { browserName: "Mobile Safari", weight: 24 },
      { browserName: "Firefox", weight: 18 },
      { browserName: "Edge", weight: 12 },
    ],
    countries: [
      {
        name: "France",
        weight: 64,
        areas: [
          { name: "Île-de-France", weight: 45 },
          { name: "Occitanie", weight: 30 },
          { name: "Bretagne", weight: 25 },
        ],
      },
      {
        name: "Belgique",
        weight: 18,
        areas: [{ name: "Bruxelles-Capitale", weight: 100 }],
      },
      {
        name: "Canada",
        weight: 11,
        areas: [{ name: "Québec", weight: 100 }],
      },
      {
        name: "Suisse",
        weight: 7,
        areas: [{ name: "Genève", weight: 100 }],
      },
    ],
  },
  {
    hostname: "staging.fairlytics.tech",
    dailyHits: 0.7,
    pages: [
      { pageUrl: "/", weight: 70 },
      { pageUrl: "/tarifs", weight: 30 },
    ],
    sources: [{ pageUrl: "", weight: 100 }],
    browsers: [{ browserName: "Chrome", weight: 100 }],
    countries: [
      { name: "France", weight: 100, areas: [{ name: "Occitanie", weight: 100 }] },
    ],
  },
];

export class InMemoryStatsRepository implements StatsRepository {
  constructor(private hosts: HostFixture[] = HOSTS) {}

  async getStats(publicKey: string, range: DateRange) {
    return { value: this.hosts.map((host) => statsOf(host, range)) };
  }
}

function statsOf(host: HostFixture, range: DateRange): HostStats {
  const days = daysOf(range).map((day) => ({
    day,
    hits: hitsOn(host, day),
  }));
  const visits = intoBuckets(days, range);
  const hits = days.reduce((total, day) => total + day.hits, 0);

  return {
    hostname: host.hostname,
    hits,
    // Un visiteur revient et consulte plusieurs pages : moins de visiteurs que
    // de visites, et moins de visites que de pages vues.
    visitors: Math.round(hits * 0.45),
    sessions: Math.round(hits * 0.65),
    visits,
    pages: pagesOf(host, hits),
    sources: shareOut(host.sources, hits),
    browsers: host.browsers.map(
      (browser): BrowserStat => ({
        browserName: browser.browserName,
        hits: share(browser.weight, host.browsers, hits),
      })
    ),
    countries: host.countries.map(
      (country): CountryStat => {
        const countryHits = share(country.weight, host.countries, hits);
        return {
          name: country.name,
          hits: countryHits,
          areas: country.areas.map((area) => ({
            name: area.name,
            hits: share(area.weight, country.areas, countryHits),
          })),
        };
      }
    ),
    hourlyProfil: hourlyProfilOf(hits),
  };
}

// Les visites d'une page proviennent des sources externes de l'hôte et des pages
// qui y mènent : c'est ce que le dashboard exploite pour reconstituer un parcours.
function pagesOf(host: HostFixture, hits: number): PageStat[] {
  return host.pages.map((page, index): PageStat => {
    const pageHits = share(page.weight, host.pages, hits);
    const previousPage = host.pages[index - 1];
    const externalSources = shareOut(host.sources, Math.round(pageHits * 0.6));
    const internalSource = previousPage
      ? [
          {
            pageUrl: `https://${host.hostname}${previousPage.pageUrl}`,
            hits: Math.round(pageHits * 0.4),
          },
        ]
      : [];
    return {
      pageUrl: page.pageUrl,
      hits: pageHits,
      sources: [...internalSource, ...externalSources],
    };
  });
}

// Elasticsearch agrège les hits par jour, par semaine ou par mois selon la
// période : on regroupe les jours dans les mêmes buckets que lui.
function intoBuckets(
  days: Array<{ day: Date; hits: number }>,
  range: DateRange
): VisitsStat[] {
  const buckets = bucketsOf(range);
  return buckets
    .map((start, index): VisitsStat => {
      const end = buckets[index + 1];
      const hits = days
        .filter(({ day }) => day >= start && (!end || day < end))
        .reduce((total, day) => total + day.hits, 0);
      return {
        date: start.toISOString(),
        dateNumber: start.getTime(),
        hits,
        visitors: Math.round(hits * 0.45),
        sessions: 0, // Elasticsearch ne remonte pas les sessions par bucket
      };
    })
    .filter((bucket) => bucket.hits > 0); // ES n'émet pas de bucket vide
}

// Une journée type : creux la nuit, pic en milieu de journée.
function hourlyProfilOf(hits: number) {
  const weights = [
    1, 1, 1, 1, 1, 2, 4, 7, 9, 10, 10, 9, 7, 8, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2,
  ];
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  return weights.map((weight, hour) => ({
    hour,
    hits: Math.round((hits * weight) / total),
  }));
}

function daysOf(range: DateRange): Date[] {
  const days: Date[] = [];
  const from = new Date(range.from);
  const to = new Date(range.to);
  let current = new Date(
    Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate())
  );
  while (current <= to) {
    days.push(current);
    current = new Date(current.getTime() + DAY_IN_MS);
  }
  return days;
}

// Le trafic d'une journée : moins fréquentée le week-end, avec une variation
// tirée du jour lui-même pour rester identique d'un appel à l'autre.
function hitsOn(host: HostFixture, day: Date): number {
  const isWeekEnd = day.getUTCDay() === 0 || day.getUTCDay() === 6;
  const noise = 0.75 + pseudoRandom(host.hostname, day) * 0.5; // entre 0.75 et 1.25
  return Math.round(host.dailyHits * (isWeekEnd ? 0.55 : 1) * noise);
}

function shareOut(
  weighted: Array<{ pageUrl: string; weight: number }>,
  hits: number
): ReferrerStat[] {
  return weighted.map((item) => ({
    pageUrl: item.pageUrl,
    hits: share(item.weight, weighted, hits),
  }));
}

const share = (
  weight: number,
  all: Array<{ weight: number }>,
  hits: number
): number =>
  Math.round(
    (hits * weight) / all.reduce((total, item) => total + item.weight, 0)
  );

// Suite déterministe : un même (hôte, jour) donne toujours le même tirage, sans
// quoi les chiffres changeraient à chaque rafraîchissement du dashboard.
function pseudoRandom(hostname: string, day: Date): number {
  const seed = hostname.split("").reduce(
    (hash, char) => (hash * 31 + char.charCodeAt(0)) % 2147483647,
    day.getTime() / DAY_IN_MS
  );
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
