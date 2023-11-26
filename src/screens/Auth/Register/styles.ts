import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18181b',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    position: 'relative',
  },

  back: {
    position: 'absolute',
    top: 64,
    left: 16,
  },

  title: {
    fontSize: 32,
    color: '#f4f4f5',
    fontWeight: 'bold',
  },

  form: {
    width: '100%',
    gap: 12,
    marginTop: 32,
  },

  input: {
    height: 60,
    borderWidth: 1,
    borderColor: '#3f3f46',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#f4f4f5',
  },

  submitButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0ea5e9',
    height: 60,
    borderRadius: 8,
  },

  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4f4f5',
  },
});
