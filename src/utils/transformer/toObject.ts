import { firebase } from '../externals/firebase'
import { User, BattleRecord } from '../../types/struct'

type Document = firebase.firestore.DocumentSnapshot<
  firebase.firestore.DocumentData
>
type Key<T> = keyof T

export function toObject<T>(doc: Document, omit?: Key<T>[]): T {
  let data: Partial<Document> = doc
  ;(omit || []).forEach((k) => {
    const { [k]: tmp, ...d } = data
    data = d
  })
  if (omit && omit.length) {
  }
  const obj: any = {
    id: doc.id,
    ...doc.data(),
  }
  return obj as T
}

export function toUserDocument(doc: Document, omit?: Key<User>[]): User {
  return toObject<User>(doc, omit)
}

export function toBattleRecordDocument(
  doc: Document,
  omit?: Key<BattleRecord>[]
): BattleRecord {
  return toObject<BattleRecord>(doc, omit)
}
