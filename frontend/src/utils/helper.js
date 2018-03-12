export function compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0
    }

    const c = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
    const d = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]
  
    let comparison = 0
    if (c > d) {
      comparison = 1;
    } else if (c < d) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    )
  }
}

export function randId() {
  return Math.random().toString(36).substr(2, 10)
}