import Jimp from 'jimp'
const { exec } = require('child_process')
const { promises: fs } = require('fs')

async function run() {
  await exec('rm -r ./.data/cropped')
  await exec('mkdirp ./.data/cropped')

  const fileList = await fs.readdir('./.data/framed')

  for (let index = 0; index < fileList.length; index++) {
    const fileName = fileList[index]
    await (await Jimp.read(`./.data/framed/${fileName}`))
      .autocrop({ tolerance: 0.01 })
      .writeAsync(`./.data/cropped/${fileName}`)
  }
}

run()
