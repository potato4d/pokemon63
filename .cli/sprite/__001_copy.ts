const { exec } = require('child_process')
const { promises: fs } = require('fs')

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

async function run() {
  await exec('rm -r ./src/static/static/images/icons/')
  await exec('mkdirp ./src/static/static/images/icons/')
  await delay(1000)
  await exec('cp ./node_modules/pokesprite-images/pokemon-gen8/regular/*.png ./src/static/static/images/icons')
  await delay(15000)
  const femaleList = await fs.readdir('./node_modules/pokesprite-images/pokemon-gen8/regular/female')
  await Promise.all(femaleList.map(async (femaleName: string) => {
    const cmd = `cp ./node_modules/pokesprite-images/pokemon-gen8/regular/female/${femaleName} ./src/static/static/images/icons/${femaleName.replace('.png', '')}-female.png`
    console.log(cmd)
    await exec(cmd)
  }))
}

run()
