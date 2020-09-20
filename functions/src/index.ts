import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import enhancementTools from '@firebase-enhancement/tools'

admin.initializeApp()

export const generateWebPCaptureImage = functions.storage.object().onFinalize(
  enhancementTools.storage.createWebPConvertFunction(admin)
)
