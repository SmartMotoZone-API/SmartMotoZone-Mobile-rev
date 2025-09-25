import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../app';
import { loadMotos, saveMotos } from '@/services/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Editar'>;

export default function EditarScreen({ route, navigation }: Props) {
  const { motoId } = route.params!;
  const [modelo, setModelo] = useState('');
  const [zona, setZona] = useState('');

  useEffect(() => {
    const load = async () => {
      const motos = await loadMotos();
      const moto = motos.find((m: any) => m.id === motoId);
      if (moto) {
        setModelo(moto.modelo);
        setZona(moto.zona);
      }
    };
    load();
  }, []);

  const salvar = async () => {
    const motos = await loadMotos();
    const index = motos.findIndex((m: any) => m.id === motoId);
    motos[index] = { ...motos[index], modelo, zona };
    await saveMotos(motos);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Editar Moto</Text>
      <TextInput
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
      />
      <Text>Zona</Text>
      <Picker selectedValue={zona} onValueChange={setZona}>
        {['A1','A2','B1','B2'].map((z) => (
          <Picker.Item key={z} label={z} value={z} />
        ))}
      </Picker>
      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}
