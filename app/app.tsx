import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from './screens/IndexScreen';
import DetalhesScreen from './screens/DetalhesScreen';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen';
import EditarScreen from './screens/EditarScreen';
import MapaScreen from './screens/MapaScreen';

export type RootStackParamList = {
  Index: undefined;
  Detalhes: { motoId: string } | undefined;
  Configuracoes: undefined;
  Editar: { motoId: string } | undefined;
  Mapa: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} />
        <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
        <Stack.Screen name="Editar" component={EditarScreen} />
        <Stack.Screen name="Mapa" component={MapaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
