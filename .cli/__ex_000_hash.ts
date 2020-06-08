// import Jimp from 'jimp'
// import { promises as fs } from 'fs'

// async function run() {
//   const list = []
//   for (let index = 1; index <= 530; index++) {
//     const img = (await Jimp.read(`./out3/${index}.jpeg`)).autocrop() as any
//     list.push(img.pHash())
//   }
//   await fs.writeFile(
//     './src/test/list.ts',
//     `export default ${JSON.stringify(list)}`
//   )
// }

// run()
