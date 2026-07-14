import { dateRangeBetween } from "../models/DateRange";
import { VisitsStat } from "../models/HostStats";
import { visitsTimeSeries } from "../models/VisitsTimeSeries";

const utc = (isoDay: string) => new Date(`${isoDay}T00:00:00.000Z`);

const esBucket = (isoDay: string, visitors: number): VisitsStat => ({
  date: `${isoDay}T00:00:00.000Z`,
  dateNumber: utc(isoDay).getTime(),
  hits: visitors * 2,
  visitors,
  sessions: 0,
});

it("A day without any visit is a hole in the serie, not a missing bar", () => {
  const serie = visitsTimeSeries(
    [esBucket("2022-09-18", 12), esBucket("2022-09-20", 7)],
    dateRangeBetween(utc("2022-09-17"), utc("2022-09-20"))
  );

  expect(serie.granularity).toBe("day");
  expect(serie.buckets.map((b) => b.visitors)).toEqual([0, 12, 0, 7]);
  expect(serie.buckets.map((b) => b.start.toISOString())).toEqual([
    "2022-09-17T00:00:00.000Z",
    "2022-09-18T00:00:00.000Z",
    "2022-09-19T00:00:00.000Z",
    "2022-09-20T00:00:00.000Z",
  ]);
});

it("Beyond 3 months, the serie holds one bar per week", () => {
  const serie = visitsTimeSeries(
    [esBucket("2022-01-03", 30)],
    dateRangeBetween(utc("2022-01-03"), utc("2022-04-30"))
  );

  expect(serie.granularity).toBe("week");
  expect(serie.buckets).toHaveLength(17);
  expect(serie.buckets[0]).toEqual({
    start: utc("2022-01-03"),
    visitors: 30,
    hits: 60,
  });
  expect(serie.buckets[1].visitors).toBe(0);
});

it("Beyond 6 months, the serie holds one bar per month", () => {
  const serie = visitsTimeSeries(
    [esBucket("2022-01-01", 100), esBucket("2022-03-01", 300)],
    dateRangeBetween(utc("2022-01-01"), utc("2022-12-31"))
  );

  expect(serie.granularity).toBe("month");
  expect(serie.buckets).toHaveLength(12);
  expect(serie.buckets.map((b) => b.visitors)).toEqual([
    100, 0, 300, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
});
