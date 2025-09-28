
/*
  [문제 1]
  state 가 loading 일때는 "Downloading..." 을 반환
  state 가 failed 일때는 "Error {code} downloading" 을 반환
  state 가 success 일때는 "Downloaded {response.title} - {response.summary}" 을 반환

  하는 함수 getNetworkStatus를 구현하세요.
*/
type NetworkState = any

function getNetworkStatus(state: NetworkState): string {
  return "미완성";
}