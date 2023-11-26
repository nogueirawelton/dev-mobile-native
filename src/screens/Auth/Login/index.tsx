import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';

import { styles } from './styles';
import { useState } from 'react';
import { CircleNotch } from 'phosphor-react-native';
import { spin } from '../../../animations/spin';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../contexts/AuthContext';

interface LoginProps {
  navigation: NativeStackNavigationProp<any, 'login'>;
}

export function Login({ navigation }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, onLogin } = useAuth();

  async function handleSubmit() {
    if (!email || !password) {
      Alert.alert('Erro!', 'Email e senha não podem estar vazios!');
      return;
    }
    onLogin(email, password);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Acesse sua Conta</Text>
      <View style={styles.form}>
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
        <View style={styles.callToAction}>
          <Text style={styles.text}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('register')}>
            <Text style={styles.register}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
