import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { auth } from '../../firebase';
import { Alert } from 'react-native';

import * as LocalAuthentication from 'expo-local-authentication';
import { registerUserOnDatabase } from '../services/registerUserOnDatabase';
import { LoginMessage, LoginMessages } from '../utils/loginMessages';
import { getDatabaseUserData } from '../services/getDatabaseUserData';
import { UserData } from '../@types/UserData';
import { Transaction } from '../@types/Transaction';
import * as Notifications from 'expo-notifications';
import { differenceInHours } from 'date-fns';
import { updateTransactionOnDatabase } from '../services/updateTransactionOnDatabase';

interface AuthProviderProps {
  children: ReactNode;
}

interface Auth {
  userData: UserData | null;
  isLoading: boolean;

  onCreateAccount: (name: string, email: string, password: string) => void;
  onLogin: (email: string, password: string) => void;

  createTransaction: (transaction: Transaction) => void;
  deleteTransaction: (transactionUid: string) => void;
}

const AuthContext = createContext<Auth>({} as Auth);

export function AuthProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserData(null);
        return;
      }

      if (!userData) {
        const { success } = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Entrar com biometria',
          fallbackLabel: 'Biometria não reconhecida',
        });

        if (!success) {
          return;
        }

        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Você precisa permitir notificações para usar este aplicativo.'
          );
        }

        const databaseUserData = await getDatabaseUserData(user.uid);

        // Second, call the method

        databaseUserData.transactions.forEach((transaction) => {
          if (
            transaction.isSchedule &&
            differenceInHours(new Date(transaction.date), new Date()) < 24
          ) {
            Notifications.scheduleNotificationAsync({
              content: {
                title: 'Transação Agendada',
                body: `Sua Transação '${transaction.name}' está agendada para hoje!`,
              },
              trigger: null,
            });

            try {
              updateTransactionOnDatabase(
                { ...transaction, isSchedule: false },
                user.uid
              );
            } catch (err) {
              console.log(err);
            }
          }
        });
        setUserData(databaseUserData);
      }
    });
  }, []);

  async function onCreateAccount(
    displayName: string,
    email: string,
    password: string
  ) {
    setIsLoading(true);
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return await registerUserOnDatabase({ ...createdUser.user, displayName });
    } catch (err: any) {
      console.log(err.message);
      Alert.alert('Erro!', LoginMessages[err.code as LoginMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  async function onLogin(email: string, password: string) {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.log(err.message);
      Alert.alert('Erro!', LoginMessages[err.code as LoginMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  function createTransaction(transaction: Transaction) {
    if (userData) {
      setUserData({
        ...userData,
        transactions: [transaction, ...userData.transactions],
      });
    }
  }

  function deleteTransaction(transactionUid: string) {
    if (userData) {
      setUserData({
        ...userData,
        transactions: userData.transactions.filter(
          (transaction) => transaction.uid != transactionUid
        ),
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        isLoading,
        onCreateAccount,
        onLogin,
        createTransaction,
        deleteTransaction,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
