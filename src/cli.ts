import minimist from 'minimist'
import c from 'picocolors'
import { version } from '../package.json'
import { generate } from './generate'

const arguments_ = process.argv.slice(2)
const flags = minimist(arguments_, {
  alias: {
    output: ['o'],
    input: ['i'],
  },
})

console.log(c.green(`icon2vue v${version}`))

const command = flags._[0]
const { input, output } = flags

if (!command || command === 'generate') {
  generate(input, output).catch((error) => {
    console.error(c.red(`generate error:\n`), error)
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
}
