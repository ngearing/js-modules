export function uri(obj) {
  return Object.keys(obj)
    .map(k => `${k}=${obj[k]}`)
    .reduce((p, c) => `${p}&${c}`)
}

export function uriEncoded(obj) {
  return encodeURI(uri(obj))
}

const objFunc = {
  uri,
  uriEncoded,
}

export default objFunc
