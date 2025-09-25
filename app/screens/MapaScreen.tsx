import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { loadMotos, saveMotos } from '@/services/storage';

type Moto = {
  id: string;
  modelo: string;
  zona: string;
};

export default function MapaScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    const load = async () => {
      const stored = await loadMotos();
      setMotos(stored || []);
    };
    load();
  }, []);

  const mudarZona = async (id: string, novaZona: string) => {
    const updated = motos.map(m => m.id === id ? { ...m, zona: novaZona } : m);
    setMotos(updated);
    await saveMotos(updated);
  };

  const zonas = ['A1','A2','B1','B2'];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Mapa do Pátio</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
        {zonas.map(z => (
          <View key={z} style={styles.zona}>
            <Text style={{ fontWeight: 'bold' }}>{z}</Text>
            {motos.filter(m => m.zona === z).map(m => (
              <TouchableOpacity
                key={m.id}
                onPress={() => {
                  const proxima = zonas[(zonas.indexOf(m.zona)+1)%zonas.length];
                  mudarZona(m.id, proxima);
                }}
              >
                <Text style={styles.moto}>{m.modelo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <Text style={{ marginTop: 20 }}>Clique em uma moto para mudar de zona</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  zona: {
    width: '45%',
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#333',
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  moto: {
    backgroundColor: '#ddd',
    padding: 5,
    marginVertical: 2,
    borderRadius: 3,
  },
});
