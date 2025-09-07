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
  hour: string;
  durationInMinutes: number;
  description: string;
  players?: User[];
  court?: string;
}

export interface Activity {
  id: string;
  title: string;
  date: string;
  hour: string;
  participantsCount: number;
  type: 'TOURNAMENT' | 'SEANCE';
}

// Stock / Items (aligné au swagger)
export interface Item {
  id: string;
  title?: string;
  purchasePrice?: number;
  salePrice?: number;
  description?: string;
  quantityInStock?: number;
  image?: string;
}

export type NewItem = Partial<Omit<Item, 'id'>>;
