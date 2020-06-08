const { exec } = require('child_process')
const { promises: fs } = require('fs')

async function run() {
  await exec('rm -r ./.data/')
  await exec('mkdirp ./.data/sprites/')
  await exec('cp ./node_modules/pokesprite-images/pokemon-gen8/regular/*.png ./.data/sprites')
  const femaleList = await fs.readdir('./node_modules/pokesprite-images/pokemon-gen8/regular/female')
  await Promise.all(femaleList.map(async (femaleName: string) => {
    const cmd = `
    cp ./node_modules/pokesprite-images/pokemon-gen8/regular/female/${femaleName} ./.data/sprites/${femaleName.replace('.png', '')}-female.png
    `
    console.log(cmd)
    await exec(cmd)
  }))
}

run()
