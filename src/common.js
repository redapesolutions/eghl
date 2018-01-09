import mapValues from 'lodash/mapValues'

export const convertUrlParametersToObject = (string) => {
  return JSON.parse('{"' + decodeURI(string).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export const encodeValues = values => mapValues(values, x => encodeURIComponent(x))
