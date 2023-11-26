import { Plus } from 'phosphor-react-native';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import { Transaction } from '../../../@types/Transaction';

import { styles } from './styles';
import { CreateTransactionModal } from '../CreateTransactionModal';
import { useState } from 'react';
import { TransactionItem } from '../TransactionItem';
interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleToggleModal() {
    setIsModalOpen((prevState) => !prevState);
  }



  return (
    <>
      <View style={styles.container}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsHeaderText}>Transações Recentes</Text>
          <TouchableOpacity
            style={styles.addTransactionButton}
            onPress={handleToggleModal}>
            <Plus
              size={16}
              color="#f4f4f5"
              weight="bold"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.list}
          data={transactions}
          keyExtractor={(item) => item.uid as string}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhuma Transação adicionada.</Text>
          )}
        />
      </View>
      <CreateTransactionModal
        visible={isModalOpen}
        onClose={handleToggleModal}
      />
    </>
  );
}
