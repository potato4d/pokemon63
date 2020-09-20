import admin from 'firebase-admin'
import path from 'path'
import os from 'os'
import { promises as fs } from 'fs'
import sharp from 'sharp'

const sa = {
  // Your service account
}

admin.initializeApp({
  credential: admin.credential.cert(sa as any),
  databaseURL: "https://pokedri-minnnano63.firebaseio.com"
});

async function run() {
  const battleRecords = await admin.firestore().collection('battlerecords').get()
  const fileBucketName = 'gs://pokedri-minnnano63.appspot.com'

  await Promise.all(battleRecords.docs.map(async (doc) => {
    const { captureUrl } = doc.data()
    const originBucketFilePath = `${captureUrl}`.replace('https://storage.googleapis.com/pokedri-minnnano63.appspot.com/', '').replace(/%2F/, '/')
    console.log(
      originBucketFilePath
    )
    if (!originBucketFilePath) {
      return
    }

    const fileName = originBucketFilePath.split('/')[originBucketFilePath.split('/').length - 1]
    const targetBucket = admin.storage().bucket(fileBucketName)
    const tempLocalFilePath = path.join(os.tmpdir(), fileName + '.jpg')
    const webPLocalFilePath = path.join(tempLocalFilePath.replace('.jpg', '.webp'))

    await targetBucket.file(originBucketFilePath).download({destination: tempLocalFilePath})
    const buffer = await sharp(tempLocalFilePath).webp().toBuffer();
    await fs.writeFile(webPLocalFilePath, buffer)
    console.log(`await targetBucket.upload(${originBucketFilePath}+'.webp', {
      destination: ${webPLocalFilePath},
      metadata: {
        contentType: 'image/webp'
      },
    })`)
    await targetBucket.upload(webPLocalFilePath, {
      destination: originBucketFilePath+'.webp',
      metadata: {
        contentType: 'image/webp'
      },
    })
  }))
}

run()
