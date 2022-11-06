/* eslint-disable react/display-name */
import { HostStats } from "domain/analytics/models/HostStats";
import React, { useReducer, useContext } from "react";
import { reducer, Action } from "./reducer";

export type State = {
  interval: number;
  loading: boolean;
  hostStats?: HostStats[];
  errorMessage?: string;
};

const initialStore: State = { interval: 14, loading: false };

var storeContext = React.createContext({
  state: initialStore,
  dispatch: (action: Action) => console.log("This should be overwritten"),
});

const withStore = (WrappedComponent: any) => (props: any) => {
  const StoreProvider = storeContext.Provider;
  const [state, dispatch] = useReducer(reducer, initialStore);
  const providervalue = { state, dispatch };
  return (
    <div>
      <StoreProvider value={providervalue}>
        <WrappedComponent {...props} />
      </StoreProvider>
    </div>
  );
};

const useStore = () => useContext(storeContext);

export { withStore, useStore };
