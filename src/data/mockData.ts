import { Event, Ticket, Buddy, Group } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    team: 'Eagles',
    opponent: 'Falcons',
    date: '2025-09-15',
    time: '1:00 PM',
    venue: 'Lincoln Financial Field',
    imageUrl: 'https://images.pexels.com/photos/39562/the-ball-stadion-football-the-pitch-39562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    team: 'Eagles',
    opponent: 'Cowboys',
    date: '2025-10-05',
    time: '4:25 PM',
    venue: 'Lincoln Financial Field',
    imageUrl: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    team: 'Eagles',
    opponent: 'Giants',
    date: '2025-11-12',
    time: '8:20 PM',
    venue: 'Lincoln Financial Field',
    imageUrl: 'https://images.pexels.com/photos/270085/pexels-photo-270085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
];

export const mockTickets: Ticket[] = [
  // Eagles vs Falcons
  { id: '101', eventId: '1', section: '122', row: '15', seat: '7' },
  { id: '102', eventId: '1', section: '122', row: '15', seat: '8' },
  { id: '103', eventId: '1', section: '123', row: '15', seat: '9' },
  { id: '104', eventId: '1', section: '123', row: '15', seat: '10' },
  
  // Eagles vs Cowboys
  { id: '201', eventId: '2', section: '134', row: '22', seat: '5' },
  { id: '202', eventId: '2', section: '134', row: '22', seat: '6' },
  { id: '203', eventId: '2', section: '220', row: '8', seat: '3' },
  { id: '204', eventId: '2', section: '220', row: '8', seat: '4' },
  
  // Eagles vs Giants
  { id: '301', eventId: '3', section: '108', row: '12', seat: '1' },
  { id: '302', eventId: '3', section: '108', row: '12', seat: '2' },
];

export const mockBuddies: Buddy[] = [
  {
    id: '1',
    name: 'Mike',
    relationship: 'Husband',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '2',
    name: 'Jen',
    relationship: 'Sister',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '3',
    name: 'Carlos',
    relationship: 'Friend',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
  // {
  //   id: '4',
  //   name: 'Taylor',
  //   relationship: 'Coworker',
  //   avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
  // },
  {
    id: '5',
    name: 'Jordan',
    relationship: 'Friend',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
  }
];

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Family',
    buddies: ['1', '2']
  },
  {
    id: '2',
    name: 'Friends',
    buddies: ['3', '5']
  },
  // {
  //   id: '3',
  //   name: 'Work',
  //   buddies: ['4']
  // }
];