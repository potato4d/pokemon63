import hashList from './config/v2_hash'
const ImagePHash = require('@jimp/core/es/modules/phash')

type Result = { width: number; height: number; slug: string; distance: number }

type Message = {
  start: number
  end: number
  note?: string

  width: number
  height: number
  currentHash: string
}

function debug(...v: any) {
  // console.log(...v)
}

self.onmessage = async (message: MessageEvent) => {
  const { start, end, currentHash, width, height } = message.data as Message
  // ss.write('./log/'+note+'.jpeg')
  debug(`[START] (${start} to ${end})`)

  // 最小限の配列を作成
  const items = hashList.slice(start, end)
  const pHash = new ImagePHash()

  try {
    const results = await Promise.all(
      items.map(
        async (item, i): Promise<Result | null> => {
          return {
            slug: item.slug,
            width: item.w,
            height: item.h,
            distance: pHash.distance(currentHash, item.hash),
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
