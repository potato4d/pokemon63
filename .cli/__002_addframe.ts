import Jimp from 'jimp'
const { exec } = require('child_process')
const { promises: fs } = require('fs')

async function run() {
  await exec('rm -r ./.data/framed')
  await exec('mkdirp ./.data/framed')

  const fileList = await fs.readdir('./.data/sprites')

  for (let index = 0; index < fileList.length; index++) {
    const fileName = fileList[index]
    const icon = await Jimp.read(`./.data/sprites/${fileName}`)
    const frame = new Jimp(70, 58, '#f5f5f5')
    frame.blit(icon, 0, 0).write(`./.data/framed/${fileName}`)
  }
}

run()
