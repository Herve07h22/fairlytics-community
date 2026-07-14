import { HostStats } from "domain/analytics/models/HostStats";
import { DateRange, lastDays, nbDaysIn } from "domain/analytics/models/DateRange";
import { Result } from "domain/helpers/Result";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const url = "/api/get_stats";

const DEFAULT_PRESET = 14;

// Une période, éventuellement issue d'un des raccourcis "14 / 30 / 90 jours".
export type Period = DateRange & { preset?: number };

function fetchAnalytics({
  queryKey,
}: {
  queryKey: [string, string, string, string];
}) {
  const [, fairlyticsKey, from, to] = queryKey;
  if (!fairlyticsKey) return { value: [] };

  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fairlyticsKey,
      from,
      to,
    }),
  }).then((response) => {
    const data: Promise<Result<HostStats[]>> = response.json();
    return data;
  });
}

const useElasticSearch = (fairlyticsKey?: string) => {
  const [dashboardState, setDashboardState] = useState<DashboardState>(
    DashboardState.InitialLoading
  );
  const [period, setPeriod] = useState<Period>(() => ({
    preset: DEFAULT_PRESET,
    ...lastDays(DEFAULT_PRESET),
  }));

  const query = useQuery(
    ["get_stats", fairlyticsKey || "", period.from, period.to],
    fetchAnalytics,
    { keepPreviousData: true, enabled: !!fairlyticsKey, staleTime: 500 }
  );

  const error = String(query.error) || query.data?.error;
  const hostStats = query.data?.value || [];
  const loading = query.isFetching;
  const datasetSize = hostStats.length;

  useEffect(() => {
    setDashboardState((currentState) =>
      nextState(currentState, { loading, datasetSize })
    );
  }, [loading, datasetSize]);

  // Do not display "hidden" sites (nb of hits < minHitsLimit), except if it's the only one
  const minHitsLimit = nbDaysIn(period); // 1 hits / day
  const visibleSites = hostStats.filter((host) => host.hits >= minHitsLimit);
  const toDisplay = visibleSites.length > 0 ? visibleSites : [hostStats[0]];
  const toHide = hostStats.filter(
    (host) => !toDisplay.map((h) => h.hostname).includes(host.hostname)
  );

  return {
    dashboardState,
    error,
    period,
    setPeriod,
    toDisplay,
    toHide,
  };
};

// Good old state machine
export enum DashboardState {
  "InitialLoading",
  "DataAvailable",
  "NoData",
  "loading",
}

function nextState(
  currentState: DashboardState,
  evt: { loading: boolean; datasetSize: number }
) {
  switch (currentState) {
    case DashboardState.InitialLoading: {
      if (evt.loading === false && evt.datasetSize > 0)
        return DashboardState.DataAvailable;
      if (evt.loading === false && evt.datasetSize === 0)
        return DashboardState.NoData;
      return currentState;
    }
    case DashboardState.loading:
    case DashboardState.DataAvailable:
      return evt.loading
        ? DashboardState.loading
        : DashboardState.DataAvailable;
    case DashboardState.NoData:
      return evt.datasetSize
        ? DashboardState.DataAvailable
        : DashboardState.NoData;
    default:
      return currentState;
  }
}

export { useElasticSearch };
