export type EventCategory =
  | "WORKSHOP"
  | "TECH"
  | "GENERAL"
  | "SAPTHA"
  | "NATYA"
  | "TAKSATHI"
  | "PROSHOW"
  | "MERCH";
  

export interface Event {
  id: string
  title: string
  name: string
  description: string
  category: EventCategory
  time: string
  venue: string
  poster: string
  day: 1 | 2 | 3
  prizePool?: string
  regFee?: string
  contact?: string
  links: {
    registration: string;
  };
}


