
type MakeMyPassLink<Name extends string> =
  `https://app.makemypass.com/event/${Name}`


  export type EventCategory =
  | "WORKSHOP"
  | "TECH"
  | "GENERAL"
  | "SAPTHA"
  | "NATYA"

export interface Event {
  id: string
  name: string
  title: string
  description: string
  category: EventCategory
  time: string
  venue: string
  poster: string
  day: 1 | 2 | 3
  prizePool?: string
  regFee?: string
  contact?: string
  links?: Record<string, string>

}


