import dex from '../../.data/dex_customized.json'
import Jimp from 'jimp'
import { promises as fs } from 'fs'

async function run() {
  const data = await Promise.all(
    dex.map(async ({ slug }) => {

      // ネギガナイトの場合
      if (slug === 'sirfetchd') {
        const _img = (await Jimp.read(__dirname+`/../../.data/cropped/${slug}.png`))
        const img = _img.crop(
          0,
          2,
          _img.getWidth(),
          _img.getHeight() - 2
        )
        img.write('./test.png')
        return {
          slug,
          w: img.getWidth(),
          h: img.getHeight(),
          hash: (img as any).pHash()
        }
      }

      const img = (await Jimp.read(__dirname+`/../../.data/cropped/${slug}.png`))
      return {
        slug,
        w: img.getWidth(),
        h: img.getHeight(),
        hash: (img as any).pHash()
      }
    })
  )

  await fs.writeFile(
    './src/analyzer/config/v2_hash.ts',
    `export default ${JSON.stringify(data, null, 2)}`
  )
}

run()
