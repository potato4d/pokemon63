import Jimp from 'jimp'
import { Worker } from 'worker_threads'
import showImage from 'term-img'
import { dex } from './dex'

type Result = { id: number; distance: number }
type Message = {
  chunk: Result[]
}
const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

const CHUNKS = 8
const PROCESS_PER_CHUNK = 66

function logger(...v: any) {
  // console.log(...v)
}

async function check(croppedSS: Jimp, pokeIndex: number): Promise<void> {
  const results: Result[] = []
  const startedAt = new Date()

  const workers = new Array(CHUNKS).fill(0).map(() => {
    return new Worker(__dirname + '/worker.js')
  })

  const searchData = {
    arr: Uint8Array.from(await croppedSS.getBufferAsync(Jimp.MIME_JPEG)),
    width: croppedSS.getWidth(),
    height: croppedSS.getHeight(),
  }

  function checkChunk(shift: number): Promise<undefined> {
    return new Promise((resolve) => {
      const shiftX = PROCESS_PER_CHUNK * shift
      workers[shift].on('message', (message: Message) => {
        results.push(...message.chunk)
        resolve()
      })
      workers[shift].postMessage({
        note: `${pokeIndex + 1}pikime`,
        start: shiftX,
        end: shiftX + PROCESS_PER_CHUNK,
        basePath: `${__dirname}/../out2`,
        ...searchData,
      })
    })
  }

  await Promise.all(
    new Array(CHUNKS).fill(0).map(async (_, i) => {
      return checkChunk(i)
    })
  )

  await Promise.all(
    workers.map(async (worker) => {
      return worker.terminate()
    })
  )

  const [r] = results.sort((a, b) => {
    return a.distance < b.distance ? -1 : 1
  })
  console.log(`${dex[r.id - 1].name}`)
  console.log(`System ID: ${r.id}`)
  console.log(
    `Pokedex NO: https://yakkun.com/swsh/zukan/n${dex[r.id - 1].dexno}`
  )
  const endAt = new Date()
  console.log(`実行時間: ${endAt.getTime() - startedAt.getTime()}ms`)
}

export async function compare(ss: Jimp) {
  // await Promise.all(
  //   new Array(6).fill(0).map(async (_, i) => {
  //     console.log('----------------------------')
  //     console.log(i + 1 + '匹目 ')
  //     const BASE = {
  //       left: 204,
  //       top: 129,
  //     }
  //     const cropped = ss.clone().crop(BASE.left, BASE.top + ((i+0) * 80), 86, 69).autocrop({
  //       tolerance: 0.01
  //     })
  //     showImage(await cropped.getBufferAsync(Jimp.MIME_PNG))
  //     await check(cropped, i)
  //   })
  // )
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
    showImage(await cropped.getBufferAsync(Jimp.MIME_PNG))
    await check(cropped, i)
  }

  // console.log('相手の構築')
  // for (let i = 0; i < 6; i++) {
  //   // console.log(i + 1 + '匹目:')
  //   const BASE = {
  //     left: 804,
  //     top: 129,
  //   }
  //   const cropped = ss.clone().crop(BASE.left, BASE.top + ((i+0) * 80), 86, 69).autocrop({
  //     tolerance: 0.01
  //   })
  //   // showImage(await cropped.getBufferAsync(Jimp.MIME_PNG))
  //   await check(cropped, i)
  // }
  // console.log('----------------------------')
  // await Promise.all(waitList)
}

async function run() {
  const startedAt = new Date()
  const [_, __, ssPath] = process.argv
  if (!ssPath) {
    console.log('スクリーンショットのパスが不正です')
  }
  const ss = await Jimp.read(ssPath)
  showImage(ssPath)
  await compare(ss)
  const endAt = new Date()
  console.log(`Operation time: ${endAt.getTime() - startedAt.getTime()}ms`)
  process.exit(0)
}

if (!(process as any).browser) {
  run()
}
