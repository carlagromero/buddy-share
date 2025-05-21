import { Event, Ticket, Buddy, Group } from "../types";

export const mockEvents: Event[] = [
  {
    id: "1",
    team: "Eagles",
    opponent: "Falcons",
    date: "2025-09-15",
    time: "1:00 PM",
    venue: "Lincoln Financial Field",
    imageUrl:
      "https://images.pexels.com/photos/39562/the-ball-stadion-football-the-pitch-39562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    team: "Eagles",
    opponent: "Cowboys",
    date: "2025-10-05",
    time: "4:25 PM",
    venue: "Lincoln Financial Field",
    imageUrl:
      "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  // {
  //   id: "3",
  //   team: "Eagles",
  //   opponent: "Giants",
  //   date: "2025-11-12",
  //   time: "8:20 PM",
  //   venue: "Lincoln Financial Field",
  //   imageUrl:
  //     "https://images.pexels.com/photos/270085/pexels-photo-270085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  // },
];

export const mockTickets: Ticket[] = [
  // Eagles vs Falcons
  {
    id: "101",
    eventId: "1",
    section: "122",
    row: "15",
    seat: "7",
    isCombo: true,
    comboSize: 3,
  },
  {
    id: "102",
    eventId: "1",
    section: "122",
    row: "15",
    seat: "8",
    isCombo: true,
    comboSize: 3,
  },
  // { id: '103', eventId: '1', section: '123', row: '15', seat: '9' },
  // { id: '104', eventId: '1', section: '123', row: '15', seat: '10' },

  // Eagles vs Cowboys
  {
    id: "201",
    eventId: "2",
    section: "134",
    row: "22",
    seat: "5",
    isCombo: false,
  },
  {
    id: "202",
    eventId: "2",
    section: "134",
    row: "22",
    seat: "6",
    isCombo: false,
  },
  {
    id: "203",
    eventId: "2",
    section: "220",
    row: "8",
    seat: "3",
    isCombo: false,
  },
  {
    id: "204",
    eventId: "2",
    section: "220",
    row: "8",
    seat: "4",
    isCombo: false,
  },

  // Eagles vs Giants
  {
    id: "301",
    eventId: "3",
    section: "108",
    row: "12",
    seat: "1",
    isCombo: true,
    comboSize: 5,
  },
  {
    id: "302",
    eventId: "3",
    section: "108",
    row: "12",
    seat: "2",
    isCombo: true,
    comboSize: 5,
  },
];

export const mockBuddies: Buddy[] = [
  {
    id: "1",
    name: "Mike",
    phone: "(630) 397-2304",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    isActive: true,
  },
  {
    id: "2",
    name: "Jen",
    phone: "(212) 474-5433",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    isActive: true,
  },
  {
    id: "3",
    name: "Carlos",
    phone: "1-860-856-4461",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    isActive: true,
  },
  {
    id: "4",
    name: "Taylor",
    phone: "(733) 743-2585",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    isActive: false,
  },
];

export const mockGroups: Group[] = [
  {
    id: "1",
    name: "Family",
    buddies: ["1", "2"],
  },
  {
    id: "2",
    name: "Friends",
    buddies: ["3"],
  },
];

export const mockNames = [
  "Alex",
  "Sam",
  "Jamie",
  "Jordan",
  "Casey",
  "Riley",
  "Morgan",
  "Cameron",
  "Skyler",
  "Parker",
  "Reese",
  "Emerson",
  "Blake",
  "Logan",
  "Hayden",
  "Elliot",
  "Harper",
];
