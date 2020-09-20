import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import path from 'path'
import os from 'os'
import { promises as fs } from 'fs'
import sharp from 'sharp'

admin.initializeApp()

export const generateWebPCaptureImage = functions.storage.object().onFinalize(async(object) => {
  const { bucket: fileBucketName, name: originBucketFilePath } = object
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
  return await fs.unlink(tempLocalFilePath)
})
