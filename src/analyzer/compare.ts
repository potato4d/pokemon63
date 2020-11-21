import Jimp from 'jimp'
import { dex, Pokemon } from './config/dex'
const CompareWorker = require('./compare.worker.ts')
const ImagePHash = require('@jimp/core/es/modules/phash')

type Result = { width: number; height: number; slug: string; distance: number }

const CHUNKS = 10
const PROCESS_PER_CHUNK = 125
const FOREACH_BASE = new Array(CHUNKS).fill(0)
const workers: Worker[] = []

function debug(...args: any) {}

async function check(croppedSS: Jimp): Promise<Pokemon> {
  const results: Result[] = []
  const startedAt = new Date()
  const pHash = new ImagePHash()
  const width = croppedSS.getWidth()
  const height = croppedSS.getHeight()
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
        width,
        height,
        currentHash,
      })
    })
  }

  await Promise.all(
    FOREACH_BASE.map(async (_, i) => {
      return checkChunk(i)
    })
  )

  let rs = results.sort((a, b) => {
    return a.distance < b.distance ? -1 : 1
  })
  const [first, second, third] = rs
  const r = [first, second, third].reduce((a, b) => {
    if (a === null) return b
    const originalRatio = width / height
    const beforeRatio = a.width / a.height
    const afterRatio = b.width / b.height

    // そもそも類似度の差が大きい場合は SKIP
    if (a.distance * 2 < b.distance) {
      return a
    }

    // 類似度の差が小さい場合、アスペクト比を考慮する
    return Math.abs(originalRatio - beforeRatio) >
      Math.abs(originalRatio - afterRatio)
      ? b
      : a
  }, null)
  debug(r)
  debug('Original ratio: ' + width / height)
  debug(`Suggestion:
  1. ${first.slug} / ${first.distance} / ratio: ${first.width / rs[0].height}
  2. ${second.slug} / ${second.distance} / ratio: ${second.width / rs[1].height}
  3. ${third.slug} / ${third.distance} / ratio: ${third.width / rs[2].height}
`)
  debug('-----')

  debug(r.distance)
  const endAt = new Date()
  debug(`実行時間: ${endAt.getTime() - startedAt.getTime()}ms`)
  return dex.find((p) => p.slug === r.slug)!
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
