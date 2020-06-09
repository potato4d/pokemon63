import dex from '../../.data/dex_customized.json'
import { promises as fs } from 'fs'

const template = `
export type Pokemon = {
  idx: number
  dex: number
  name_eng: string
  name_jpn: string
  slug: string
}

export const dex: Pokemon[] = ${
  JSON.stringify(dex, null, 2)
}
`

async function run() {
  await fs.writeFile(
    __dirname+'/../../src/analyzer/config/dex.ts',
    template
  )
}

run()
