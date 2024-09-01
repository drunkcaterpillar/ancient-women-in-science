// src/types.ts
export interface Woman {
  _id: string;
  name: string;
  subject: string;
  birthYear: number;
  deathYear?: number;
  location: string;
  contribution: string;
  image?: string;
  quotes?: string[];
  artifacts?: string[];
  impact?: string;
  lat: number;
  lng: number;
  categories: string[]; // Add this line
}
