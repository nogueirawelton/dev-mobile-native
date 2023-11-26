import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  currentDate: {
    color: '#52525b',
  },

  reception: {
    flexDirection: 'row',
    gap: 4,
  },

  receptionText: {
    color: '#18181b',
    fontWeight: 'bold',
    fontSize: 20,
  },

  divide: {
    width: '100%',
    height: 1,
    backgroundColor: '#e4e4e7',
    marginTop: 16,
  },
});
