export const convertUrlParametersToObject = (string) => {
  return JSON.parse('{"' + decodeURI(string).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
}
