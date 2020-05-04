import Jimp from 'jimp'
import { dex, Pokemon } from './dex'

type Result = { id: number; distance: number }

const CHUNKS = 8
const PROCESS_PER_CHUNK = 66
const FOREACH_BASE = new Array(CHUNKS).fill(0)

async function check(croppedSS: Jimp): Promise<Pokemon> {
  const results: Result[] = []
  const startedAt = new Date()

  const workers = FOREACH_BASE.map(() => {
    return new Worker('./browser_worker.ts')
  })
  const arr = Uint8Array.from(await croppedSS.getBufferAsync(Jimp.MIME_JPEG))

  function checkChunk(shift: number): Promise<void> {
    return new Promise((resolve) => {
      const shiftX = PROCESS_PER_CHUNK * shift
      workers[shift].onmessage = (message) => {
        results.push(...message.data.chunk)
        resolve()
      }
      workers[shift].postMessage({
        start: shiftX,
        end: shiftX + PROCESS_PER_CHUNK,
        arr,
      })
    })
  }

  await Promise.all(
    FOREACH_BASE.map(async (_, i) => {
      return checkChunk(i)
    })
  )

  await Promise.all(
    workers.map(async (worker) => {
      return worker.terminate()
    })
  )

  const r = results.reduce((a, b) => {
    return a.distance < b.distance ? a : b
  }, results[0])
  console.log(r.distance)
  console.log(results.find((a) => a.id === 116))
  console.log(results.find((a) => a.id === 117))
  console.log(`${dex[r.id - 1].name}`)
  console.log(`System ID: ${r.id}`)
  console.log(
    `Pokedex NO: https://yakkun.com/swsh/zukan/n${dex[r.id - 1].dexno}`
  )
  const endAt = new Date()
  console.log(`実行時間: ${endAt.getTime() - startedAt.getTime()}ms`)
  return dex[r.id - 1]
}

export async function compare(
  ss: Jimp
): Promise<{ time: number; myPokemon: Pokemon[]; opponentPokemon: Pokemon[] }> {
  const myPokemon: Pokemon[] = []
  const opponentPokemon: Pokemon[] = []
  const startedAt = new Date()

  console.log('自分の構築')
  for (let i = 0; i < 6; i++) {
    // console.log(i + 1 + '匹目:')
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
    myPokemon.push(await check(cropped))
  }

  console.log('相手の構築')
  for (let i = 0; i < 6; i++) {
    // console.log(i + 1 + '匹目:')
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
    opponentPokemon.push(await check(cropped))
  }

  const endAt = new Date()
  console.log(`Operation time: ${endAt.getTime() - startedAt.getTime()}ms`)
  return {
    time: endAt.getTime() - startedAt.getTime(),
    myPokemon,
    opponentPokemon,
  }
}
