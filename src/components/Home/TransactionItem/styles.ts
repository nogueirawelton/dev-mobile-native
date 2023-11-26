import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  col: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  colControls: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 16,
    flexDirection: 'row',
  },

  control: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },

  name: {
    fontWeight: 'bold',
  },

  withdraw: {
    color: '#ef4444',
    fontWeight: 'bold',
  },

  deposit: {
    color: '#22c55e',
    fontWeight: 'bold',
  },

  type: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  depositIcon: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#dcfce7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },

  withdrawIcon: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
});
