import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { StatusBar } from 'react-native';
import { Header } from '../../components/Home/Header';
import { useAuth } from '../../contexts/AuthContext';
import { TransactionsTable } from '../../components/Home/TransactionsTable';

export function Home() {
  const { userData } = useAuth();

  if (!userData) {
    return null;
  }

  const { name, transactions } = userData;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <Header name={name} />
      <TransactionsTable transactions={transactions} />
    </SafeAreaView>
  );
}
