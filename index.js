export const hello = 'hello world'

const list = ['FormItem','Table']
list.forEach(c => {
  Object.assign(exports, {
    [c]: require(`./${c}/index.vue`).default
  })
})