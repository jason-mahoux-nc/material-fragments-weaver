export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
}

export type NewUser = Omit<User, 'id'>;

export interface Participant {
  id: string;
  user: User;
  takeEat: boolean;
  hasPaid: boolean;
  totalPrice: number;
}

export interface Tournament {
  id: string;
  name: string;
  date: string;
  startHour: string;
  price: number;
  inscriptions?: Participant[];
}

export interface Session {
  id: string;
  theme: string;
  seanceType: string;
  date: string;
  startHour: string;
  endHour: string;
  players?: User[];
  court?: string;
}
