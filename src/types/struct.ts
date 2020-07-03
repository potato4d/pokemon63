export type Season = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type Format = 'single'
export type Result = 'win' | 'lose'
import * as Dex from '../analyzer/config/dex'

export type Pokemon = Dex.Pokemon & {
  order?: number
}

export type User = {
  id: string
  displayName: string
  photoUrl: string
  twitterId?: string
}

type C = string | null

export type BattleRecord = {
  id?: string
  userId: string
  season: Season
  format: Format
  result: Result
  rank: number | null
  opponentRank: number | null
  myParty: Pokemon[]
  opponentParty: Pokemon[]
  myChoice: C[]
  opponentChoice: C[]
  note: string
  captureUrl: string | null
  videoUrl: string | null
  createdAt?: firebase.firestore.Timestamp | Date
}
