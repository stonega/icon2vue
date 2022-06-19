export function getClassName(name: string) {
  function isUpercase(c: string) {
    return c.toLowerCase() !== c
  }
  return name
    .split('')
    .map((c, i) => {
      if (i == 0) {
        return c.toLowerCase()
      }
      if (isUpercase(c)) {
        return '-' + c.toLowerCase()
      }
      return c
    })
    .join('')
}
