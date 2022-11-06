import { Result } from "domain/helpers/Result";
import { HostStats } from "../models/HostStats";

export interface StatsRepository {
  getStats: (
    publicKey: string,
    dateInterval: string
  ) => Promise<Result<HostStats[]>>;
}
