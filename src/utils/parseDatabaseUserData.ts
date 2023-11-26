import { UserData } from '../@types/UserData';

export function parseDatabaseUserData(userData: any): UserData {
  return {
    ...userData,
    transactions: userData.transactions
      ? Object.values(userData.transactions).filter(
          (transaction: any) => !transaction.deletedAt
        )
      : [],
  };
}
