import { View, Text, TouchableOpacity } from 'react-native';
import { SignOut } from 'phosphor-react-native';
import { styles } from './styles';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { auth } from '../../../../firebase';
import { useState } from 'react';
import { getCurrentPeriodMessage } from '../../../utils/getCurrentPeriodMessage';

interface HeaderProps {
  name: string;
}

export function Header({ name }: HeaderProps) {
  const currentHour = new Date().getHours();
  const currentDate = format(new Date(), "EEEE, dd 'de' MMMM 'de' Y", {
    locale: ptBR,
  });

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.currentDate}>{currentDate}</Text>
          <View style={styles.reception}>
            <Text style={styles.receptionText}>
              {getCurrentPeriodMessage(currentHour)},
            </Text>
            <Text style={styles.receptionText}>{name.split(' ')[0]}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => auth.signOut()}>
          <SignOut
            color="#18181b"
            size={28}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divide} />
    </>
  );
}
