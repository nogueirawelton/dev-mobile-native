import {
  Text,
  Modal,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Alert,
} from 'react-native';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  Calendar,
  CircleNotch,
  X,
} from 'phosphor-react-native';
import { styles } from './styles';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isAfter } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import { Categories } from '../../../@types/Categories';
import { spin } from '../../../animations/spin';
import { useAuth } from '../../../contexts/AuthContext';
import { registerTransactionOnDatabase } from '../../../services/registerTransactionOnDatabase';
import uuid from 'react-native-uuid';
import CurrencyInput from 'react-native-currency-input';

interface CreateTransactionModalProps {
  visible: boolean;
  onClose: () => void;
}

export function CreateTransactionModal({
  visible,
  onClose,
}: CreateTransactionModalProps) {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState<number | null>(0);
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState('ENTRADA');

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userData, createTransaction } = useAuth();

  function reset() {
    setName('');
    setDate(new Date());
    setAmount(0);
    setCategory('');
    setCategory('deposit');
  }

  async function handleSubmit() {
    if (!name || !date || !amount || !category || !transactionType) {
      Alert.alert('Erro!', 'Os campos não podem estar vazios!');
      return;
    }

    const transaction = {
      uid: uuid.v4(),
      name,
      date: date.toString(),
      createdAt: new Date().toString(),
      amount,
      category,
      transactionType,
      isSchedule: isAfter(date, new Date()),
    };

    try {
      setIsLoading(true);
      await registerTransactionOnDatabase(transaction, userData?.uid);
      createTransaction(transaction);
      onClose();
      reset();
    } catch (err: any) {
      console.log(err.message);
      Alert.alert('Erro!', 'Erro ao salvar transação!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      statusBarTranslucent
      transparent
      visible={visible}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.contentHeaderText}>Cadastrar Transação</Text>
            <TouchableOpacity
              onPress={() => {
                onClose();
                reset();
              }}>
              <X
                size={28}
                color="#18181b"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.formInput}
              placeholder="Nome"
              placeholderTextColor="#a1a1aa"
              value={name}
              onChangeText={setName}
            />

            <View style={styles.row}>
              <View style={styles.rowItem}>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setIsDatePickerOpen(true)}>
                  <Text>{format(date, 'dd/MM/yyyy')}</Text>
                  <Calendar size={20} />
                </TouchableOpacity>
                {isDatePickerOpen && (
                  <DateTimePicker
                    value={date}
                    locale="pt-BR"
                    onChange={(e) => {
                      setIsDatePickerOpen(false);
                      if (e.type == 'set') {
                        setDate(new Date(e.nativeEvent.timestamp!));
                      }
                    }}
                    style={{
                      zIndex: 100,
                    }}
                  />
                )}
              </View>

              <View style={styles.rowItem}>
                <CurrencyInput
                  style={styles.formInput}
                  placeholder="Valor"
                  inputMode="numeric"
                  placeholderTextColor="#a1a1aa"
                  prefix="R$ "
                  value={amount}
                  onChangeValue={setAmount}
                />
              </View>
            </View>

            <View style={styles.select}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}>
                <Picker.Item
                  label="Categoria"
                  color="#a1a1aa"
                  value=""
                />
                {Object.values(Categories).map((category) => (
                  <Picker.Item
                    key={category}
                    label={category}
                    value={category}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.row}>
              <View style={styles.rowItem}>
                <TouchableOpacity
                  onPress={() => setTransactionType('ENTRADA')}
                  style={
                    transactionType == 'ENTRADA'
                      ? styles.transactionDeposit
                      : styles.transactionType
                  }>
                  <ArrowCircleUp
                    size={28}
                    color={transactionType == 'ENTRADA' ? '#f4f4f5' : '#22c55e'}
                  />
                  <Text
                    style={
                      transactionType == 'ENTRADA'
                        ? styles.transactionActive
                        : styles.transactionText
                    }>
                    Entrada
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rowItem}>
                <TouchableOpacity
                  onPress={() => setTransactionType('SAÍDA')}
                  style={
                    transactionType == 'SAÍDA'
                      ? styles.transactionWithdraw
                      : styles.transactionType
                  }>
                  <ArrowCircleDown
                    size={28}
                    color={transactionType == 'SAÍDA' ? '#f4f4f5' : '#ef4444'}
                  />
                  <Text
                    style={
                      transactionType == 'SAÍDA'
                        ? styles.transactionActive
                        : styles.transactionText
                    }>
                    Saída
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.formSubmit}
              onPress={handleSubmit}>
              <Text style={styles.formSubmitText}>
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
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
