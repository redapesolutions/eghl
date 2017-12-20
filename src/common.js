import encodeUrl from 'encodeurl'

export const convertUrlParametersToObject = (string) => {
  return JSON.parse('{"' + decodeURI(string).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export const encodeValues = (values) => {
  for (let property in values) {
    let value = values[property]

    values[property] = encodeUrl(value)
  }

  return values
}
