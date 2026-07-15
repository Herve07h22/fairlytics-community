import { bucketsOf, dateRangeBetween } from "domain/analytics/models/DateRange";
import { InMemoryStatsRepository } from "../inMemory/InMemoryStatsRepository";

const utc = (isoDay: string) => new Date(`${isoDay}T00:00:00.000Z`);

const statsOf = async (from: string, to: string) => {
  const range = dateRangeBetween(utc(from), utc(to));
  const result = await new InMemoryStatsRepository().getStats("any-key", range);
  return { range, hosts: result.value || [] };
};

it("Les buckets de visites sont alignés sur ceux qu'Elasticsearch renverrait", async () => {
  const { range, hosts } = await statsOf("2022-09-17", "2022-09-30");
  const [host] = hosts;

  const expectedBuckets = bucketsOf(range).map((day) => day.getTime());
  expect(host.visits.map((visit) => visit.dateNumber)).toEqual(expectedBuckets);
  expect(host.visits[0].date).toBe("2022-09-17T00:00:00.000Z");
});

it("Au-delà de trois mois, les visites sont agrégées par semaine", async () => {
  const { range, hosts } = await statsOf("2022-01-01", "2022-06-01");
  const [host] = hosts;

  expect(host.visits.length).toBe(bucketsOf(range).length);
  // Une semaine de trafic pèse plus qu'une journée : les buckets sont bien des semaines.
  expect(host.visits[1].hits).toBeGreaterThan(host.visits[1].visitors);
  expect(host.hits).toBe(
    host.visits.reduce((total, visit) => total + visit.hits, 0)
  );
});

it("Deux appels sur la même période renvoient les mêmes chiffres", async () => {
  const first = await statsOf("2022-09-17", "2022-09-30");
  const second = await statsOf("2022-09-17", "2022-09-30");

  expect(second.hosts).toEqual(first.hosts);
});

it("Un site trop peu visité est masqué par le dashboard, un autre ne l'est pas", async () => {
  const { hosts } = await statsOf("2022-09-17", "2022-09-30");

  const [visible, hidden] = hosts;
  expect(visible.hits).toBeGreaterThan(14); // au moins un hit par jour : affiché
  expect(hidden.hits).toBeLessThan(14); // moins d'un hit par jour : masqué
});
