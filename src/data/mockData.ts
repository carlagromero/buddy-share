import { Event, Ticket, Buddy, Group } from "../types";

export const mockEvents: Event[] = [
  {
    id: "1",
    team: "Pacioli - Lions",
    opponent: "Gophers",
    date: "2026-3-1",
    time: "7:00 PM",
    venue: "Summa Pavilion",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Game_3_of_the_2006_NBA_Finals.jpg/1280px-Game_3_of_the_2006_NBA_Finals.jpg",
  },
  {
    id: "2",
    team: "Pacioli - Lions",
    opponent: "Tigers",
    date: "2026-3-4",
    time: "7:30 PM",
    venue: "Summa Pavilion",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Game_3_of_the_2006_NBA_Finals.jpg/1280px-Game_3_of_the_2006_NBA_Finals.jpg",
  },
  {
    id: "3",
    team: "Pacioli - Lions",
    opponent: "Zebras",
    date: "2026-3-7",
    time: "8:00 PM",
    venue: "Summa Pavilion",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Game_3_of_the_2006_NBA_Finals.jpg/1280px-Game_3_of_the_2006_NBA_Finals.jpg",
  },
];

export const mockTickets: Ticket[] = [
  // Lions vs Gophers
  {
    id: "101",
    eventId: "1",
    section: "109",
    row: "1",
    seat: "1",
    isCombo: true,
    comboSize: 3,
  },
  {
    id: "102",
    eventId: "1",
    section: "L118",
    row: "11",
    seat: "5",
    isCombo: true,
    comboSize: 3,
  },
  {
    id: "103",
    eventId: "1",
    section: "L118",
    row: "11",
    seat: "6",
    isCombo: true,
    comboSize: 3,
  },
  {
    id: "104",
    eventId: "1",
    section: "L118",
    row: "11",
    seat: "7",
    isCombo: true,
    comboSize: 3,
  },

  // Lions vs Tigers
  {
    id: "201",
    eventId: "2",
    section: "109",
    row: "3",
    seat: "9",
    isCombo: false,
  },
  {
    id: "202",
    eventId: "2",
    section: "109",
    row: "3",
    seat: "10",
    isCombo: false,
  },
  // {
  //   id: "203",
  //   eventId: "2",
  //   section: "220",
  //   row: "8",
  //   seat: "3",
  //   isCombo: false,
  // },
  // {
  //   id: "204",
  //   eventId: "2",
  //   section: "220",
  //   row: "8",
  //   seat: "4",
  //   isCombo: false,
  // },

  // Lions vs Zebras
  {
    id: "301",
    eventId: "3",
    section: "109",
    row: "3",
    seat: "9",
    isCombo: false,
    comboSize: 5,
  },
  {
    id: "302",
    eventId: "3",
    section: "109",
    row: "3",
    seat: "10",
    isCombo: false,
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
    avatar: "",
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
