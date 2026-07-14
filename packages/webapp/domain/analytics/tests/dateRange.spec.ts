import {
  bucketsOf,
  dateRangeBetween,
  granularityOf,
  lastDays,
  nbDaysIn,
  parseDateRange,
} from "../models/DateRange";

const utc = (isoDay: string) => new Date(`${isoDay}T00:00:00.000Z`);

it("A range covers the selected days from the first midnight to the last midnight", () => {
  const range = dateRangeBetween(utc("2022-09-17"), utc("2022-09-20"));
  expect(range).toEqual({
    from: "2022-09-17T00:00:00.000Z",
    to: "2022-09-20T23:59:59.999Z",
  });
  expect(nbDaysIn(range)).toBe(4);
});

it("A preset of N days ends today and counts today in", () => {
  const range = lastDays(14, new Date("2022-09-20T18:23:00.000Z"));
  expect(range).toEqual({
    from: "2022-09-07T00:00:00.000Z",
    to: "2022-09-20T23:59:59.999Z",
  });
  expect(nbDaysIn(range)).toBe(14);
});

it("An invalid date range is rejected", () => {
  expect(parseDateRange(undefined, undefined)).toBeUndefined();
  expect(parseDateRange("now-14d", "now")).toBeUndefined();
  expect(
    parseDateRange("2022-09-20T00:00:00.000Z", "2022-09-17T00:00:00.000Z")
  ).toBeUndefined();
  expect(
    parseDateRange("2022-09-17T00:00:00.000Z", "2022-09-20T23:59:59.999Z")
  ).toEqual({
    from: "2022-09-17T00:00:00.000Z",
    to: "2022-09-20T23:59:59.999Z",
  });
});

it("Visits are aggregated by day up to 3 months of history", () => {
  expect(granularityOf(lastDays(90, utc("2022-09-20")))).toBe("day");
  expect(
    granularityOf(dateRangeBetween(utc("2022-01-01"), utc("2022-04-01")))
  ).toBe("day");
});

it("Visits are aggregated by week beyond 3 months of history", () => {
  expect(
    granularityOf(dateRangeBetween(utc("2022-01-01"), utc("2022-04-02")))
  ).toBe("week");
  expect(
    granularityOf(dateRangeBetween(utc("2022-01-01"), utc("2022-07-01")))
  ).toBe("week");
});

it("Visits are aggregated by month beyond 6 months of history", () => {
  expect(
    granularityOf(dateRangeBetween(utc("2022-01-01"), utc("2022-07-02")))
  ).toBe("month");
  expect(
    granularityOf(dateRangeBetween(utc("2022-01-01"), utc("2023-01-01")))
  ).toBe("month");
});

it("Daily buckets cover every day of the range", () => {
  const buckets = bucketsOf(
    dateRangeBetween(utc("2022-09-17"), utc("2022-09-20"))
  );
  expect(buckets.map((b) => b.toISOString())).toEqual([
    "2022-09-17T00:00:00.000Z",
    "2022-09-18T00:00:00.000Z",
    "2022-09-19T00:00:00.000Z",
    "2022-09-20T00:00:00.000Z",
  ]);
});

it("Weekly buckets start on the monday of the week the range starts in", () => {
  // 2022-01-01 is a saturday : Elasticsearch buckets it with the monday 2021-12-27.
  const buckets = bucketsOf(
    dateRangeBetween(utc("2022-01-01"), utc("2022-04-30"))
  );
  expect(buckets[0].toISOString()).toBe("2021-12-27T00:00:00.000Z");
  expect(buckets[1].toISOString()).toBe("2022-01-03T00:00:00.000Z");
  expect(buckets[buckets.length - 1].toISOString()).toBe(
    "2022-04-25T00:00:00.000Z"
  );
});

it("Monthly buckets start on the first day of each month", () => {
  const buckets = bucketsOf(
    dateRangeBetween(utc("2022-01-15"), utc("2022-12-31"))
  );
  expect(buckets[0].toISOString()).toBe("2022-01-01T00:00:00.000Z");
  expect(buckets).toHaveLength(12);
  expect(buckets[11].toISOString()).toBe("2022-12-01T00:00:00.000Z");
});
