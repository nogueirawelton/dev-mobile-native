import { Transaction } from './Transaction';

export interface UserData {
  createdAt: string;
  name: string;
  email: string;
  uid: string;
  transactions: Transaction[];
}
