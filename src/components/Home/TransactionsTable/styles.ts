import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },

  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  transactionsHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#27272a',
  },

  addTransactionButton: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  empty: {
    textAlign: 'center',
    marginTop: 24,
  },
});
