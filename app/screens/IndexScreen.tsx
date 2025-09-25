import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../app';
import { loadMotos, saveMotos } from '@/services/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Index'>;

type Moto = {
  id: string;
  modelo: string;
  status: string;
  zona: string;
};

export default function IndexScreen({ navigation }: Props) {
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    const init = async () => {
      const stored = await loadMotos();
      if (stored) setMotos(stored);
      else {
        const mock = [
          { id: '1', modelo: 'Honda CG', status: 'Disponível', zona: 'A1' },
          { id: '2', modelo: 'Yamaha XTZ', status: 'Em manutenção', zona: 'B2' },
        ];
        setMotos(mock);
        await saveMotos(mock);
      }
    };
    init();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Motos no Pátio</Text>
      <FlatList
        data={motos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}>
            <Text>Modelo: {item.modelo}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Zona: {item.zona}</Text>
            <Button title="Detalhes" onPress={() => navigation.navigate('Detalhes', { motoId: item.id })} />
          </View>
        )}
      />
      <Button title="Ver Mapa" onPress={() => navigation.navigate('Mapa')} />
    </View>
  );
}
