import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    backgroundColor: '#ffffff',
    width: '95%',
    borderRadius: 8,
    padding: 12,
  },

  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  contentHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#18181b',
  },

  form: {
    marginTop: 32,
    gap: 12,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },

  rowItem: {
    flex: 1,
  },

  formInput: {
    height: 54,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f4f4f5',
  },

  datePickerButton: {
    height: 54,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f4f4f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  select: {
    height: 54,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f4f4f5',
  },

  transactionType: {
    height: 54,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f4f4f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  transactionDeposit: {
    height: 54,
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 8,
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  transactionWithdraw: {
    height: 54,
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: 8,
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  transactionText: {
    fontSize: 16,
  },

  transactionActive: {
    color: '#f4f4f5',
    fontSize: 16,
  },

  formSubmit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    borderRadius: 8,
    backgroundColor: '#0ea5e9',
  },

  formSubmitText: {
    color: '#f4f4f5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
