import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Início" }} />
      <Stack.Screen name="detalhes" options={{ title: "Detalhes" }} />
      <Stack.Screen name="configuracoes" options={{ title: "Configurações" }} />
      <Stack.Screen name="editar" options={{ title: "Editar" }} />
      <Stack.Screen name="mapa" options={{ title: "Mapa" }} />
    </Stack>
  );
}