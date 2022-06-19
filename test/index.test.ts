import fs from 'node:fs'
import path from 'node:path'
import { afterAll, describe, it } from 'vitest'
import { generate } from '../src/generate'

const inputPath = './test/draft-line.svg'
const outputPath = './test/DraftIcon.vue'
describe('Test ether provider', () => {
  afterAll(async () => {
    fs.unlinkSync(path.join(process.cwd(), outputPath))
  })
  it('generate vue', () => {
    generate(inputPath, outputPath).catch((error) => {
      console.log(error)
    })
  })
})
