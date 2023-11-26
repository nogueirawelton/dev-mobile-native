import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import { Transaction } from '../../../@types/Transaction';
import {
  ArrowDownRight,
  ArrowUpRight,
  Eye,
  Trash,
} from 'phosphor-react-native';
import { deleteTransasctionFromDatabase } from '../../../services/deleteTransactionFromDatabase';
import { useAuth } from '../../../contexts/AuthContext';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const { userData, deleteTransaction } = useAuth();

  function handleDeleteTransaction() {
    Alert.alert(
      'Remover Transação',
      `Deseja realmente excluir a transação '${transaction.name}' ?`,
      [
        {
          text: 'Sim',
          onPress: async () => {
            try {
              await deleteTransasctionFromDatabase(
                transaction.uid as string,
                userData?.uid
              );
              deleteTransaction(transaction.uid as string);
            } catch (err: any) {
              console.log(err.message);
              Alert.alert('Erro!', 'Houve um erro ao deletar a transação!');
            }
          },
        },
        {
          text: 'Não',
          style: 'cancel',
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Text style={styles.name}>{transaction.name}</Text>
      </View>
      <View style={styles.col}>
        {transaction.transactionType == 'SAÍDA' ? (
          <View style={styles.type}>
            <Text style={styles.withdraw}>Retirada</Text>
            <View style={styles.withdrawIcon}>
              <ArrowDownRight
                size={12}
                color="#dc2626"
              />
            </View>
          </View>
        ) : (
          <View style={styles.type}>
            <Text style={styles.deposit}>Depósito</Text>
            <View style={styles.depositIcon}>
              <ArrowUpRight
                size={12}
                color="#16a34a"
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.colControls}>
        {/* <TouchableOpacity style={styles.control}>
          <Eye
            size={22}
            color="#222222"
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.control}
          onPress={handleDeleteTransaction}>
          <Trash
            size={22}
            color="#222222"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
