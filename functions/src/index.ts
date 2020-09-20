import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import { createWebPConvertFunction } from './plugins/webp'

admin.initializeApp()

export const generateWebPCaptureImage = functions.storage.object().onFinalize(
  createWebPConvertFunction(admin)
)
