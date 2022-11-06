import { State } from "./store";

export type Action =
  | { type: "SET_TIME_INTERVAL"; interval: number }
  | { type: "BEGIN_FETCH" }
  | { type: "SET_RESULTS"; results: any }
  | { type: "SET_ERROR"; message: string };

export type Reducer = (state: State, action: Action) => State;

const reducer: Reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_TIME_INTERVAL":
      return Object.assign({}, state, { interval: action.interval });
    case "BEGIN_FETCH":
      return Object.assign({}, state, { loading: true });
    case "SET_RESULTS":
      return Object.assign({}, state, {
        hostStats: action.results,
        loading: false,
      });
    case "SET_ERROR":
      return Object.assign({}, state, {
        errorMessage: action.message,
        loading: false,
      });

    default:
      return state;
  }
};

export { reducer };
