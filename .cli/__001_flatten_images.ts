const { exec } = require('child_process')
const { promises: fs } = require('fs')

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

async function run() {
  await exec('rm -r ./.data/')
  await exec('mkdirp ./.data/sprites/')
  await delay(1000)
  await exec('cp ./node_modules/pokesprite-images/pokemon-gen8/regular/*.png ./.data/sprites')
  await delay(15000)
  const femaleList = await fs.readdir('./node_modules/pokesprite-images/pokemon-gen8/regular/female')
  await Promise.all(femaleList.map(async (femaleName: string) => {
    const cmd = `cp ./node_modules/pokesprite-images/pokemon-gen8/regular/female/${femaleName} ./.data/sprites/${femaleName.replace('.png', '')}-female.png`
    console.log(cmd)
    await exec(cmd)
  }))
}

run()
