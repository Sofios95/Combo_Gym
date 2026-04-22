export interface User {
  id: number;
  email: string;
  password?: string;
  tokens: number;
  role: 'subscriber' | 'trainer';
}

export interface TrainingSlot {
  id: number;
  max_capacity: number;
  current_capacity?: number; // Από το Redis
}

export interface Booking {
  id: number;
  user_id: number;
  slot_id: number;
  created_at: Date;
}