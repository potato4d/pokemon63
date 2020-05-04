'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const jimp_1 = __importDefault(require('jimp'))
const worker_threads_1 = require('worker_threads')
const list_1 = __importDefault(require('./test/list'))
function debug(...v) {
  // console.log(...v)
}
const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
worker_threads_1.parentPort.on(
  'message',
  async ({ note, start, end, basePath, arr, width, height }) => {
    const ss = await jimp_1.default.read(Buffer.from(arr))
    // ss.write('./log/'+note+'.jpeg')
    debug(`[START] (${start} to ${end})`)
    try {
      const results = await Promise.all(
        new Array(end - start).fill(0).map(async (_, i) => {
          // await delay(1)
          // const started = new Date()
          // const index = i + 1
          // const target = (await Jimp.read(`${basePath}/${start+i+1}.png`))
          // const distance = await Jimp.distance(target, ss)
          // const end = new Date()
          // debug(`${i} operation time: ${end.getTime() - started.getTime()}ms`)
          return {
            id: start + i + 1,
            distance: ss.distanceFromHash(list_1.default[start + i]),
          }
        })
      )
      worker_threads_1.parentPort.postMessage({
        chunk: results,
      })
      debug(`[COMPLETE] (${start} to ${end})`)
      return
    } catch (e) {
      debug(`[ERROR] (${start} to ${end})`)
      debug(e.message)
    } finally {
    }
  }
)
