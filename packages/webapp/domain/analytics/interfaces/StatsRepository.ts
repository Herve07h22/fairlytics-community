import { Result } from "domain/helpers/Result";
import { DateRange } from "../models/DateRange";
import { HostStats } from "../models/HostStats";

export interface StatsRepository {
  getStats: (
    publicKey: string,
    range: DateRange
  ) => Promise<Result<HostStats[]>>;
}
