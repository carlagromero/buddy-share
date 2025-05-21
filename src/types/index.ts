export interface Event {
  id: string;
  team: string;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  imageUrl: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  section: string;
  row: string;
  seat: string;
  assigned?: string;
  isCombo: boolean;
  comboSize?: number;
}

export interface Buddy {
  id: string;
  name?: string;
  phone: string;
  avatar?: string;
  isActive: boolean;
}

export interface Group {
  id: string;
  name: string;
  buddies: string[];
}

export type ModeView = "groups" | "individuals";
