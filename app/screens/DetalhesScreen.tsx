import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../app';
import { loadMotos } from '@/services/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

export default function DetalhesScreen({ route }: Props) {
  const { motoId } = route.params!;
  const [moto, setMoto] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const motos = await loadMotos();
      setMoto(motos.find((m: any) => m.id === motoId));
    };
    load();
  }, []);

  if (!moto) return <Text>Carregando...</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Detalhes da Moto</Text>
      <Text>Modelo: {moto.modelo}</Text>
      <Text>Status: {moto.status}</Text>
      <Text>Zona: {moto.zona}</Text>
    </View>
  );
}
