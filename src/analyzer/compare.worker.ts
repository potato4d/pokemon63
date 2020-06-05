import Jimp from 'jimp'
import list from './config/imageHash'
import { SKIP_INDEX } from './config/constants'
const ImagePHash = require('@jimp/core/es/modules/phash')

type Result = { id: number; distance: number }
type Message = {
  start: number
  end: number
  note?: string
  currentHash: string
}

function debug(...v: any) {
  // console.log(...v)
}

self.onmessage = async (message: MessageEvent) => {
  const { start, end, currentHash } = message.data as Message
  // ss.write('./log/'+note+'.jpeg')
  debug(`[START] (${start} to ${end})`)

  // 最小限の配列を作成
  const items = list.slice(start, end)
  const pHash = new ImagePHash()

  try {
    const results = await Promise.all(
      items.map(
        async (item, i): Promise<Result | null> => {
          if ((SKIP_INDEX as any)[`${start + i + 1}`]) {
            return null
          }
          return {
            id: start + i + 1,
            distance: pHash.distance(currentHash, item),
          }
        }
      )
    )
    ;(self as any).postMessage({
      chunk: results.filter((r) => !!r),
    })
    debug(`[COMPLETE] (${start} to ${end})`)
    return
  } catch (e) {
    debug(`[ERROR] (${start} to ${end})`)
    debug(e.message)
  } finally {
  }
}
