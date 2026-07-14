import { Granularity } from "domain/analytics/models/DateRange";

// Les buckets sont datés en UTC : on les formate en UTC, sinon les fuseaux
// à l'ouest de Greenwich afficheraient la veille.
const formatBucketLabel = (d: Date, granularity: Granularity) => {
  const options: Intl.DateTimeFormatOptions =
    granularity === "month"
      ? { month: "short", year: "2-digit", timeZone: "UTC" }
      : { month: "numeric", day: "numeric", timeZone: "UTC" };
  return d.toLocaleDateString("fr-FR", options);
};

export { formatBucketLabel };
