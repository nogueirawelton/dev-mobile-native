export interface Transaction {
  uid: string | number[];
  name: string;
  date: string;
  amount: number;
  category: string;
  transactionType: string;
  createdAt: string;
  deletedAt?: string;
  isSchedule: boolean;
}
