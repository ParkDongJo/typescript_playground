type NetworkLoadingState = { state: "loading" };
type NetworkFailedState = { state: "failed"; code: number };
type NetworkSuccessState = { state: "success"; response: object };
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;


function networkStatus(state: NetworkState): string {
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      return `Error ${state.code} downloading`;
    case "success":
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}