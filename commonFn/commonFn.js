export const genAttr = (x, scope) => ({
  class: typeof x.class === 'function' ? x.class(scope.row) : x.class,
  style: typeof x.style === 'function' ? x.style(scope.row) : x.style,
  icon: x.icon,
})