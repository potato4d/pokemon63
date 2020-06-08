import pokeDex from '../../.data/dex.json'
import { promises as fs } from 'fs'

type Pokemon = {
  slug: string,
  name_eng: string,
  name_jpn: string,
  idx: number,
  dex: number
}

const aggregateData: Pokemon[] = []

Object.entries(pokeDex).forEach(([dex, pokemon]) => {
  // const p: Pokemon[] = []
  const slug = pokemon.slug.eng
  const base = {
    idx: ~~(pokemon.idx),
    dex: ~~(dex),
    name_eng: pokemon.name.eng,
    name_jpn: pokemon.name.jpn
  }

  aggregateData.push({
    ...base,
    slug,
  })

  const $ = pokemon["gen-8"]['forms']['$'] as any

  if ($.has_female) {
    aggregateData.push({
      ...base,
      slug: `${slug}-female`,
    })
  }

  Object.entries(pokemon["gen-8"]['forms']).forEach(([formName,v]) => {
    if (formName === '$') {
      return
    }
    if ((v as any).is_alias_of) {
      return
    }
    if (formName.startsWith('totem')) {
      return
    }
    if (formName.includes('mega')) {
      return
    }
    aggregateData.push({
      ...base,
      slug: `${slug}-${formName}`,
    })
  })
})

fs.writeFile('./.data/dex_customized.json', JSON.stringify(
  aggregateData.sort((a,b) => {
    return a.idx > b.idx ? 1 : -1
  })
  , null, 2))
