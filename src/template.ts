export const script = (name: string) => `
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: '${name}',
  props: {
    size: {
      type: Number,
      default: 24,
    },
  },
})
</script>
`

export const template = (svg: string) => `
<template>${svg}</template>
`

export const style = (className: string) => `
<style scoped>
.${className} {
    fill: #fff
}
</style>
`

export const HELP = `Usage
  $ svg2vue [input] [options]
Input
  generate
Options
  --help                       display this
  --input, -i                  Specify input file
  --output, -o                 Specify output file (default: stdout)
`
