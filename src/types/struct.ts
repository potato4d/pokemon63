export type Season = 1 | 2 | 3 | 4 | 5 | 6
export type Format = 'single'
export type Result = 'win' | 'lose'
import * as Dex from '../analyzer/config/dex'

export type Pokemon = Dex.Pokemon

export type BattleRecord = {
  id?: string
  userId: string
  season: Season
  format: Format
  result: Result
  rank: number
  myParty: Pokemon[]
  opponentParty: Pokemon[]
  myChoice: number[]
  opponentChoice: number[]
  note: string
  captureUrl: string | null
}
