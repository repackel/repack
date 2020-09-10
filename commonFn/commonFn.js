const genText = (fnText, arg) => {
  if (!fnText) {
    return ''
  } else if (typeof fnText === 'function') {
    return fnText(arg)
  } else {
    return fnText
  }
}

export const genAttr = (x, scope) => {
  const genList = ['class', 'style', 'disabled']
  const attrs = {}
  genList.forEach(y => {
    x[y] && (attrs[y] = genText(x[y], scope.row))
  })
  if (x.icon) {
    attrs[icon] = x.icon
  }
  return attrs
}