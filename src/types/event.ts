export type EventCategory =
  | "WORKSHOP"
  | "TECH"
  | "GENERAL"
  | "SAPTHA"
  | "NATYA"

export interface Event {
  id: string
  title: string
  description: string
  category: EventCategory
  time: string
  venue: string
  poster: string
  day:  1 | 2 | 3 
}
