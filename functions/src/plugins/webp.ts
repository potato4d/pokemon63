import _admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import path from 'path'
import os from 'os'
import { promises as fs } from 'fs'
import sharp from 'sharp'

type Config = {
  quality?: number
  logging?: boolean
}

export function createWebPConvertFunction(admin: typeof _admin, config?: Config): (object: functions.storage.ObjectMetadata) => Promise<void> {
  config = {
    quality: 100,
    logging: false,
    ...config
  }
  const { quality, logging } = config

  function log(...args: any) {
    if (!logging) {
      return
    }
    console.log(...args)
  }

  return async(object) => {
    const { bucket: fileBucketName, name: originBucketFilePath } = object
    if (!originBucketFilePath) {
      return
    }

    const fileName = originBucketFilePath.split('/')[originBucketFilePath.split('/').length - 1]
    const targetBucket = admin.storage().bucket(fileBucketName)
    const tempLocalFilePath = path.join(os.tmpdir(), fileName)
    const webPLocalFilePath = path.join(`${tempLocalFilePath}.webp`)

    log(`Download "${originBucketFilePath}" ...`)
    await targetBucket.file(originBucketFilePath).download({destination: tempLocalFilePath})
    log(`Success!`)

    const buffer = await sharp(tempLocalFilePath).webp({ quality }).toBuffer();
    await fs.writeFile(webPLocalFilePath, buffer)

    log(`Upload "${fileName}" to "${originBucketFilePath}.webp"`)
    await targetBucket.upload(webPLocalFilePath, {
      destination: `${originBucketFilePath}.webp`,
      metadata: {
        contentType: 'image/webp'
      },
    })
    log(`Success!`)

    await Promise.all([
      fs.unlink(tempLocalFilePath),
      fs.unlink(webPLocalFilePath),
    ])
    return
  }
}
