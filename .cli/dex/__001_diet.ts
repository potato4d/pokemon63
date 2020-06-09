import pokeDex from 'pokesprite-images/data/pokemon.json'
import { promises as fs } from 'fs'

const data: any = {}

Object.entries(pokeDex).forEach(([k,v]) => {
  const { 'gen-7': gen7, slug, name, ...pokemon } = v
  data[k] = {
    name: {
      eng: name.eng,
      jpn: name.jpn
    },
    slug: {
      eng: slug.eng
    },
    ...pokemon
  }
})

fs.writeFile('./.data/dex.json', JSON.stringify(data, null, 2))
