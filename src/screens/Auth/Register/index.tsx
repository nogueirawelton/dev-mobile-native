import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';

import { styles } from './styles';
import { useState } from 'react';
import { ArrowLeft, CircleNotch } from 'phosphor-react-native';
import { spin } from '../../../animations/spin';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../contexts/AuthContext';

interface RegisterProps {
  navigation: NativeStackNavigationProp<any, 'register'>;
}

export function Register({ navigation }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, onCreateAccount } = useAuth();

  function handleSubmit() {
    if (!name || !email || !password) {
      Alert.alert('Erro!', 'Os campos não podem estar vazios!');
      return;
    }

    onCreateAccount(name, email, password);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}>
        <ArrowLeft
          color="#f4f4f5"
          size={28}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Criar uma conta</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#3f3f46"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço de E-mail"
          placeholderTextColor="#3f3f46"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          placeholderTextColor="#3f3f46"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {isLoading ? (
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <CircleNotch
                  color="#f4f4f5"
                  size={28}
                />
              </Animated.View>
            ) : (
              'Continuar'
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
