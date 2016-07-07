export function intersectionArrays () {
  let n, len
  let ret = []
  let obj = {}
  const nOthers = arguments.length - 1
  let nShortest = arguments[0].length
  let shortest = 0
  for (let i = 0; i <= nOthers; i++) {
    n = arguments[i].length
    if (n < nShortest) {
      shortest = i
      nShortest = n
    }
  }
  for (let i = 0; i <= nOthers; i++) {
    n = (i === shortest) ? 0 : (i || shortest) // Read the shortest array first. Read the first array instead of the shortest
    len = arguments[n].length
    for (let j = 0; j < len; j++) {
      let elem = arguments[n][j]
      if (obj[elem] === i - 1) {
        if (i === nOthers) {
          ret.push(elem)
          obj[elem] = 0
        } else {
          obj[elem] = i
        }
      } else if (i === 0) {
        obj[elem] = 0
      }
    }
  }
  return ret
}

export function arraysEqual (a, b) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}
