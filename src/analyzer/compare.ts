import Jimp from 'jimp'
import { dex, Pokemon } from './config/dex'
const CompareWorker = require('./compare.worker.ts')
const ImagePHash = require('@jimp/core/es/modules/phash')

type Result = { id: number; distance: number }

const CHUNKS = 8
const PROCESS_PER_CHUNK = 66
const FOREACH_BASE = new Array(CHUNKS).fill(0)
const workers: Worker[] = []

function debug(...args: any) {}

async function check(croppedSS: Jimp): Promise<Pokemon> {
  const results: Result[] = []
  const startedAt = new Date()
  const pHash = new ImagePHash()
  const currentHash = pHash.getHash(croppedSS)

  if (!workers.length) {
    FOREACH_BASE.forEach(() => {
      workers.push(new CompareWorker())
    })
  }

  function checkChunk(shift: number): Promise<void> {
    return new Promise((resolve) => {
      const shiftX = PROCESS_PER_CHUNK * shift
      workers[shift].onmessage = (message: any) => {
        results.push(...message.data.chunk)
        resolve()
      }
      workers[shift].postMessage({
        start: shiftX,
        end: shiftX + PROCESS_PER_CHUNK,
        currentHash,
      })
    })
  }

  await Promise.all(
    FOREACH_BASE.map(async (_, i) => {
      return checkChunk(i)
    })
  )

  let r = results.reduce((a, b) => {
    return a.distance < b.distance ? a : b
  }, results[0])
  if (r.id === 116) {
    r = results.find((a) => a.id === 117)!
  }
  debug(r.distance)
  debug(`${dex[r.id - 1].name}`)
  debug(`System ID: ${r.id}`)
  debug(`Pokedex NO: https://yakkun.com/swsh/zukan/n${dex[r.id - 1].dexno}`)
  const endAt = new Date()
  debug(`実行時間: ${endAt.getTime() - startedAt.getTime()}ms`)
  return dex[r.id - 1]
}

export async function compare(
  ss: Jimp,
  callback?: Function
): Promise<{ time: number; myPokemon: Pokemon[]; opponentPokemon: Pokemon[] }> {
  const myPokemon: Pokemon[] = []
  const opponentPokemon: Pokemon[] = []
  const startedAt = new Date()

  const __check = async (croppedSS: Jimp): Promise<Pokemon> => {
    const result = await check(croppedSS)
    if (callback) {
      callback()
    }
    return result
  }

  debug('自分の構築')
  for (let i = 0; i < 6; i++) {
    // debug(i + 1 + '匹目:')
    const BASE = {
      left: 204,
      top: 129,
    }
    const cropped = ss
      .clone()
      .crop(BASE.left, BASE.top + (i + 0) * 80, 86, 69)
      .autocrop({
        tolerance: 0.01,
      })
    myPokemon.push(await __check(cropped))
  }

  debug('相手の構築')
  for (let i = 0; i < 6; i++) {
    // debug(i + 1 + '匹目:')
    const BASE = {
      left: 804,
      top: 129,
    }
    const cropped = ss
      .clone()
      .crop(BASE.left, BASE.top + (i + 0) * 80, 86, 69)
      .autocrop({
        tolerance: 0.01,
      })
    opponentPokemon.push(await __check(cropped))
  }

  const endAt = new Date()
  debug(`Operation time: ${endAt.getTime() - startedAt.getTime()}ms`)
  return {
    time: endAt.getTime() - startedAt.getTime(),
    myPokemon,
    opponentPokemon,
  }
}

export async function readImage(path: string): Promise<Jimp> {
  return await Jimp.read(path)
}

export async function readFromBuffer(data: Buffer): Promise<Jimp> {
  return await Jimp.read(data)
}

export function createImage(x: number, y: number, hex?: string): Jimp {
  if (hex) {
    return new Jimp(x, y, hex)
  } else {
    return new Jimp(x, y)
  }
}

export { MIME_PNG, AUTO } from 'jimp'
