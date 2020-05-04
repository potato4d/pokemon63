type Season = 1 | 2 | 3 | 4 | 5 | 6
type Format = 'single'
type Result = 'win' | 'lose'

type Pokemon = {
  id: number
  dexno: number
  name: string
}

type BattleRecord = {
  userId: string
  season: Season
  format: Format
  result: Result
  rank: number
  myParty: Pokemon[]
  opponentParty: Pokemon[]
}
