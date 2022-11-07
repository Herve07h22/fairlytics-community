import { StatsRepository } from "domain/analytics/interfaces/StatsRepository";
import { Client } from "@elastic/elasticsearch";
import { DatabaseError } from "domain/analytics/errors/DatabaseError";
import {
  AggregationsAggregate,
  SearchResponse,
} from "@elastic/elasticsearch/lib/api/types";
import * as fs from "fs";
import { HostStats } from "domain/analytics/models/HostStats";

export class ElasticStatsRepository implements StatsRepository {
  private esClient: Client;
  constructor(private FAIRLYTICS_INDEX_NAME = "fairlytics") {
    !process.env.ELASTIC_USERNAME &&
      console.error("ELASTIC_USERNAME is not set");
    !process.env.ELASTIC_PASSWORD &&
      console.error("ELASTIC_PASSWORD is not set");
    !process.env.ELASTIC_CERT && console.error("ELASTIC_CERT is not set");

    console.log("ELASTIC_CERT :", process.env.ELASTIC_CERT);
    console.log("ELASTIC_USERNAME :", process.env.ELASTIC_USERNAME);

    this.esClient = new Client({
      node: "https://elasticsearch:9200",
      auth: {
        username: process.env.ELASTIC_USERNAME || "elastic",
        password: process.env.ELASTIC_PASSWORD || "changeme",
      },
      tls: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(process.env.ELASTIC_CERT || ""),
      },
    });
  }

  async getStats(publicKey: string, dateInterval: string) {
    try {
      const result: SearchResponse<
        unknown,
        Record<string, AggregationsAggregate>
      > = await this.esClient.search({
        index: this.FAIRLYTICS_INDEX_NAME,
        ...query(publicKey, dateInterval),
      });
      const { aggregations } = result;
      return {
        value: mapQueryToModel(aggregations as EsQueryResult),
      };
    } catch (e) {
      console.error(e);
      return new DatabaseError();
    }
  }
}

const query = (key: string, dateInterval: string) => ({
  query: {
    bool: {
      filter: [
        { term: { fairlyticskey: key } },
        { range: { "@timestamp": { gte: dateInterval, lte: "now" } } },
      ],
    },
  },
  aggs: {
    hotes: {
      terms: { field: "hostname" },
      aggs: {
        visiteurs_uniques: {
          cardinality: {
            field: "unique_visitor",
          },
        },
        sessions: {
          cardinality: {
            field: "session",
          },
        },
        sources: {
          terms: { field: "referrer.keyword", size: 50 },
        },
        profils: {
          histogram: {
            script: "doc['@timestamp'].value.getHour()",
            interval: 1,
            min_doc_count: 0,
            extended_bounds: {
              min: 0,
              max: 23,
            },
            order: {
              _key: "asc",
            },
          },
        },
        pages: {
          terms: { field: "page.keyword", size: 50 },
          aggs: {
            sources: {
              terms: { field: "referrer.keyword" },
            },
          },
        },
        /*
        devices: {
          terms: { field: "device", size: 20 },
        },
        */
        name: {
          terms: { field: "name", size: 20 },
        },
        /*
        os: {
          terms: { field: "os", size: 20 },
        },
        */
        pays: {
          terms: { field: "geoip.country_name", size: 20 },
          aggs: {
            regions: {
              terms: { field: "geoip.region_name" },
            },
          },
        },
        visiteurs: {
          date_histogram: {
            field: "@timestamp",
            calendar_interval: "1d",
          },
          aggs: {
            visiteurs_uniques: {
              cardinality: {
                field: "unique_visitor",
              },
            },
          },
        },
      },
    },
  },
});

export type EsQueryResult = {
  hotes: {
    buckets: Array<{
      key: string; // hostname
      doc_count: number; // total hits
      visiteurs_uniques: {
        value: number; // total users
      };
      sessions: {
        value: number; // total users
      };
      visiteurs: {
        buckets: Array<{
          key_as_string: string; // Datestring. Ex : "2022-09-17T00:00:00.000Z"
          key: number; // Date number, unix epoch. Ex : 1663372800000
          doc_count: 9291; // hits
          visiteurs_uniques: { value: number };
        }>;
      };
      pages: {
        sum_other_doc_count: number; // all the hits which are not in one of the buckets,
        buckets: Array<{
          key: string; // page url. Ex : "/fr/my-page.html",
          doc_count: number; // Hits for that page,
          sources: {
            sum_other_doc_count: number;
            buckets: Array<{
              key: string; // referrer url. Ex : "https://www.google.com/"
              doc_count: number; // Hits for that url,
            }>;
          };
        }>;
      };
      sources: {
        sum_other_doc_count: number; // all the hits which are not in one of the buckets
        buckets: Array<{
          key: string; // referrer url. Ex : "https://www.google.com/",
          doc_count: number; // Hits for that url,
        }>;
      };
      pays: {
        sum_other_doc_count: number; // all the hits which are not in one of the buckets
        buckets: Array<{
          key: string; // country. Ex : "France",
          doc_count: number; // Hits for that country,
          regions: {
            sum_other_doc_count: number;
            buckets: Array<{
              key: string; // City, ex "Paris"
              doc_count: number;
            }>;
          };
        }>;
      };
      profils: {
        buckets: Array<{
          key: number; // Hour
          doc_count: number;
        }>;
      };
      name: {
        sum_other_doc_count: number;
        buckets: Array<{
          key: string; // Browser name, Ex "Mobile Safari"
          doc_count: number;
        }>;
      };
    }>;
  };
};

function mapQueryToModel(queryResult: EsQueryResult): HostStats[] {
  return queryResult.hotes.buckets.map((hote) => ({
    hostname: hote.key,
    hits: hote.doc_count,
    visitors: hote.visiteurs_uniques.value,
    sessions: hote.sessions.value,
    pages: hote.pages.buckets.map((page) => ({
      pageUrl: page.key,
      hits: page.doc_count,
      sources: page.sources.buckets.map((source) => ({
        pageUrl: source.key,
        hits: source.doc_count,
      })),
    })),
    sources: hote.sources.buckets.map((source) => ({
      pageUrl: source.key,
      hits: source.doc_count,
    })),
    browsers: hote.name.buckets.map((esBrowserName) => ({
      browserName: esBrowserName.key,
      hits: esBrowserName.doc_count,
    })),
    dailyVisits: hote.visiteurs.buckets.map((visitor) => ({
      day: visitor.key_as_string,
      dayNumber: visitor.key,
      hits: visitor.doc_count,
      visitors: visitor.visiteurs_uniques.value,
      sessions: 0,
    })),
    hourlyProfil: hote.profils.buckets.map((profil) => ({
      hour: profil.key,
      hits: profil.doc_count,
    })),
    countries: hote.pays.buckets.map((pays) => ({
      name: pays.key,
      hits: pays.doc_count,
      areas: pays.regions.buckets.map((region) => ({
        name: region.key,
        hits: region.doc_count,
      })),
    })),
  }));
}
