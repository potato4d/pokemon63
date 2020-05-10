import { firebase } from '../externals/firebase'
import { User, BattleRecord, Pokemon } from '../../types/struct'

type Document = firebase.firestore.DocumentSnapshot<
  firebase.firestore.DocumentData
>
type Key<T> = keyof T

export function toObject<T>(doc: Document, omit?: Key<T>[]): T {
  const obj: any = {
    id: doc.id,
    ...doc.data(),
  }
  ;(omit || []).forEach((k) => {
    delete obj[k]
  })
  return obj as T
}

export function toUserDocument(doc: Document, omit?: Key<User>[]): User {
  return toObject<User>(doc, omit)
}

export function toPokemonDocument(
  doc: Document,
  omit?: Key<Pokemon>[]
): Pokemon {
  return toObject<Pokemon>(doc, omit)
}

export function toBattleRecordDocument(
  doc: Document,
  omit?: Key<BattleRecord>[]
): BattleRecord {
  return toObject<BattleRecord>(doc, omit)
}
