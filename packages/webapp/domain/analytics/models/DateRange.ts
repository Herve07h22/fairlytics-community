export type Granularity = "day" | "week" | "month";

// Période d'observation, bornes incluses, au format ISO 8601.
export type DateRange = {
  from: string;
  to: string;
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;

// Elasticsearch date ses buckets en UTC : on raisonne en UTC de bout en bout,
// sinon les buckets attendus et ceux renvoyés se décalent d'un jour.
const startOfDay = (d: Date) =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

const endOfDay = (d: Date) =>
  new Date(
    Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      23,
      59,
      59,
      999
    )
  );

// Les buckets hebdomadaires d'Elasticsearch commencent le lundi.
const startOfWeek = (d: Date) => {
  const monday = startOfDay(d);
  monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));
  return monday;
};

const startOfMonth = (d: Date) =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));

const addMonths = (d: Date, nbMonths: number) =>
  new Date(
    Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth() + nbMonths,
      d.getUTCDate(),
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds(),
      d.getUTCMilliseconds()
    )
  );

export const dateRangeBetween = (from: Date, to: Date): DateRange => ({
  from: startOfDay(from).toISOString(),
  to: endOfDay(to).toISOString(),
});

export const lastDays = (
  nbDays: number,
  today: Date = new Date()
): DateRange => {
  const firstDay = startOfDay(today);
  firstDay.setUTCDate(firstDay.getUTCDate() - (nbDays - 1));
  return dateRangeBetween(firstDay, today);
};

export const parseDateRange = (
  from: unknown,
  to: unknown
): DateRange | undefined => {
  if (typeof from !== "string" || typeof to !== "string") return undefined;
  const start = new Date(from);
  const end = new Date(to);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return undefined;
  if (start > end) return undefined;
  return { from: start.toISOString(), to: end.toISOString() };
};

export const nbDaysIn = (range: DateRange): number =>
  Math.round(
    (new Date(range.to).getTime() - new Date(range.from).getTime()) / DAY_IN_MS
  );

// Au-delà de 3 mois d'historique on agrège par semaine, au-delà de 6 mois par mois :
// au jour le jour, le graphe deviendrait illisible.
// On compare des jours du calendrier : du 1er janvier au 1er avril fait 3 mois, pas plus.
export const granularityOf = (range: DateRange): Granularity => {
  const from = startOfDay(new Date(range.from));
  const to = startOfDay(new Date(range.to));
  if (to > addMonths(from, 6)) return "month";
  if (to > addMonths(from, 3)) return "week";
  return "day";
};

// Début de chaque bucket attendu sur la période, aligné comme le fait Elasticsearch.
export const bucketsOf = (range: DateRange): Date[] => {
  const granularity = granularityOf(range);
  const to = new Date(range.to);
  const buckets: Date[] = [];

  let current = firstBucket(new Date(range.from), granularity);
  while (current <= to) {
    buckets.push(current);
    current = nextBucket(current, granularity);
  }
  return buckets;
};

const firstBucket = (from: Date, granularity: Granularity) => {
  switch (granularity) {
    case "month":
      return startOfMonth(from);
    case "week":
      return startOfWeek(from);
    default:
      return startOfDay(from);
  }
};

const nextBucket = (current: Date, granularity: Granularity) => {
  switch (granularity) {
    case "month":
      return addMonths(current, 1);
    case "week":
      return new Date(current.getTime() + 7 * DAY_IN_MS);
    default:
      return new Date(current.getTime() + DAY_IN_MS);
  }
};
