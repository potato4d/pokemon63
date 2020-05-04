import Jimp from 'jimp'
import { parentPort } from 'worker_threads'
import list from './test/list'

function debug(...v: any) {
  // console.log(...v)
}

type Message = {
  start: number
  end: number
  arr: Uint8Array
  note?: string
}
type Result = { id: number; distance: number }

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

parentPort!.on('message', async ({ note, start, end, arr }: Message) => {
  const ss = await Jimp.read(Buffer.from(arr))
  // ss.write('./log/'+note+'.jpeg')
  debug(`[START] (${start} to ${end})`)
  try {
    const results = await Promise.all(
      new Array(end - start).fill(0).map(
        async (_, i): Promise<Result> => {
          return {
            id: start + i + 1,
            distance: ss.distanceFromHash(list[start + i]),
          }
        }
      )
    )
    parentPort!.postMessage({
      chunk: results,
    })
    debug(`[COMPLETE] (${start} to ${end})`)
    return
  } catch (e) {
    debug(`[ERROR] (${start} to ${end})`)
    debug(e.message)
  } finally {
  }
})
